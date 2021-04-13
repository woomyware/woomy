const { getGuild, createTimestamp } = require('../modules/music')
const { MessageEmbed } = require('discord.js')
exports.run = async (client, message) => {  
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
  embed.setThumbnail('https://invidiou.site' + s.video.videoThumbnails[1].url)
  embed.setColor(client.embedColour(message))
  embed.setDescription(`**[${s.video.title}](https://www.youtube.com/watch?v=${s.video.videoId})**`)
  embed.addField('Channel:', s.video.author, true)
  embed.addField('Time:', timestamp, true)
  embed.setFooter('Requested by ' + s.requestedBy.tag, s.requestedBy.avatarURL({ format: 'png', dynamic: true, size: 2048 }))

  message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["np"],
  permLevel: "User",
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "nowplaying",
  category: "Music",
  description: "Shows details about the currently playing song.",
  usage: "nowplaying"
};
