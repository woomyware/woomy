const request = require('request')
exports.run = async (client, message, args) => {


  //NOT FINISHED
  
  if(!args[0] || !args[1]) {
    return message.channel.send(`<:error:466995152976871434> Please include two users`)
  }
  message.channel.startTyping();

  var user = client.getUserFromMention(args[0])
  var user2 = client.getUserFromMention(args[1])

  if (!user) {
    let users;
    users = client.searchForMembers(message.guild, args[0]);
    if (users.length > 1)
      return message.channel.send(
        "<:error:466995152976871434> Found multiple users! Please be more specific or mention the user instead."
      );
    else if (users.length == 0)
      return message.channel.send(
        "<:error:466995152976871434> That user doesn't seem to exist. Try again!"
      );
    user = users[0].user;
  };

  if (!user2) {
    let users;
    users = client.searchForMembers(message.guild, args[1]);
    if (users.length > 1)
      return message.channel.send(
        "<:error:466995152976871434> Found multiple users! Please be more specific or mention the user instead."
      );
    else if (users.length == 0)
      return message.channel.send(
        "<:error:466995152976871434> That user doesn't seem to exist. Try again!"
      );
    user2 = users[0].user;
  };
  
  var secondLength = Math.floor(user2.username.length / 2);

  var first = user.username.slice(0, secondLength - 1)
  var second = user2.username.slice(secondLength)

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
  guildOnly: true,
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

