const fs = require('fs')
module.exports = client => {
  fs.readdir('./events', (err, files) => {
    if (err) {
      client.logger.fatal('Failed to get files in events directory: ' + err)
      process.exit()
    }
    client.logger.info(`Loading ${files.length} events.`)
    files.forEach(file => {
      if (!file.endsWith('.js')) {
        return
      }
      try {
        const event = require(`../events/${file}`)
        client.on(file.substr(0, file.length - 3), event.bind(null, client))
      } catch (err) {
        client.logger.error(`Failed to load ${file}: ${err}`)
      }
    })
  })
}
