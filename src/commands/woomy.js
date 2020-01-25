const Discord = require("discord.js")
exports.run = async (client, message) =>{
  message.channel.send("Woomy!")

  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel) return;
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has('CONNECT')) return;
  if (!permissions.has('SPEAK')) return;
  if (client.music.getGuild(message.guild.id).playing == true) return;

  voiceChannel.join()
  .then(connection => {
      const dispatcher = connection.playFile(`/home/container/media/sounds/WOOMY.MP3`);
      dispatcher.on("end", end => {voiceChannel.leave()});
  })  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User",
    requiredPerms: []
  };
  
  exports.help = {
    name: "woomy",
    category: "Fun",
    description: "Woomy!",
    usage: "woomy"
  };
