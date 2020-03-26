exports.run = async (client, message, [args, ...reason], level) => {
  const settings = message.settings;

  if(!args) {
    return message.channel.send("<:error:466995152976871434> Who am I meant to mute?")
  }
    let user = message.mentions.members.first();
    let users;
    if (!user) {
      users = client.searchForMembers(message.guild, args);
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

  if (user.user.id === message.guild.ownerID) {
    return message.channel.send("<:error:466995152976871434> You can't mute the owner!")
  };
  
  let moderator = message.guild.member(message.author)
  if (message.settings.mutedRole.position >= moderator.roles.highest.position && level < 2) {
    return message.channel.send(
      "<:error:466995152976871434> The muted role is positioned above the moderator role! Please move the muted role below the moderator role."
      );
  };
  if (user.roles.highest.position >= moderator.roles.highest.position && moderator.user.id !== message.guild.ownerID) {
    return message.channel.send(
      `<:error:466995152976871434> You can't mute people who have a higher role than you!`
    );
  };

  let bot = message.guild.member(client.user)

  if (user.roles.highest.position >= bot.roles.highest.position) {
    return message.channel.send(
      `<:error:466995152976871434> I can't mute people who have a higher role than me!`
    );
  }

  var role = message.guild.roles.cache.get(settings.mutedRole);

  if (!role) {
    return message.channel.send(
      "<:error:466995152976871434> There is no muted role set for this server. Please set one using `" + message.settings.prefix + "mutedrole <role>` before using this command."
    );
  };

  if (bot.roles.highest.position <= role.position) {
    return message.channel.send(
      "<:error:466995152976871434> The muted role is above my highest role! Please move the muted role below my highest role."
      );
  };
  
  message.guild.channels.cache.forEach(async (channel, id) => {
    await channel.updateOverwrite(role, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false
    });
  });

  if (user.roles.cache.has(role.id)) {
    return message.channel.send("<:error:466995152976871434> They're already muted!")
  }

  await user.roles.add(role.id);
  message.channel.send(`<:success:466995111885144095> Muted \`${user.user.tag}\``)

  var muteReason = reason.join(" ");

  if(muteReason.length == 0) {
    muteReason = "**No reason provided.**"
  }

  if (settings.modlogsChannel !== "off") {
    const channel = message.guild.channels.cache.find(
      channel => channel.name === settings.modlogsChannel
    );

    if (channel) {
      let embed = new Discord.MessageEmbed();
      embed.setColor("#a652bb");
      embed.setAuthor("User muted!", user.user.avatarURL({format: "png", dynamic: true, size: 2048}));
      embed.setDescription(
        `• User: ${user} (${user.user.id})\n• Mod: ${message.author} (${message.author.id})\n• Reason: ${muteReason}`
      );
      try {
        channel.send(embed);
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
  name: "mute",
  category: "Moderation",
  description: "Prevents the specified user from typing.",
  usage: "mute [member] <reason>"
};
