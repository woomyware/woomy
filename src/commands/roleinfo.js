const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  if (!args[0])
  return message.channel.send(
    `<:error:466995152976871434> You didn't provide me with a role name or ID! Usage: \`${client.commands.get(`roleinfo`).help.usage}\``
  );

  let role = client.findRole(args.join(" "), message);

  if (!role) {
    return message.channel.send(`<:error:466995152976871434> That role doesn't seem to exist. Try again!`);
  };

  if(!role) {
    return message.channel.send(`<:error:466995152976871434> Role not found.`)
  }

  var permissions = "```";
  if(role.permissions.has("ADMINISTRATOR")) permissions += "ADMINISTRATOR, ";
  if(role.permissions.has("CREATE_INSTANT_INVITE")) permissions += "CREATE_INSTANT_INVITE, ";
  if(role.permissions.has("KICK_MEMBERS")) permissions += "KICK_MEMBERS, ";
  if(role.permissions.has("BAN_MEMBERS")) permissions += "BAN_MEMBERS, ";
  if(role.permissions.has("MANAGE_CHANNELS")) permissions += "MANAGE_CHANNELS, ";
  if(role.permissions.has("MANAGE_GUILD")) permissions += "MANAGE_GUILD, ";
  if(role.permissions.has("ADD_REACTIONS")) permissions += "ADD_REACTIONS, ";
  if(role.permissions.has("VIEW_AUDIT_LOG")) permissions += "VIEW_AUDIT_LOG, ";
  if(role.permissions.has("PRIORITY_SPEAKER")) permissions += "PRIORITY_SPEAKER, ";
  if(role.permissions.has("STREAM")) permissions += "STREAM, ";
  if(role.permissions.has("VIEW_CHANNEL")) permissions += "VIEW_CHANNEL, ";
  if(role.permissions.has("SEND_MESSAGES")) permissions += "SEND_MESSAGES, ";
  if(role.permissions.has("SEND_TTS_MESSAGES")) permissions += "SEND_TTS_MESSAGES, ";
  if(role.permissions.has("MANAGE_MESSAGES")) permissions += "MANAGE_MESSAGES, ";
  if(role.permissions.has("EMBED_LINKS")) permissions += "EMBED_LINKS, ";
  if(role.permissions.has("ATTACH_FILES")) permissions += "ATTACH_FILES, ";
  if(role.permissions.has("READ_MESSAGE_HISTORY")) permissions += "READ_MESSAGE_HISTORY, ";
  if(role.permissions.has("MENTION_EVERYONE")) permissions += "MENTION_EVERYONE, ";
  if(role.permissions.has("USE_EXTERNAL_EMOJIS")) permissions += "USE_EXTERNAL_EMOJIS, ";
  if(role.permissions.has("CONNECT")) permissions += "CONNECT, ";
  if(role.permissions.has("SPEAK")) permissions += "SPEAK, ";
  if(role.permissions.has("MUTE_MEMBERS")) permissions += "MUTE_MEMBERS, ";
  if(role.permissions.has("DEAFEN_MEMBERS")) permissions += "DEAFEN_MEMBERS, ";
  if(role.permissions.has("MOVE_MEMBERS")) permissions += "MOVE_MEMBERS, ";
  if(role.permissions.has("USE_VAD")) permissions += "USE_VAD, ";
  if(role.permissions.has("CHANGE_NICKNAME")) permissions += "CHANGE_NICKNAME, ";
  if(role.permissions.has("MANAGE_NICKNAMES")) permissions += "MANAGE_NICKNAMES, ";
  if(role.permissions.has("MANAGE_ROLES")) permissions += "MANAGE_ROLES, ";
  if(role.permissions.has("MANAGE_WEBHOOKS")) permissions += "MANAGE_WEBHOOKS, ";
  if(role.permissions.has("MANAGE_EMOJIS")) permissions += "MANAGE_EMOJIS, ";
  permissions = permissions.slice(0, -2);
  permissions += "```";

  var embed = new Discord.MessageEmbed();
  embed.setColor(role.color);
  embed.setTitle(role.name);
  embed.setDescription(
    `• **ID:** ${role.id}\n• **Hex:** ${role.hexColor}\n• **Members:** ${role.members.size}\n• **Position:** ${role.position}\n• **Hoisted:** ${role.hoist}`
  );
  embed.addField(`**Permissions:**`, permissions)
  message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rinfo"],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "roleinfo",
  category: "Utility",
  description: "Gives information about a role.",
  usage: "roleinfo [role]"
};