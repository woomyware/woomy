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
  name: 'removesong',
  category: 'Music',
  description: 'Removes a song from the queue.',
  usage: 'removesong [position]',
  parameters: '[position] - The position of the song you want to remove'
}

const { getGuild } = require('../utils/music')