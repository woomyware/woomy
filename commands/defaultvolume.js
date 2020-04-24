// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Administrator',
  requiredPerms: [],
  cooldown: 5000 // miliseconds
}

exports.help = {
  name: 'defaultvolume',
  category: 'Music',
  description: 'Change the default volume Woomy plays music at.',
  usage: 'volume [volume]',
  params: '[volume] - what you want to set the default volume to'
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
