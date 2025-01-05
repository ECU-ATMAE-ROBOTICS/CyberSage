import { Guild } from 'discord.js';

const emojiRoleMap: Record<string, string> = {};

export async function addRole(
  guild: Guild | null,
  userId: string,
  emoji: string,
) {
  if (!guild) return;
  const roleId = emojiRoleMap[emoji];
  if (!roleId) return;

  const member = await guild.members.fetch(userId);
  if (member) {
    await member.roles.add(roleId);
  }
}

export async function removeRole(
  guild: Guild | null,
  userId: string,
  emoji: string,
) {
  if (!guild) return;
  const roleId = emojiRoleMap[emoji];
  if (!roleId) return;

  const member = await guild.members.fetch(userId);
  if (member) {
    await member.roles.remove(roleId);
  }
}
