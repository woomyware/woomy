const { getGuild, createTimestamp } = require('../modules/music')
const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args) => {  
  const guild = getGuild(message.guild.id)

  if (guild.queue.length < 1) {
    return message.channel.send(client.config.emojis.error + ' Nothing is in the queue!')
  }

  const songID = +args[0]

  if (isNaN(songID) === true) {
    return message.channel.send('<:error:466995152976871434> That isn\'t a number! You need to tell me the songs position in the queue (1, 2, etc.)')
  }

  const s = guild.queue[songID]

  const embed = new MessageEmbed()
  embed.setThumbnail(s.video.videoThumbnails[1].url)
  embed.setColor(client.embedColour(message))
  embed.setDescription(`**[${s.video.title}](https://www.youtube.com/watch?v=${s.video.videoId})**`)
  embed.addField('Channel:', s.video.author, true)
  embed.addField('Length:', '`[' + createTimestamp(s.video.lengthSeconds) + ']`', true)
  embed.setFooter('Requested by ' + s.requestedBy.tag, s.requestedBy.avatarURL({ format: 'png', dynamic: true, size: 2048 }))

  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
}

exports.help = {
  name: "songinfo",
  category: "Music",
  description: "Sends you information about a song in the queue. Song ID is the song's position in the queue.",
  usage: "songinfo [songID]"
}