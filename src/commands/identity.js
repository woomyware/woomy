const identities = require ("../../resources/other/identities.json");
exports.run = async (client, message, args) => { 
  var output = "";
  if(!args[0]) {
    for (var key of Object.keys(identities)) {
      output += `${key}, `  
    };
    return message.channel.send(`__**Identities**__\n${output.slice(0, -2)}`);
  } else {  
    if(args.join(" ").toLowerCase() == "attack helicopter" || args.join(" ").toLowerCase() == "apache attack helicopter" || args.join(" ").toLowerCase() == "apache") {
      return message.channel.send({
        files: [new Discord.MessageAttachment("./resources/images/attackhelicopter.jpg")]
      });
    }
    output = identities[args.join(" ").toLowerCase()];
    if(!output) {
      return message.channel.send("<:error:466995152976871434> No results for that query.");
    };
    return message.channel.send(`__**${output.name.toProperCase()}**__\n${output.description}`);
  };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["identities"],
  permLevel: "User",
  requiredPerms: []
}; 

exports.help = {
  name: "identity",
  category: "Fun",
  description: "Gives you information about the specified identity.",
  usage: "identity [identity]"
};
