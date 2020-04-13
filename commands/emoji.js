exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['enlarge'],
  permLevel: 'User',
  requiredPerms: []
}

exports.help = {
  name: 'emoji',
  category: 'Utility',
  description: 'Enlarges a custom emoji (cannot be used to enlarge normal emojis)',
  usage: 'emoji [emoji]',
  parameters: '`[emoji] - Custom emoji you want to enlarge'
}

exports.run = async (client, message, args) => {
  if (!args[0]) {
    return client.userError(message, exports, 'Missing argument, the `emoji` argument is required!')
  };

  var ID
  var format = '.png'
  var string = args[0].replace(/\D/g, '')

  if (args[0].charAt(1) === 'a' && args[0].charAt(2) === ':') {
    format = '.gif'
  };

  if (string.length > 18) {
    ID = string.slice(string.length - 18)
  } else {
    ID = string
  };

  if (!ID) {
    return message.channel.send('<:error:466995152976871434> This command only works with custom emojis, sorry ;~;')
  }

  message.channel.send('https://cdn.discordapp.com/emojis/' + ID + format)
}
