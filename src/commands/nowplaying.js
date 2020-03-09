const Discord = require("discord.js");
exports.run = async (client, message) => {  
  let guild = client.music.getGuild(message.guild.id);
  
  if(guild.queue.length < 1) {
    return message.channel.send("<:error:466995152976871434> Nothing is playing.");
  }

  var song = guild.queue[0];
  var elapsedTime = client.createTimestamp(guild.dispatcher.streamTime / 1000);
  var timestamp;

  if(song.duration == 0) {
    timestamp = "`[LIVE]`";
  } else {
    timestamp = `\`[${elapsedTime + "/" + client.createTimestamp(song.duration)}]\``;
  };

  embed = new Discord.MessageEmbed();
  embed.setTitle("Now playing:")
  embed.setThumbnail(song.thumbnail)
  embed.setColor(client.embedColour(message));
	embed.setDescription(`**[${song.title}](https://www.youtube.com/watch?v=${song.id})**`)
	embed.addField("Channel:", song.author, true)
  embed.addField("Time:", timestamp, true)
  embed.setFooter("Requested by " + song.requestedBy.tag, song.requestedBy.avatarURL({format: "png", dynamic: true}))

	message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["np"],
  permLevel: "User",
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "nowplaying",
  category: "Music",
  description: "Shows details about the currently playing song.",
  usage: "nowplaying"
};
