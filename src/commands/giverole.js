exports.run = async (client, message, [member, ...role2add], query) => {
  if (!member) {
    return message.channel.send(
      "<:error:466995152976871434> Who am I meant to give a role?"
    );
  }
  let user = message.mentions.members.first();
  let users;
  if (!user) {
    users = client.searchForMembers(message.guild, member);
    if (users.length > 1)
      return message.channel.send(
        "<:error:466995152976871434> Found multiple users! Please be more specific or mention the user instead."
      );
    else if (users.length == 0)
      return message.channel.send(
        "<:error:466995152976871434> That user doesn't seem to exist. Try again!"
      );
    user = users[0];
  }
  let joinedValue = role2add.join(" ");

  let gRole = client.findRole(joinedValue, message);

  if (!gRole) {
    return message.channel.send(`<:error:466995152976871434> That role doesn't seem to exist. Try again!`);
  };

  let moderator = message.guild.member(message.author)
  if (gRole.position >= moderator.roles.highest.position) {
    return message.channel.send(
      "<:error:466995152976871434> You cannot give roles higher than your own!"
    );
  }

  var bot =  message.guild.members.cache.get(client.user.id)
  if (gRole.position >= bot.roles.highest.position) {
    return message.channel.send(
      `<:error:466995152976871434> I cannot give roles higher than my own!`
    );
  }

  if (user.roles.cache.has(gRole.id)) {
    return message.channel.send(
      "<:error:466995152976871434> They already have that role!"
    );
  }
  
  await user.roles.add(gRole.id);
  message.channel.send(
    `<:success:466995111885144095> Gave \`${user.user.tag}\` the \`${gRole.name}\` role.`
  );

  if (client.getSettings(message.guild.id).modlogsChannel !== "off") {
    const channel = message.guild.channels.cache.find(
      channel => channel.name === client.getSettings(message.guild.id).modlogsChannel
    );
  
    if (channel) {
    let embed = new Discord.MessageEmbed();
      embed.setColor("#00c09a");
      embed.setAuthor("Role given:", user.user.avatarURL({format: "png", dynamic: true}));
      embed.setDescription(`‏‏‎• User: ${user} (${user.user.id})\n‏‏‎• Mod: ${message.author} (${message.author.id})\n‏‏‎• Role: ${gRole}`)
      try {
        channel.send({ embed });
      } catch (err) {
        // probably no permissions to send messages/embeds there
      };
    };
  };

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["addrole"],
  permLevel: "Moderator",
  requiredPerms: ["MANAGE_ROLES"]
};

exports.help = {
  name: "giverole",
  category: "Moderation",
  description: "Gives the user the specified role.",
  usage: "giverole [user] [role]"
};
