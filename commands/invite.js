// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: 'invite',
  category: 'Bot',
  description: 'Sends a link to my support/development server.',
  usage: 'invite',
  parameters: ''
}

exports.run = async (client, message, args, level, data) => {
  message.channel.send(`Here you go! I hope you enjoy using me ^-^\n<https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=2134240503&scope=bot>`)
}
