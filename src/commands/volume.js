const { getGuild, setVolume } = require('../modules/music')
exports.run = async (client, message, args) => {
  if (!args[0]) {
    return message.channel.send(`<:error:466995152976871434> No input! Usage: \`${client.commands.get('volume').help.usage}\``)
  }

  const guild = getGuild(message.guild.id)

  if (guild.queue.length < 1 || !guild.playing || !guild.dispatcher) {
    return message.channel.send(
      '<:error:466995152976871434> Nothing is playing.'
    )
  }

  let userVolume = args[0]

  if (userVolume.includes('%')) {
    userVolume = userVolume.replace('%', '')
  }

  userVolume = +userVolume

  if (isNaN(userVolume) === true) {
    return message.channel.send('<:error:466995152976871434> Input must be a number!')
  }

  if (userVolume > 100 || userVolume < 1) {
    return message.channel.send('<:error:466995152976871434> Invalid input, input must be between 1-100')
  }

  if (userVolume) {
    userVolume = Number(userVolume)

    userVolume = userVolume / 100

    if (userVolume <= 1) {
      setVolume(message.guild, userVolume)

      message.channel.send('<:success:466995111885144095> Set volume to ' + userVolume * 100 + '%')
    }
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: []
}

exports.help = {
  name: 'volume',
  category: 'Music',
  description: 'Sets volume of currently playing music. (100% = 25% of the actual volume)',
  usage: 'volume [volume]'
}