exports.run = async (client, message) => {

  const settings = message.settings;

  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

  if (message.channel.name !== settings.chatlogsChannel) {
    client.settings.set(message.guild.id, message.channel.name, "chatlogsChannel")
    message.channel.send(`<:success:466995111885144095> Chat logs will now be displayed in \`${message.channel.name}\``);
  } else {
    client.settings.set(message.guild.id, "off", "chatlogsChannel")
    message.channel.send(`<:success:466995111885144095> Chat logs disabled.`);
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
  name: "chatlogs",
  category: "Configure",
  description: "Enables chat logging in your server.",
  usage: "chatlogs **OR** chatlogs off"
};
