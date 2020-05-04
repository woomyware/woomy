const { skip, getGuild } = require('../modules/music')
exports.run = (client, message) => {
  const guild = getGuild(message.guild.id)

  if (guild.queue.length < 1 || !guild.playing || !guild.dispatcher) {
    return message.channel.send(
      '<:error:466995152976871434> Nothing is playing.'
    )
  }

  skip(message.guild, 'skip')

  message.channel.send('<:success:466995111885144095> Song skipped.')
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: []
};

exports.help = {
  name: "forceskip",
  category: "Music",
  description: "Skips the currently playing song without requiring a vote.",
  usage: "forceskip"
};
