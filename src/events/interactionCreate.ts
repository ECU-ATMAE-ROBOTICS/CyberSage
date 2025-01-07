import { ChatInputCommandInteraction, Interaction } from 'discord.js';
import { pingCommand } from '../commands/ping';

const commands = new Map();
commands.set(pingCommand.data.name, pingCommand);

export default async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction as ChatInputCommandInteraction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error executing this command.',
      ephemeral: true,
    });
  }
};
