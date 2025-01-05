import { MessageReaction, User } from 'discord.js';
import { addRole } from '../services/roleManager';

export default async (reaction: MessageReaction, user: User) => {
  if (user.bot) return;
  const { message, emoji } = reaction;

  if (message.id === '') {
    await addRole(message.guild, user.id, emoji.name || '');
  }
};
