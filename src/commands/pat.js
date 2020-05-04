const API = require('nekos.life');
const {sfw} = new API();
exports.run = async (client, message, args) => {
  if(!args[0]) {
    return message.channel.send(`<:error:466995152976871434> You didn't say who you wanted to pat! Usage: \`${client.commands.get(`pat`).help.usage}\``)
  };

  var people = "";

  for (var i = 0; i < args.length; i++) {
    var user = client.getUserFromMention(args[i])
    if (user) {
      user = message.guild.members.cache.get(user.id).displayName;
    } else {
      users = client.searchForMembers(message.guild, args[i]);
      if (users.length > 1)
        return message.channel.send(
          "<:error:466995152976871434> Found multiple users for `" + args[i] + "`, Please be more specific or mention the user instead."
        );
      else if (users.length == 0)
        return message.channel.send(
          "<:error:466995152976871434> That user doesn't seem to exist. Try again!"
        );
      user = users[0].displayName;
    };
    if(i+1 == args.length && args.length > 1) {
      people += `**and** ${user}!`
    } else if(args.length < 2) {
      people += `${user}!`;
    } else if(args.length == 2 && i == 0) {
      people += `${user} `;
    } else {
      people += `${user}, `;
    };
  };



  message.channel.startTyping();
  try {
    sfw.pat().then((json) => {
      embed = new Discord.MessageEmbed();
      embed.setImage(json.url)
      embed.setColor(client.embedColour(message));
      embed.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** patted **${people}**`)
      message.channel.send(embed)
      message.channel.stopTyping();
    });
  } catch (err) {
    client.logger.error("pat.js: " + err);
    message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`)
    message.channel.stopTyping();
  };
};

exports.conf = {
  enabled: true, 
  guildOnly: true,
  aliases: ["headpat"],
  permLevel: "User",
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "pat",
  category: "Action",
  description: "pat someone!",
  usage: "pat [@user/user] (you can pat as many people as you want!)"
};
