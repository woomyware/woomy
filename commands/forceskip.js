exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: 'forceskip',
  category: 'Music',
  description: 'Force skips currently playing song.',
  usage: 'forceskip',
  params: ''
}

const { skip } = require('../utils/music')
exports.run = async (client, message, args, level, data) => {
  skip(message.guild, 'forceskip')

  message.reply('skipped currently playing music')
}
