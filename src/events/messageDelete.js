const Discord = require("discord.js");

module.exports = (client, message) => {
  if (message.author.bot) return;

  if(!message.guild) return;

  const settings = (message.settings = client.getSettings(message.guild.id));

  if (settings.chatlogsChannel !== "off") {
    const channel = message.guild.channels.cache.find(
      channel => channel.name === settings.chatlogsChannel
    )
    
    var msg = message.content;
  
  if(!message.member) {
    return;
  }
  
  if(msg.length + message.member.user.username.length + message.member.user.id.length + message.channel.name.length + 2 > 2048) {
    return;
  }
  
    if (channel) {
      let embed = new Discord.MessageEmbed();
      embed.setColor("#f93a2f");
      embed.setAuthor("Message deleted!", message.member.user.avatarURL({dynamic: true}));
      if (msg == "") {
        msg = "**An image was deleted, but is not shown for privacy reasons.**"
      } else {
        msg = `\`${msg}\``
      }// image-only; maybe we can add image logging too but depends privacy (if someone sends like personal stuff accidentally)
      embed.setDescription(`❯ Author: ${message.member} (${message.member.user.id})\n❯ Channel: ${message.channel}\n❯ Message: ${msg}`)
      try {
        channel.send({ embed });
      } catch (err) {
        // probably no permissions to send messages/embeds there
      };
    };
  };
};
