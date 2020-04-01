module.exports = async (client, message) => {
  if (message.author.bot) return

  var prefix = '!'

  const myMention = `<@&${client.user.id}>`
  const myMention2 = `<@!${client.user.id}>`

  if (message.content.startsWith(myMention) || message.content.startsWith(myMention2)) {
    if (message.content.length > myMention.length + 1 && (message.content.substr(0, myMention.length + 1) === myMention + ' ' || message.content.substr(0, myMention2.length + 1) === myMention2 + ' ')) {
      prefix = message.content.substr(0, myMention.length) + ' '
    } else {
      return message.channel.send(`Current prefix: \`${prefix}\``)
    };
  };

  if (message.content.indexOf(prefix) !== 0) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if (message.guild && !message.member) await message.guild.fetchMember(message.author)

  const level = client.permlevel(message)

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return

  if (cmd && !message.guild && cmd.conf.guildOnly) {
    return message.channel.send('This command is unavailable via private message. Please run this command in a guild.')
  }

  // Dev perm level is separate so dev's don't get owner perms where they shouldn't have them
  if (cmd.conf.permLevel === 'Developer') {
    if (!message.client.config.owners.includes(message.author.id)) {
      return message.channel.send('You don\'t have permission to run this command!')
    }
  }

  if (level < client.levelCache[cmd.conf.permLevel]) {
    return message.channel.send('You don\'t have permission to run this command!')
  }

  // Cooldown
  if (client.cooldown.get(cmd.help.name).has(message.author.id)) {
    const init = client.cooldown.get(command).get(message.author.id)
    const curr = new Date()
    const diff = Math.round((curr - init) / 1000)
    const time = cmd.conf.cooldown / 1000
    return message.reply(`this command is on cooldown! You'll be able to use it again in ${time - diff} seconds.`)
  } else {
    client.cooldown.get(cmd.help.name).set(message.author.id, new Date())

    setTimeout(() => {
      client.cooldown.get(cmd.help.name).delete(message.author.id)
    }, client.commands.get(cmd.help.name).conf.cooldown)
  }

  message.author.permLevel = level

  // Might use this
  message.flags = []
  while (args[0] && args[0][0] === '-') {
    message.flags.push(args.shift().slice(1))
  }

  client.logger.log(`Command ran: ${cmd.help.name}`)
  cmd.run(client, message, args, level)
}
