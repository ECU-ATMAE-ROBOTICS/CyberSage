const { logLevels } = require("./constants");
const Logger = require("../logger/logger");

module.exports = {
    removeRole: async (guild, member, roleName) => {
        try {
            const role = guild.roles.cache.find((r) => r.name === roleName);
            if (role && member.roles.cache.has(role.id)) {
                await member.roles.remove(role);
                Logger.log(
                    `Role "${role.name}" has been removed from member ${member.user.tag}`,
                    logLevels.INFO
                );
                return true;
            } else {
                Logger.log(
                    `Role "${roleName}" was not found on member ${member.user.tag}`,
                    logLevels.INFO
                );
                return false;
            }
        } catch (error) {
            Logger.log(`Error removing role: ${error}`, logLevels.WARNING);
            return false;
        }
    },

    addRole: async (guild, member, roleName) => {
        try {
            const role = guild.roles.cache.find((r) => r.name === roleName);
            if (role && !member.roles.cache.has(role.id)) {
                await member.roles.add(role);
                Logger.log(
                    `Role "${role.name}" has been added to member ${member.user.tag}`,
                    logLevels.INFO
                );
                return true;
            } else {
                Logger.log(
                    `Role "${roleName}" was not found or already assigned to member ${member.user.tag}`,
                    logLevels.INFO
                );
                return false;
            }
        } catch (error) {
            Logger.log(`Error assigning role: ${error}`, logLevels.WARNING);
            return false;
        }
    },
};
