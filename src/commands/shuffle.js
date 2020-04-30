const { getGuild } = require('../modules/music')
exports.run = async (client, message) => {
  var queue = getGuild(message.guild.id).queue

  if (queue.length < 4) {
    return message.channel.send('<:error:466995152976871434> There aren\'t enough songs are in the queue for this command to work!')
  }

  const max = queue.length - 1
  const min = 1
  for (let i = max; i >= min; i--) {
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min
    const itemAtIndex = queue[randomIndex]
    queue[randomIndex] = queue[i]
    queue[i] = itemAtIndex
  }

  message.channel.send('<:success:466995111885144095> Queue shuffled!')
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: []
}

exports.help = {
  name: 'shuffle',
  category: 'Music',
  description: 'Mixes up the songs in the queue',
  usage: 'shuffle'
}