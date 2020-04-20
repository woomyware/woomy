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
  name: 'ping',
  category: 'Bot',
  description: 'Check if bot is dying.',
  usage: 'ping',
  parameters: ''
}

exports.run = async (client, message, args, level, data) => {
  const msg = await message.channel.send('Pinging...')
  msg.edit(
    `Pong! \`${msg.createdTimestamp - message.createdTimestamp}ms\` (💗 \`${Math.round(client.ws.ping)}ms\`)`
  )
}
