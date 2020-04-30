const { getGuild } = require('../modules/music')
exports.run = async (client, message, args) => {
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
    return message.channel.send('<:error:466995152976871434> That isn\'t a number! You need to tell me the songs position in the queue (1, 2, etc.)')
  }

  if (isNaN(newPosition) === true) {
    return message.channel.send('<:error:466995152976871434> That isn\'t a number! You need to tell me the songs position in the queue (1, 2, etc.)')
  }

  if (oldPosition < 1 || oldPosition >= queue.length) {
    return message.channel.send('<:error:466995152976871434> Old position is not a valid song ID.')
  }

  if (newPosition < 1 || newPosition >= queue.length) {
    return message.channel.send('<:error:466995152976871434> New position is not a valid song ID.')
  }

  const songName = queue[oldPosition].video.title

  queue.splice(newPosition, 0, queue.splice(oldPosition, 1)[0])

  message.channel.send(`<:success:466995111885144095> Moved **${songName}** from position \`${oldPosition}\` to \`${newPosition}\``)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: []
}

exports.help = {
  name: 'movesong',
  category: 'Music',
  description: 'Moves a song to a new position in the queue.',
  usage: 'movesong [current position] [new position]'
}