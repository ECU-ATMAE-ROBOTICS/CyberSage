// Internal
const Logger = require("../../Logger/logger");

// Constants
const { logLevels } = require("../../Definitions/constants");

module.exports = {
    /**
     * Checks if a member has a role, and if so, removes it.
     * @param {*} guild
     * @param {*} member
     * @param {string} roleName
     * @return {boolean}
     */
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

    /**
     * Checks if a member has a role, and adds it if not.
     * @param {*} guild
     * @param {*} member
     * @param {string} roleName
     * @return {boolean}
     */
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
