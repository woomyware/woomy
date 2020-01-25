const Discord = require("discord.js");

exports.run = (client, message, args) => {

  var user;
  var nickString = "";
  var guildString = "";
  var tag;
  var id;
  var createdAt;
  var colour;
  var avatarURL;

  if(message.guild) {

    user = message.mentions.members.first();

    if(!args[0]) {
      user = message.guild.members.get(message.author.id)
    }
  
    if (!user) {
      var users;
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

    if (!user.nickname) {
      nickString = "";
    } else {
      nickString = `**Nickname:** ${user.nickname}\n`;
    };

    var roleList = "`";
    let roles = user.roles;
    roles.forEach((role) => { roleList = roleList + role.name + "`, `"; });
    roleList = roleList.substring(0, roleList.length - 4);
    roleList += "`";

    guildString = `\n **Roles:** ${roleList}\n**Guild Join Date:** ${user.joinedAt}`
    
    tag = user.user.tag;
    id = user.user.id;
    createdAt = user.user.createdAt;
    colour = user.displayHexColor
    avatarURL = user.user.avatarURL
  } else {
    user = message.author;

    tag = user.tag;
    id = user.id;
    createdAt = user.createdAt;
    colour = ["#ff9d68", "#ff97cb", "#d789ff", "#74FFFF"].random();
    avatarURL = user.avatarURL;
  };

  let isBot = user.bot;

  if (isBot === true) {
    isBot = "Yes";
  } else {
    isBot = "No";
  };

  if (!user.presence.game) {
    gameString = "";
  } else {
    gameString = `\n**Playing:** ${user.presence.game}`;
  };

  embed = new (require("discord.js")).RichEmbed();
  embed.setTitle(tag)
  embed.setDescription(
    `${nickString}**ID:** ${id}\n**Bot:** ${isBot}\n**Status:** ${user.presence.status}${gameString}${guildString}\n**Discord Join Date:** ${createdAt}`
  );
  embed.setColor(colour);
  embed.setThumbnail(avatarURL);
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["uinfo", "user"],
  permLevel: "User",
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "userinfo",
  category: "Utility",
  description: "Displays some useful information about the specified user.",
  usage: "userinfo <user>"
};
