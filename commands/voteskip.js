// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: 'voteskip',
  category: 'Music',
  description: 'Vote to skip the currently playing song.',
  usage: 'voteskip',
  params: ''
}

const { skip, getGuild } = require('../utils/music')
exports.run = (client, message, args, level) => {
  const guild = getGuild(message.guild.id)

  if (guild.queue.length < 1 || !guild.playing || !guild.dispatcher) {
    return message.channel.send(
      '<:error:466995152976871434> Nothing is playing.'
    )
  }

  const vc = message.guild.members.cache.get(client.user.id).voice.channel

  if (vc !== message.member.voice.channel) {
    return message.channel.send(
      '<:error:466995152976871434> You need to be in my voice channel to use this command!'
    )
  }

  if (guild.queue[0].requestedBy.id === message.author.id) {
    skip(message.guild, 'skip')

    message.channel.send(
      '<:skip:467216735356059660> Song has been skipped by the user who requested it.'
    )

    return
  }

  if (guild.skippers.indexOf(message.author.id) === -1) {
    guild.skippers.push(message.author.id)

    if (guild.skippers.length >= Math.ceil(vc.members.filter(member => !member.user.bot).size / 2)) {
      skip(message.guild, 'skip')

      message.channel.send(
        '<:skip:467216735356059660> Song has been skipped.'
      )
    } else {
      message.channel.send(
        `<:success:466995111885144095> Your vote has been acknowledged! **${guild.skippers.length + '/' + Math.ceil(vc.members.filter(member => !member.user.bot).size / 2)}**`
      )
    };
  } else {
    message.channel.send(
      '<:denied:466995195150336020> You cannot vote twice!'
    )
  }
}
