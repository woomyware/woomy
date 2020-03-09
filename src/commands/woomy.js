const Discord = require("discord.js")
exports.run = async (client, message) =>{
  message.channel.send("Woomy!")

  const voiceChannel = message.member.voice.channel;
  
  if (!voiceChannel) return;
  if (!voiceChannel.permissionsFor(message.client.user).has('CONNECT')) return;
  if (!voiceChannel.permissionsFor(message.client.user).has('SPEAK')) return;

  if (client.music.getGuild(message.guild.id).playing == true || !client.music.getGuild(message.guild.id).queue[0]) return;

  voiceChannel.join()
  .then(connection => {
      const dispatcher = connection.play(`/home/container/resources/audio/WOOMY.MP3`);
      dispatcher.on("finish", end => {voiceChannel.leave()});
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
