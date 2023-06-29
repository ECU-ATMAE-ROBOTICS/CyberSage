// Load constants
const constants = require(`../util/constants`);
const roleSelectionHelpers = require(`../util//roleSelectionLogic`);
const Logger = require("../logger/logger");

const ID = constants.ID;
const reactionEmoji = constants.reactionEmojis;
const logLevels = constants.logLevels;
const roles = constants.roles;

/**
 * Removes a role associated with the reaction that was removed.
 * @param {*} client The bot itself.
 * @param {*} reaction The reaction that was caught in the remove reaction event.
 * @param {*} user The user who removed a reaction.
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
                roleSelectionHelpers.removeRole(
                    guild,
                    member,
                    roles.electrical
                );
                break;

            // Handle :computer: reaction
            case reactionEmoji.computerEmoji:
                roleSelectionHelpers.removeRole(guild, member, roles.code);
                break;

            // Handle :tools: reaction
            case reactionEmoji.toolsEmoji:
                roleSelectionHelpers.removeRole(
                    guild,
                    member,
                    roles.fabrication
                );
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
