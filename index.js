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

// Constants
const ROLE_SET_MESSAGE_ID = "1123120003047247952";
const ROLE_SET_CHANNEL_ID = "1123119173757849731";
const SERVER_ID = "1106740376515125309";
const bulbEmoji = "💡";
const computerEmoji = "💻";
const toolsEmoji = "🛠️";

// Load event handlers
const messageReactionAddHandler = require("./eventHandlers/messageReactionAdd");
const messageReactionRemoveHandler = require("./eventHandlers/messageReactionRemove");

client.on("ready", async () => {
    //TODO Cache all members
    //TODO Cache all chat history in last 30 days, for each channel

    console.log(`Logged in as ${client.user.tag}`);

    client.channels.cache
        .get(ROLE_SET_CHANNEL_ID)
        .messages.fetch(ROLE_SET_MESSAGE_ID)
        .then(() => {
            console.log(`The role-setting message has been cached`);
        });

    try {
        const guild = client.guilds.cache.get(SERVER_ID);
        if (!guild) throw new Error("Guild not found.");

        const channel = guild.channels.cache.get(ROLE_SET_CHANNEL_ID);
        if (!channel) throw new Error("Channel not found.");

        const message = await channel.messages.fetch(ROLE_SET_MESSAGE_ID);
        if (!message) throw new Error("Message not found.");
        const reactedEmojis = message.reactions.cache.map(
            (reaction) => reaction.emoji.name
        );

        if (!reactedEmojis.includes(bulbEmoji)) {
            await message.react(bulbEmoji);
        }

        if (!reactedEmojis.includes(computerEmoji)) {
            await message.react(computerEmoji);
        }

        if (!reactedEmojis.includes(toolsEmoji)) {
            await message.react(toolsEmoji);
        }

        console.log("Bot checked and added reactions if missing.");
    } catch (error) {
        console.error("Error checking and adding reactions:", error);
    }
});

//TODO Need to consider how the handlers will recieve
//TODO the constants defined at the top
// Register event handlers
client.on("messageReactionAdd", (reaction, user) => {
    messageReactionAddHandler(client, reaction, user);
});

client.on("messageReactionRemove", (reaction, user) => {
    messageReactionRemoveHandler(client, reaction, user);
});

client.login(Config.token);
