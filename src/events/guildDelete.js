const Discord = require('discord.js');
module.exports = (client, guild) => {
  client.logger.log(`Guild left.`, "info");

  if(client.devmode === true) return;
  
  if(!guild.available) {
    return;
  };
  
  channel = client.channels.cache.get("458896120639127552");
  embed = new Discord.MessageEmbed();
  embed.setColor("#9494FF");
  embed.setDescription(`Left a server. I'm now in \`${client.guilds.cache.size}\` servers.`)
  channel.send(embed)

  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  };
};
