exports.run = async (client, message, args) => {
  if(!args[0]) {
    return message.channel.send(`<:error:466995152976871434> You didn't provide any text! Usage: \`${client.commands.get(`spoiler`).help.usage}\``)
  };

  var output = `||${[...message.cleanContent.substring(9)].join("||||")}||`;

  if(output.length > 2000) {
    output = output.slice(0, -Math.abs(output.length - 2000))
  };

  message.channel.send(output)
};

exports.conf = {
  enabled: true, 
  guildOnly: false,
  aliases: ["spoilerize", "spoiler"],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "spoilerise",
  category: "Fun",
  description: "Spoilers every letter in the provided text.",
  usage: "spoiler [text]"
};
