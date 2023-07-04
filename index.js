// Thirdparty
const Config = require("./ENV/secrets.json");
const { Client, GatewayIntentBits } = require("discord.js");

// Internal
const Logger = require("./src/Processes/Logger/loggerMain.js");
const {
    emojiExistOnMessage,
} = require("./src/Initializiation/util/emojiCheck");
const {
    guildIdCheck,
    channelIdCheck,
} = require("./src/Initializiation/util/idCheck");

// Exceptions
const {
    GuildNotFoundException,
} = require("./src/Exceptions/Initialization/GuildNotFoundException");
const {
    ChannelNotFoundException,
} = require("./src/Exceptions/Initialization/GuildNotFoundException");

// Constants
const { constantIds, roleConfigIds } = require("./src/Definitions/idConstants");

const { logLevels } = require("./src/Definitions/loggerConstants");

const { reactionEmojis } = require("./src/Definitions/serverConstants");

// Event Handlers
const {
    emojiAddRole,
} = require("./src/EventHandlers/Reaction/messageReactionAdd");
const {
    emojiRemoveRole,
} = require("./src/EventHandlers/Reaction/messageReactionRemove");

//TODO Reduce unnecessary intents and partials
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

//TODO Migrate Initialization to proper directories for modularity
client.on("ready", async () => {
    console.clear();

    Logger.startTimer();
    Logger.log(`Logged in as ${client.user.tag}`, logLevels.INFO);

    try {
        const guild = await guildIdCheck(client, constantIds.serverID);
        const channel = await channelIdCheck(
            guild,
            roleConfigIds.roleSelectionChannelID
        );
    } catch (err) {
        if (err instanceof GuildNotFoundException) {
            Logger.log(err.message, logLevels.FATAL);
        } else if (err instanceof ChannelNotFoundException) {
            Logger.log(err.message, logLevels.FATAL);
        } else {
            Logger.log(
                `client.on() Unknown error occured => ${err}`,
                logLevels.FATAL
            );
        }
        throw err;
    }

    //TODO In the event the message doesn't exist, the bot should make it.
    const message = await channel.messages.fetch(
        roleConfigIds.setRoleMessageID
    );

    //TODO Create Emoji wrapper class? Maybe a type of Enum?
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

//? These event handlers are entry points. We should include logic to seperate which handler to use for which events.
//? This could get sticky. We should consider a modular and clean way to handle this if more processes are added.
// Register event handlers
client.on("messageReactionAdd", (reaction, user) => {
    emojiAddRole(client, reaction, user);
});

client.on("messageReactionRemove", (reaction, user) => {
    emojiRemoveRole(client, reaction, user);
});

client.login(Config.token);
