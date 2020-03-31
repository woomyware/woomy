module.exports = (client) => {
  client.logger.ready('Connected to Discord as ' + client.user.tag)
  client.logger.debug(client.cooldown)
}
