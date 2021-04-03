exports.run = (client, message, args) => {
  if (!args[0])
    return message.channel.send(
      `<:error:466995152976871434> No username provided. Usage: \`${client.commands.get(`msearch`).help.usage}\``
    );
  var mlist = "";
  var count = 0;
  client.searchForMembers(message.guild, args[0]).forEach((member) => {
    if (member) {
      mlist += `\`${member.user.tag}\``;
      count = count + 1;
    }
    mlist += "**, **";
  });
  mlist = mlist.substring(0, mlist.length - 6);

  var mlist1 = `Found ${count} users:\n` + mlist;

  if (!mlist1) {
    return message.channel.send("<:error:466995152976871434> No users found!");
  }

  message.channel.send(mlist1);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "msearch",
  category: "Utility",
  description: "Search for server members.",
  usage: "msearch [user]"
};