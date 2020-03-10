const Discord = require("discord.js");

exports.run = (client, message, args) => {
  var user;
  var guild;
  var nick = "";
  var roles = "";
  var presence = "";
  var badges = "";
  var status;
  var createdAt;
  var avurl;
  var tag;
  var id;
  var bot;

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

    if(user.user.id == message.guild.ownerID) {
      badges += "<:owner:685703193694306331>"
    }

    if(user.user.bot) {
      badges += "<:bot:686489601678114859>"
    }

    if(badges.length > 0) {
      badges += "\n"
    }
    
    createdTimestamp = user.user.createdTimestamp;
    var date = new Date(createdTimestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "o" + date.getSeconds();
    console.log(date)

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

  if(user.presence.status == "online") {
    status = `online <:status_online:685462758023626762>`
  };

  if(user.presence.status == "idle") {
    status = `idle <:status_idle:685462771529154561>`
  };

  if(user.presence.status == "dnd") {
    status = `do not disturb <:status_dnd:685462782963220495>`
  };

  if(user.presence.status == "offline") {
    status = `offline <:status_offline:685462758229016633>`
  };

  if(user.presence.activities[0]) {
    presence = "\n• **Presence:** ";
    if(user.presence.activities[0].type == "PLAYING") {
      presence += `Playing ${user.presence.activities[0].name}`;
    };

    if(user.presence.activities[0].type == "STREAMING") {
      presence += `Streaming ${user.presence.activities[0].name}`;
    };

    if(user.presence.activities[0].type == "CUSTOM_STATUS") {
      presence += `${user.presence.activities[0].state}`;
    };
  };

  embed = new Discord.MessageEmbed();
  embed.setTitle(tag);
  embed.setThumbnail(avurl);
  embed.setDescription(`${badges}• **ID:** ${id}${nick}\n• **Status:** ${status}${presence}${guild}\n• **Account created:** ${createdAt}`)
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
