exports.run = async (client, message, [member, ...role2add], query) => {
  if (!member) {
    return message.channel.send(
      `<:error:466995152976871434> No user specified. Usage: \`${client.commands.get(`takerole`).help.usage}\``
    );
  }
  let user = message.mentions.members.first();
  let users;
  if (!user) {
    users = client.searchForMembers(message.guild, member);
    if (users.length > 1)
      return message.channel.send(
        "<:error:466995152976871434> Found multiple users, please be more specific or mention the user instead."
      );
    else if (users.length == 0)
      return message.channel.send(
        "<:error:466995152976871434> That user doesn't seem to exist. Try again!"
      );
    user = users[0];
  }
  let role = role2add.join(" ");

  let gRole = message.guild.roles.find(r => r.name === role);
  if (!gRole) {
    return message.channel.send(`<:error:466995152976871434> That role doesn't seem to exist. Try again!`);
  }

  let moderator = message.guild.member(message.author)
  if (gRole.position >= moderator.highestRole.position) {
    return message.channel.send(
      "<:error:466995152976871434> You cannot take roles higher than your own!"
    );
  }

  var bot =  message.guild.members.get(client.user.id)
  if (gRole.position >= bot.highestRole.position) {
    return message.channel.send(
      `<:error:466995152976871434> I can't take roles higher than my own!`
    );
  }
  if (!user.roles.has(gRole.id)) {
    return message.channel.send(
      "<:error:466995152976871434> They don't have that role!"
    );
  }
  await user.removeRole(gRole.id);
  message.channel.send(
    `<:success:466995111885144095> Took the \`${gRole.name}\` role from \`${
      user.user.tag
    }\``
  );

  if (client.getSettings(message.guild.id).modlogsChannel !== "off") {
    const channel = message.guild.channels.find(
      channel => channel.name === client.getSettings(message.guild.id).modlogsChannel
    );
  
    if (channel) {
    let embed = new Discord.RichEmbed();
      embed.setColor("#008369");
      embed.setAuthor("Role taken:", user.user.avatarURL);
      embed.setDescription(`‏‏‎❯ User: ${user} (${user.user.id})\n‏‏‎❯ Mod: ${message.author} (${message.author.id})\n‏‏‎❯ Role: ${gRole}`)
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
    aliases: ["removerole"],
    permLevel: "Moderator",
    requiredPerms: ["MANAGE_ROLES"]
  };
  
  exports.help = {
    name: "takerole",
    category: "Moderation",
    description: "Takes a role from the specified user.",
    usage: "takerole [user] [role]"
  };