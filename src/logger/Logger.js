const fs = require("fs");
const constants = require("../util/constants");
const LogSaveException = require("../exceptions/logSaveException");

const logLevels = constants.logLevels;
const logger = constants.logger;

class Logger {
    static logs = [];
    static logTimer;

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
            // length is 1 + the highest index
            if (this.logs.length <= 1) {
                const logData = this.logs.join("\n");
                Logger.log(`Logs saved to file: ${filePath}`, logLevels.INFO);
                fs.appendFileSync(filePath, logData);
            }
            self.startTimer();
        } catch (error) {
            self.startTimer();
            throw new LogSaveException(
                `Failed to save logs to ${filePath}`,
                error
            );
        }
    }

    /**
     * Sets logTimer. If saveToFile throws a LogSaveException, empties logs array and starts timer over.
     */
    static startTimer() {
        clearInterval(this.logTimer);
        this.logTimer = setInterval(() => {
            try {
                Logger.saveToFile(logger.filepath);
            } catch (error) {
                // Empty the logs, and restart the timer
                this.logs.length = 0;
                this.startTimer();
                if (error instanceof LogSaveException) {
                    this.log(
                        `Exception during saving the logs: ${error.parentError}`
                    );
                } else {
                    this.log(
                        `Exception occured that isn't LogSaveException, possible exception leak.`
                    );
                }
            }
        }, logger.timerInterval);
    }
}

module.exports = Logger;
