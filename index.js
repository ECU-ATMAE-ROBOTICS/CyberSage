const Config = require("./ENV/systemVariables.json");
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildPresences,
    ],
    partials: [
        "MESSAGE",
        "CHANNEL",
        "REACTION",
        "USER",
        "GUILD_MEMBER",
        "GUILD_PRESENCES",
    ],
});

// Load imports
const Logger = require("./src/logger/logger");

// Load constants
const constants = require("./src/util/constants");

const ID = constants.ID;
const logLevels = constants.logLevels;
const reactionEmoji = constants.reactionEmojis;

// Load event handlers
const messageReactionAddHandler = require("./src/eventHandlers/messageReactionAdd");
const messageReactionRemoveHandler = require("./src/eventHandlers/messageReactionRemove");

client.on("ready", async () => {
    console.clear();
    //TODO Cache all chat history in last 30 days, for each channel
    Logger.startTimer();

    Logger.log(`Logged in as ${client.user.tag}`, logLevels.INFO);

    //TODO Manage error throwing to go through logger
    const guild = client.guilds.cache.get(ID.serverID);
    if (!guild) throw new Error("Guild not found.");

    const channel = guild.channels.cache.get(ID.roleSelectionChannelID);
    if (!channel) throw new Error("Channel not found.");

    const message = await channel.messages.fetch(ID.setRoleMessageID);

    const reactedEmojis = message.reactions.cache.map(
        (reaction) => reaction.emoji.name
    );

    //TODO Log these actions, and "Done" after they have been checked.
    if (!reactedEmojis.includes(reactionEmoji.bulbEmoji)) {
        await message.react(reactionEmoji.bulbEmoji);
    }

    if (!reactedEmojis.includes(reactionEmoji.computerEmoji)) {
        await message.react(reactionEmoji.computerEmoji);
    }

    if (!reactedEmojis.includes(reactionEmoji.toolsEmoji)) {
        await message.react(reactionEmoji.toolsEmoji);
    }

    Logger.log(
        `Checked set-role message (${ID.setRoleMessageID}) for base reactions.`,
        logLevels.INFO
    );
});

// Register event handlers
client.on("messageReactionAdd", (reaction, user) => {
    messageReactionAddHandler(client, reaction, user);
});

client.on("messageReactionRemove", (reaction, user) => {
    messageReactionRemoveHandler(client, reaction, user);
});

client.login(Config.token);
