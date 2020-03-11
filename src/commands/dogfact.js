const request = require("request");

exports.run = async (bot, message, args) => {
  message.channel.startTyping();
  try{
  request({ uri: "https://dog-api.kinduff.com/api/facts", json: true }, (error, response, body) => {
    message.channel.stopTyping();
    message.channel.send(`**Did you know?**\n ${body.facts[0]}`);
  });
} catch(err) {
  message.channel.send(`<:error:466995152976871434> API error: ${err}`);
  message.channel.stopTyping();
};
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
