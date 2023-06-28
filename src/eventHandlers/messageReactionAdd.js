// Load constants
const constants = require(`../util/constants`);
const roleSelectionHelpers = require(`../util//roleSelectionLogic`);

module.exports = async (client, reaction, user) => {
    // Check if the user is the bot
    if (user.id === client.user.id) {
        // The reaction was added by the bot itself
        return;
    }
    // Check if the reaction was added to a specific message
    if (reaction.message.id === constants.ID.setRoleMessageID) {
        const guild = reaction.message.guild;
        const member = guild.members.cache.get(user.id);
        switch (reaction.emoji.name) {
            case constants.reactionEmoji.bulbEmoji:
                // Handle :bulb: reaction
                if (
                    roleSelectionHelpers.removeRole(guild, member, `Electrical`)
                ) {
                    console.log(
                        `${user.tag} has had the Eletrical role added.`
                    );
                }
                break;

            case constants.reactionEmoji.computerEmoji:
                // Handle :computer: reaction
                if (roleSelectionHelpers.removeRole(guild, member, `Code`)) {
                    console.log(`${user.tag} has had the Code role added.`);
                }
                break;
            case constants.reactionEmoji.toolsEmoji:
                // Handle :tools: reaction
                if (
                    roleSelectionHelpers.removeRole(
                        guild,
                        member,
                        `Fabrication`
                    )
                ) {
                    console.log(
                        `${user.tag} has had the Fabrication role added.`
                    );
                }
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
