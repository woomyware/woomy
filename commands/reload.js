exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Developer',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: 'reload',
  category: 'Developer',
  description: 'Reloads a command without having to restart the whole bot.',
  usage: 'reload [command]',
  parameters: '[command] - command you want to reload'
}

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (!args || args.length < 1) {
    return message.channel.send(
      `<:error:466995152976871434> You must provide a command to reload! Usage: \`${client.commands.get('reload').help.usage}\``
    )
  }

  let response = await client.unloadCommand(args[0])
  if (response) return message.channel.send(`<:error:466995152976871434> Error unloading: ${response}`)

  response = client.loadCommand(args[0])
  if (response) return message.channel.send(`<:error:466995152976871434> Error loading: ${response}`)

  message.channel.send(`<:success:466995111885144095> \`${args[0]}\` has been reloaded!`)
}
