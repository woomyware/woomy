const { getGuild } = require('../modules/music')
exports.run = (client, message, args, level) => {
  const guild = getGuild(message.guild.id)

  if (guild.paused === false) {
    return message.channel.send('<:error:466995152976871434> The music is already playing, use pause to pause the music first!')
  }

  if (guild.queue.length < 1) {
    return message.channel.send('<:error:466995152976871434> Nothing is playing!')
  }

  guild.playing = true
  guild.paused = false
  guild.dispatcher.resume()

  message.channel.send('<:success:466995111885144095> Music playback has been resumed.')
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unpause"],
  permLevel: "Moderator",
  requiredPerms: ["SPEAK"]
};

exports.help = {
  name: "resume",
  category: "Music",
  description: "Unpauses music.",
  usage: "resume"
};