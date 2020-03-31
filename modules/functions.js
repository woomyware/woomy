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

  process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './')
    client.logger.fatal(`Uncaught Exception: ${errorMsg}`)
    process.exit(1)
  })

  process.on('unhandledRejection', err => {
    client.logger.error(`Unhandled rejection: ${err}`)
  })
}
