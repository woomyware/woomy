exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: 'play',
  category: 'Music',
  description: 'Plays or adds to queue requested music.',
  usage: 'play [query]',
  params: '[query] - A query to find video by or a link to the video.'
}

exports.run = async (client, message, args, level, data) => {
    client.music.play(message, args[0]);
}