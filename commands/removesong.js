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
  name: 'removesong',
  category: 'Music',
  description: 'Removes a song from the queue.',
  usage: 'removesong [position]',
  parameters: '[position] - The position of the song you want to remove'
}

const { getGuild } = require('../utils/music')
module.exports.run = (client, message, args, level) => {
  var queue = getGuild(message.guild.id).queue

  if (queue.length < 2) {
    return message.channel.send('<:error:466995152976871434> Not enough songs are in the queue for this command to work!')
  }

  if (!args[0]) {
    return message.channel.send(`<:error:466995152976871434> You didn't tell me what song to remove! Usage: \`${client.commands.get('removesong').help.usage}\``)
  }

  var input = +args[0]

  if (isNaN(input) === true) {
    return message.channel.send('<:error:466995152976871434> That isn\'t a number! You need to tell me the songs position in the queue (1, 2, etc.)')
  }

  if (input >= queue.length || input < 1) {
    return message.channel.send('<:error:466995152976871434> Input is not a valid song ID.')
  }

  var songName = queue[input].video.title

  queue.splice(input, 1)

  message.channel.send(`<:success:466995111885144095> Removed from queue: **${songName}**`)
}
