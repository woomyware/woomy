const request = require("request");

exports.run = async (bot, message, args) => {
  message.channel.startTyping();
  try{
    request({ uri: "https://catfact.ninja/facts", json: true }, (error, response, body) => {
      message.channel.send(`**Did you know?**\n ${body.data[0].fact}`);
      message.channel.startTyping();
    });
  } catch(err) {
    message.channel.send(`<:error:466995152976871434> API error: ${err}`);
  };
  message.channel.stopTyping();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kittenfact"],
    permLevel: "User",
    requiredPerms: []
  };
  
  exports.help = {
    name: "catfact",
    category: "Fun",
    description: "Sends a fun fact about a cat.",
    usage: "catfact/kittenfact"
  };
