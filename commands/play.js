exports.conf = {
  enabled: true,
  guildOnly: true,
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
  parameters: '[query] - A query to find video by or a link to the video.'
}

exports.run = async (client, message, [...args], level, data) => {
  await client.music.play(message, args)
}
