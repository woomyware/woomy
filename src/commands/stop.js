const Discord = require("discord.js");

exports.run = async (client, message) => {
  let guild = client.music.getGuild(message.guild.id);

    if(guild.queue.length < 1 || !guild.playing || !guild.dispatcher) return message.channel.send("<:error:466995152976871434> Nothing is playing.");
    if(!message.member.voiceChannel) return message.channel.send('<:error:466995152976871434> You need to be in voice channel to use this command!');

    guild.playing = false;
    guild.paused = false;
    guild.queue = [];

  guild.dispatcher.end("silent");

  message.channel.send("<:stop:467639381390262284> Playback stopped!");
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: []
};

exports.help = {
  name: "stop",
  category: "Music",
  description: "Clears the queue and disconnects from the voice channel. (run this if music stopS working)",
  usage: "stop"
};

