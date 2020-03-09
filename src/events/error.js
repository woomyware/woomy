module.exports = async (client, error) => {
  client.logger.log(`d.js err: \n${JSON.stringify(error.stack)}`, "error");
};
