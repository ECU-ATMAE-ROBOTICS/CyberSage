// Constants
const { ID } = require("../../Definitions/constants");

module.exports = {
    /**
     * Checks if an exists on a specific message.
     * @param {*} message Message ID
     * @param {string} emoji Emoji (Unicode)
     * @param {boolean} selfCheck Check if the emoji is placed by the bot on the message
     * @returns Boolean
     */
    emojiExistOnMessage: (message, emoji, selfCheck = false) => {
        const botUserId = ID.cyberSageID;
        const foundReaction = message.reactions.cache.find(
            (reaction) => reaction.emoji.name === emoji
        );

        if (selfCheck) {
            if (foundReaction && foundReaction.users.cache.has(botUserId)) {
                return true;
            } else {
                return false;
            }
        } else {
            if (foundReaction) {
                return true;
            } else {
                return false;
            }
        }
    },
};
