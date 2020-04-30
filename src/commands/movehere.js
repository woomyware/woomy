const { getGuild } = require('../modules/music')
const Discord = require("discord.js")

module.exports.run = async (client, message, args, level) =>{
  const guild = getGuild(message.guild.id)

  if (!guild.playing) {
    return message.channel.send('<:error:466995152976871434> Nothing is playing.')
  }

  if (guild.channel.id === message.channel.id) {
    return message.channel.send('<:error:466995152976871434> Music messages are already being sent to this channel.')
  }

  guild.channel = message.channel

  message.channel.send('<:success:466995111885144095> Music messages will now be sent to this channel.')
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: []
};

exports.help = {
  name: 'movehere',
  category: 'Music',
  description: 'Moves music related messages to the channel the this command is ran in.',
  usage: 'movehere',
};
