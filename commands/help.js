exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['commands', 'cmds', 'h'],
  permLevel: 'User',
  requiredPerms: ['EMBED_LINKS'],
  cooldown: 2000
}

exports.help = {
  name: 'help',
  category: 'General',
  description: 'Returns your permission level.',
  usage: 'help <command>'
}

const Discord = require('discord.js')
exports.run = (client, message, args, level, data) => {
  const embed = new Discord.MessageEmbed()
  embed.setColor(client.embedColour(message.guild))
}
