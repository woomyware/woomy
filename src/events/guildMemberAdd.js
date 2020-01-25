module.exports = async (client, member) => {
  const settings = client.getSettings(member.guild.id);

  if (settings.welcomeMessage !== "off") {
    let chanExists = member.guild.channels.get(settings.welcomeChannel)
    if (!chanExists) {
      return;
    };
    welcomeMessage = settings.welcomeMessage.replace("[[user]]", member.user);
    welcomeMessage = welcomeMessage.replace("[[server]]", member.guild.name);
    welcomeMessage = welcomeMessage.replace("[[members]]", member.guild.memberCount);

    member.guild.channels
      .get(settings.welcomeChannel)
      .send(welcomeMessage)
      .catch(console.error);
  }

  if (settings.autorole !== "off") {
    let aRole = member.guild.roles.get(settings.autorole)
    if (!aRole) {
      return;
    };
    await member.addRole(aRole.id).catch(console.error);
  };

  if(settings.raidMode !== "off") {
    if(settings.raidModeStrict == "on") {
      member.kick("User bounced.")

      if (settings.chatlogsChannel !== "off") {
        const channel = member.guild.channels.find(
          channel => channel.name === settings.chatlogsChannel
        );
    
        if (channel) {
          let embed = new Discord.RichEmbed();
          embed.setColor("#1f1f1f");
          embed.setAuthor("User bounced:", member.user.avatarURL);
          embed.setDescription(`‏‏‎❯ User: ${member} (${member.user.id})`, true);
          embed.setFooter(`New users are being automatically kicked because raidmode is enabled.`)
          try {
            channel.send({ embed });
          } catch (err) {
            // probably no permissions to send messages/embeds there
          };
        };
        return;
    }
  }
    let mRole = member.guild.roles.get(settings.mutedRole)
    if (!mRole) {
      return;
    };
    await member.addRole(mRole.id).catch(console.error);
    if (settings.chatlogsChannel !== "off") {
      const channel = member.guild.channels.find(
        channel => channel.name === settings.chatlogsChannel
      );
  
      if (channel) {
        let embed = new Discord.RichEmbed();
        embed.setColor("#1f1f1f");
        embed.setAuthor("User automatically muted:", member.user.avatarURL);
        embed.setDescription(`‏‏‎❯ User: ${member} (${member.user.id})`, true);
        embed.setFooter(`New users are being automatically muted because raidmode is enabled.`)
        try {
          channel.send({ embed });
        } catch (err) {
          // probably no permissions to send messages/embeds there
        };
      };
  };
};
  
  if (settings.chatlogsChannel !== "off") {
    const channel = member.guild.channels.find(
      channel => channel.name === settings.chatlogsChannel
    );

    if (channel) {
      let embed = new Discord.RichEmbed();
      embed.setColor("#0099e1");
      embed.setAuthor("User joined:", member.user.avatarURL);
      embed.setDescription(`‏‏‎❯ User: ${member} (${member.user.id})`, true);
      try {
        channel.send({ embed });
      } catch (err) {
        // probably no permissions to send messages/embeds there
      };
    };
  };

};
