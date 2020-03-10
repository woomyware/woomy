module.exports = client => { // logs if the bot gets disconnected from discord.
	client.logger.warn(`Bot disconnected at ${new Date()}`);
};