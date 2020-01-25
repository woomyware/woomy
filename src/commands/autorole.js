exports.run = async (client, message, args) => {

  const settings = message.settings;

  if (!client.settings.has(message.guild.id)) {
    client.settings.set(message.guild.id, {});
  }

  if(!message.channel.permissionsFor(client.user).has("MANAGE_ROLES")) {
    return message.channel.send("<:error:466995152976871434> This command requires the `manage roles` permission to work.")
  }

  var autorole = message.guild.roles.get(settings.autorole)

  if (!args[0]) {
    if(!autorole) {
      return message.channel.send(
        `<:error:466995152976871434> There is no autorole set for this server. Please set one using \`${message.settings.prefix}autorole <role>\``
        );
    } else {
    message.channel.send(`Users recieve this role upon joining: \`${autorole.name}\``)
    }

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

    let roleExists = message.guild.roles.find(r => r.name === args.join(" "));
    if (!roleExists) {
        return message.channel.send(
        "<:error:466995152976871434> The specified role does not exist."
        );
		}

    client.settings.set(message.guild.id, roleExists.id, "autorole");
    
    message.channel.send(
      `<:success:466995111885144095> The autorole has been set to \`${joinedValue}\`
      `);
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator",
  requiredPerms: []
};

exports.help = {
  name: "autorole",
  category: "Configure",
  description: "Sets the autorole for this server.",
  usage: "autorole <role> **OR** autorole off"
};
