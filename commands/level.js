exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['plevel', 'permlevel'],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: 'level',
  category: 'Utility',
  description: 'Returns your permission level.',
  usage: 'level'
}

exports.run = async (client, message, args, level, data) => {
  try {
    const friendly = client.config.permLevels.find(l => l.level === level).name
    message.reply(`your permission level is ${level} (${friendly}).`)
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}
