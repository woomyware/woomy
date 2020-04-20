// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000 // miliseconds
}

exports.help = {
  name: 'myprefix',
  category: 'Settings',
  description: 'Shows or changes the prefix Woomy uses for you.',
  usage: '`myprefix` <prefix | "reset">',
  parameters: ''
}

exports.run = async (client, message, args, level, data) => {
  const prefix = args.join(' ')

  if (!prefix) {
    return message.channel.send(`Your current prefix is: \`${data.user.prefix}\``)
  }

  if (prefix.toLowerCase() === 'reset') {
    await client.updateUser(message.author, { prefix: client.config.defaultPrefix })

    return message.channel.send('Your prefix has been reset.')
  }

  await client.updateUser(message.author, { prefix: prefix })

  message.channel.send(`Your prefix has been updated: \`${prefix}\``)
}
