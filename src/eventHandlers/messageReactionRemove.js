module.exports = (client, reaction, user) => {
    //TODO Remove nested client.on from index.js
    client.on("messageReactionRemove", async (reaction, user) => {
        if (user.id === client.user.id) {
            // The reaction was removed by the bot itself
            return;
        }

        if (reaction.message.id === ROLE_SET_MESSAGE_ID) {
            const guild = reaction.message.guild;
            const member = guild.members.cache.get(user.id);

            switch (reaction.emoji.name) {
                case bulbEmoji:
                    console.log(
                        `User ${user.tag} removed the :bulb: reaction.`
                    );
                    try {
                        const eRole = guild.roles.cache.find(
                            (role) => role.name === "Electrical"
                        );
                        if (member.roles.cache.has(eRole.id)) {
                            await member.roles.remove(eRole);
                            console.log(
                                `User ${user.tag} has been removed from the "Electrical" role.`
                            );
                        }
                    } catch (error) {
                        console.error("Error removing role:", error);
                    }
                    break;

                case computerEmoji:
                    console.log(
                        `User ${user.tag} removed the :computer: reaction.`
                    );
                    try {
                        const cRole = guild.roles.cache.find(
                            (role) => role.name === "Code"
                        );
                        if (member.roles.cache.has(cRole.id)) {
                            await member.roles.remove(cRole);
                            console.log(
                                `User ${user.tag} has been removed from the "Code" role.`
                            );
                        }
                    } catch (error) {
                        console.error("Error removing role:", error);
                    }
                    break;

                case toolsEmoji:
                    console.log(
                        `User ${user.tag} removed the :tools: reaction.`
                    );
                    try {
                        const fRole = guild.roles.cache.find(
                            (role) => role.name === "Fabrication"
                        );
                        if (member.roles.cache.has(fRole.id)) {
                            await member.roles.remove(fRole);
                            console.log(
                                `User ${user.tag} has been removed from the "Fabrication" role.`
                            );
                        }
                    } catch (error) {
                        console.error("Error removing role:", error);
                    }
                    break;

                default:
                    console.log(
                        `User ${user.tag} removed an unrecognized emoji: ${reaction.emoji.name}`
                    );
                    break;
            }
        }
    });
};
