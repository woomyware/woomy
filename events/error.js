module.exports = async (client, error) => {
  client.logger.error(JSON.stringify(error.stack))
}
