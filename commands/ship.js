
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
  name: 'ship',
  category: 'Fun',
  description: 'Ship two people together <3',
  usage: 'ship `[name1]` `[name2]`',
  parameters: '`name1` The name of the first person you want to ship.\n `name` The name of the second person you want to ship.'
}

const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args, level, data) => {
  var rating = Math.floor(Math.random() * 100) + 1
  var meter = ['▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬']
  var hearts = [
    '❤️',
    '🧡',
    '💛',
    '💚',
    '💙',
    '💜'
  ]

  if (!args[0]) {
    return message.channel.send(client.userError(exports, 'Missing argument, the `name1` argument is required!'))
  }

  if (!args[1]) {
    return message.channel.send(client.userError(exports, 'Missing argument, the `name2` argument is required!'))
  }

  const firstName = args[0]
  const secondName = args[1]

  const shipName = firstName.substr(0, firstName.length * 0.5) + secondName.substr(secondName.length * 0.5)

  if (shipName.toLowerCase() === 'teily' || shipName.toLowerCase() === 'emrra') {
    rating = '100'
  }

  var pos = 0
  var under = 9
  while (pos < 10) {
    if (rating < under) {
      meter.splice(pos, 0, hearts.random())
      break
    }
    pos++
    under += 10
  }

  if (rating >= 99) {
    meter.splice(9, 0, hearts.random())
  }

  const embed = new MessageEmbed()
  embed.setTitle(`Original Names: ${firstName}, ${secondName}`)
  embed.setColor(client.embedColour(message.guild))
  embed.setDescription(`Ship Name: **${shipName}**\nCompatibility: **${rating}%**\n**[**${meter.join('')}**]**`)
  message.channel.send(embed)
}
