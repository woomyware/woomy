// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
  requiredPerms: ['CONNECT', 'SPEAK'],
  cooldown: 2000
}

exports.help = {
  name: 'movehere',
  category: 'Music',
  description: 'Moves music related messages to the channel the this command is ran in.',
  usage: 'movehere',
  parameters: ''
}

const music = require('../utils/music')
exports.run = async (client, message, args, level, data) => {
  // get guild music data
  const guild = music.getGuild(message.guild.id)

  if (!guild.playing) {
    return message.channel.send('<:error:466995152976871434> Nothing is playing.')
  }

  if (guild.channel.id === message.channel.id) {
    return message.channel.send('<:error:466995152976871434> Music messages are already being sent to this channel.')
  }

  guild.channel = message.channel

  message.channel.send('<:success:466995111885144095> Music messages will now be sent to this channel.')
}
