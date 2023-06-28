module.exports = {
    removeRole: async (guild, member, role) => {
        try {
            const eRole = guild.roles.cache.find((role) => role.name === role);
            if (member.roles.cache.has(eRole)) {
                await member.roles.remove(eRole);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error removing role:", error);
        }
    },
    addRole: async (guild, member, role) => {
        try {
            const eRole = guild.roles.cache.find(
                (eRole) => eRole.name === role
            );
            if (!member.roles.cache.has(eRole)) {
                await member.roles.add(eRole);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error assigning role:", error);
        }
    },
};
