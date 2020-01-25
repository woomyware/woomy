const randomColour = require("randomcolor");
exports.run = async (client, message, args, level) => {
	if(!args[0]) {
		var colour = randomColour();
	}

	if(args[0]) {
		if(args[0].startsWith('#')) {
			colour = args[0];   
		} else {
			colour = `#${args[0]}`;
		} 
		if(colour.length > 7) return message.channel.send(
      `<:error:466995152976871434> Has to be a hex code! Usage: \`${client.commands.get(`colour`).help.usage}\``
      );
		if(colour.length < 7) return message.channel.send(
      `<:error:466995152976871434> Has to be a hex code! Usage: \`${client.commands.get(`colour`).help.usage}\``
      );
	};

  embed = new Discord.RichEmbed();
  embed.setColor(colour);
  embed.setDescription(colour)
  message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["color"],
    permLevel: "User",
    requiredPerms: []
};

exports.help = {
    name: "colour",
    category: "Utility",
    description: "Gives you a random colour",
    usage: "colour <hex>"
};