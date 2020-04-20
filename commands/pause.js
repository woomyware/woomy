// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: 'pause',
  category: 'Music',
  description: 'Pauses the music that is currently playing.',
  usage: 'pause',
  parameters: ''
}

const { getGuild } = require('../utils/music')
exports.run = async (client, message, args, level, data) => {
  const guild = getGuild(message.guild.id)

  if (guild.paused === true) {
    return message.channel.send('The music has already been paused! Run resume to start the music again.')
  }

  if (guild.queue.length < 1 || guild.playing === false) {
    return message.channel.send('Nothing is playing!')
  }

  guild.playing = false
  guild.paused = true
  guild.dispatcher.pause()

  message.channel.send('Music paused!')
}
