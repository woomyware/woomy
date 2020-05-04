const { play } = require('../modules/music')
const Discord = require("discord.js")

module.exports.run = async (client, message, args, level) =>{
  if (!args[0]) {
    return message.channel.send(`<:error:466995152976871434> You didn't give me a song name or YouTube URL! Usage: \`${client.commands.get('play').help.usage}\``)
  }

  await play(client, message, args.join(' '), false)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["p"],
  permLevel: "User",
  requiredPerms: ["CONNECT", "SPEAK"]
};

exports.help = {
  name: "play",
  category: "Music",
  description: 'Plays the song you request, or adds it to the queue.',
  usage: 'playnext [song]',
};
