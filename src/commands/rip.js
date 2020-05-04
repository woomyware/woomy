const fetch = require('node-fetch');
const Discord = require("discord.js")
exports.run = (client, message) => {
  message.channel.startTyping();
  try{
    fetch('http://mityurl.com/y/yKsQ/r', { redirect: 'follow' })
      .then(res => res)
      .then(res => message.channel.send(`>:] ${res.url}`))
  } catch(err) {
    message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`);
  };
  message.channel.stopTyping();
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User",
    requiredPerms: []
  };
  
  exports.help = {
    name: "rip",
    category: "Fun",
    description: "nice >:]",
    usage: "`rip`"
  };