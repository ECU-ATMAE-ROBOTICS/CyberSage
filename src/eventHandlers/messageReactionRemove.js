// Internal
const Logger = require("../logger/logger");
const roleSelectionHelpers = require(`../util//roleSelectionLogic`);

// Constants
const { ID, reactionEmojis, logLevels, roles } = require(`../util/constants`);

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
            case reactionEmojis.bulbEmoji:
                roleSelectionHelpers.removeRole(
                    guild,
                    member,
                    roles.electrical
                );
                break;

            // Handle :computer: reaction
            case reactionEmojis.computerEmoji:
                roleSelectionHelpers.removeRole(guild, member, roles.code);
                break;

            // Handle :tools: reaction
            case reactionEmojis.toolsEmoji:
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
