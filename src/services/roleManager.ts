import { Guild } from 'discord.js';

export async function addRole(
  guild: Guild | null,
  userId: string,
  roleId: string,
): Promise<void> {
  if (!guild) return;

  try {
    const member = await guild.members.fetch(userId);
    if (member) {
      await member.roles.add(roleId);
      console.log(`Role ${roleId} added to user ${userId}`);
    } else {
      console.warn(`Member with ID ${userId} not found.`);
    }
  } catch (error) {
    console.error(`Failed to add role ${roleId} to user ${userId}:`, error);
  }
}

export async function removeRole(
  guild: Guild | null,
  userId: string,
  roleId: string,
): Promise<void> {
  if (!guild) return;

  try {
    const member = await guild.members.fetch(userId);
    if (member) {
      await member.roles.remove(roleId);
      console.log(`Role ${roleId} removed from user ${userId}`);
    } else {
      console.warn(`Member with ID ${userId} not found.`);
    }
  } catch (error) {
    console.error(
      `Failed to remove role ${roleId} from user ${userId}:`,
      error,
    );
  }
}
