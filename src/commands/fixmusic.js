const { getGuild } = require('../modules/music')
module.exports.run = async (client, message, args, level) =>{
  guild = getGuild(message.guild.id)

  guild.queue = []
  guild.playing = false
  guild.paused = false
  guild.skippers = []

  if (guild.dispatcher) {
    guild.dispatcher.end('silent')
  }

  message.channel.send('<:success:466995111885144095> Music has been fixed (hopefully)')
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: []
};

exports.help = {
  name: "fixmusic",
  category: "Music",
  description: 'Fixes music if it breaks.',
  usage: 'fixmusic',
};
