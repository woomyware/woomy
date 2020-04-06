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
  usage: 'help <command> **OR** help all',
  params: '`<command>` - The name of the command you want more information on.'
}

const Discord = require('discord.js')
exports.run = (client, message, args, level, data) => {
  const embed = new Discord.MessageEmbed()
  embed.setColor(client.embedColour(message.guild))

  const prefixes = [data.userData.prefix]
  if (message.guild && data.userData.prefix !== data.guildData.prefix) {
    prefixes.push(data.guildData.prefix)
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
      embed.addField(cat + ` [${filtered.size}]`, filtered.map((cmd) => '`' + cmd.help.name + '`').join(' '))
    })

    if (message.guild && data.guildData.customCommands.length > 0) {
      embed.addField('Custom', data.guildData.customCommands.map((cmd) => '`' + cmd.name + '`').join(' '))
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

    if (message.guild && data.guildData.customCommands.length > 0) {
      embed.addField('Custom', data.guildData.customCommands.map((cmd) => '`' + cmd.name + '`').join(' '))
    }

    return message.channel.send(embed)
  } else {
    
  }
}
