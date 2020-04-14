exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: 'forceskip',
  category: 'Music',
  description: 'Force skips currently playing song.',
  usage: 'forceskip',
  params: ''
}

exports.run = async (client, message, args, level, data) => {
  client.music.skip(message.guild, 'forceskip');

  message.reply('skipped currently playing music');
};