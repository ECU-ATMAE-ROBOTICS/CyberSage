const LogSaveException = require("../exceptions/logger/LogSaveException");
const FileTransport = require("./transports/file_transport");
const ConsoleTransport = require("./transports/console_transport");

const { logLevels, loggerConfig } = require("../src/constants/loggerConsts");

/**
 * Class for logging messages, managing a timer to export logs to a file, and logging to the console.
 * @class Logger
 */
class Logger {
  /**
   * Initializes the Logger with a file and console transport.
   * @constructor
   */
  constructor() {
    this.fileTransport = new FileTransport();
    this.consoleTransport = new ConsoleTransport();
  }

  /**
   * Log a message with an optional log level.
   * @param {string} message - The message to be logged.
   * @param {string} logLevel - The log level being appended to the message. Default is INFO.
   */
  log(message, logLevel = logLevels.INFO) {
    this.fileTransport.log(message, logLevel);
    this.consoleTransport.log(message, logLevel);
  }

  /**
   * Save the logs to a file. If an error occurs, it throws a LogSaveException.
   */
  saveToFile() {
    try {
      this.fileTransport.saveToFile();
    } catch (error) {
      throw new LogSaveException(
        `Logger::saveToFile() Failed to save logs to ${this.fileTransport.fileName}`,
        error,
      );
    }
  }

  /**
   * Start the timer to periodically save logs to a file and handle exceptions.
   */
  startLogWriterTimer() {
    clearInterval(this.logWriterTimer);
    this.logWriterTimer = setInterval(() => {
      try {
        this.saveToFile();
        const currentDate = new Date().toISOString().split("T")[0];
        if (currentDate !== this.fileTransport.logDate) {
          this.fileTransport.logDate = currentDate;
          this.fileTransport.fileName = `${loggerConfig.filePath}/${this.fileTransport.logDate}.txt`;
        }
      } catch (error) {
        this.startLogWriterTimer();
        if (error instanceof LogSaveException) {
          this.consoleTransport.log(
            `Logger::startLogWriterTimer() Exception during saving the logs => ${error} => ${error.parentError}`,
            logLevels.ERROR,
          );
        } else {
          this.consoleTransport.log(
            `Logger::startLogWriterTimer() Exception occurred that isn't LogSaveException, possible exception leak => ${error}`,
            logLevels.ERROR,
          );
        }
      }
    }, loggerConfig.timerWriterInterval);
  }
}
module.exports = new Logger();
