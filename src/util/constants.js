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
        cyberSageID: "1123134907405828156",
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
        filePath: "./src/logger/logs",
        timerInterval: 10000, // 30 minutes
    },
};
