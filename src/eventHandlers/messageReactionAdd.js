// Load constants
const constants = require(`../util/constants`);
const roleSelectionHelpers = require(`../util//roleSelectionLogic`);

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

    if (reaction.message.id === constants.ID.setRoleMessageID) {
        const guild = reaction.message.guild;
        const member = guild.members.cache.get(user.id);
        switch (reaction.emoji.name) {
            case constants.reactionEmoji.bulbEmoji:
                // Handle :bulb: reaction
                roleSelectionHelpers.addRole(guild, member, `Electrical`);
                break;

            case constants.reactionEmoji.computerEmoji:
                // Handle :computer: reaction
                roleSelectionHelpers.addRole(guild, member, `Code`);
                break;

            case constants.reactionEmoji.toolsEmoji:
                // Handle :tools: reaction
                roleSelectionHelpers.addRole(guild, member, `Fabrication`);
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
