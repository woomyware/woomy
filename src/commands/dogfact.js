const request = require("request");

exports.run = async (bot, message, args) => {
  request({ uri: "https://dog-api.kinduff.com/api/facts", json: true }, (error, response, body) => {
    if (error) throw new Error(error);
    message.channel.send(`**Did you know?**\n ${body.facts[0]}`);
  });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["pupfact"],
    permLevel: "User",
    requiredPerms: []
  };
  
  exports.help = {
    name: "dogfact",
    category: "Fun",
    description: "Sends a fun fact about a doggo.",
    usage: "dogfact/pupfact"
  };
