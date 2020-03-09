const randomColour = require("randomcolor");
exports.run = async (client, message, args, level) => {
  var colour;
	if(!args[0]) {
		colour = randomColour();
	} else if(isHex(args.join(" ")) != true) {
    colour = stringToHex(args.join(" "));
  } else {
    colour = args[0]
  }

  embed = new Discord.MessageEmbed();
  embed.setTitle(colour)
  embed.setColor(colour);
  embed.setImage("https://api.alexflipnote.xyz/colour/image/" + colour.replace("#", ""));
  message.channel.send(embed)
};

function isHex(string) {
  var str = string;
  if(str.charAt(0) == "#") {
    str = str.slice(1)
  };

  return typeof str === 'string'
      && str.length === 6
      && !isNaN(Number('0x' + str))
}

function stringToHex(string) {
  var hash = 0;
  for (var i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
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
    usage: "colour <hex> **OR** colour <text>"
};