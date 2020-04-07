
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
  requiredPerms: []
}

exports.help = {
  name: 'ship',
  category: 'Fun',
  description: 'Ship two people together <3',
  usage: 'ship [name/user] [name/user]'
}

exports.run = async (client, message, args, level, data) => {
  var rating = Math.floor(Math.random() * 100) + 1
  var hearts = [
    '❤️',
    '🧡',
    '💛',
    '💚',
    '💙',
    '💜'
  ]

  if (args.length < 2) {
    return message.channel.send('<:error:466995152976871434> Please include two names/users.')
  }

  const firstName = args[0]
  const secondName = args[1]

  const shipName = firstName.substr(0, firstName.length * 0.5) + secondName.substr(secondName.length * 0.5)

  if (shipName.toLowerCase() === 'teily' || shipName.toLowerCase() === 'emrra') {
    rating = '100'
  }
  message.channel.send(`__**Ship Generator:**__\n${hearts.random()} Ship Name: \`${shipName}\`\n${hearts.random()} Compatibility: \`${rating}%\``)
}
