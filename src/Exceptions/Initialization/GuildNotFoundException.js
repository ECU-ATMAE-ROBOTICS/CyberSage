/**
 * Exception is thrown when the guild id provided is not valid
 * @class GuildNotFoundException
 * @extends {Error}
 */
class GuildNotFoundException extends Error {
    constructor(message = "", err) {
        super(message);
        this.name = "GuildNotFoundException";
        this.parentError = err;
    }
}

module.exports = GuildNotFoundException;
