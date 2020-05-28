const { getGuild } = require('../modules/music')
exports.run = async (client, message) => {
  const guild = getGuild(message.guild.id)

  if (guild.queue.length < 1 || !guild.playing || !guild.dispatcher) return message.channel.send('Nothing is playing.')
  if (!message.member.voice.channel) return message.channel.send('You need to be in voice channel to use this command!')

  guild.dispatcher.end('silent')

  guild.queue = []
  guild.playing = false
  guild.paused = false
  guild.skippers = []
  guild.fixers = []

  message.channel.send('<:success:466995111885144095> Playback stopped!')
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: []
};

exports.help = {
  name: "stop",
  category: "Music",
  description: "Clears the queue and disconnects from the voice channel. (run this if music stopS working)",
  usage: "stop"
};

