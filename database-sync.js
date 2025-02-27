import { exec } from 'child_process'
import util from 'util'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import * as fsPromises from 'fs/promises'
import { existsSync } from 'fs'

// Load environment variables from .env file
dotenv.config()

const execPromise = util.promisify(exec)

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
const SSH_KEY = SSH_KEY_PATH
const BACKUP_PATH = path.join(__dirname, BACKUP_FILENAME)

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
 * Copies a database from remote to local using direct SSH command
 */
async function copyDatabase() {
  console.log('Starting database copy process...')

  try {
    // Create a temporary SSH tunnel with command line ssh
    const localPort = 15432

    // Create the backup using one command that does both SSH tunneling and pg_dump
    console.log(`Creating a backup of the server database ${SERVER_DB} from ${SERVER_HOST}...`)

    // Command parts for clarity
    const sshKeyPart = SSH_KEY ? `-i "${SSH_KEY}"` : ''
    const sshCommand = `ssh ${sshKeyPart} -p ${SSH_PORT} -L ${localPort}:localhost:5432 ${SSH_USER_NAME}@${SSH_HOST}`
    const pgDumpCommand = `PGPASSWORD="${SERVER_PASSWORD}" pg_dump -h localhost -p ${localPort} -U ${SERVER_USER} -d ${SERVER_DB} -F c -b -v -f "${BACKUP_PATH}"`

    // First create the SSH tunnel in background
    console.log('Starting SSH tunnel...')
    const tunnelCmd = `${sshCommand} -fN`
    await execWithEnv(tunnelCmd)
    console.log('SSH tunnel started in background')

    // Wait a moment for the tunnel to establish
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Then run pg_dump through the tunnel
    await execWithEnv(pgDumpCommand)
    console.log('Database dump completed')

    // Kill the background SSH tunnel
    console.log('Closing SSH tunnel...')
    await execWithEnv(`pkill -f "${sshCommand}"`)

    // Parse local database connection details
    const localDb = parseDbUri(DATABASE_URI)

    // Restore to local database
    console.log(`Restoring the backup to the local database ${localDb.db}...`)
    await execWithEnv(
      `pg_restore -h ${localDb.host} -p ${localDb.port} -U ${localDb.user} -d ${localDb.db} -v --clean --if-exists "${BACKUP_PATH}"`,
      { PGPASSWORD: localDb.password },
    )
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
