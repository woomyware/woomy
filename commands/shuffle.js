// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: 'shuffle',
  category: 'Music',
  description: 'Mixes up the songs in the queue',
  usage: 'shuffle',
  parameters: ''
}

const { getGuild } = require('../utils/music')
module.exports.run = (client, message, args, level) => {
  var queue = getGuild(message.guild.id).queue

  if (queue.length < 3) {
    return message.channel.send('Not enough songs are in the queue for this command to work!')
  }

  let j, x, i

  // Make it so it shuffles all elements EXCEPT [0]

  for (i = queue.length - 1; i > 1; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = queue[i]
    queue[i] = queue[j]
    queue[j] = x
  }

  message.channel.send('Queue shuffled!')
}
