// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
  requiredPerms: ['CONNECT', 'SPEAK'],
  cooldown: 5000
}

exports.help = {
  name: 'playnext',
  category: 'Music',
  description: 'Similar to play, but adds it to the start of the queue instead of the end.',
  usage: 'playnext [song]',
  parameters: '[song] - The name or youtube URL of the song you want to play.'
}

const { play } = require('../utils/music')
exports.run = async (client, message, args, level, data) => {
  await play(client, data.guild.music, message, args.join(' '), true)
}
