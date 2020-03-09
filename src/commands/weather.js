const weather = require("weather-js");
exports.run = async (client, message, args, error) => {
  if(!args[0]) {
    return message.channel.send(
      `<:error:466995152976871434> You didn't give me a location. Usage: \`${client.commands.get(`weather`).help.usage}\``
    );
  };
  
  if(args.join(" ").toLowerCase() == "antarctica") {
    return;
  }

  message.channel.startTyping();
	
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
		if(err) client.logger.log(`weather.js error: ${JSON.stringify(error)}`, "error")
    if(result.length < 2 || !result) {
      message.channel.stopTyping();
      return message.channel.send("<:error:466995152976871434> City not found!");
    };

    var location = result[0].location;
    var current = result[0].current;

    var warning = (`${location.alert}` || "No warnings");

    var embedColour;
    if (current.temperature < 0) {
      embedColour = "#addeff";
    }else if (current.temperature < 20) {
      embedColour = "#4fb8ff";
    }else if (current.temperature < 26) {
      embedColour = "#ffea4f";
    }else if (current.temperature < 31) {
      embedColour = "#ffa14f"
    } else {
      embedColour = "#ff614f"
    };

		embed = new Discord.MessageEmbed();
		embed.addField(`Weather for ${location.name}:`, `**Condition:** ${current.skytext}\n**Temperature:** ${current.temperature}C°\n**Feels like:** ${current.feelslike}C°\n**Humidity:** ${current.humidity}%\n**Wind:** ${current.winddisplay}\n**Warnings:** ${warning}`)
		embed.setThumbnail(current.imageUrl)
		embed.setFooter(`Last updated at ${current.observationtime} ${current.date}`)
    embed.setColor(embedColour)
    message.channel.stopTyping();
		message.channel.send(embed)
  });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User",
    requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
    name: "weather",
    category: "Utility",
    description: "Tells you the weather",
    usage: "weather [location]"
};