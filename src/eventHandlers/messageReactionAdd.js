module.exports = (client, reaction, user) => {
    //TODO Remove nested client.on from index.js
    client.on("messageReactionAdd", async (reaction, user) => {
        // Check if the user is the bot
        if (user.id === client.user.id) {
            // The reaction was added by the bot itself
            return;
        }
        // Check if the reaction was added to a specific message
        if (reaction.message.id === ROLE_SET_MESSAGE_ID) {
            const guild = reaction.message.guild;
            const member = guild.members.cache.get(user.id);
            switch (reaction.emoji.name) {
                case bulbEmoji:
                    // Handle :bulb: reaction
                    console.log(`User ${user.tag} reacted with :bulb:`);
                    try {
                        const eRole = guild.roles.cache.find(
                            (eRole) => eRole.name === "Electrical"
                        );
                        if (!member.roles.cache.has(eRole.id)) {
                            await member.roles.add(eRole);
                            console.log(
                                `User ${user.tag} has been given the "Eletrical" role.`
                            );
                        }
                    } catch (error) {
                        console.error("Error assigning role:", error);
                    }
                    break;

                case computerEmoji:
                    // Handle :computer: reaction
                    console.log(`User ${user.tag} reacted with :computer:`);
                    try {
                        const cRole = guild.roles.cache.find(
                            (cRole) => cRole.name === "Code"
                        );
                        if (!member.roles.cache.has(cRole.id)) {
                            await member.roles.add(cRole);
                            console.log(
                                `User ${user.tag} has been given the "Code" role.`
                            );
                        }
                    } catch (error) {
                        console.error("Error assigning role:", error);
                    }
                    break;

                case toolsEmoji:
                    // Handle :tools: reaction
                    console.log(`User ${user.tag} reacted with :tools:`);
                    try {
                        const fRole = guild.roles.cache.find(
                            (fRole) => fRole.name === "Fabrication"
                        );
                        if (!member.roles.cache.has(fRole.id)) {
                            await member.roles.add(fRole);
                            console.log(
                                `User ${user.tag} has been given the "Fabrication" role.`
                            );
                        }
                    } catch (error) {
                        console.error("Error assigning role:", error);
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
    });
};
