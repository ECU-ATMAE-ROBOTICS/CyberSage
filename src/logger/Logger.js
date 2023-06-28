const fs = require("fs");
const constants = require("../util/constants");
const LogSaveException = require("../exceptions/logSaveException");

const logLevels = constants.logLevels;

class Logger {
    static logs = [];

    /**
     * Timestamps the message and stamps the loglevel, appending to the logs array.
     * @param {*} message Message being printed to the log
     * @param {*} logLevel Log level being appended to the message. Useful for grepping.
     */
    static log(message, logLevel = logLevels.INFO) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${logLevel}] ${timestamp}: ${message}`;
        this.logs.push(logEntry);
        console.log(logEntry);
    }

    /**
     * Saves the current array of logs to a file. Prints to the console if unable to append to
     * the log.
     * @param {*} filePath Path to the log file.
     */
    static saveToFile(filePath) {
        try {
            const logData = this.logs.join("\n");
            Logger.log(`Logs saved to file: ${filePath}`, logLevels.INFO);
            fs.appendFileSync(filePath, logData);
        } catch (error) {
            console.error("Error saving logs to file, printing to console: \n");
            console.error(logData);
            throw new LogSaveException(
                `Failed to save logs to ${filePath}`,
                error
            );
        }
    }
}

module.exports = Logger;