const isURL = require("is-url")
exports.run = async (client, message, args) => {
  var img;
  if(!args[0]) {
    if(!message.attachments.first()) {
      return message.channel.send("No attachment")
    };
    img = message.attachments.first().attachment;
  } else {
    if(isURL(args[0]) == true ) {
      img = args[0];
    } else { 
      user = message.mentions.members.first();
        
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

      if(user) {
        img = user.user.avatarURL({format: "png", dynamic: true})
      }
    }
  };

  var attachment = new Discord.MessageAttachment(`https://api.alexflipnote.dev/filter/magik?image=${img}`)
  message.channel.send(attachment)
};
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User",
    requiredPerms: []
  };
  
  exports.help = {
    name: "magikt",
    category: "Fun",
    description: "Colourifies an image",
    usage: "colourify user hex1 hex2"
  };
  