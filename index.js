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
    //TODO Cache all chat history in last 30 days, for each channel
    Logger.startTimer();

    Logger.log(`Logged in as ${client.user.tag}`, logLevels.INFO);

    //TODO Manage error throwing to go through logger
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
            Logger.log(
                `Member ${member.user.tag} has roles: ${memberRoles.join(
                    ", "
                )}`,
                logLevels.INFO
            );
        });
        Logger.log(
            "All members and their roles have been cached.",
            logLevels.INFO
        );
    } catch (error) {
        Logger.log(
            `Error caching members and roles: ${error}`,
            logLevels.WARNING
        );
    }

    const message = await channel.messages.fetch(constants.ID.setRoleMessageID);

    const reactedEmojis = message.reactions.cache.map(
        (reaction) => reaction.emoji.name
    );

    if (!reactedEmojis.includes(reactionEmoji.bulbEmoji)) {
        await message.react(reactionEmoji.bulbEmoji);
    }

    if (!reactedEmojis.includes(reactionEmoji.computerEmoji)) {
        await message.react(reactionEmoji.computerEmoji);
    }

    if (!reactedEmojis.includes(reactionEmoji.toolsEmoji)) {
        await message.react(reactionEmoji.toolsEmoji);
    }

    Logger.log("Bot checked and added reactions if missing.", logLevels.INFO);
});

// Register event handlers
client.on("messageReactionAdd", (reaction, user) => {
    messageReactionAddHandler(client, reaction, user);
});

client.on("messageReactionRemove", (reaction, user) => {
    messageReactionRemoveHandler(client, reaction, user);
});

client.login(Config.token);
