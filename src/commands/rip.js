var request = require('request');
const Discord = require("discord.js")
exports.run = (client, message) => {
  message.channel.startTyping();
  var r = request.get('http://mityurl.com/y/yKsQ/r', function (err, res, body) {
    var rip = r.uri.href
    message.channel.send(`>:] ${rip}`)
    message.channel.stopTyping();
  });
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