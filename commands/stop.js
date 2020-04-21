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
  name: 'stop',
  category: 'Music',
  description: 'Stops music, clears the queue and disconnects from the voice channel.',
  usage: 'stop',
  params: ''
}

const { getGuild } = require('../utils/music')
exports.run = async (client, message) => {
  const guild = getGuild(message.guild.id)

  if (guild.queue.length < 1 || !guild.playing || !guild.dispatcher) return message.channel.send('Nothing is playing.')
  if (!message.member.voice.channel) return message.channel.send('You need to be in voice channel to use this command!')

  guild.playing = false
  guild.paused = false
  guild.queue = []

  guild.dispatcher.end('silent')

  message.channel.send('Playback stopped!')
}
