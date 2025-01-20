import { REST, Routes } from 'discord.js';
// import { pingCommand } from './commands/ping';
import * as dotenv from 'dotenv';

dotenv.config();

// const commands = [pingCommand.data.toJSON()];
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.APP_ID), {
      body: [],
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
