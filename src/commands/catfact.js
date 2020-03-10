const request = require("request");

exports.run = async (bot, message, args) => {
  request({ uri: "https://catfact.ninja/facts", json: true }, (error, response, body) => {
    if (error) throw new Error(error);
    message.channel.send(`**Did you know?**\n ${body.data[0].facts}`);
  });
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
