const { play } = require('../modules/music')
exports.run = async (client, message, args) => {
  if (!args[0]) {
    return message.channel.send(`<:error:466995152976871434> You didn't give me a song name or YouTube URL! Usage: \`${client.commands.get('play').help.usage}\``)
  }

  await play(client, message, args.join(' '), true)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: []
}

exports.help = {
  name: 'playnext',
  category: 'Music',
  description: 'Similar to play, but adds it to the start of the queue instead of the end.',
  usage: 'playnext [song]'
}