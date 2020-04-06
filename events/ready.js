module.exports = (client) => {
  const activities = client.commands.keyArray()
  let activity = activities.random()

  client.user.setActivity(`${client.config.defaultPrefix + activity} | v${client.version.number}`, { type: 'PLAYING' })

  setInterval(() => {
    activity = activities.random()
    if (client.lockActivity === false) {
      client.user.setActivity(`${client.config.defaultPrefix + activity} | v${client.version.number}`, { type: 'PLAYING' })
    };
  }, 30000)

  client.logger.ready('Connected to Discord as ' + client.user.tag)
}
