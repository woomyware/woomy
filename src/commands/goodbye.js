exports.run = async (client, message, args, level) => {

  const settings = message.settings;
  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
    
    if (args[0]) {
    const joinedValue = args.join(" ");
    if (joinedValue === settings.welcomeMessage) return message.channel.send(
      "<:error:466995152976871434> The leave message is already set to that!"
      );
		if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
    if (joinedValue === "off") {
      if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
      client.settings.set(message.guild.id, "off", "leaveMessage");
      return message.channel.send(`<:success:466995111885144095> Leave messages have been disabled.`);
    }
    client.settings.set(message.guild.id, joinedValue, "leaveMessage");
    client.settings.set(message.guild.id, message.channel.id, "welcomeChannel")
    message.channel.send(`<:success:466995111885144095> Set the leave message to \`${joinedValue}\``);
  } else {
    if (settings.leaveMessage === "off") {
    message.channel.send(`Leave messages are off.`)
  } else {
    message.channel.send(`The current leave message is: \`${settings.leaveMessage}\``)
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
  name: "goodbye",
  category: "Configure",
  description: "Sets the leave message for this server. try using [[server]], [[user]] and [[members]] in your message!",
  usage: "goodbye <message> **OR** goodbye off"
};
