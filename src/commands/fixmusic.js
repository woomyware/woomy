const { getGuild } = require('../modules/music')
module.exports.run = async (client, message, args, level) =>{
  guild = getGuild(message.guild.id)

  const lvl = client.config.permLevels.find(l => l.level === level)

  if (lvl >= 1) {
    guild.queue = []
    guild.playing = false
    guild.paused = false
    guild.skippers = []
    guild.fixers = []
  
    if (guild.dispatcher) {
      guild.dispatcher.end('silent')
    }  

    message.channel.send(
      '<:success:466995111885144095> Music has been fixed!'
    )

    return
  }

  if (guild.fixers.indexOf(message.author.id) === -1) {
    guild.fixers.push(message.author.id)

    if (guild.fixers.length >= Math.ceil(vc.members.filter(member => !member.user.bot).size / 2)) {
      guild.queue = []
      guild.playing = false
      guild.paused = false
      guild.skippers = []
      guild.fixers = []
    
      if (guild.dispatcher) {
        guild.dispatcher.end('silent')
      }  

      message.channel.send(
        '<:success:466995111885144095> Music has been fixed!'
      )
    } else {
      message.channel.send(
        `<:success:466995111885144095> Your vote has been acknowledged! **${guild.fixers.length + '/' + Math.ceil(vc.members.filter(member => !member.user.bot).size / 2)}**`
      )
    };
  } else {
    message.channel.send(
      '<:denied:466995195150336020> You cannot vote twice!'
    )
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "fixmusic",
  category: "Music",
  description: 'Fixes music if it breaks.',
  usage: 'fixmusic',
};
