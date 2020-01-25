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
  if (message.settings.mutedRole.position >= moderator.highestRole.position && level < 2) {
    return message.channel.send(
      "<:error:466995152976871434> The muted role is positioned above the moderator role! Please move the muted role below the moderator role."
      );
  };
  if (user.highestRole.position >= moderator.highestRole.position && moderator.user.id !== message.guild.ownerID) {
    return message.channel.send(
      `<:error:466995152976871434> You can't mute people who have a higher role than you!`
    );
  };

  let bot = message.guild.member(client.user)

  if (user.highestRole.position >= bot.highestRole.position) {
    return message.channel.send(
      `<:error:466995152976871434> I can't mute people who have a higher role than me!`
    );
  }

  var role = message.guild.roles.get(settings.mutedRole);
  var modrole = message.guild.roles.get(settings.modRole);

  if(!role) {
    if (!modrole.id) {
      return message.channel.send(
        "<:error:466995152976871434> There is no mod role set for this server. Please set one using `" + message.settings.prefix + "modrole <role>` before using this command."
        );
    };
    let rolepos = (modrole.position)
    rolepos = rolepos-1
    try {
      role = await message.guild.createRole({
        name: "Muted",
        color: "#707fa5",
        permissions: [],
        position: rolepos
      });

    } catch(e) {
      client.logger.log(`Mute command error: \n${e}`, "error")
    };
    client.settings.set(message.guild.id, role.id, "mutedRole");
    message.channel.send("Created a `Muted` role, since your server didn't have one.")
  };

  if (bot.highestRole.position <= role.position) {
    return message.channel.send(
      "<:error:466995152976871434> The muted role is above my highest role! Please move the muted role below my highest role."
      );
  };
  
  message.guild.channels.forEach(async (channel, id) => {
    await channel.overwritePermissions(role, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false
    });
  });

  if (user.roles.has(role.id)) {
    return message.channel.send("<:error:466995152976871434> They're already muted!")
  }

  await user.addRole(role.id);
  message.channel.send(`<:success:466995111885144095> Muted \`${user.user.tag}\``)

  var muteReason = reason.join(" ");

  if(muteReason.length == 0) {
    muteReason = "**No reason provided.**"
  }

  if (settings.modlogsChannel !== "off") {
    const channel = message.guild.channels.find(
      channel => channel.name === settings.modlogsChannel
    );

    if (channel) {
      let embed = new Discord.RichEmbed();
      embed.setColor("#a652bb");
      embed.setAuthor("User muted!", user.user.avatarURL);
      embed.setDescription(
        `❯ User: ${user} (${user.user.id})\n❯ Mod: ${message.author} (${message.author.id})\n
      ❯ Reason: ${muteReason}`
      );
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
  aliases: ["stfu"],
  permLevel: "Moderator",
  requiredPerms: ["MANAGE_ROLES", "MANAGE_CHANNELS"]
};

exports.help = {
  name: "mute",
  category: "Moderation",
  description: "Prevents the specified user from typing.",
  usage: "mute [member] <reason>"
};
