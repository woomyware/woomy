exports.run = async (client, message, [colour, ...givenRole], query) => {
    let role = givenRole.join(" ");

    let gRole = client.findRole(role, message);

    if (!gRole) {
      return message.channel.send(`<:error:466995152976871434> That role doesn't seem to exist. Try again!`);
    };

    if(!colour.startsWith('#')) {
      colour = `#`+colour;
    }
    if(colour.length > 7) return message.channel.send(
      `<:error:466995152976871434> Colour has to be a hex code. Usage: \`${client.commands.get(`rolecolour`).help.usage}\``
      );
    if(colour.length < 7) return message.channel.send(
      `<:error:466995152976871434> Colour has to be a hex code. Usage: \`${client.commands.get(`rolecolour`).help.usage}\``
      );

  let moderator = message.guild.member(message.author)
  if (gRole.position >= moderator.roles.highest.position) {
    return message.channel.send(
      "<:error:466995152976871434> You cannot modify roles higher than your own!"
    );
  }

  var bot =  message.guild.members.cache.get(client.user.id)
  if (gRole.position >= bot.roles.highest.position) {
    return message.channel.send(
      `<:error:466995152976871434> I cannot modify roles higher than my own!`
    );
  }
  
  await gRole.edit({color: colour})
  message.channel.send(
    `<:success:466995111885144095> The colour of the role \`${gRole.name}\` has been set to \`${colour}\``);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rolecolor"],
  permLevel: "Moderator",
  requiredPerms: ["MANAGE_ROLES"]
};

exports.help = {
  name: "rolecolour",
  category: "Utility",
  description: "Sets the colour of a role to the specified hex.",
  usage: "rolecolour [hex] [role]"
};
