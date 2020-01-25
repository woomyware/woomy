const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {

  const settings = message.settings;
  const defaults = client.config.defaultSettings;
  const overrides = client.settings.get(message.guild.id);
  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
    
    if (args[0]) {
    const joinedValue = args.join(" ");
    if (joinedValue === settings.welcomeMessage) return message.channel.send(
      "<:error:466995152976871434> The welcome message is already set to that!"
      );
		if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
    if (joinedValue === "off") {
      if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
      client.settings.set(message.guild.id, "off", "welcomeMessage");
      return message.channel.send(`<:success:466995111885144095> Welcome messages have been disabled.`);
    }
    client.settings.set(message.guild.id, joinedValue, "welcomeMessage");
    client.settings.set(message.guild.id, message.channel.id, "welcomeChannel")
    message.channel.send(`<:success:466995111885144095> Set the welcome message to \`${joinedValue}\``);
  } else {
    if (settings.welcomeMessage === "off") {
      message.channel.send(`Welcome messages are off.`)
    } else {
      message.channel.send(`The current welcome message is: \`${settings.welcomeMessage}\``)
    }
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
  name: "welcome",
  category: "Configure",
  description: "Sets the welcome message for this server. try using [[server]], [[user]] and [[members]] in your message!",
  usage: "welcome [message] **OR** welcome off"
};
