const Discord = require("discord.js");
const chalk = require("chalk");
module.exports = (client, guild) => {
	
	client.settings.ensure(guild.id, client.config.defaultSettings);

	if(client.devmode === true) return;
	channel = client.channels.get("458896120639127552");
	
	let embed = new Discord.RichEmbed();
		embed.setColor("#F38159");
		embed.setAuthor("Joined a new server:")
		embed.setDescription(`‏‏‎❯ Name: \`${guild.name}\`\n‏‏‎❯ Size: \`${guild.members.size}\``)
		embed.setFooter(`I'm now in ${client.guilds.size} servers!`)
	channel.send(embed);
};

