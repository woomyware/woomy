// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['unpause'],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: 'resume',
  category: 'Music',
  description: 'Starts music back up if it was paused.',
  usage: 'resume',
  parameters: ''
}

const { getGuild } = require('../utils/music')
exports.run = async (client, message, args, level, data) => {
  const guild = getGuild(message.guild.id)

  if (guild.paused === false) {
    return message.channel.send('The music is already playing, use pause to pause the music first!')
  }

  if (guild.queue.length < 1) {
    return message.channel.send('Nothing is playing!')
  }

  guild.playing = true
  guild.paused = false
  guild.dispatcher.resume()

  message.channel.send('Music resumed!')
}
