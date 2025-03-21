import { exec } from 'child_process'
import util from 'util'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import * as fsPromises from 'fs/promises'
import { existsSync } from 'fs'
import os from 'os'

// Load environment variables from .env file
dotenv.config()

const execPromise = util.promisify(exec)

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Check if running on Windows
const isWindows = os.platform() === 'win32'

// Environment variables validation and defaults
const {
  DATABASE_URI,
  SERVER_HOST,
  SERVER_DB,
  SERVER_USER,
  SERVER_PASSWORD,
  SSH_USER,
  SSH_KEY_PATH,
  SSH_PORT = '22',
  BACKUP_FILENAME = 'server_db_backup.dump',
} = process.env

// Constants
const SSH_HOST = SERVER_HOST
const SSH_USER_NAME = SSH_USER
const SSH_KEY = normalizeKeyPath(SSH_KEY_PATH)
const BACKUP_PATH = path.join(__dirname, BACKUP_FILENAME)

// Function to normalize SSH key path for cross-platform support
function normalizeKeyPath(keyPath) {
  if (!keyPath) return ''

  // Replace ~ with home directory
  if (keyPath.startsWith('~')) {
    return path.join(os.homedir(), keyPath.substring(1))
  }

  // On Windows, ensure path format is correct
  if (isWindows && !keyPath.includes(':')) {
    // If it's a relative path, make it absolute
    return path.resolve(keyPath)
  }

  return keyPath
}

// Validate required environment variables
const requiredVars = [
  'DATABASE_URI',
  'SERVER_HOST',
  'SERVER_DB',
  'SERVER_USER',
  'SERVER_PASSWORD',
  'SSH_USER',
]

const missingVars = requiredVars.filter((varName) => !process.env[varName])
if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`)
  process.exit(1)
}

// Validate SSH key exists
if (SSH_KEY && !existsSync(SSH_KEY)) {
  console.error(`SSH key not found at: ${SSH_KEY}`)
  console.error(`Original path: ${SSH_KEY_PATH}`)
  console.error(`Normalized path: ${SSH_KEY}`)
  process.exit(1)
}

/**
 * Parses a PostgreSQL connection URI
 * @param {string} uri - PostgreSQL connection URI
 * @returns {Object} Connection details
 */
function parseDbUri(uri) {
  const match = uri.match(/^postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/)
  if (!match) {
    throw new Error('Invalid PostgreSQL connection URI format')
  }

  const [, user, password, host, port, db] = match
  return { user, password, host, port, db }
}

/**
 * Executes a command with environment variables
 * @param {string} command - Command to execute
 * @param {Object} env - Environment variables
 * @returns {Promise<Object>} Command execution result
 */
async function execWithEnv(command, env = {}) {
  const options = {
    env: { ...process.env, ...env },
    maxBuffer: 10 * 1024 * 1024, // Increase buffer size to 10MB
    // Use shell appropriate for the platform
    shell: isWindows ? 'powershell.exe' : '/bin/bash',
  }

  console.log(`Executing: ${command}`)

  try {
    const { stdout, stderr } = await execPromise(command, options)
    if (stderr && !stderr.includes('processing')) {
      console.warn(`Command stderr: ${stderr}`)
    }
    return { stdout, stderr }
  } catch (error) {
    console.error(`Command failed: ${command}`)
    console.error(`Error: ${error.message}`)
    if (error.stderr) console.error(`stderr: ${error.stderr}`)
    throw error
  }
}

/**
 * Creates SSH tunnel command appropriate for the platform
 * @returns {Object} SSH tunnel command and kill command
 */
function createSshTunnelCommands() {
  const localPort = 15432
  const sshKeyPart = SSH_KEY ? `-i "${SSH_KEY}"` : ''

  // Add Windows-specific or Unix-specific options
  let extraOptions = ''

  if (isWindows) {
    // For Windows, add options to:
    // 1. Disable strict host key checking
    // 2. Use null known hosts file to avoid prompts
    // 3. Enable batch mode to prevent password prompts
    // 4. Add identity file only option to force key-based auth
    extraOptions =
      '-o StrictHostKeyChecking=no -o UserKnownHostsFile=nul -o BatchMode=yes -o PubkeyAuthentication=yes -o PasswordAuthentication=no'
  } else {
    // For Unix, use standard options
    extraOptions = '-o BatchMode=yes -o StrictHostKeyChecking=no'
  }

  const baseCommand = `ssh ${sshKeyPart} ${extraOptions} -p ${SSH_PORT} -L ${localPort}:localhost:5432 ${SSH_USER_NAME}@${SSH_HOST}`

  // Create different tunnel and kill commands based on platform
  if (isWindows) {
    // For Windows, we need to use a different approach to kill the process
    // Start the process in a way we can find it later
    // Use proper escaping for PowerShell arguments
    const escapedArgs = `${sshKeyPart.replace(/"/g, '\\"')} ${extraOptions} -p ${SSH_PORT} -L ${localPort}:localhost:5432 ${SSH_USER_NAME}@${SSH_HOST} -N`
    const tunnelCommand = `Start-Process -NoNewWindow ssh -ArgumentList "${escapedArgs}"`
    // Alternative approach that's more reliable for finding and killing the process
    const killCommand = `Get-Process -Name ssh | Where-Object {$_.CommandLine -match '${localPort}:localhost:5432'} | Stop-Process -Force`

    return { tunnelCommand, killCommand, localPort }
  } else {
    // For Unix, we can use the original approach
    const tunnelCommand = `${baseCommand} -fN`
    const killCommand = `pkill -f "${baseCommand}"`

    return { tunnelCommand, killCommand, localPort }
  }
}

