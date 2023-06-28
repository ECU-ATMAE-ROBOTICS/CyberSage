//TODO Create a config page where some of these values can be easily changed
module.exports = {
    reactionEmojis: {
        bulbEmoji: "💡",
        computerEmoji: "💻",
        toolsEmoji: "🛠️",
    },

    roles: {
        electrical: "Electrical",
        code: "Code",
        fabrication: "Fabrication",
    },

    ID: {
        setRoleMessageID: "1123120003047247952",
        roleSelectionChannelID: "1123119173757849731",
        serverID: "1106740376515125309",
    },

    logLevels: {
        TRACE: "Trace",
        INFO: "Info",
        WARNING: "Warning",
        DEBUG: "Debug",
        ERROR: "Error",
        FATAL: "Fatal",
    },

    logger: {
        filepath: "/src/logger/logs/log.txt",
        timerInterval: 1800000, // 30 minutes
    },
};
