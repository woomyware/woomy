const Discord = require("discord.js");

module.exports = (client, omsg, nmsg) => {
  if (nmsg.content === omsg.content) return;

  const settings = (omsg.settings = nmsg.settings = client.getSettings(
    nmsg.guild.id
  ));

  if (settings.chatlogsChannel !== "off") {
    const channel = nmsg.guild.channels.cache.find(
      channel => channel.name === settings.chatlogsChannel
    );

    if (channel) {
      let embed = new Discord.MessageEmbed();
      embed.setColor("#fff937");
      embed.setAuthor("Message Edited!", nmsg.member.user.avatarURL({dynamic: true}));
      if (omsg.content == "") {
        omsg.content = "**[IMAGE]**"
      } else if (nmsg.content == "") {
        nmsg.content = `**[IMAGE]**`
      } else {
        omsg.content = `\`${omsg.content}\``
        nmsg.content = `\`${nmsg.content}\``
      }

      if(omsg.content.length + nmsg.content.length + nmsg.member.user.username.length + nmsg.member.user.id.length + nmsg.channel.name.length + 2 > 2048) {
        return;
      }
      
      embed.setDescription(`• Author: ${nmsg.member} (${nmsg.member.user.id})\n• Channel: ${nmsg.channel}\n• Old message: ${omsg.content}\n• New message: ${nmsg.content}`)
      try {
        channel.send({ embed });
      } catch (err) {
        // probably no permissions to send messages/embeds there
      };
    };
  };
};
