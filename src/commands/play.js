const util = require("util")
const Discord = require("discord.js")

module.exports.run = (client, message, args, level) =>{
    if(!args[0])
    {
      message.channel.send(`<:error:466995152976871434> You didn't give me a song to play! Usage: \`${client.commands.get(`play`).help.usage}\``);
      
      return;
    }

    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('<:error:466995152976871434> You need to be in a voice channel to use this command!');

    message.channel.send(`🔎 searching YouTube for \`${args.join(" ")}\``);

    client.music.play(message, args.join(" "));
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["p"],
  permLevel: "User",
  requiredPerms: ["CONNECT", "SPEAK"]
};

exports.help = {
  name: "play",
  category: "Music",
  description: "Plays a song.",
  usage: "play [youtube-url] **OR** play [song-name]"
};
