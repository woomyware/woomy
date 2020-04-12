module.exports = async (client, message) => {
  if (message.author.bot) return

  const data = {}

  data.user = await client.findOrCreateUser(message.author)

  const prefixes = [data.user.prefix]

  if (message.guild) {
    if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) {
      try {
        return message.author.send(`I don't have permission to speak in \`#${message.channel.name}\`, Please ask a moderator to give me the send messages permission!`)
      } catch (err) {}
    }
    data.guild = await client.findOrCreateGuild(message.guild)
    prefixes.push(data.guild.prefix)
  }

  prefixes.push(`<@${client.user.id}> `, `<@!${client.user.id}> `)

  let prefix

  for (const thisPrefix of prefixes) {
    if (message.content.startsWith(thisPrefix)) prefix = thisPrefix
  }

  if (message.content.indexOf(prefix) !== 0) return

  console.log(prefix)
  if (prefix === `<@${client.user.id}> ` || prefix === `<@!${client.user.id}> `) {
    message.prefix = '@Woomy '
  } else {
    message.prefix = prefix
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if (message.guild && !message.member) await message.guild.fetchMember(message.author)

  const level = client.permlevel(message, data.guildSettings)

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return

  if (!cmd.conf.enabled) {
    if (data.guild.systemNotice.enabled === true) {
      return message.channel.send('This command has been disabled by my developers.')
    } else {
      return
    }
  }

  if (cmd && !message.guild && cmd.conf.guildOnly) {
    return message.channel.send('This command is unavailable via private message. Please run this command in a guild.')
  }

  if (message.guild) {
    var missing = cmd.conf.requiredPerms.filter(p => !message.channel.permissionsFor(client.user).has(p))
    if (missing.length > 0) {
      missing = '`' + (missing.join('`, `')) + '`'
      return message.channel.send(`Missing permissions: ${missing}`)
    }
  }

  // Dev perm level is separate so dev's don't get owner perms where they shouldn't have them
  if (cmd.conf.permLevel === 'Developer') {
    if (!client.config.devs.includes(message.author.id)) {
      if (data.guild.systemNotice.enabled === true) {
        return message.channel.send('You don\'t have permission to run this command!')
      } else {
        return
      }
    }
  }

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (data.guild.systemNotice.enabled === true) {
      return message.channel.send('You don\'t have permission to run this command!')
    } else {
      return
    }
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
  cmd.run(client, message, args, level, data)
}
