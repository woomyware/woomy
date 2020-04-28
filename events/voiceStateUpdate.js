// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

const music = require('../utils/music')

module.exports = (client, oldState, newState) => {
  if (newState.channelID !== oldState.channelID) {
    const guild = music.getGuild(newState.guild.id)

    /* Reset queue, dispatcher, etc if Woomy is forcibly disconnected from the queue
    if (guild.voiceChannel && !guild.voiceChannel.members.get(client.user.id) && guild.queue.length > 0) {
      guild.queue = []
      guild.playing = false
      guild.paused = false
      guild.skippers = []
    }
    */

    // Auto-disconnect feature
    if (guild.playing && guild.Channel && guild.voiceChannel.id === oldState.channelID) {
      if (guild.voiceChannel.members.filter(member => !member.user.bot).size < 1) {
        guild.autoDisconnect = true

        guild.message.channel.send(`The music will end in 2 minutes if nobody rejoins **${guild.voiceChannel.name}**`)
          .then(msg => {
            msg.delete({ timeout: 120000 })
          })

        setTimeout(() => {
          if (guild.dispatcher !== null && guild.voiceChannel.members.filter(member => !member.user.bot).size < 1 && guild.autoDisconnect) {
            // Probably should be async? But no need here I think
            guild.dispatcher.end('silent')

            guild.queue = []
            guild.playing = false
            guild.paused = false
            guild.dispatcher = null
            guild.skippers = []

            guild.message.channel.send('The music has ended because no one was listening to me ;~;')
          } else {
            guild.autoDisconnect = false
          }
        }, 120000)
      } else {
        guild.autoDisconnect = false
      }
    }
  }
}
