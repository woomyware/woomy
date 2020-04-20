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
  name: 'skip',
  category: 'Music',
  description: 'Force skips currently playing song.',
  usage: 'skip',
  params: ''
}

const { skip } = require('../utils/music')
exports.run = async (client, message, args, level, data) => {
  skip(message.guild, 'skip')

  message.reply('skipped currently playing music')
}
