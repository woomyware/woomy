exports.run = async (client, message, args) => {

  const settings = message.settings;
  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

  modChan = message.guild.channels.cache.find(channel => channel.name === settings.modlogsChannel) || "__Disabled__";
  chatChan = message.guild.channels.cache.find(channel => channel.name === settings.chatlogsChannel) || "__Disabled__"
  greetChan = message.guild.channels.cache.get(settings.welcomeChannel) || "__Disabled__";
  prefix = settings.prefix;

  var raidMode;
  var rmDisabled = false;
  if(settings.raidMode == "off") {
    raidMode = "__Disabled__"
    rmDisabled = true;
  } else {
    raidMode = `\`${settings.raidMode}`
  }

  if(settings.raidModeStrict == "on") {
    raidMode += " (strict)`"
  } else if(rmDisabled != true) {
    raidMode += "`"
  }

  var modRole = message.guild.roles.cache.get(settings.modRole);
  var adminRole = message.guild.roles.cache.get(settings.adminRole);
  var autorole = message.guild.roles.cache.get(settings.autorole);
  var mutedRole = message.guild.roles.cache.get(settings.mutedRole);
  var blacklist = "";

  if(settings.modRole == "off" || !modRole) {
    modRole = "__None set__";
  } else {
    modRole = "`" + modRole.name + "`";
  }

  if(settings.adminRole == "off" || !adminRole) {
    adminRole = "__None set__";
  } else {
    adminRole = "`" + adminRole.name + "`";
  }

  if(settings.autorole == "off" || !autorole) {
    autorole = "__None set__";
  } else {
    autorole = "`" + autorole.name + "`";
  }

  if(settings.mutedRole == "off" || !mutedRole) {
    mutedRole = "__None set__";
  } else {
    mutedRole = "`" + mutedRole.name + "`";
  }

  if(settings.welcomeMessage == "off") {
    welcomeMessage = "__Disabled__";
  } else {
    welcomeMessage = "`" + settings.welcomeMessage + "`";
  }

  if(settings.leaveMessage == "off") {
    leaveMessage = "__Disabled__";
  } else {
    leaveMessage = "`" + settings.leaveMessage + "`";
  }

  if(settings.blacklisted == "ARRAY" || settings.blacklisted.length < 1) {
    blacklist = "__Disabled__";
  } else {
    if(settings.blacklisted.length > 0) {
      settings.blacklisted.forEach(function(user) {
        blacklist += "`" + (client.users.cache.get(user).tag || user.tag) + "`, "
      });
      blacklist = blacklist.substring(0, blacklist.length - 2);
    };
  };

    embed = new Discord.MessageEmbed()
    embed.setAuthor("Settings for: " + message.guild.name, message.guild.iconURL({dynamic: true}))
    embed.setColor(message.guild.member(client.user).displayHexColor)
    embed.setDescription("You can edit these settings using the commands in the 'configure' section of the help command.")
    embed.addFields({ name: "General:", value: `Prefix: \`${prefix}\`\nChat logging: ${chatChan}\nMod logging: ${modChan}\nRaid mode: ${raidMode}\nJoin/leave channel: ${greetChan}\nWelcome message: ${welcomeMessage}\nLeave message: ${leaveMessage}`, inline: true}, {name: "Roles:", value: `Moderator: ${modRole}\nAdministrator: ${adminRole}\nMuted: ${mutedRole}\nBlacklisted: ${blacklist}\nAutorole: ${autorole}`, inline: true})
    message.channel.send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["config"],
  permLevel: "Administrator",
  requiredPerms: []
};

exports.help = {
  name: "settings",
  category: "Configure",
  description: "View your server's settings.",
  usage: "settings"
};
