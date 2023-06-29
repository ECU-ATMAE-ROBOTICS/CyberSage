// Thirdparty
const Config = require("./ENV/systemVariables.json");
const { Client, GatewayIntentBits } = require("discord.js");

// Internal
const Logger = require("./src/logger/logger");
const { emojiExistOnMessage } = require("./src/util/emojiCheck");

// Constants
const { ID, logLevels, reactionEmojis } = require("./src/util/constants");

// Event Handlers
const {
    messageReactionAddHandler,
} = require("./src/eventHandlers/messageReactionAdd");
const {
    messageReactionRemoveHandler,
} = require("./src/eventHandlers/messageReactionRemove");

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

client.on("ready", async () => {
    console.clear();

    Logger.startTimer();
    Logger.log(`Logged in as ${client.user.tag}`, logLevels.INFO);

    //TODO Manage error throwing to go through logger
    const guild = client.guilds.cache.get(ID.serverID);
    if (!guild) throw new Error("Guild not found.");
    const channel = guild.channels.cache.get(ID.roleSelectionChannelID);
    if (!channel) throw new Error("Channel not found.");

    //TODO In the event the message doesn't exist, the bot should make it.
    const message = await channel.messages.fetch(ID.setRoleMessageID);

    //TODO Create Emoji wrapper class? Maybe a type of enum?
    for (const emoji of Object.values(reactionEmojis)) {
        Logger.log(`Checking for ${emoji} emoji on message: ${message.id}.`);
        if (!emojiExistOnMessage(message, emoji, (selfCheck = true))) {
            await message.react(emoji).catch((error) => {
                Logger.log(
                    `Error when trying to put ${emoji} on message: ${message.id} => ${error}.`,
                    logLevels.WARNING
                );
            });
            Logger.log(`Successfully put ${emoji} on message: ${message.id}.`);
        } else {
            Logger.log(`${emoji} already exists on message: ${message.id}.`);
        }
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
