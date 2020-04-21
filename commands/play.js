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
  name: 'play',
  category: 'Music',
  description: 'Plays or adds to queue requested music.',
  usage: 'play [query]',
  parameters: '[query] - A query to find video by or a link to the video.'
}

const { play } = require('../utils/music')
exports.run = async (client, message, args, level, data) => {
  await play(client, message, args.join(' '))
}
