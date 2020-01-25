const Discord = require("discord.js");
const chalk = require('chalk');
module.exports = (client, guild) => {
  client.logger.log(chalk.redBright(`Guild left.`), "cmd");

  if(client.devmode === true) return;
  
  if(!guild) {
    return;
  }
  
  channel = client.channels.get("458896120639127552");

	let embed = new Discord.RichEmbed();
    embed.setColor("#9494FF");
		embed.setAuthor("Left a server:")
		embed.setDescription(`‏‏‎❯ Name: \`${guild.name}\``)
		embed.setFooter(`I'm now in ${client.guilds.size} servers.`)
  channel.send(embed);

  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }
};
