const Discord = require('discord.js')
module.exports = async (client, guild) => {
  if (!guild.available) return

  client.logger.info('Guild left.')

  // Delete this guild's data from our database
  try {
    await client.deleteGuild(guild)
  } catch (err) {
    client.logger.error('Failed to delete DB entry for guild: ' + err)
  }

  if (client.devmode === false) {
    const channel = client.channels.cache.get(client.config.support.serverLogs)
    const embed = new Discord.MessageEmbed()
    embed.setColor('#9494FF')
    embed.setDescription(`Left a server. I'm now in \`${client.guilds.cache.size}\` servers.`)
    channel.send(embed)
  }
}
