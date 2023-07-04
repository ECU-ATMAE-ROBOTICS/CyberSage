const {
    GuildNotFoundException,
} = require("../../Exceptions/Initialization/GuildNotFoundException");
const {
    ChannelNotFoundException,
} = require("../../Exceptions/Initialization/GuildNotFoundException");

module.exports = {
    guildIdCheck: async (client) => {
        const guild = client.guilds.cache.get(constantIds.serverID);
        if (!guild) throw new GuildNotFoundException("Guild was not found");
    },
    channelIdCheck: async (client) => {
        const channel = guild.channels.cache.get(
            roleConfigIds.roleSelectionChannelID
        );
        if (!channel)
            throw new ChannelNotFoundException("Channel was not found.");
    },
};