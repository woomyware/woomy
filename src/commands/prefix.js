exports.run = async (client, message, args) => {
  if(client.devmode === true) {
    return message.channel.send(
      "<:error:466995152976871434> This command has been disabled because Woomy is in development mode."
      );
  };

  const settings = message.settings;

  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
    
    if (args[0]) {
    const joinedValue = args.join(" ");
    if (joinedValue === settings.prefix) return message.channel.send("<:error:466995152976871434> The prefix is already set to that!");
		if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
    client.settings.set(message.guild.id, joinedValue, "prefix");
    message.channel.send(`<:success:466995111885144095> Set the prefix to \`${joinedValue}\``);
  } else {
      message.channel.send(`The current prefix is: \`${settings.prefix}\``)
    }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator",
  requiredPerms: []
};

exports.help = {
  name: "prefix",
  category: "Configure",
  description: "Sets the prefix for this server.",
  usage: "prefix [prefix]"
};
