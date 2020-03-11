const request = require('request')
exports.run = async (client, message, args) => {
  message.channel.startTyping();

  var user = client.getUserFromMention(args[0])
  var user2 = client.getUserFromMention(args[1])
  
  var secondLength = Math.floor(user2.username.length / 2);

  var first = user.username.substr(0, user.username.length / 2)
  var second = user2.username.substr(secondLength, user2.username.length / 2)

  try {
    var attachment = new Discord.MessageAttachment(`https://api.alexflipnote.dev/ship?user=${user.avatarURL({format: "png"})}&user2=${user2.avatarURL({format: "png"})}`)
    message.channel.send(`Your ship name is **${first+second}!**`, attachment)
    message.channel.stopTyping();
  } catch(err) {
    message.channel.send(`<:error:466995152976871434> API error: ${err}`);
    message.channel.stopTyping();
  };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "ship",
  category: "Fun",
  description: "Ship two people together <3",
  usage: "ship name name2"
};

