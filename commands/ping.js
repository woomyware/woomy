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
  category: 'Utility',
  description: 'Displays bot latency in miliseconds.',
  usage: 'ping',
  params: ''
}

exports.run = async (client, message, args, level, data) => {
  const msg = await message.channel.send('Pinging...')
  msg.edit(
    `Pong! \`${msg.createdTimestamp - message.createdTimestamp}ms\` (💗 \`${Math.round(client.ws.ping)}ms\`)`
  )
}
