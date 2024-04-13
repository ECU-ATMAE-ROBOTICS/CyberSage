// Internal
const Logger = require('../../../../logger/logger')
const roleController = require('../../../processes/role_controller/roleController')

// Constants
const { roleConfigIds } = require('../../../constants/idConsts')

const { logLevels } = require('../../../constants/loggerConsts')

const { reactionEmojis, roles } = require('../../../constants/serverConstants')

module.exports = {
  /**
     * Removes a role associated with the reaction that was removed.
     * @param {*} client The bot itself.
     * @param {*} reaction The reaction that was caught in the remove reaction event.
     * @param {*} user The user who removed a reaction.
     * @returns
     */
  emojiRemoveRole: async (client, reaction, user) => {
    if (user.id === client.user.id) {
      return
    }

    if (reaction.message.id === roleConfigIds.setRoleMessageID) {
      const guild = reaction.message.guild
      const member = guild.members.cache.get(user.id)
      switch (reaction.emoji.name) {
        // Handle :bulb: reaction
        case reactionEmojis.bulbEmoji:
          roleController.removeRole(guild, member, roles.electrical)
          break

          // Handle :computer: reaction
        case reactionEmojis.computerEmoji:
          roleController.removeRole(guild, member, roles.code)
          break

          // Handle :tools: reaction
        case reactionEmojis.toolsEmoji:
          roleController.removeRole(guild, member, roles.fabrication)
          break

          // Handle :mortar_board: reaction
        case reactionEmojis.alumniEmoji:
          roleController.removeRole(guild, member, roles.alumni)
          break

        default:
          Logger.log(
                        `User ${user.tag} reacted with an unrecognized emoji: ${reaction.emoji.name}`,
                        logLevels.INFO
          )
          break
      }
    }
  }
}
