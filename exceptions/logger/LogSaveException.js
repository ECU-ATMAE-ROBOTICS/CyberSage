/**
 * Exception is thrown when there is an error saving logs to a file.
 * @class LogSaveException
 * @extends {Error}
 */
class LogSaveException extends Error {
  constructor (message = '', err) {
    super(message)
    this.name = 'LogSaveException'
    this.parentError = err
  }
}

module.exports = LogSaveException
