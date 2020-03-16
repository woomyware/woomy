const request = require('request')
exports.run = async (client, message, args) => {


  //NOT FINISHED
  
  if(!args[0] || !args[1]) {
    return message.channel.send(`<:error:466995152976871434> Please include two to five users`)
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
    user = users[0];
  };

  if (!user2) {
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
    user2 = users[0];
  };
  
  var secondLength = Math.floor(user2.username.length / 2);

  var first = user.username.slice(0, user.username.length / 2)
  var second = user2.username.slice(secondLength, user2.username.length / 2)

  message.channel.send(`Your ship name is **${shipname}!**`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "ship1",
  category: "Fun",
  description: "Ship two people together <3",
  usage: "ship name name2"
};

