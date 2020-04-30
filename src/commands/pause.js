const { getGuild } = require('../modules/music')
exports.run = (client, message, args, level) => {
  const guild = getGuild(message.guild.id)

  if (guild.paused === true) {
    return message.channel.send('<:error:466995152976871434> The music has already been paused! Run resume to start the music again.')
  }

  if (guild.queue.length < 1 || guild.playing === false) {
    return message.channel.send('<:error:466995152976871434> Nothing is playing!')
  }

  guild.playing = false
  guild.paused = true
  guild.dispatcher.pause()

  message.channel.send('<:pause:467639357961142273> Music playback has been paused.')
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: []
};

exports.help = {
  name: "pause",
  category: "Music",
  description: "Pauses music playback.",
  usage: "pause"
};


