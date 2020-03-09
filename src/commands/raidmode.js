const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {

  const settings = message.settings;
  const defaults = client.config.defaultSettings;
  const overrides = client.settings.get(message.guild.id);
  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

  var raidToggle;
  var embColour;
  var mutedRole = message.guild.roles.cache.get(settings.mutedRole)

  if(!mutedRole) {
    return message.channel.send(
      "<:error:466995152976871434> This command requires a muted role to be set! Please ask an admin or the owner to set this with `" + message.settings.prefix + "mutedrole <role>`"
      )
  }
  if(args[0] == "strict") {
    client.settings.set(message.guild.id, "on", "raidModeStrict");
    client.settings.set(message.guild.id, "on", "raidMode");
    message.channel.send(`<:success:466995111885144095> Strict raid mode enabled! New users will now be automatically kicked.`);
    raidToggle = "Strict raid mode activated!"
    embColour = "#777B7E"
  } else {
  if (settings.raidMode === "off") {
    client.settings.set(message.guild.id, "on", "raidMode")
    message.channel.send(`<:success:466995111885144095> Raid mode enabled! New users will now be automatically muted.`);
    raidToggle = "Raid mode activated!"
    embColour = "#777B7E"
  } else {
    client.settings.set(message.guild.id, "off", "raidMode")
    client.settings.set(message.guild.id, "off", "raidModeStrict");
    message.channel.send(`<:success:466995111885144095> Raid mode disabled.`);
    raidToggle = "Raid mode deactivated!"
    embColour = "#48494b"
  };
};
  if (settings.modlogsChannel !== "off") {
    const channel = message.guild.channels.cache.find(
      channel => channel.name === settings.modlogsChannel
    );

    if (channel) {
      let embed = new Discord.MessageEmbed();
      embed.setColor(embColour);
      embed.setAuthor(raidToggle, message.author.avatarURL({dynamic: true}));
      embed.setDescription(`• Mod: ${message.author} (${message.author.id})`)
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
  permLevel: "Administrator",
  requiredPerms: ["MANAGE_ROLES", "KICK_MEMBERS"]
};

exports.help = {
  name: "raidmode",
  category: "Moderation",
  description: "Enables/disables raid mode in your server, which automatically mutes new members. Strict raidmode automatically kicks new members.",
  usage: "raidmode **OR** raidmode strict"
};
