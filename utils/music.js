// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

const ytdl = require('ytdl-core-discord')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')
const { utc } = require('moment')

exports.queue = {}

exports.createTimestamp = function (s) {
  if (s < 1) {
    return 'LIVE'
  } else if (s >= 3600) {
    return utc(s * 1000).format('HH:mm:ss')
  } else {
    return utc(s * 1000).format('mm:ss')
  }
}

exports.getGuild = function (id) {
  let guild = exports.queue[id]

  if (!guild) {
    guild = {}

    guild.queue = []
    guild.playing = false
    guild.paused = false
    guild.dispatcher = null
    guild.skippers = []

    exports.queue[id] = guild
  }

  return guild
}

exports.getLinkFromID = function (id) {
  return 'https://www.youtube.com/watch?v=' + id
}

exports.getVideoByQuery = async function (client, query) {
  let res

  try {
    const id = await ytdl.getURLVideoID(query)
    res = await fetch(`${client.config.endpoints.invidious}v1/videos/${id}`)
  } catch (err) {
    res = await fetch(`${client.config.endpoints.invidious}v1/search?q=${encodeURIComponent(query)}`)
  }

  const parsed = await res.json()

  if (parsed) {
    const videos = parsed

    if (videos) {
      return videos
    } else {
      return false
    }
  } else {
    return false
  }
}

exports.play = async function (client, message, query, ignoreQueue) {
  const guild = exports.getGuild(message.guild.id)
  guild.message = message

  if (!message.member.voice.channel && !guild.voiceChannel) {
    return message.reply('You have to be connected to a voice channel to use this command!')
  }

  const vc = message.member.voice.channel

  let video
  let videos

  if (!ignoreQueue) {
    videos = await exports.getVideoByQuery(client, query)
    if (!videos[1]) {
      if (!videos[0]) {
        video = videos
      } else {
        video = videos[0]
      }
    }
  }

  if (videos || ignoreQueue) {
    if (!ignoreQueue) {
      // Fix the bot if  somehow broken
      // music "playing", nothing in queue
      if ((guild.playing || guild.dispatcher) && guild.queue.length === 0) {
        guild.queue = []
        guild.playing = false
        guild.paused = false
        guild.skippers = []
      // music not playing, something is in queue
      } else if (!guild.playing && !guild.dispatcher && guild.queue.length > 0) {
        guild.queue = []
      }

      if (!video) {
        let output = ''
        let i = 0
        for (i = 0; i < 5; i++) {
          if (!videos[i]) break
          output += `\`${i + 1}:\` **[${videos[i].title}](https://www.youtube.com/watch?v=${videos[i].videoId})** \`[${exports.createTimestamp(videos[i].lengthSeconds)}]\`\n`
        }

        const embed = new MessageEmbed()
        embed.setTitle('Please reply with a number `1-' + i + '` to select which song you want to add to the queue.')
        embed.setColor(client.embedColour(message.guild))
        embed.setDescription(output)

        let selection = await client.awaitReply(message, embed)
        selection = Number(selection)

        switch (selection) {
          case 1:
            video = videos[0]
            break
          case 2:
            if (videos[1]) {
              video = videos[1]
            } else {
              return message.channel.send('Invalid choice.')
            }
            break
          case 3:
            if (videos[2]) {
              video = videos[2]
            } else {
              return message.channel.send('Invalid choice.')
            }
            break
          case 4:
            if (videos[3]) {
              video = videos[3]
            } else {
              return message.channel.send('Invalid choice.')
            }
            break
          case 5:
            if (videos[4]) {
              video = videos[4]
            } else {
              return message.channel.send('Invalid choice.')
            }
            break
          default:
            return message.channel.send('Invalid choice.')
        }
      }

      if (!video && videos[0]) {
        video = videos[0]
      } else if (!video) {
        video = videos
      }

      // Add video to queue
      guild.queue.push({ video: video, requestedBy: message.author })
    }

    // Figure out if the bot should add it to queue or play it right now
    if (guild.playing) {
      message.reply('added **' + video.title + '** to the queue')
    } else {
      guild.playing = true

      guild.voiceChannel = vc

      const connection = await vc.join()

      const v = guild.queue[0]

      guild.dispatcher = connection.play(await ytdl(exports.getLinkFromID(v.video.videoId), { highWaterMark: 1024 * 1024 * 32 }), { type: 'opus' })
      guild.dispatcher.setVolume(0.25)

      message.channel.send('Playing **' + v.video.title + '**')

      // play next in queue on end
      guild.dispatcher.once('finish', () => {
        guild.queue.shift()
        guild.playing = false

        if (guild.queue.length > 0) {
          exports.play(client, message, null, true)
        } else {
          guild.queue = []
          guild.playing = false
          guild.paused = false
          guild.skippers = []

          connection.disconnect()
        }
      })
    }
  } else {
    return message.reply('failed to find the video!')
  }
}

exports.setVolume = function (guild, target) {
  const g = exports.getGuild(guild.id)

  if (g.dispatcher) {
    g.dispatcher.setVolume(target)
  }
}

exports.skip = function (guild, reason) {
  const g = exports.getGuild(guild.id)

  if (g.dispatcher) {
    g.dispatcher.end(reason)
  }
}
