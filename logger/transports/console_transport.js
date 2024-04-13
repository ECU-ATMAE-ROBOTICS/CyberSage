const { logLevels } = require('../../src/constants/loggerConsts')

/**
 * A class for handling console-based logging, logging messages to the console.
 * @class ConsoleTransport
 */
class ConsoleTransport {
  /**
     * Log a message with an optional log level to the console.
     * @param {string} message - The message to be logged to the console.
     * @param {string} logLevel - The log level being appended to the message. Default is INFO.
     */
  log (message, logLevel = logLevels.INFO) {
    const timestamp = new Date().toISOString()
    const logEntry = `[${logLevel}] ${timestamp}: ${message}`
    console.log(logEntry)
  }
}

module.exports = ConsoleTransport
