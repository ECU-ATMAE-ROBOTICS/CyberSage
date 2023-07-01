// Internal
const Logger = require("../Logger/logger");
const roleSelectionHelpers = require(`../../Processes/RoleManipulater/roleManipMain`);

// Constants
const {
    ID,
    reactionEmojis,
    logLevels,
    roles,
} = require(`../../Definitions/constants`);

module.exports = {
    /**
     * Adds a role associated with the reaction that was added.
     * @param {*} client The bot itself.
     * @param {*} reaction The reaction that was added.
     * @param {*} user The user who added the reaction.
     * @returns
     */
    emojiAddRole: async (client, reaction, user) => {
        if (user.id === client.user.id) {
            return;
        }

        if (reaction.message.id === ID.setRoleMessageID) {
            const guild = reaction.message.guild;
            const member = guild.members.cache.get(user.id);
            switch (reaction.emoji.name) {
                // Handle :bulb: reaction
                case reactionEmojis.bulbEmoji:
                    roleSelectionHelpers.addRole(
                        guild,
                        member,
                        roles.electrical
                    );
                    break;

                // Handle :computer: reaction
                case reactionEmojis.computerEmoji:
                    roleSelectionHelpers.addRole(guild, member, roles.code);
                    break;

                // Handle :tools: reaction
                case reactionEmojis.toolsEmoji:
                    roleSelectionHelpers.addRole(
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
    },
};