/**
 * Copies a database from remote to local using direct SSH command
 */
async function copyDatabase() {
  console.log('Starting database copy process...')

  try {
    // Get platform-specific SSH tunnel commands
    const { tunnelCommand, killCommand, localPort } = createSshTunnelCommands()

    // First create the SSH tunnel in background
    console.log('Starting SSH tunnel...')
    await execWithEnv(tunnelCommand)
    console.log('SSH tunnel started in background')

    // Wait a moment for the tunnel to establish
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create pg_dump command appropriate for the platform
    let pgDumpCommand
    if (isWindows) {
      // For Windows, use environment variable in a way PowerShell understands
      // Escape quotes properly for PowerShell
      const escapedPassword = SERVER_PASSWORD.replace(/"/g, '`"')
      pgDumpCommand = `$env:PGPASSWORD='${escapedPassword}'; pg_dump -h localhost -p ${localPort} -U ${SERVER_USER} -d ${SERVER_DB} -F c -b -v -f "${BACKUP_PATH}"`
    } else {
      // For Unix, use the original approach
      pgDumpCommand = `PGPASSWORD="${SERVER_PASSWORD}" pg_dump -h localhost -p ${localPort} -U ${SERVER_USER} -d ${SERVER_DB} -F c -b -v -f "${BACKUP_PATH}"`
    }

    // Then run pg_dump through the tunnel
    await execWithEnv(pgDumpCommand)
    console.log('Database dump completed')

    // Kill the background SSH tunnel
    console.log('Closing SSH tunnel...')
    await execWithEnv(killCommand)

    // Parse local database connection details
    const localDb = parseDbUri(DATABASE_URI)

    // Create pg_restore command appropriate for the platform
    let pgRestoreCommand
    if (isWindows) {
      // For Windows, escape quotes properly for PowerShell
      const escapedPassword = localDb.password.replace(/"/g, '`"')
      pgRestoreCommand = `$env:PGPASSWORD='${escapedPassword}'; pg_restore -h ${localDb.host} -p ${localDb.port} -U ${localDb.user} -d ${localDb.db} -v --clean --if-exists "${BACKUP_PATH}"`
    } else {
      pgRestoreCommand = `PGPASSWORD="${localDb.password}" pg_restore -h ${localDb.host} -p ${localDb.port} -U ${localDb.user} -d ${localDb.db} -v --clean --if-exists "${BACKUP_PATH}"`
    }

    // Restore to local database
    console.log(`Restoring the backup to the local database ${localDb.db}...`)
    await execWithEnv(pgRestoreCommand)
    console.log('Database restored successfully')
  } catch (error) {
    console.error(`Database copy failed: ${error.message}`)
    throw error
  }
}

/**
 * Cleans up temporary files
 */
async function cleanup() {
  try {
    if (existsSync(BACKUP_PATH)) {
      await fsPromises.unlink(BACKUP_PATH)
      console.log(`Removed temporary backup file: ${BACKUP_PATH}`)
    }
  } catch (error) {
    console.warn(`Cleanup warning: ${error.message}`)
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting database sync process...')
    console.log(`Running on ${os.platform()} (${isWindows ? 'Windows' : 'Unix-like'})`)
    console.log(`Using SSH key: ${SSH_KEY || 'None provided'}`)

    await copyDatabase()
    await cleanup()
    console.log('Database sync process completed successfully!')
  } catch (error) {
    console.error(`Database sync process failed: ${error.message}`)
    process.exit(1)
  }
}

// Run main function
main()
