const fs = require("fs");
const { logLevels, loggerConfig } = require("../../src/constants/loggerConsts");

/**
 * A class for handling file-based logging, storing log messages in a file.
 * @class FileTransport
 */
class FileTransport {
    /**
     * Initialize a new instance of the FileTransport class.
     * Constructor sets up the logs array, log date, and the file name.
     * @constructor
     */
    constructor() {
        this.logs = [];
        this.logDate = new Date().toISOString().split("T")[0];
        this.fileName = `${loggerConfig.filePath}/${this.logDate}.txt`;
    }

    /**
     * Log a message with an optional log level.
     * @param {string} message - The message to be logged.
     * @param {string} logLevel - The log level being appended to the message. Default is INFO.
     */
    log(message, logLevel = logLevels.INFO) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${logLevel}] ${timestamp}: ${message}`;
        this.logs.push(logEntry);
    }

    /**
     * Save the logs to a file. If an error occurs, it logs an error message to the console.
     */
    saveToFile() {
        try {
            if (this.logs.length > 0) {
                if (!fs.existsSync(this.fileName)) {
                    fs.writeFileSync(this.fileName, "");
                }
                const logData = `${this.logs.join("\n")}\n`;
                fs.appendFileSync(this.fileName, logData);
                this.logs.length = 0;
            }
        } catch (error) {
            console.error(
                `FileTransport: Failed to save logs to ${this.fileName}`,
                error
            );
        }
    }

    /**
     * Get a list of log file names in the logs directory.
     * @returns {string[]} An array of log file names.
     */
    getLogFilesInDirectory() {
        const logDir = loggerConfig.filePath;
        return fs.readdirSync(logDir).filter((file) => file.endsWith(".txt"));
    }
}

module.exports = FileTransport;
