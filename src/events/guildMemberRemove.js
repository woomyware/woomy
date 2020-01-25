module.exports = async (client, member) => {
  const settings = client.getSettings(member.guild.id);

  if (settings.leaveMessage !== "off") {
    let chanExists = member.guild.channels.get(settings.welcomeChannel)
    if (!chanExists) {
      return;
    };
    leaveMessage = settings.leaveMessage.replace("[[user]]", member.user);
    leaveMessage = leaveMessage.replace("[[server]]", member.guild.name);
    leaveMessage = leaveMessage.replace("[[members]]", member.guild.memberCount);

    member.guild.channels
      .get(settings.welcomeChannel)
      .send(leaveMessage)
      .catch(console.error);
  };

  if (settings.chatlogsChannel !== "off") {
    const channel = member.guild.channels.find(
      channel => channel.name === settings.chatlogsChannel
    );

    if (channel) {
      let embed = new Discord.RichEmbed();
      embed.setColor("#006798");
      embed.setAuthor("User left:", member.user.avatarURL);
      embed.setDescription(`‏‏‎❯ ${member.user.tag} (${member.user.id})`, true);
      try {
        channel.send({ embed });
      } catch (err) {
        // probably no permissions to send messages/embeds there
      };
    };
  };
};
