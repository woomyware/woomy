/* eslint-disable no-eval */

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Developer',
  requiredPerms: []
}

exports.help = {
  name: 'eval',
  category: 'Owner',
  description: 'Evaluates arbitrary javascript.',
  usage: 'eval [code]',
  params: '`[code] - Javascript code you want to execute.'
}

exports.run = async (client, message, args, level, data) => {
  const hastebin = require('hastebin-gen')
  const code = args.join(' ')
  try {
    const evaled = eval(code)
    const clean = await client.clean(client, evaled)

    if (clean.length > 2000) {
      hastebin(clean, { extension: 'txt' }).then(haste => {
        return message.channel.send('`OUTPUT`\n' + haste)
      }).catch(error => {
        client.logger.error(error)
      })

      return
    }
    message.channel.send(`\`OUTPUT\` \`\`\`js\n${await clean}\n\`\`\``)
  } catch (err) {
    const errclean = await client.clean(client, err)
    if (errclean.length > 2000) {
      hastebin(errclean, { extension: 'txt' }).then(haste => {
        return message.channel.send('`ERROR`\n' + haste)
      }).catch(error => {
        client.logger.error(error)
      })

      return
    }
    message.author.send(`\`ERROR\` \`\`\`xl\n${await errclean}\n\`\`\``)
    message.react('⚠️')
  }
}
