// Exceptions
const {
    GuildNotFoundException,
} = require("../../../../exceptions/initialization/GuildNotFoundException");
const {
    ChannelNotFoundException,
} = require("../../../../exceptions/initialization/GuildNotFoundException");

module.exports = {
    /**
     * Checks for a guild given a guild id and the client.
     * @param {*} client
     * @param {*} guildId
     * @return {*} guild
     */
    guildIdCheck: (client, guildId) => {
        const guild = client.guilds.cache.get(guildId);
        if (!guild) throw new GuildNotFoundException("Guild was not found");
        return guild;
    },

    /**
     * Checks for a channel given a guild and a channel id
     * @param {*} guild
     * @param {*} channelId
     * @return {*} channel
     */
    channelIdCheck: (guild, channelId) => {
        const channel = guild.channels.cache.get(channelId);
        if (!channel)
            throw new ChannelNotFoundException("Channel was not found.");
        return channel;
    },
};
