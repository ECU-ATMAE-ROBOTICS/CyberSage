const Config = require("./ENV/systemVariables.json");
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION", "USER", "GUILD_MEMBER"],
});

// Load constants
const constants = require("./src/util/constants");

// Load event handlers
const messageReactionAddHandler = require("./src/eventHandlers/messageReactionAdd");
const messageReactionRemoveHandler = require("./src/eventHandlers/messageReactionRemove");

client.on("ready", async () => {
    //TODO Cache all chat history in last 30 days, for each channel

    console.log(`Logged in as ${client.user.tag}`);

    const guild = client.guilds.cache.get(constants.ID.serverID);
    if (!guild) throw new Error("Guild not found.");

    const channel = guild.channels.cache.get(
        constants.ID.roleSelectionChannelID
    );
    if (!channel) throw new Error("Channel not found.");

    try {
        await guild.members.fetch(); // Fetch all guild members

        guild.members.cache.forEach((member) => {
            const memberRoles = member.roles.cache.map((role) => role.name);
            console.log(
                `Member ${member.user.tag} has roles: ${memberRoles.join(", ")}`
            );
        });
        console.log("All members and their roles have been cached.");
    } catch (error) {
        console.error("Error caching members and roles:", error);
    }

    const message = await channel.messages.fetch(constants.ID.setRoleMessageID);

    const reactedEmojis = message.reactions.cache.map(
        (reaction) => reaction.emoji.name
    );

    const reactionEmoji = constants.reactionEmoji;

    if (!reactedEmojis.includes(reactionEmoji.bulbEmoji)) {
        await message.react(reactionEmoji.bulbEmoji);
    }

    if (!reactedEmojis.includes(reactionEmoji.computerEmoji)) {
        await message.react(reactionEmoji.computerEmoji);
    }

    if (!reactedEmojis.includes(reactionEmoji.toolsEmoji)) {
        await message.react(reactionEmoji.toolsEmoji);
    }

    console.log("Bot checked and added reactions if missing.");
});

// Register event handlers
client.on("messageReactionAdd", (reaction, user) => {
    messageReactionAddHandler(client, reaction, user);
});

client.on("messageReactionRemove", (reaction, user) => {
    messageReactionRemoveHandler(client, reaction, user);
});

client.login(Config.token);
