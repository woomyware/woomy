const url = 'https://demirramon.com/gen/pride.png'
const Discord = require('discord.js')
exports.run = (client, message, args) => {
  const flag = args[0].toLowerCase()
  if (!flag) {
    return message.channel.send(
      `<:error:466995152976871434> No message provided. Usage: \`${client.commands.get('pride').help.usage}\``
    )
  }

  const available = ['lesbian', 'gay', 'bisexual', 'pansexual', 'trans', 'asexual', 'aromantic', 'ally']

  if (!available.includes(flag)) {
    return message.channel.send(`This flag isn't available. Available flags: \`${available.join('`, `')}\``)
  }

  let gradient = 'false'
  if (message.flags.includes('g')) {
    gradient = 'true'
  }

  message.channel.startTyping()

  const params = `image=${message.author.avatarURL({ format: 'png', size: 2048 })}&flag=${flag}&full=true&gradient=${gradient}&background=false&fit=true&v=2019-08-07`

  try {
    message.channel.stopTyping()
    message.channel.send({ files: [new Discord.MessageAttachment(url + '?' + params)] })
  } catch (err) {
    message.channel.stopTyping()
    message.channel.send(`<:error:466995152976871434> Error when generating image: \`${err}\``)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['flag'],
  permLevel: 'User',
  requiredPerms: ['ATTACH_FILES'],
  cooldown: 20000
}

exports.help = {
  name: 'pride',
  category: 'Fun',
  description: 'Adds a pride flag ring to your avatar. Available flags are lesbian, gay, bisexual, pansexual, trans, asexual, aromantic and ally. Generator created by [Demirramon.](https://demirramon.com/)',
  flags: '`-g` - Makes the overlay a gradient.',
  usage: '`pride [flag]` - Adds a pride flag overlay to your avatar.\n`pride [flag] -g` - Adds a pride flag gradient on your avatar.',
  examples: '`pride trans`\n`pride lesbian -g`'
}
