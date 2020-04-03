const fs = require('fs')
module.exports = client => {
  fs.readdir('./commands', (err, files) => {
    if (err) {
      client.logger.fatal('Failed to get files in commands directory: ' + err)
      process.exit()
    }
    client.logger.info(`Loading ${files.length} commands.`)
    files.forEach(file => {
      if (!file.endsWith('.js')) {
        return
      }
      try {
        const props = require(`../commands/${file}`)
        if (props.init) {
          props.init(client)
        }
        client.commands.set(props.help.name, props)
        client.cooldown.set(props.help.name, new Map())
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.help.name)
        })
      } catch (err) {
        client.logger.error(`Failed to load ${file}: ${err}`)
      }
    })
  })
}
