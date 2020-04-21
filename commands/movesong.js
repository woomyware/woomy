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
  const oldPosition = +args[0]
  const newPosition = +args[1]
  const songName = queue[oldPosition].video.title

  if (queue.length < 3) {
    return message.channel.send('<:error:466995152976871434> Not enough songs are in the queue for this command to work!')
  }

  if (!args[0]) {
    return message.channel.send(`<:error:466995152976871434> You didn't tell me what song to move! Usage: \`${client.commands.get('removesong').help.usage}\``)
  }

  if (!args[1]) {
    return message.channel.send(`<:error:466995152976871434> You didn't tell me what position in the queue you want to move this song to! Usage: \`${client.commands.get('removesong').help.usage}\``)
  }

  if (isNaN(oldPosition) === true || isNaN(newPosition) === true) {
    return message.channel.send('That isn\'t a number! You need to tell me the songs position in the queue (1, 2, etc.)')
  }

  if (newPosition >= queue.length) {
    var k = newPosition - queue.length + 1
    while (k--) {
      queue.push(undefined)
    }
  }

  queue.splice(newPosition, 0, queue.splice(oldPosition, 1)[0])

  message.channel.send(`Moved **${songName}** from position \`${oldPosition}\` to \`${newPosition}\``)
}
