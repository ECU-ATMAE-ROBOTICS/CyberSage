// Internal
const { guildIdCheck, channelIdCheck } = require('./util/idCheck')
const Logger = require('../../../logger/logger')
const { emojiExistOnMessage } = require('./util/emojiCheck')
// const Auditor = require('../../processes/activity_checker/auditor')

// Exceptions
const {
  GuildNotFoundException
} = require('../../../exceptions/initialization/GuildNotFoundException')
const {
  ChannelNotFoundException
} = require('../../../exceptions/initialization/ChannelNotFoundException')

// Constants
const { constantIds, roleConfigIds } = require('../../constants/idConsts')
const { logLevels } = require('../../constants/loggerConsts')
const { reactionEmojis } = require('../../constants/serverConstants')

module.exports = {
  /**
   * Clears the terminal and begins the logger
   * @param {*} client
   */
  startLogger: (client) => {
    console.clear()
    Logger.startLogWriterTimer()
    Logger.log(`Logged in as ${client.user.tag}`, logLevels.INFO)
  },

  startAuditor: () => {}, // TODO Fill in

  /**
   * Checks to ensure that the guild and channel id provided is valid, throws errors if not
   * @param {*} client
   * @return {*} guild, channel
   */
  checkIds: async (client) => {
    let guild, channel
    try {
      guild = await guildIdCheck(client, constantIds.serverID)
      channel = await channelIdCheck(
        guild,
        roleConfigIds.roleSelectionChannelID
      )
    } catch (err) {
      if (err instanceof GuildNotFoundException) {
        Logger.log(err.message, logLevels.FATAL)
      } else if (err instanceof ChannelNotFoundException) {
        Logger.log(err.message, logLevels.FATAL)
      } else {
        Logger.log(
          `client.on() Unknown error occured => ${err}`,
          logLevels.FATAL
        )
      }
      throw err
    }
    return channel
  },

  /**
   * Ensures that the message exists for others to react on
   * @param {*} channel
   */
  // TODO In the event the message doesn't exist, the bot should make it. Create this as a util file
  reactionInitialization: async (channel) => {
    const message = await channel.messages.fetch(
      roleConfigIds.setRoleMessageID
    )

    // TODO Create Emoji wrapper class? Maybe a type of Enum?
    for (const emoji of Object.values(reactionEmojis)) {
      Logger.log(`Checking for ${emoji} emoji on message: ${message.id}.`)
      const selfCheck = true
      if (!emojiExistOnMessage(message, emoji, selfCheck)) {
        await message.react(emoji).catch((error) => {
          Logger.log(
            `Error when trying to put ${emoji} on message: ${message.id} => ${error}.`,
            logLevels.ERROR
          )
        })
        Logger.log(`Successfully put ${emoji} on message: ${message.id}.`)
      } else {
        Logger.log(`${emoji} already exists on message: ${message.id}.`)
      }
    }
  }
}
