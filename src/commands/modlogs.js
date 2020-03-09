exports.run = async (client, message) => {
  const settings = message.settings;
  
  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

  if (message.channel.name !== settings.modlogsChannel) {
    client.settings.set(message.guild.id, message.channel.name, "modlogsChannel")
    message.channel.send(`<:success:466995111885144095> Mod logs will now be displayed in \`${message.channel.name}\``);
  } else {
    client.settings.set(message.guild.id, "off", "modlogsChannel")
    message.channel.send(`<:success:466995111885144095> Mod logging disabled.`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator",
  requiredPerms: []
};

exports.help = {
  name: "modlogs",
  category: "Configure",
  description: "Enables mod action logging in your server.",
  usage: "modlogs **OR** modlogs off"
};
