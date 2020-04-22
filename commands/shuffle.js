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

  const max = queue.length - 1
  const min = 1
  for (let i = max; i >= min; i--) {
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min
    const itemAtIndex = queue[randomIndex]
    queue[randomIndex] = queue[i]
    queue[i] = itemAtIndex
  }

  message.channel.send('Queue shuffled!')
}
