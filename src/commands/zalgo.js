const zalgo = require("to-zalgo")
exports.run = async (client, message, args) => {
    if(!args[0]) {
      return message.channel.send(`<:error:466995152976871434> You didn't provide any text! Usage: \`${client.commands.get(`zalgo`).help.usage}\``)
    };
  
    var output = zalgo(args.join(" "))
  
    if(output.length > 2000) {
      output = output.slice(0, -Math.abs(output.length - 2000))
    };
  
    message.channel.send(output)
  };
  
  exports.conf = {
    enabled: false, 
    guildOnly: false,
    aliases: [],
    permLevel: "User",
    requiredPerms: []
  };
  
  exports.help = {
    name: "zalgo",
    category: "Fun",
    description: "Spoilers every letter in the provided text.",
    usage: "zalgo [text]"
  };
  