exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['commands', 'cmds', 'halp'],
  permLevel: 'User',
  requiredPerms: ['EMBED_LINKS'],
  cooldown: 2000
}

exports.help = {
  name: 'help',
  category: 'General',
  description: 'Sends you a list of Woomy\'s commands.',
  usage: '`help` - Lists all commands.\n`help <command>` - Receive more information on a command.',
  examples: '`help`\n`help roleinfo`'
}

const Discord = require('discord.js')
exports.run = (client, message, args, level, data) => {
  const embed = new Discord.MessageEmbed()
  embed.setColor(client.embedColour(message.guild))

  const prefixes = [data.user.prefix]
  if (message.guild && data.user.prefix !== data.guild.prefix) {
    prefixes.push(data.guild.prefix)
  }
  prefixes.push('@Woomy')

  const categories = []

  if (!args[0]) {
    embed.setTitle('Woomy Commands')
    embed.setDescription(`• Prefixes: ${'`' + prefixes.join('`, `') + '`'}\n• Use \`help <command>\` to recieve more information about a command!\n• [Join my support server](https://discord.gg/HCF8mdv)`)
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
      embed.addField(cat, filtered.map((cmd) => '`' + cmd.help.name + '`').join(', '))
    })

    if (message.guild && data.guild.customCommands.length > 0) {
      embed.addField('Custom', data.guild.customCommands.map((cmd) => '`' + cmd.name + '`').join(' '))
    }

    embed.addField('Invite', '[Invite](https://discordapp.com/oauth2/authorize?client_id=435961704145485835&permissions=8&scope=bot) | [Discord Server](https://discord.gg/HCF8mdv)')
    return message.channel.send(embed)
  } else {
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) {
      return message.channel.send('Command/alias doesn\'t exist')
    }

    let desc = ''

    if (cmd.conf.aliases.length > 0) {
      desc += `*(Aliases: ${cmd.conf.aliases.join(', ')})*\n\n`
    }

    desc += cmd.help.description + `\n\n**You need the \`${cmd.conf.permLevel}\` rank to run this command! This command has a cooldown of \`${cmd.conf.cooldown / 1000}\` seconds per user.**`

    embed.setTitle(cmd.help.category.toLowerCase() + ':' + cmd.help.name)
    embed.setDescription(desc)
    embed.addField('**Usage**', cmd.help.usage)
    if (cmd.help.examples.length > 0) {
      embed.addField('**Examples**', cmd.help.examples)
    }
    embed.setFooter('< > = optional, [ ] = required. Don\'t include the brackets in the command itself!')
    message.channel.send(embed)
  }
}
