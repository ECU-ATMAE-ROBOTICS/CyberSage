import { MessageReaction, User } from 'discord.js';
import { addRole } from '../services/roleManager';
import { Config } from '../services/configManager';

export default (config: Config) => {
  return async (reaction: MessageReaction, user: User) => {
    if (user.bot) return;

    const { message, emoji } = reaction;

    for (const config_message of config.messages) {
      if (message.id !== config_message.messageId) continue;

      const roleId = config_message.roleMap[emoji.name || ''];

      if (roleId && message.guild) {
        try {
          await addRole(message.guild, user.id, roleId);
        } catch (error) {
          console.error(
            `Failed to add role ${roleId} to user ${user.id}:`,
            error,
          );
        }
      } else {
        console.warn(
          `No role mapped for emoji: ${emoji.name}, on message: ${config_message.messageId}`,
        );
      }
      break;
    }
  };
};
