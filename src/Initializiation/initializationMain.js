module.exports = {
    initialization: async (client) => {
        console.clear();

        Logger.startTimer();
        Logger.log(`Logged in as ${client.user.tag}`, logLevels.INFO);

        try {
            const guild = await guildIdCheck(client, constantIds.serverID);
            const channel = await channelIdCheck(
                guild,
                roleConfigIds.roleSelectionChannelID
            );
        } catch (err) {
            if (err instanceof GuildNotFoundException) {
                Logger.log(err.message, logLevels.FATAL);
            } else if (err instanceof ChannelNotFoundException) {
                Logger.log(err.message, logLevels.FATAL);
            } else {
                Logger.log(
                    `client.on() Unknown error occured => ${err}`,
                    logLevels.FATAL
                );
            }
            throw err;
        }
    },
};
