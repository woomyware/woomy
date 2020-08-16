exports.run = async (client, message, [action, ...member]) => {
  const settings = message.settings;
  
  if(settings.blacklisted == "ARRAY") {
    await client.settings.set(message.guild.id, [], "blacklisted");
  }

  if(!action) {
    return message.channel.send(
      `<:error:466995152976871434> You didn't tell me if I was meant to add or remove someone from the blocklist! Usage: \`${client.commands.get(`blocklist`).help.usage}\``
    )
  }

  member = member.join(" ")

  if(!member) {
    return message.channel.send(
      `<:error:466995152976871434> You didn't tell me who to add to the blocklist! Usage: \`${client.commands.get(`blocklist`).help.usage}\``
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
        return message.channel.send("<:error:466995152976871434> You can't add the owner to the blocklist!")
      };

      let admin = message.guild.member(message.author)
      if (user.roles.highest.position >= admin.roles.highest.position && admin.user.id !== message.guild.ownerID) {
        return message.channel.send(
          `<:error:466995152976871434> You can't add people higher ranked than yourself to the blocklist!`
        );
      };
    
      if(user.id === message.member.id) {
        return message.channel.send('<:error:466995152976871434> You can\'t add yourself to the blocklist!');
      };

      let blacklisted = false;

      if(settings.blacklisted.length > 0) {
        settings.blacklisted.forEach(function(ID) {
          if(ID == user.id) {
            blacklisted = true;
          }
        });

        if(blacklisted == true) {
          return message.channel.send('<:error:466995152976871434> This person is already on the blocklist!');
        };
      };

      client.settings.push(message.guild.id, user.id, "blacklisted")
      
      return message.channel.send(`<:success:466995111885144095> Added \`${user.user.tag}\` to the blocklist.`)
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
      return message.channel.send('<:error:466995152976871434> This user isn\'t on the blocklist!');
    };
  
  client.settings.remove(message.guild.id, user.id, "blacklisted")

  return message.channel.send(`<:success:466995111885144095> Removed \`${user.user.tag}\` from the blocklist.`)
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bl'],
  permLevel: "Administrator",
  requiredPerms: []
};

exports.help = {
  name: "blocklist",
  category: "Moderation",
  description: "Allows you to configure Woomy's blocklist. Users on the blocklist cannot use commands.",
  usage: "blocklist [add/remove] [member]"
};
