const fs = require("fs");
const constants = require("../util/constants");
const LogSaveException = require("../exceptions/logSaveException");

const logLevels = constants.logLevels;
const logger = constants.logger;

class Logger {
    static logs = [];
    static logTimer;
    static logDate = new Date().toISOString().split("T")[0];
    static fileName = `${logger.filePath}/${this.logDate}.txt`;

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
    static saveToFile() {
        try {
            // length is 1 + the highest index
            if (this.logs.length > 1) {
                // File existence check / creation
                if (fs.existsSync(this.fileName) == false) {
                    try {
                        let content = "";
                        fs.writeFileSync(this.fileName, content);
                    } catch (error) {
                        throw error;
                    }
                }
                const logData = this.logs.join("\n");
                fs.appendFileSync(this.fileName, logData);
                this.logs.length = 0;
                Logger.log(
                    `Logger::saveToFile() Logs saved to file: ${this.fileName}`,
                    logLevels.INFO
                );
            }
            this.startTimer();
        } catch (error) {
            this.startTimer();
            throw new LogSaveException(
                `Logger::saveToFile() Failed to save logs to ${this.fileName} `,
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
                Logger.saveToFile();
                let currentDate = new Date().toISOString().split("T")[0];
                if (currentDate != this.logDate) {
                    this.logDate = currentDate;
                    this.fileName = `logger.filePath/${this.logDate}.txt`;
                }
            } catch (error) {
                // Empty the logs, and restart the timer
                this.startTimer();
                if (error instanceof LogSaveException) {
                    this.log(
                        `Logger::startTimer() Exception during saving the logs => ${error} => ${error.parentError}`,
                        logLevels.WARNING
                    );
                } else {
                    this.log(
                        `Logger::startTimer() Exception occured that isn't LogSaveException, possible exception leak => ${error}`,
                        logLevels.WARNING
                    );
                }
            }
        }, logger.timerInterval);
    }

    static;
}

module.exports = Logger;
