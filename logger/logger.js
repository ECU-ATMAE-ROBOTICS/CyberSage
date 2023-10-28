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
                error
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
                        logLevels.ERROR
                    );
                } else {
                    this.consoleTransport.log(
                        `Logger::startLogWriterTimer() Exception occurred that isn't LogSaveException, possible exception leak => ${error}`,
                        logLevels.ERROR
                    );
                }
            }
        }, loggerConfig.timerWriterInterval);
    }

    /**
     * Start the timer to periodically combine log files by month/year.
     */
    //! Some kind of issue with a path not being found
    startLogCombinerTimer() {
        clearInterval(this.logCombinerTimer);
        this.logCombinerTimer = setInterval(() => {
            try {
                this.combineLogsByMonthAndYear();
            } catch (error) {
                this.consoleTransport.log(
                    `Logger::startLogCombinerTimer() Exception occurred => ${error}`,
                    logLevels.ERROR
                );
            }
        }, loggerConfig.timerCombinerInterval);
    }

    /**
     * Combine log files in the same month and year into a single file.
     */
    combineLogsByMonthAndYear() {
        const logFiles = this.fileTransport.getLogFilesInDirectory();
        const groupedLogs = {};

        logFiles.forEach((logFile) => {
            const logFilePath = path.join(loggerConfig.filePath, logFile);
            const stats = fs.statSync(logFilePath);
            const fileDate = new Date(stats.mtime);

            // Extract month and year (e.g., "2023-10")
            const monthYear = `${fileDate.getFullYear()}-${(
                fileDate.getMonth() + 1
            )
                .toString()
                .padStart(2, "0")}`;

            if (!groupedLogs[monthYear]) {
                groupedLogs[monthYear] = [];
            }

            // Read and append log content to the groupedLogs
            const logContent = fs.readFileSync(logFilePath, "utf8");
            groupedLogs[monthYear].push(logContent);
        });

        // Combine and save logs for each month and year
        for (const [monthYear, logs] of Object.entries(groupedLogs)) {
            const combinedLogs = logs.join("\n\n");
            const combinedFileName = path.join(
                loggerConfig.filePath,
                `${monthYear}.txt`
            );
            fs.writeFileSync(combinedFileName, combinedLogs);
        }

        // Delete individual log files after combining
        logFiles.forEach((logFile) => {
            const logFilePath = path.join(loggerConfig.filePath, logFile);
            fs.unlinkSync(logFilePath);
        });
    }
}

module.exports = new Logger();
