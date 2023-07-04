/**
 * Exception is thrown when the channel id provided is not valid
 * @class ChannelNotFoundException
 * @extends {Error}
 */
class ChannelNotFoundException extends Error {
    constructor(message = "", err) {
        super(message);
        this.name = "ChannelNotFoundException";
        this.parentError = err;
    }
}

module.exports = ChannelNotFoundException;
