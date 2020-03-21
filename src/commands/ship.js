const request = require('request')
exports.run = async (client, message, args) => {


  //NOT FINISHED
  
  if(!args[0] || !args[1]) {
    return message.channel.send(`<:error:466995152976871434> Please include two users`)
  }
  message.channel.startTyping();

  let users = [];
  let totalLength = 0;

  for(let i = 0; i < args.length; i++) {
    let arg = args[i];

    let user = client.getUserFromMention(arg);

    if(!user) {
      let usersFound;
      usersFound = client.searchForMembers(message.guild, arg);
      if (usersFound.length > 1)
        return message.channel.send(
          "<:error:466995152976871434> Found multiple users! Please be more specific or mention the user instead."
        );
      else if (usersFound.length == 0)
        return message.channel.send(
          "<:error:466995152976871434> That user doesn't seem to exist. Try again!"
        );
      user = usersFound[0].user;
    }

    users.push(user);
    totalLength += user.username.length;
  }

  let lengthPerUser = Math.floor(totalLength / users.length);

  let finalName = '';

  let last = -1;

  for(let i = 0; i < users.length; i++) {
    let user = users[i];
    let l = Math.min(lengthPerUser, user.username.length);

    let p = user.username.substr(last + 1, last + l);

    console.log(p);

    finalName = finalName + p;

    last = last + l;
  };

  console.log(totalLength);
  console.log(users.length);
  console.log(lengthPerUser);
  console.log(finalName);

  try {
    //var attachment = new Discord.MessageAttachment(`https://api.alexflipnote.dev/ship?user=${user.avatarURL({format: "png"})}&user2=${user2.avatarURL({format: "png"})}`)
    message.channel.send(`Your ship name is **${finalName}!**`)
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

