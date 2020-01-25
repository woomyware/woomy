exports.run = async (client, message, [action, ...member]) => {
  const settings = message.settings;
  
  if(settings.blacklisted == "ARRAY") {
    await client.settings.set(message.guild.id, [], "blacklisted");
  }

  if(!action) {
    return message.channel.send(
      `<:error:466995152976871434> You didn't tell me if I was meant to add or remove someone from the blacklist! Usage: \`${client.commands.get(`blacklist`).help.usage}\``
    )
  }

  member = member.join(" ")

  if(!member) {
    return message.channel.send(
      `<:error:466995152976871434> You didn't tell me who to blacklist! Usage: \`${client.commands.get(`blacklist`).help.usage}\``
    );
  };

  let user = message.mentions.members.first();

  if(action == "add") {
    if (!user) {
      let users;
      users = client.searchForMembers(message.guild, member);
      if (users.length > 1)
        return message.channel.send(
          "<:error:466995152976871434> Found multiple users! Please be more specific or mention the user instead."
        );
      else if (users.length == 0)
        return message.channel.send(
          "<:error:466995152976871434> That user doesn't seem to exist. Try again!"
        );
      user = users[0];
    };

      if(user.id === client.user.id) {
        return message.channel.send('lol no');
      };

      if (user.id === message.guild.owner.id) {
        return message.channel.send("<:error:466995152976871434> You can't blacklist the owner!")
      };

      let admin = message.guild.member(message.author)
      if (user.highestRole.position >= admin.highestRole.position && admin.user.id !== message.guild.ownerID) {
        return message.channel.send(
          `<:error:466995152976871434> You can't blacklist people higher ranked than yourself!`
        );
      };
    
      if(user.id === message.member.id) {
        return message.channel.send('<:error:466995152976871434> You can\'t blacklist yourself!');
      };

      let blacklisted = false;

      if(settings.blacklisted.length > 0) {
        settings.blacklisted.forEach(function(ID) {
          if(ID == user.id) {
            blacklisted = true;
          }
        });

        if(blacklisted == true) {
          return message.channel.send('<:error:466995152976871434> This person has already been blacklisted!');
        };
      };

      client.settings.push(message.guild.id, user.id, "blacklisted")
      
      return message.channel.send(`<:success:466995111885144095> Blacklisted \`${user.user.tag}\``)
  };


  if (action == "remove") {
    if (!user) {
      let users;
      users = client.searchForMembers(message.guild, member);
      if (users.length > 1)
        return message.channel.send(
          "<:error:466995152976871434> Found multiple users! Please be more specific or mention the user instead."
        );
      else if (users.length == 0)
        return message.channel.send(
          "<:error:466995152976871434> That user doesn't seem to exist. Try again!"
        );
      user = users[0];
    };

    let blacklisted = false;

    settings.blacklisted.forEach(function(ID) {
      if(ID == user.id) {
        blacklisted = true;
      }
    });

    if(blacklisted != true) {
      return message.channel.send('<:error:466995152976871434> This user isn\'t blacklisted!');
    };
  
  client.settings.remove(message.guild.id, user.id, "blacklisted")

  return message.channel.send(`<:success:466995111885144095> Removed \`${user.user.tag}\` from the blacklist.`)
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
  name: "blacklist",
  category: "Moderation",
  description: "Allows you to configure Woomy's blacklist. Blacklisted users cannot use commands.",
  usage: "blacklist [add/remove] [member]"
};
