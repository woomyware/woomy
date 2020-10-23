const Discord = require("discord.js");
const coolPeople = require('../../resources/other/coolpeople.json')
exports.run = (client, message, args) => {
  var user, guild, createdAt, avurl, tag, id;
  var nick = "", roles = "", badges = "";
  var coolPerson = false;
  var friendos = coolPeople.coolPeople;

  if(message.guild) {
    user = message.mentions.members.first();

    if(!args[0]) {
      user = message.guild.members.cache.get(message.author.id)
    };

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

    if(user.nickname) {
      nick = `\n• **Nickname:** ${user.nickname}`;
    };

    for (var i = 0; i < friendos.length; i++) {
      if (user.user.id == friendos[i])
      coolPerson = true;
    };

    if(coolPerson == true) {
      badges += "🌟"
    }

    if(user.user.id == message.guild.ownerID) {
      badges += "<:owner:685703193694306331>"
    }

    if(user.user.bot) {
      badges += "<:bot:686489601678114859>"
    }
  

    if(badges.length > 0) {
      badges += "\n"
    }

    user.roles.cache.forEach((role) => {
      roles = roles + role.name + "`, `"
    });

    roles = roles.substr(0, roles.length -4);

    guild = `\n• **Roles:** \`${roles}\`\n• **Server join date:** ${user.joinedAt}`;

    id = user.user.id;
    tag = user.user.tag;
    colour = user.displayHexColor;
    avurl = user.user.avatarURL({format: "png", dynamic: true, size: 2048});
    createdAt = user.user.createdAt;
  } else {
    id = user.id;
    tag = user.tag;
    colour = ["#ff9d68", "#ff97cb", "#d789ff", "#74FFFF"].random();
    avurl = user.avatarURL({format: "png", dynamic: true, size: 2048});
    createdAt = user.createdAt;
  };

  embed = new Discord.MessageEmbed();
  embed.setTitle(tag);
  embed.setThumbnail(avurl);
  embed.setDescription(`${badges}• **ID:** ${id}${nick}${guild}\n• **Account created:** ${createdAt}`)
  embed.setColor(colour);
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
