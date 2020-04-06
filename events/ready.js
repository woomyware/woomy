const moment = require('moment')
module.exports = (client) => {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  const activities = client.commands.keyArray()
  let activity = activities.random()

  client.user.setActivity(`${client.config.defaultPrefix + activity} | v${client.version.number}`, { type: 'PLAYING' })

  setInterval(() => {
    activity = activities.random()
    if (client.lockActivity === false) {
      client.user.setActivity(`${client.config.defaultPrefix + activity} | v${client.version.number}`, { type: 'PLAYING' })
    };
  }, 20000)

  // REMOVE ! IN FRONT OF CLIENT.CONFIG.SUPPORT.ID WHEN DEVMODE WORKS

  if (!client.config.support.id && client.config.support.startupLogs && client.devmode === false) {
    try {
      const guild = client.guilds.cache.get(client.config.support.id)
      const channel = guild.channels.cache.get(client.config.support.startupLogs)
      channel.send(`Bot started at \`${timestamp}\``)
    } catch (err) {}
  }

  client.logger.ready('Connected to Discord as ' + client.user.tag)
}
