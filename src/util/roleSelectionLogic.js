module.exports = {
    removeRole: async (guild, member, roleName) => {
        try {
            const role = guild.roles.cache.find((r) => r.name === roleName);
            if (role && member.roles.cache.has(role.id)) {
                await console.log(member.roles.cache.has(role.id));
                await member.roles.remove(role);
                console.log(
                    `Role "${role.name}" has been removed from member ${member.user.tag}`
                );
                return true;
            } else {
                console.log(
                    `Role "${roleName}" was not found on member ${member.user.tag}`
                );
                return false;
            }
        } catch (error) {
            console.error("Error removing role:", error);
            return false;
        }
    },

    addRole: async (guild, member, roleName) => {
        try {
            const role = guild.roles.cache.find((r) => r.name === roleName);
            if (role && !member.roles.cache.has(role.id)) {
                await member.roles.add(role);
                console.log(
                    `Role "${role.name}" has been added to member ${member.user.tag}`
                );
                return true;
            } else {
                console.log(
                    `Role "${roleName}" was not found or already assigned to member ${member.user.tag}`
                );
                return false;
            }
        } catch (error) {
            console.error("Error assigning role:", error);
            return false;
        }
    },
};
