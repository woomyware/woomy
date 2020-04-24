// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Moderator',
  requiredPerms: ['CONNECT', 'SPEAK'],
  cooldown: 10000
}

exports.help = {
  name: 'movehere',
  category: 'Music',
  description: 'Moves ' + client.config.botName + ' into your voice channel and/or text channel.',
  usage: 'movehere',
  parameters: ''
}

const music = require('../utils/music')
exports.run = async (client, message, args, level, data) => {
  // get guild music data
  let mGuild = music.getGuild(message.guild.id)

  if(!mGuild.playing) {
    return message.channel.send('<:error:466995152976871434> Nothing is playing.')
  }

  // change text channel
  let textChannelChanged = false

  if(mGuild.channel.id != message.channel.id) {
    mGuild.channel = message.channel

    textChannelChanged = true
  }

  // move to another voice channel
  let voiceChannelMoved = false

  if(message.voice.channel && mGuild.voiceChannel && (message.voice.channel != mGuild.voiceChannel.id)) {
    // TODO: this

    voiceChannelMoved = true
  }

  // response
  if(textChannelChanged && voiceChannelMoved) {
    return message.channel.send('<:success:466995111885144095> Music playback moved to your voice channel and music messages to your text channel.')
  } else if(textChannelChanged) {
    return message.channel.send('<:success:466995111885144095> Music module will send messages to your text channel.')
  } else if(voiceChannelMoved) {
    return message.channel.send('<:success:466995111885144095> Music playback moved to your voice channel.')
  } else {
    return message.channel.send('<:error:466995152976871434> Music is already playing in your voice channel!')
  }
}
