module.exports = async (client, error) => {
  client.logger.log(`Discord.js error: \n${JSON.stringify(error)}`, "error");
};
