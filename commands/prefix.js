exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000 // miliseconds
}

exports.help = {
  name: 'prefix',
  category: 'Settings',
  description: 'Shows or changes the prefix Woomy uses for this server.',
  usage: 'prefix ',
  params: ''
}

exports.run = async (client, message, args, level, data) => {
  const prefix = args.join(' ')

  if (!prefix) {
    return message.channel.send(`Current server prefix: \`${data.guild.prefix}\``)
  }

  if (prefix.toLowerCase() === 'reset') {
    await client.updateGuild(message.guild, { prefix: client.config.defaultPrefix })

    return message.channel.send('Server prefix has been reset.')
  }

  await client.updateGuild(message.guild, { prefix: prefix })

  message.channel.send(`The server prefix has been updated: \`${prefix}\``)
}
