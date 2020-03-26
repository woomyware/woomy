const fetch = require("node-fetch");
exports.run = async (bot, message, args) => {
  message.channel.startTyping();
  try{
    fetch('https://dog-api.kinduff.com/api/facts')
      .then(res => res.json())
      .then(json => message.channel.send(`__**Did you know?**__\n ${json.facts[0]}`));
    message.channel.stopTyping();
  } catch(err) {
    message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`);
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
