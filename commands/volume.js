// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['vol'],
  permLevel: 'Moderator',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: 'volume',
  category: 'Music',
  description: 'Sets volume of currently playing music. (100% = 25% of the actual volume)',
  usage: 'volume [volume]',
  parameters: '[volume] - Target volume from 0-100%'
}

const { setVolume } = require('../utils/music')
exports.run = async (client, message, args, level, data) => {
  let userVolume = args[0]

  if (vol) {
    userVolume = Number(vol)

    let vol = userVolume / 100 * 0.25

    if (vol <= 1) {
      setVolume(message.guild, vol)

      message.reply('set volume to ' + userVolume * 100 + '%')
    }
  }
}
