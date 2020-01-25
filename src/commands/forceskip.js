exports.run = (client, message) => {
    let guild = client.music.getGuild(message.guild.id);

    if(guild.queue.length < 1) return message.channel.send(
      `<:error:466995152976871434> There is nothing for me to skip!`
      );
    skip_song(guild);
      message.channel.send("<:skip:467216735356059660> Skipped the song!")
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: ["SPEAK"]
};

exports.help = {
  name: "forceskip",
  category: "Music",
  description: "Skips the currently playing song without requiring a vote.",
  usage: "forceskip"
};

function skip_song(guild) {
  guild.dispatcher.end();
}
