const API = require('nekos.life');
const {sfw} = new API();
exports.run = async (client, message) => {
  message.channel.startTyping();
  try {
    sfw.fact().then((json) => {
      message.channel.send("__**Did you know?**__\n" + json.fact + ".");
      message.channel.stopTyping();
    });
  } catch (err) {
    client.logger.error("fact.js: " + err);
    message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`)
    message.channel.stopTyping();
  };
};

exports.conf = {
  enabled: true, 
  guildOnly: false,
  aliases: ["randomfact"],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "fact",
  category: "Fun",
  description: "Sends you a random fact.",
  usage: "fact"
};
