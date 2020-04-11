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
  usage: '`help` - Lists all commands.\n`help <command>` - Show detailed information on how to use the specified command.',
  parameters: '`command` - The name of the command you want more information on.'
}

const Discord = require('discord.js')
exports.run = (client, message, args, level, data) => {
  const embed = new Discord.MessageEmbed()
  embed.setColor(client.embedColour(message.guild))

  if (!args[0]) {
    const categories = []
    let uPrefix = '`' + data.user.prefix + '`'
    let gPrefix = '`' + data.guild.prefix + '`'

    if (client.config.defaultPrefix === data.user.prefix) {
      uPrefix = 'None set, use: `~myprefix'
    }

    if (client.config.defaultPrefix === data.guild.prefix) {
      gPrefix = 'None set, use: `~prefix`'
    }

    embed.setTitle('Woomy Help')
    embed.setDescription(`**Prefixes**\n» Default: \`${client.config.defaultPrefix}\`\n» Server: ${gPrefix}\n» Personal: ${uPrefix}\n\n» [Join my discord server](https://discord.gg/HCF8mdv) if you need help!\n» Use \`help <command>\` to recieve more information about a command!`)
    const commands = client.commands

    commands.forEach((cmd) => {
      if (!categories.includes(cmd.help.category)) {
        if (cmd.help.category === 'Developer' && !client.config.devs.includes('message.author.id')) {
          return
        }
        categories.push(cmd.help.category)
      }
    })

    categories.sort().forEach((cat) => {
      const filtered = commands.filter((cmd) => cmd.help.category === cat)
      embed.addField('**' + cat + '**', filtered.map((cmd) => '`' + cmd.help.name + '`').join(', '), true)
    })

    if (message.guild && data.guild.customCommands.length > 0) {
      embed.addField('**Custom**', data.guild.customCommands.map((cmd) => '`' + cmd.name + '`').join(' '), true)
    }

    return message.channel.send(embed)
  } else {
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) {
      return message.channel.send('Command/alias doesn\'t exist')
    }

    let aliases = ''

    if (cmd.conf.aliases.length > 0) {
      aliases = '`' + cmd.conf.aliases.join('`, `') + '`'
    }

    embed.setTitle(cmd.help.category.toLowerCase() + ':' + cmd.help.name)
    embed.setDescription(cmd.help.description)
    embed.addField('**Usage**', cmd.help.usage)
    if (aliases) {
      embed.addField('**Aliases**', aliases)
    }
    if (cmd.help.parameters.length > 0) {
      embed.addField('**Parameters**', cmd.help.parameters)
    }
    embed.addField('**Rank required**', cmd.conf.permLevel, true)
    embed.addField('**Server only**', cmd.conf.guildOnly, true)
    embed.addField('**Cooldown**', cmd.conf.cooldown / 1000 + ' seconds', true)
    embed.setFooter('< > = optional, [ ] = required. Don\'t include the brackets in the command itself!')
    message.channel.send(embed)
  }
}
