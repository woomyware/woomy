const Discord = require("discord.js")
exports.run = (client, message, args, level) => {
  let guild = client.music.getGuild(message.guild.id);

  if(guild.queue.length < 1 || !guild.playing || !guild.dispatcher) return message.channel.send(
    "<:error:466995152976871434> Nothing is playing."
    );

  let vc = message.guild.members.get(client.user.id).voiceChannel;

  if(vc != message.member.voiceChannel) return message.channel.send(
    '<:error:466995152976871434> You need to be in my voice channel to use this command!'
    );  

  if(guild.queue[0].requestedBy.id == message.author.id) {
    skip_song(guild);

    message.channel.send(
      `<:skip:467216735356059660> Song has been skipped by the user who requested it.`
      );

    return;
  }

  if (guild.skippers.indexOf(message.author.id) == -1) {
    guild.skippers.push(message.author.id);

    if (guild.skippers.length >= Math.ceil(vc.members.filter(member => !member.user.bot).size / 2)) {
      
      skip_song(guild);

      message.channel.send(
        `<:skip:467216735356059660> Song has been skipped.`
        );

    } else {
      message.channel.send(
        `<:success:466995111885144095> Your vote has been acknowledged! **${guild.skippers.length + "/" + Math.ceil(vc.members.filter(member => !member.user.bot).size / 2)}**`
        );
    };

  } else {
    message.channel.send(
      "<:denied:466995195150336020> You cannot vote twice!"
      );
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["voteskip"],
  permLevel: "User",
  requiredPerms: ["SPEAK"]
};

exports.help = {
  name: "skip",
  category: "Music",
  description: "Vote to skip the currently playing song. Song will be skipped instantly if executed by the user who requested it.",
  usage: "skip"
};

function skip_song(guild) {
    guild.dispatcher.end("silent");
  }