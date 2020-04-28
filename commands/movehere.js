// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User  ',
  requiredPerms: ['CONNECT', 'SPEAK'],
  cooldown: 10000
}

exports.help = {
  name: 'movehere',
  category: 'Music',
  description: 'Moves the bot into your voice channel and/or text channel.',
  usage: 'movehere',
  parameters: ''
}

const music = require('../utils/music')
exports.run = async (client, message, args, level, data) => {
  // get guild music data
  const guild = music.getGuild(message.guild.id)

  if (!guild.playing) {
    return message.channel.send('<:error:466995152976871434> Nothing is playing.')
  }

  let textChannelChanged = false
  let voiceChannelChanged = false

  // change text channel
  if (guild.channel.id !== message.channel.id) {
    guild.channel = message.channel

    textChannelChanged = true
  }

  // move to another voice channel
  if (message.member.voice.channel && guild.voiceChannel && (message.member.voice.channel !== guild.voiceChannel.id)) {
    guild.voiceChannel.leave()
    guild.voiceChannel = message.member.voice.channel
    guild.voiceChannel.join()
    voiceChannelChanged = true
  }

  // response
  if (textChannelChanged && voiceChannelChanged) {
    return message.channel.send('<:success:466995111885144095> Music playback moved to your voice channel and music messages to your text channel.')
  } else if (textChannelChanged) {
    return message.channel.send('<:success:466995111885144095> Music module will send messages to your text channel.')
  } else if (voiceChannelChanged) {
    return message.channel.send('<:success:466995111885144095> Music playback moved to your voice channel.')
  } else {
    return message.channel.send('<:error:466995152976871434> Music is already playing in your voice channel!')
  }
}
