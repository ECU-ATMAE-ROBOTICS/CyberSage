// Load constants
const constants = require(`../util/constants`);
const roleSelectionHelpers = require(`../util//roleSelectionLogic`);

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

    if (reaction.message.id === constants.ID.setRoleMessageID) {
        const guild = reaction.message.guild;
        const member = guild.members.cache.get(user.id);
        switch (reaction.emoji.name) {
            case constants.reactionEmoji.bulbEmoji:
                // Handle :bulb: reaction
                roleSelectionHelpers.removeRole(guild, member, `Electrical`);
                break;

            case constants.reactionEmoji.computerEmoji:
                // Handle :computer: reaction
                roleSelectionHelpers.removeRole(guild, member, `Code`);
                break;

            case constants.reactionEmoji.toolsEmoji:
                // Handle :tools: reaction
                roleSelectionHelpers.removeRole(guild, member, `Fabrication`);
                break;

            default:
                // Handle other reactions
                console.log(
                    `User ${user.tag} reacted with an unrecognized emoji: ${reaction.emoji.name}`
                );
                break;
        }
    }
};
