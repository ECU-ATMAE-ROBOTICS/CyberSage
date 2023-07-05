//* Imports
// <------------------------------->
// Thirdparty
const Config = require("./ENV/secrets.json");
const { Client, GatewayIntentBits } = require("discord.js");

// Internal
const {
    startLogger,
    checkIds,
    reactionInitialization,
} = require("./src/processes/initialization/initialization");

// Event Handlers
const {
    emojiAddRole,
} = require("./src/events/reaction/reaction_add/messageReactionAdd.js");
const {
    emojiRemoveRole,
} = require("./src/events/reaction/reaction_remove/messageReactionRemove");

//* Client Setup
// <------------------------------->
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

//* Initialization
// <------------------------------->
client.on("ready", async () => {
    startLogger(client);

    let guild,
        channel = await checkIds(client);

    reactionInitialization(channel);
});

//* Event Handlers
// <------------------------------->
//? These event handlers are entry points. We should include logic to seperate which handler to use for which events.
//? This could get sticky. We should consider a modular and clean way to handle this if more processes are added.
// Register event handlers
client.on("messageReactionAdd", (reaction, user) => {
    emojiAddRole(client, reaction, user);
});

client.on("messageReactionRemove", (reaction, user) => {
    emojiRemoveRole(client, reaction, user);
});

//* Bot Start
// <------------------------------->
client.login(Config.token);
