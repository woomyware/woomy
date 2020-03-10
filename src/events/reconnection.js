module.exports = client => { // logs when the bot reconnects to discord
	client.logger.info(`Reconnecting at ${new Date()}`);
};