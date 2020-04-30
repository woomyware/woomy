'use strict';

const { getGuild, createTimestamp } = require('../modules/music')
const Discord = require('discord.js')
exports.run = (client, message, args) => {
  var queue = getGuild(message.guild.id).queue

  if (queue.length < 1) {
    return message.channel.send('<:error:466995152976871434> Nothing is playing.')
  }

  const lists = []

  function generateList (start, number) {
    let list = ''
    let timestamp

    if (start === 1 && queue.length === 1) {
      return ['There\'s nothing else waiting to be played!', 1]
    }

    if (number === 1 && queue.length + 1 < start) {
      return false
    }

    const q = queue.slice(start)

    let i = 0

    for (i = 0; i < q.length; i++) {
      const song = q[i]

      timestamp = createTimestamp(song.video.lengthSeconds)

      const aaa = list + `\`${(i + 1) + start - 1}:\` **[${song.video.title}](https://www.youtube.com/watch?v=${song.video.videoId})** added by ${song.requestedBy} \`[${timestamp}]\`\n`

      if (aaa.length > 1024) {
        return [list, start + i - 1]
      } else {
        list = aaa
      }

      // totalDuration = totalDuration + song.duration
    }

    return [list, start + i + 1]
  }

  const songsInQueue = queue.length - 1
  let songsInQueueEnglish = 'song'

  function generatePage (list, page) {
    if (!list || list === '') {
      return false
    }

    var embed = new Discord.MessageEmbed()
    embed.setTitle(`Queue for: ${message.guild.name}`)
    embed.setColor(client.embedColour(message))

    var elapsedTime = getGuild(message.guild.id).dispatcher.streamTime / 1000
    var totalDuration = queue[0].video.lengthSeconds - elapsedTime

    let timeRemaining = ''

    for (let i = 1; i < queue.length; i++) {
      const b = queue[i]

      if (b.video.lengthSeconds === 0) {
        timeRemaining = '∞'

        break
      }

      totalDuration += b.video.lengthSeconds
    }

    if (timeRemaining === '') {
      const queueDuration = createTimestamp(totalDuration)

      timeRemaining = queueDuration
    }

    let timestamp = `\`${createTimestamp(queue[0].video.lengthSeconds)}\``

    if (timestamp !== '`[LIVE]`') {
      timestamp = `\`[${createTimestamp(elapsedTime) + '/' + createTimestamp(queue[0].video.lengthSeconds)}]\``
    }

    embed.addField('Now playing:', `**[${queue[0].video.title}](https://www.youtube.com/watch?v=${queue[0].video.videoId})** added by ${queue[0].requestedBy} ${timestamp}`)

    embed.addField('Up next:', list)

    if (songsInQueue > 1 || songsInQueue === 0) {
      songsInQueueEnglish = 'songs'
    }

    embed.setFooter(`Page ${page}/${lists.length} | ${songsInQueue + ' ' + songsInQueueEnglish} in queue | ${timeRemaining} time remaining`)

    return embed
  }

  var myMessage = null

  function displayPage (number) {
    const page = generatePage(lists[number - 1], number)

    if (page) {
      if (myMessage) {
        myMessage.edit(page)
      } else {
        myMessage = message.channel.send(page)
      }

      return true
    } else {
      return false
    }
  }

  function aFunction (start) {
    // start - index of song, which we should start with
    // end - index of song, which we ended with

    const [list, end] = generateList(start, lists.length + 1)

    if (list && list !== '') {
      lists.push(list)

      if (queue[end + 1]) {
        aFunction(end + 1)
      }
    }
  }

  aFunction(1)

  let page = 1

  if (args[0]) {
    const userPage = Number(args[0])

    if (userPage) {
      page = userPage
    } else {
      return message.channel.send(
        `<:error:466995152976871434> Invalid page number. Usage: \`${client.commands.get('queue').help.usage}\``
      )
    }
  }

  if (displayPage(page)) {

  } else {
    return message.channel.send(
      `<:error:466995152976871434> Page ${page} doesn't exist!`
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
  name: "queue",
  category: "Music",
  description: "Displays what songs are in the queue.",
  usage: "queue <page>"
};
