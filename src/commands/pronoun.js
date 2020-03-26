const pronouns = require ("../../resources/other/pronouns.json");
exports.run = async (client, message, args) => { 
  var output = "";
  if(!args[0]) {
    for (var key of Object.keys(pronouns)) {
      output += `${key}, `  
    };
    return message.channel.send(`__**Pronouns:**__\n${output.slice(0, -2)}`);
  } else {
    if(args.join(" ").toLowerCase() == "attack helicopter" || args.join(" ").toLowerCase() == "apache attack helicopter" || args.join(" ").toLowerCase() == "apache") {
      return message.channel.send({
        files: [new Discord.MessageAttachment("./resources/images/attackhelicopter.jpg")]
      });
    };
    output = pronouns[args.join(" ").toLowerCase()];
    if(!output) {
      return message.channel.send("<:error:466995152976871434> No results for that query.");
    };
    return message.channel.send(`__**Example sentences using ${output.name}:**__\n${output.examples}`);
  };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pronouns"],
  permLevel: "User",
  requiredPerms: []
}; 

exports.help = {
  name: "pronoun",
  category: "Fun",
  description: "Gives you information on how to use the specified pronoun.",
  usage: "pronoun [pronoun]"
};
