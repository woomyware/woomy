// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

const music = require('../utils/music')

module.exports = (client, oldState, newState) => {
  if (newState.channelID !== oldState.channelID) {
    const guild = music.getGuild(newState.guild.id)

    if (guild.playing && guild.voiceChannel.id === oldState.channelID) {
      if (guild.voiceChannel.members.size === 1) {
        guild.autoDisconnect = true

        setTimeout(() => {
          if (guild.voiceChannel.members.size === 1 && guild.autoDisconnect) {
            setTimeout(() => {
              if (guild.voiceChannel.members.size === 1 && guild.autoDisconnect) {
                setTimeout(() => {
                  if (guild.voiceChannel.members.size === 1 && guild.autoDisconnect) {
                    guild.playing = false
                    guild.queue = []

                    // Probably should be async? But no need here I think
                    guild.dispatcher.end('silent')
                    guild.message.channel.send('No one is listening to me. Leaving voice chat!')
                  } else {
                    guild.autoDisconnect = false
                  }
                }, 30000)
              } else {
                guild.autoDisconnect = false
              }
            }, 20000)
          } else {
            guild.autoDisconnect = false
          }
        }, 10000)
      }
    }
  }
}
