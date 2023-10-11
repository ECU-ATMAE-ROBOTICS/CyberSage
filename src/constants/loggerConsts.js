module.exports = {
    logLevels: {
        TRACE: "Trace",
        INFO: "Info",
        WARNING: "Warning",
        DEBUG: "Debug",
        ERROR: "Error",
        FATAL: "Fatal",
    },

    loggerConfig: {
        filePath: "./data/logs",
        timerWriterInterval: 10000, // 30 minutes
        timerCombinerInterval: 10000, // 30 minutes
    },
};
