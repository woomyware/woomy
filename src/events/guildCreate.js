const Discord = require("discord.js");
module.exports = (client, guild) => {
	client.logger.log(`Guild joined.`, "info");
	
	client.settings.ensure(guild.id, client.config.defaultSettings);

	if(client.devmode == false) {
		channel = client.channels.cache.get("458896120639127552");
		embed = new Discord.MessageEmbed();
		embed.setColor("#F38159");
		embed.setDescription(`Joined a new server with \`${guild.members.cache.size}\` members! I'm now in \`${client.guilds.cache.size}\` servers.`)
		channel.send(embed)
	};
};

