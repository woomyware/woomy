exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['commands', 'cmds'],
  permLevel: 'User',
  requiredPerms: ['EMBED_LINKS'],
  cooldown: 2000
}

exports.help = {
  name: 'help',
  category: 'Bot',
  description: 'Lists all commands Woomy has, what they do, and how to use them.',
  usage: '`help` - Shows the embed that provides info on how to use woomy. `help all` - Lists all commands.\n`help <command>` - Show detailed information on how to use the specified command.',
  parameters: '`command` - The name of the command you want more information on.'
}

const Discord = require('discord.js')
exports.run = (client, message, args, level, data) => {
  const embed = new Discord.MessageEmbed()
  embed.setColor(client.embedColour(message.guild))

  const commands = client.commands
  const categories = []

  commands.forEach((cmd) => {
    if (!categories.includes(cmd.help.category)) {
      if (cmd.help.category === 'Developer' && !client.config.devs.includes('message.author.id')) {
        return
      }
      categories.push(cmd.help.category)
    }
  })

  if (!args[0]) {
    let uPrefix = '`' + data.user.prefix + '`'
    let gPrefix = ''

    if (client.config.defaultPrefix === data.user.prefix) {
      uPrefix = 'None set, use: `~myprefix'
    }

    if (message.guild) {
      gPrefix = 'Server Prefix: `' + data.guild.prefix + '`'

      if (client.config.defaultPrefix === data.guild.prefix) {
        gPrefix = 'Server Prefix: None set, use: `~prefix`'
      }
    }

    embed.setTitle('Help & Commands')
    embed.setDescription('')
    if (client.version.news.length > 0) {
      embed.addField('**News**', client.version.news)
    }
    embed.addField('**Prefixes**', `Default Prefix: \`${client.config.defaultPrefix}\`\nUser Prefix: ${uPrefix}\nServer Prefix: ${gPrefix}`)
    embed.addField('**Command Syntax**', 'For arguments in commands:\n» Arguments in `[]` brackets are required.\n» Arguments in `<>` brackets are optional.\n» Arguments prefixed with `-` are flags, and are placed at the start of the command (`avatar -jpg mudkipscience`)')
    embed.addField('**Commands**', `Use \`${message.prefix}help all\` to view all commands, or \`${message.prefix}help <command>\` for more information on a specific command.\n\n[Bot Invite](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=2134240503&scope=bot) | [Discord Server](https://discord.gg/HCF8mdv) | [GitHub](https://github.com/mudkipscience/woomy) | [Vote for me!](https://top.gg/bot/435961704145485835/vote)`)

    return message.channel.send(embed)
  } else if (args[0] === 'all') {
    embed.setTitle('Commands')
    categories.sort().forEach((cat) => {
      const filtered = commands.filter((cmd) => cmd.help.category === cat)
      embed.addField('**' + cat + '**', filtered.map((cmd) => '`' + cmd.help.name + '`').join(', '))
    })

    if (message.guild && data.guild.customCommands.length > 0) {
      embed.addField('**Custom**', data.guild.customCommands.map((cmd) => '`' + cmd.name + '`').join(' '))
    }

    return message.channel.send(embed)
  } else {
    const command = args.shift().toLowerCase()
    const cmd = commands.get(command) || commands.get(client.aliases.get(command))
    if (!cmd) {
      return message.channel.send('Command/alias doesn\'t exist')
    }

    let aliases = ''

    if (cmd.conf.aliases.length > 0) {
      aliases = '`' + cmd.conf.aliases.join('`, `') + '`'
    }

    embed.setTitle(`${cmd.help.category} -> ${cmd.help.name}`)
    embed.setDescription(cmd.help.description)
    embed.addField('**Usage**', cmd.help.usage)
    if (cmd.help.parameters.length > 0) {
      embed.addField('**Parameters**', cmd.help.parameters)
    }
    if (aliases) {
      embed.addField('**Aliases**', aliases)
    }
    embed.addField('**Rank required**', cmd.conf.permLevel, true)
    embed.addField('**Server only**', cmd.conf.guildOnly, true)
    embed.addField('**Cooldown**', cmd.conf.cooldown / 1000 + ' seconds', true)
    embed.setFooter('< > = optional, [ ] = required. Don\'t include the brackets in the command itself!')
    message.channel.send(embed)
  }
}
