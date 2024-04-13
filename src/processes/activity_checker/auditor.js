// Constants
const { auditConfig } = require('../../constants/auditConstants')
const { logLevels } = require('../../constants/loggerConsts')
const { constantIds } = require('../../constants/idConsts')

// Logger
const { Logger } = require('../../../logger/logger')

class Auditor {
  static auditTimer

  // Besides auditing, anytime a message is made by someone with a Inactive tag, we must update.
  static auditMembers (client) {
    const guild = client.guilds.cache.get(constantIds.serverID)

    guild.members
      .fetch()
      .then((members) => {
        members.forEach((member) => {
          guild.channels.cache.forEach((channel) => {
            if (channel.type === 'text') {
              channel.messages
                .fetch({ limit: 1 })
                .then((messages) => {
                  const lastMessage = messages.first()
                  if (lastMessage.author.id === member.id) {
                    Logger.log(
                      `${member.user.tag} last messaged at: ${lastMessage.createdAt}`,
                      logLevels.INFO
                    )
                  }
                })
                .catch((error) => {
                  throw new Error(error) // Replace with custom exception
                })
            }
          })
        })
      })
      .catch((error) => {
        throw new Error(error) // Replace with custom error
      })
  }

  static startTimer () {
    clearInterval(this.auditTimer)
    this.auditTimer = setInterval(() => {}, auditConfig.timerInterval)
  }
}

module.exports = Auditor
