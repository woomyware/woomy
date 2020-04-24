// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
  requiredPerms: ['ATTACH_FILES'],
  cooldown: 15000
}

exports.help = {
  name: 'pride',
  category: 'Fun',
  description: 'Adds a pride flag ring to your avatar. Available flags are lesbian, gay, bisexual, pansexual, trans, asexual, aromantic and ally.',
  usage: '`pride [flag]` - Adds a pride flag overlay to your avatar.\n`pride -g [flag]` - Adds a pride flag gradient on your avatar.',
  parameters: '`flag` - What flag you want to add to your avatar (options listed above)\n`-g` - Add this to the start of the command to turn the flag into a gradient.'
}

const url = 'https://demirramon.com/gen/pride.png'
const Discord = require('discord.js')
exports.run = (client, message, args) => {
  const flag = args[0]
  if (!flag) {
    return client.userError(message, exports, 'Missing argument, the `flag` argument is required!')
  }

  const available = ['lesbian', 'gay', 'bisexual', 'pansexual', 'trans', 'asexual', 'aromantic', 'ally']

  if (!available.includes(flag.toLowerCase())) {
    return message.channel.send(`This flag isn't available, sorry ;~;\nAvailable flags: \`${available.join('`, `')}\``)
  }

  let gradient = 'false'
  if (message.flags.includes('g')) {
    gradient = 'true'
  }

  message.channel.startTyping()

  const params = `image=${message.author.avatarURL({ format: 'png', size: 2048 })}&flag=${flag.toLowerCase()}&full=true&gradient=${gradient}&background=false&fit=true&v=2019-08-07`

  try {
    message.channel.stopTyping()
    message.channel.send({ files: [new Discord.MessageAttachment(url + '?' + params)] })
  } catch (err) {
    message.channel.stopTyping()
    message.channel.send(`<:error:466995152976871434> Error when generating image: \`${err}\``)
  }
}
