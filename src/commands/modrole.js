exports.run = async (client, message, args) => {

  const settings = message.settings;

  if (!client.settings.has(message.guild.id)) {
    client.settings.set(message.guild.id, {});
  }

  var modRole = message.guild.roles.cache.get(settings.modRole)

  if (!args[0]) {
    if(!modRole) {
      return message.channel.send(
        "<:error:466995152976871434> There is no mod role set for this server. Please set one using `" + message.settings.prefix + "modrole <role>`"
        )
    } else {
    message.channel.send(`The current mod role is: \`${modRole.name}\``)
    }

  } else {
    const joinedValue = args.join(" ");
    if (joinedValue.length < 1) {
      return message.channel.send(
        `<:error:466995152976871434> You didn't specify a role. Usage: \`${client.commands.get(`modrole`).help.usage}\``
        );
    };
    
    if (settings.modRole != "None set" && joinedValue === modRole.name) {
      return message.channel.send(
        "<:error:466995152976871434> The mod role is already set to that!"
        );
    };

    let role = client.findRole(joinedValue, message);

    if (!role) {
      return message.channel.send(`<:error:466995152976871434> That role doesn't seem to exist. Try again!`);
    };

    client.settings.set(message.guild.id, role.id, "modRole");
    
    message.channel.send(
      `<:success:466995111885144095> The mod role has been set to \`${role.name}\`
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
  name: "modrole",
  category: "Configure",
  description: "Sets the mod role for this server.",
  usage: "modrole <role>"
};