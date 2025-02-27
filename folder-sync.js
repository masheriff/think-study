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
  LOCAL_FOLDER: relativeLocalFolder,
  SERVER_FOLDER,
  SERVER_HOST,
  SSH_USER,
  SSH_KEY_PATH,
  SSH_PORT = '22',
  RSYNC_EXCLUDE = 'node_modules,.git,*.log',
  RSYNC_OPTIONS = '-avz --progress --stats --delete',
} = process.env

// Constants
const LOCAL_FOLDER = path.resolve(__dirname, relativeLocalFolder || '')
const SSH_HOST = SERVER_HOST
const SSH_USER_NAME = SSH_USER
const SSH_KEY = SSH_KEY_PATH

// Validate required environment variables
const requiredVars = ['LOCAL_FOLDER', 'SERVER_FOLDER', 'SERVER_HOST', 'SSH_USER']

const missingVars = requiredVars.filter((varName) => !process.env[varName])
if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`)
  process.exit(1)
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
    maxBuffer: 20 * 1024 * 1024, // Increase buffer size to 20MB for large rsync outputs
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
 * Tests the SSH connection to the server
 */
async function testSshConnection() {
  try {
    console.log(`Testing SSH connection to ${SSH_USER_NAME}@${SSH_HOST}...`)
    const sshKeyPart = SSH_KEY ? `-i "${SSH_KEY}"` : ''
    const testCmd = `ssh ${sshKeyPart} -p ${SSH_PORT} ${SSH_USER_NAME}@${SSH_HOST} "echo 'SSH connection successful'"`
    const { stdout } = await execWithEnv(testCmd)
    console.log(stdout.trim())
    return true
  } catch (error) {
    console.error(`SSH connection test failed: ${error.message}`)
    return false
  }
}

/**
 * Checks if the remote folder exists
 */
async function checkRemoteFolder() {
  try {
    console.log(`Checking if remote folder ${SERVER_FOLDER} exists...`)
    const sshKeyPart = SSH_KEY ? `-i "${SSH_KEY}"` : ''
    const checkCmd = `ssh ${sshKeyPart} -p ${SSH_PORT} ${SSH_USER_NAME}@${SSH_HOST} "[ -d ${SERVER_FOLDER} ] && echo 'Folder exists' || echo 'Folder does not exist'"`
    const { stdout } = await execWithEnv(checkCmd)
    const exists = stdout.trim().includes('exists')
    console.log(stdout.trim())
    return exists
  } catch (error) {
    console.error(`Remote folder check failed: ${error.message}`)
    return false
  }
}

/**
 * Shows the content of the remote folder
 */
async function listRemoteFolder() {
  try {
    console.log(`Listing contents of remote folder ${SERVER_FOLDER}...`)
    const sshKeyPart = SSH_KEY ? `-i "${SSH_KEY}"` : ''
    const listCmd = `ssh ${sshKeyPart} -p ${SSH_PORT} ${SSH_USER_NAME}@${SSH_HOST} "ls -la ${SERVER_FOLDER}"`
    const { stdout } = await execWithEnv(listCmd)
    console.log('Remote folder contents:')
    console.log(stdout)
    return true
  } catch (error) {
    console.error(`Failed to list remote folder: ${error.message}`)
    return false
  }
}

/**
 * Checks if rsync is available
 */
async function checkRsync() {
  try {
    console.log('Checking if rsync is available...')
    const { stdout } = await execWithEnv('rsync --version | head -n 1')
    console.log(stdout.trim())
    return true
  } catch (error) {
    console.error(`Rsync check failed: ${error.message}`)
    return false
  }
}

/**
 * Copies a folder from remote to local using rsync
 */
async function copyFolder() {
  console.log(`Starting folder sync from ${SERVER_FOLDER} to ${LOCAL_FOLDER}...`)

  // Run pre-flight checks
  const sshOk = await testSshConnection()
  if (!sshOk) {
    throw new Error('SSH connection test failed, cannot proceed with folder sync')
  }

  const folderExists = await checkRemoteFolder()
  if (!folderExists) {
    throw new Error(
      `Remote folder ${SERVER_FOLDER} does not exist, cannot proceed with folder sync`,
    )
  }

  await listRemoteFolder()

  const rsyncOk = await checkRsync()
  if (!rsyncOk) {
    throw new Error('Rsync is not available, cannot proceed with folder sync')
  }

  try {
    // Ensure local folder exists
    console.log(`Ensuring local folder ${LOCAL_FOLDER} exists...`)
    await fsPromises.mkdir(LOCAL_FOLDER, { recursive: true })
    console.log(`Local folder ${LOCAL_FOLDER} is ready`)

    // Parse exclude patterns
    const excludeOptions = RSYNC_EXCLUDE.split(',')
      .map((pattern) => `--exclude="${pattern.trim()}"`)
      .join(' ')

    // Add SSH key if specified
    const sshCmd = SSH_KEY ? `ssh -i "${SSH_KEY}" -p ${SSH_PORT}` : `ssh -p ${SSH_PORT}`

    // Build the rsync command
    const rsyncCommand = `rsync ${RSYNC_OPTIONS} ${excludeOptions} -e "${sshCmd}" ${SSH_USER_NAME}@${SSH_HOST}:${SERVER_FOLDER}/ ${LOCAL_FOLDER}/`

    console.log('Starting rsync process...')
    await execWithEnv(rsyncCommand)
    console.log('Folder sync completed successfully')

    return true
  } catch (error) {
    console.error(`Folder sync failed: ${error.message}`)
    throw error
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting folder sync process...')
    await copyFolder()
    console.log('Folder sync process completed successfully!')
  } catch (error) {
    console.error(`Folder sync process failed: ${error.message}`)
    process.exit(1)
  }
}

// Run main function
main()
