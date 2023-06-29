// Load constants
const constants = require(`../util/constants`);
const roleSelectionHelpers = require(`../util/roleSelectionLogic`);
const Logger = require("../logger/logger");

const ID = constants.ID;
const reactionEmoji = constants.reactionEmojis;
const logLevels = constants.logLevels;
const roles = constants.roles;

/**
 * Adds a role associated with the reaction that was added.
 * @param {*} client The bot itself.
 * @param {*} reaction The reaction that was added.
 * @param {*} user The user who added the reaction.
 * @returns
 */
module.exports = async (client, reaction, user) => {
    if (user.id === client.user.id) {
        return;
    }

    if (reaction.message.id === ID.setRoleMessageID) {
        const guild = reaction.message.guild;
        const member = guild.members.cache.get(user.id);
        switch (reaction.emoji.name) {
            // Handle :bulb: reaction
            case reactionEmoji.bulbEmoji:
                roleSelectionHelpers.addRole(guild, member, roles.electrical);
                break;

            // Handle :computer: reaction
            case reactionEmoji.computerEmoji:
                roleSelectionHelpers.addRole(guild, member, roles.code);
                break;

            // Handle :tools: reaction
            case reactionEmoji.toolsEmoji:
                roleSelectionHelpers.addRole(guild, member, roles.fabrication);
                break;

            default:
                Logger.log(
                    `User ${user.tag} reacted with an unrecognized emoji: ${reaction.emoji.name}`,
                    logLevels.INFO
                );
                break;
        }
    }
};
