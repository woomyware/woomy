// Copyright 2020 Emily J. / mudkipscience. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: 'support',
  category: 'Bot',
  description: 'Sends a link to my support/development server.',
  usage: 'support',
  parameters: ''
}

exports.run = async (client, message, args, level, data) => {
  message.channel.send('Here you go! Hopefully we can help you here :3 https://discord.gg/HCF8mdv')
}
