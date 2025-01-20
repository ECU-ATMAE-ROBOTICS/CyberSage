import { MessageReaction, User } from 'discord.js';
import { removeRole } from '../services/roleManager';
import { Config } from '../services/configManager';

export default (config: Config) => {
  return async (reaction: MessageReaction, user: User) => {
    if (user.bot) return;

    const { message, emoji } = reaction;

    if (message.id !== config.messageId) return;

    const roleId = config.roleMap[emoji.name || ''];

    if (roleId && message.guild) {
      try {
        await removeRole(message.guild, user.id, roleId);
      } catch (error) {
        console.error(
          `Failed to remove role ${roleId} to user ${user.id}:`,
          error,
        );
      }
    } else {
      console.log(`No role mapped for emoji: ${emoji.name}`);
    }
  };
};
