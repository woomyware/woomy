const Discord = require("discord.js")
exports.run = (client, message, args, level) => {
  let guild = client.music.getGuild(message.guild.id);
  if(guild.queue.length < 1) {
    return message.channel.send("<:error:466995152976871434> Nothing is playing.");
  };
  guild.playing = true;
  guild.paused = false;
  guild.dispatcher.resume();
  message.channel.send("<:play:467216788187512832> Playback resumed!");


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unpause"],
  permLevel: "Moderator",
  requiredPerms: ["SPEAK"]
};

exports.help = {
  name: "resume",
  category: "Music",
  description: "Unpauses music.",
  usage: "resume"
};