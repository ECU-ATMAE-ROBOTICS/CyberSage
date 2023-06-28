const Config = require("./ENV/config.json");
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
    //TODO Cache all members
    //TODO Cache all chat history in last 30 days, for each channel

    console.log(`Logged in as ${client.user.tag}`);

    client.channels.cache
        .get(constants.ID.roleSelectionChannelID)
        .messages.fetch(constants.ID.setRoleMessageID)
        .then(() => {
            console.log(`The role-setting message has been cached`);
        });

    try {
        const guild = client.guilds.cache.get(constants.ID.serverID);
        if (!guild) throw new Error("Guild not found.");

        const channel = guild.channels.cache.get(
            constants.ID.roleSelectionChannelID
        );
        if (!channel) throw new Error("Channel not found.");

        const message = await channel.messages.fetch(
            constants.ID.setRoleMessageID
        );
        if (!message) throw new Error("Message not found.");
        const reactedEmojis = message.reactions.cache.map(
            (reaction) => reaction.emoji.name
        );

        if (!reactedEmojis.includes(constants.reactionEmoji.bulbEmoji)) {
            await message.react(constants.reactionEmoji.bulbEmoji);
        }

        if (!reactedEmojis.includes(constants.reactionEmoji.computerEmoji)) {
            await message.react(constants.reactionEmoji.computerEmoji);
        }

        if (!reactedEmojis.includes(constants.reactionEmoji.toolsEmoji)) {
            await message.react(constants.reactionEmoji.toolsEmoji);
        }

        console.log("Bot checked and added reactions if missing.");
    } catch (error) {
        console.error("Error checking and adding reactions:", error);
    }
});

// Register event handlers
client.on("messageReactionAdd", (reaction, user) => {
    messageReactionAddHandler(client, reaction, user);
});

client.on("messageReactionRemove", (reaction, user) => {
    messageReactionRemoveHandler(client, reaction, user);
});

client.login(Config.token);
