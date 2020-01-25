exports.run = (client, message, args, level) => {
  let guild = client.music.getGuild(message.guild.id);
  if(guild.queue.length < 1) {
    return message.channel.send("<:error:466995152976871434> Nothing is playing.");
  };

  guild.playing = false;
  guild.paused = true;
  guild.dispatcher.pause();
  message.channel.send("<:pause:467639357961142273> Playback paused!");


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: ["CONNECT", "SPEAK"]
};

exports.help = {
  name: "pause",
  category: "Music",
  description: "Pauses music playback.",
  usage: "pause"
};


