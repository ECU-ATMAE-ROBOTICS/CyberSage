import { Client, GatewayIntentBits, Partials } from 'discord.js';
import * as dotenv from 'dotenv';

import messageReactionAdd from './events/messageReactionAdd';
import messageReactionRemove from './events/messageReactionRemove';
import interactionCreateHandler from './events/interactionCreate';

import { loadConfig } from './services/configManager';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Reaction],
});

async function main() {
  const config = await loadConfig();
  console.log('Loaded Config:', config);

  client.on('messageReactionAdd', messageReactionAdd);
  client.on('messageReactionRemove', messageReactionRemove);
  client.on('interactionCreate', interactionCreateHandler);

  client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
  });

  await client.login(process.env.TOKEN);
}

main().catch((error) => {
  console.error('An error occurred:', error);
});
