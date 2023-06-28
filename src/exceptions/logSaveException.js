class LogSaveException extends Error {
    constructor(message, err) {
        super(message);
        this.name = "LogSaveException";
        this.parentError = err;
    }
}

module.exports = LogSaveException;
