module.exports = client => {
  client.permlevel = message => {
    let permlvl = 0

    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1)

    while (permOrder.length) {
      const currentLevel = permOrder.shift()
      if (message.guild && currentLevel.guildOnly) continue
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level
        break
      }
    }
    return permlvl
  }

  client.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`)
      if (props.init) {
        props.init(client)
      }
      client.commands.set(props.help.name, props)
      // So commands can each have their own cooldown time
      client.cooldown.set(props.help.name, new Map())
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name)
      })
      return false
    } catch (e) {
      return `Failed to load ${commandName}: ${e}`
    }
  }

  client.unloadCommand = async (commandName) => {
    let command
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName)
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName))
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`

    if (command.shutdown) {
      await command.shutdown(client)
    }
    const mod = require.cache[require.resolve(`../commands/${command.help.name}`)]
    delete require.cache[require.resolve(`../commands/${command.help.name}.js`)]
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1)
        break
      }
    }
    return false
  }

  client.getMembers = function (guild, query) {
    if (!query) return
    query = query.toLowerCase()

    var a = []
    var b

    // MAKE IT SO IT CAN TAKE AN ID

    try {
      b = guild.members.cache.find(x => x.displayName.toLowerCase() === query)
      if (!b) guild.members.cache.find(x => x.user.username.toLowerCase() === query)
    } catch (err) {}
    if (b) a.push(b)
    guild.members.cache.forEach(member => {
      if (
        (member.displayName.toLowerCase().startsWith(query) ||
          member.user.tag.toLowerCase().startsWith(query)) &&
        member.id !== (b && b.id)
      ) {
        a.push(member)
      }
    })
    return a
  }

  client.findUser = function (query) {
    if (!query || typeof query !== "string") return
    query = query.toLowerCase()

    let user

    if (query.match(/^<@!?(\d+)>$/)) {
      let id = query.match(/^<@!?(\d+)>$/)[1]
      user = this.users.fetch(id).catch((err) => {})
      if(user) return user
    }
  }

  client.getUsers = function (guild, query) {
    if (!query) return
    query = query.toLowerCase()

    var a = []
    var b

    // MAKE IT SO IT CAN TAKE AN ID

    try {
      b = guild.members.cache.find(x => x.displayName.toLowerCase() === query)
      if (!b) guild.members.cache.find(x => x.user.username.toLowerCase() === query)
    } catch (err) {}
    if (b) a.push(b)
    guild.members.cache.forEach(member => {
      if (
        (member.displayName.toLowerCase().startsWith(query) ||
          member.user.tag.toLowerCase().startsWith(query)) &&
        member.id !== (b && b.id)
      ) {
        a.push(member)
      }
    })
    return a
  }

  // Both of these functions catch errors and log them
  process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './')
    client.logger.fatal(`Uncaught Exception: ${errorMsg}`)
    process.exit(1)
  })

  process.on('unhandledRejection', err => {
    client.logger.error(`Unhandled rejection: ${err}`)
  })
}
