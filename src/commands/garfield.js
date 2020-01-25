const garfield = require("garfield");
exports.run = async (client, message) => {  
  message.channel.send({ files: [garfield.random()] }).catch(() => message.channel.send(
    "<:error:466995152976871434> API didn't respond, try again in a few seconds."
  ));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: ["ATTACH_FILES"]
};

exports.help = {
  name: "garfield",
  category: "Fun",
  description: "Sends you a random garfield comic",
  usage: "garfield"
};
