const fetch = require("node-fetch")
exports.run = async (bot, message, args) => {
  message.channel.startTyping();
  try{
    fetch('https://catfact.ninja/facts')
      .then(res => res.json())
      .then(json => message.channel.send(`__**Did you know?**__\n${json.data[0].fact}`))
  } catch(err) {
    message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`);
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
