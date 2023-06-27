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

const ROLE_SET_MESSAGE_ID = "1123120003047247952";
const ROLE_SET_CHANNEL_ID = "1123119173757849731";
const SERVER_ID = "1106740376515125309";

const bulbEmoji = "💡";
const computerEmoji = "💻";
const toolsEmoji = "🛠️";

client.on("ready", async () => {
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
            console.log(`User ${user.tag} has been given the "Code" role.`);
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
        console.log(`User ${user.tag} removed the :bulb: reaction.`);
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
        console.log(`User ${user.tag} removed the :computer: reaction.`);
        try {
          const cRole = guild.roles.cache.find((role) => role.name === "Code");
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
        console.log(`User ${user.tag} removed the :tools: reaction.`);
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

client.login(Config.token);
