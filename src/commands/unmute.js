exports.run = async (client, message, args, level) => {
  const settings = message.settings;

  if(!args[0]) {
    return message.channel.send("<:error:466995152976871434> Who am I meant to unmute?")
  }
    let user = message.mentions.members.first();
    let users;
    if (!user) {
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
    }
  if (user.user.id === client.user.id) {
    return message.channel.send("lol no")
  }
  if (user.user.id === message.guild.owner.id) {
    return message.channel.send("<:error:466995152976871434> You can't unmute the owner!")
  }

  let moderator = message.guild.member(message.author)
  if (message.settings.mutedRole.position >= moderator.highestRole.position && level < 2) {
    return message.channel.send(
      "<:error:466995152976871434> The muted role is positioned above the moderator role! Please move the muted role below the moderator role."
      );
  }
  if (user.highestRole.position >= moderator.highestRole.position && moderator.user.id !== message.guild.ownerID) {
    return message.channel.send(
      `<:error:466995152976871434> You can't unmute people who have a higher role than you!`
    );
  };
  let bot = message.guild.member(client.user)
  if (user.highestRole.position >= bot.highestRole.position) {
    return message.channel.send(
      `<:error:466995152976871434> I can't unmute people who have a higher role than me!`
    );
  }

  let role = message.guild.roles.get(settings.mutedRole)
  if(!role) {
    return message.channel.send(
      "<:error:466995152976871434> Mute role not found! Please set one using `~settings edit mutedRole <role>`"
      );
  }

  if (!user.roles.has(role.id)) {
    return message.channel.send("<:error:466995152976871434> They aren't muted!")
  }

  await user.removeRole(role.id);
  message.channel.send(`<:success:466995111885144095> Unmuted \`${user.user.tag}\``)

  
  if (settings.modlogsChannel !== "off") {
    const channel = message.guild.channels.find(
      channel => channel.name === settings.modlogsChannel
    );

    if (channel) {
      let embed = new Discord.RichEmbed();
      embed.setColor("#7a2f8f");
      embed.setAuthor("User unmuted!", user.user.avatarURL);
      embed.setDescription(`❯ User: ${user} (${user.user.id})\n❯ Mod: ${message.author} (${message.author.id})`)
      try {
        channel.send({ embed });
      } catch (err) {
        // probably no permissions to send messages/embeds there
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: ["MANAGE_ROLES", "MANAGE_CHANNELS"]
};

exports.help = {
  name: "unmute",
  category: "Moderation",
  description: "Allows a muted user to type again.",
  usage: "unmute [user]"
};
