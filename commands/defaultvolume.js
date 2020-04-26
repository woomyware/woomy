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
  if (!args[0]) {
    return message.channel.send(`Current default volume: \`${data.guild.music.defaultVolume}\``)
  }

  if (args[0].toLowerCase() === 'reset') {
    await client.updateGuild(message.guild, { prefix: client.config.defaultPrefix })
    return message.channel.send('Server prefix has been reset.')
  }

  const vol = +args[0]

  if (isNaN(vol) === true) {
    return message.channel.send('new volume must be a number')
  }

  await client.updateGuild(message.guild, { music.defaultVoume: vol })

  message.channel.send(`The server prefix has been updated: \`${prefix}\``)
}
