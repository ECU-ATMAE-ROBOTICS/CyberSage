import { MessageReaction, User } from 'discord.js';
import { removeRole } from '../services/roleManager';

export default async (reaction: MessageReaction, user: User) => {
  if (user.bot) return;
  const { message, emoji } = reaction;

  if (message.id === '') {
    await removeRole(message.guild, user.id, emoji.name || '');
  }
};
