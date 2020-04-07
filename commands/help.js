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
  usage: '`help <command>`\n`help all` - View full command list.',
  params: '`<command>` - The name of the command you want more information on.'
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
    embed.setTitle('Woomy Help')
    embed.setDescription(`• Prefixes: ${'`' + prefixes.join('`, `') + '`'}\n• Use \`help <command>\` to recieve more information about a command!\n• Use \`help all\` to view hidden commands!\n• [Join my support server](https://discord.gg/HCF8mdv) if you have any issues/questions while using me!\n• [click here](https://discordapp.com/oauth2/authorize?client_id=435961704145485835&permissions=8&scope=bot) to add me to your own server!`)
    const commands = message.guild ? client.commands.filter(
      cmd => client.levelCache[cmd.conf.permLevel] <= level
    ) : client.commands.filter(
      cmd => client.levelCache[cmd.conf.permLevel] <= level && cmd.conf.guildOnly !== true
    )

    commands.forEach((cmd) => {
      if (!categories.includes(cmd.help.category)) {
        categories.push(cmd.help.category)
      }
    })

    categories.sort().forEach((cat) => {
      const filtered = commands.filter((cmd) => cmd.help.category === cat)
      embed.addField(cat + ` [${filtered.size}]`, filtered.map((cmd) => '`' + cmd.help.name + '`').join(', '), true)
    })

    if (message.guild && data.guild.customCommands.length > 0) {
      embed.addField('Custom', data.guild.customCommands.map((cmd) => '`' + cmd.name + '`').join(' '))
    }

    return message.channel.send(embed)
  } else if (args[0].toLowerCase() === 'all') {
    embed.setTitle('Woomy Help')
    embed.setDescription(`• Prefixes: ${'`' + prefixes.join('`, `') + '`'}\n• Use \`help <command>\` to recieve more information about a command!\n• [Join my support server](https://discord.gg/HCF8mdv) if you have any issues/questions while using me!\n• [click here](https://discordapp.com/oauth2/authorize?client_id=435961704145485835&permissions=8&scope=bot) to add me to your own server!`)
    const commands = client.commands

    commands.forEach((cmd) => {
      if (!categories.includes(cmd.help.category)) {
        categories.push(cmd.help.category)
      }
    })

    categories.sort().forEach((cat) => {
      const filtered = commands.filter((cmd) => cmd.help.category === cat)
      embed.addField(cat + ` [${filtered.size}]`, filtered.map((cmd) => '`' + cmd.help.name + '`').join(' '))
    })

    if (message.guild && data.guild.customCommands.length > 0) {
      embed.addField('Custom', data.guild.customCommands.map((cmd) => '`' + cmd.name + '`').join(' '))
    }

    return message.channel.send(embed)
  } else if (args[0]) {
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) {
      return message.channel.send('Command/alias doesn\'t exist')
    }

    let aliases = ''
    if (cmd.conf.aliases.length > 0) {
      aliases = '`' + cmd.conf.aliases.join('`, `') + '`'
    }

    embed.setTitle(cmd.help.name)
    embed.setDescription(cmd.help.description)
    embed.addField('**Usage:**', cmd.help.usage)
    if (cmd.help.params.length > 0) {
      embed.addField('**Parameters:**', cmd.help.params)
    }
    if (aliases) {
      embed.addField('**Aliases:**', aliases)
    }
    embed.addField('**Permission level:**', cmd.conf.permLevel, true)
    embed.addField('**Server only**', cmd.conf.guildOnly, true)
    embed.addField('**Cooldown**', cmd.conf.cooldown / 1000 + ' seconds', true)
    embed.setFooter('< > = optional, [ ] = required. Don\'t include the brackets in the command itself!')
    message.channel.send(embed)
  }
}
