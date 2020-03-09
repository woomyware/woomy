exports.run = async (client, message, args) => {

  const settings = message.settings;

  if (!client.settings.has(message.guild.id)) {
    client.settings.set(message.guild.id, {});
  }

  var autorole = message.guild.roles.cache.get(settings.autorole)

  if (!args[0]) {
    if(!autorole) {
      return message.channel.send(
        `<:error:466995152976871434> There is no autorole set for this server. Please set one using \`${message.settings.prefix}autorole <role>\``
        );
    } else {
    message.channel.send(`Users recieve this role upon joining: \`${autorole.name}\``)
    }

  } else if(args.join(" ").toLowerCase() == "off") {
    if(settings.autorole == "off") {
      return message.channel.send("<:error:466995152976871434> Autoroling has not been enabled.")
    }

    client.settings.set(message.guild.id, "off", "autorole");
    return message.channel.send("<:success:466995111885144095> Autoroling has been disabled.")
  } else {
    
    const joinedValue = args.join(" ");
    if (joinedValue.length < 1) {
      return message.channel.send(
        `<:error:466995152976871434> You didn't specify a role. Usage: \`${client.commands.get(`autorole`).help.usage}\``
        );
    };
    
    if (settings.autorole != "off" && joinedValue === autorole.name) {
      return message.channel.send(
        "<:error:466995152976871434> The autorole is already set to that!"
        );
    };

    role = client.findRole(joinedValue, message);

    if (!role) {
      return message.channel.send(`<:error:466995152976871434> That role doesn't seem to exist. Try again!`);
    };

    client.settings.set(message.guild.id, role.id, "autorole");
    
    message.channel.send(
      `<:success:466995111885144095> The autorole has been set to \`${role.name}\`
      `);
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator",
  requiredPerms: ["MANAGE_ROLES"]
};

exports.help = {
  name: "autorole",
  category: "Configure",
  description: "Sets the autorole for this server.",
  usage: "autorole <role> **OR** autorole off"
};
