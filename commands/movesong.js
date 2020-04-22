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
  name: 'movesong',
  category: 'Music',
  description: 'Moves a song to a new position in the queue.',
  usage: 'movesong [current position] [new position]',
  parameters: '[current position] - The current position of the song you want to move'
}

const { getGuild } = require('../utils/music')
module.exports.run = (client, message, args, level) => {
  const queue = getGuild(message.guild.id).queue

  if (queue.length < 3) {
    return message.channel.send('<:error:466995152976871434> Not enough songs are in the queue for this command to work!')
  }

  if (!args[0]) {
    return client.userError(message, exports, 'Missing argument, the `current position` argument is required!')
  }

  if (!args[1]) {
    return client.userError(message, exports, 'Missing argument, the `new position` argument is required!')
  }

  const oldPosition = +args[0]
  const newPosition = +args[1]

  if (isNaN(oldPosition) === true) {
    return message.channel.send('That isn\'t a number! You need to tell me the songs position in the queue (1, 2, etc.)')
  }

  if (isNaN(newPosition) === true) {
    return message.channel.send('That isn\'t a number! You need to tell me the songs position in the queue (1, 2, etc.)')
  }

  if (oldPosition < 1) {
    return message.channel.send('This number is too low!')
  }

  if (newPosition < 1) {
    return message.channel.send('This number is too low!')
  }

  if (oldPosition >= queue.length) {
    return message.channel.send('This number is too high!')
  }

  if (newPosition >= queue.length) {
    return message.channel.send('This number is too high!')
  }

  const songName = queue[oldPosition].video.title

  queue.splice(newPosition, 0, queue.splice(oldPosition, 1)[0])

  message.channel.send(`Moved **${songName}** from position \`${oldPosition}\` to \`${newPosition}\``)
}
