// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['np'],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: 'nowplaying',
  category: 'Music',
  description: 'Gives details on the song that is currently playing',
  usage: 'nowplaying',
  parameters: ''
}

const { getGuild, createTimestamp } = require('../utils/music')
const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args, level, data) => {
  const guild = getGuild(message.guild.id)

  if (guild.queue.length < 1) {
    return message.channel.send(client.config.emojis.error + ' Nothing is in the queue!')
  }

  const s = guild.queue[0]
  const elapsedTime = createTimestamp(guild.dispatcher.streamTime / 1000)
  let timestamp = `\`[${createTimestamp(s.video.lengthSeconds)}]\``

  if (timestamp !== '`[LIVE]`') {
    timestamp = `\`[${elapsedTime + '/' + createTimestamp(s.video.lengthSeconds)}]\``
  }

  const embed = new MessageEmbed()
  embed.setTitle('Now playing')
  embed.setThumbnail(s.video.videoThumbnails[1].url)
  embed.setColor(client.embedColour(message.guild))
  embed.setDescription(`**[${s.video.title}](https://www.youtube.com/watch?v=${s.video.videoId})**`)
  embed.addField('Channel:', s.video.author, true)
  embed.addField('Time:', timestamp, true)
  embed.setFooter('Requested by ' + s.requestedBy.tag, s.requestedBy.avatarURL({ format: 'png', dynamic: true, size: 2048 }))

  message.channel.send(embed)
}
