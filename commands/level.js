// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

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
  category: 'Bot',
  description: 'Returns your permission level.',
  usage: 'level',
  parameters: ''
}

exports.run = async (client, message, args, level, data) => {
  try {
    const friendly = client.config.permLevels.find(l => l.level === level).name
    message.reply(`Your permission level is: ${friendly} (${level})`)
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}
