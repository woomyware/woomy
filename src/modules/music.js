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
    guild.fixers = []

    exports.queue[id] = guild
  }

  return guild
}

exports.getLinkFromID = function (id) {
  return 'https://www.youtube.com/watch?v=' + id
}

exports.getVideoByQuery = async function (client, query, message) {
  let res

  try {
    const id = await ytdl.getURLVideoID(query)
    res = await fetch(`${client.config.endpoints.invidious}v1/videos/${id}`)
  } catch (err) {
    res = await fetch(`${client.config.endpoints.invidious}v1/search?q=${encodeURIComponent(query)}`)
  }

  const parsed = await res.json().catch(function (e) {
    return message.channel.send('<:error:466995152976871434> An error has occured: ' + e)
  })

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

exports.play = async function (client, message, query, playNext, ignoreQueue) {
  const guild = exports.getGuild(message.guild.id)
  guild.message = message

  // message.channel.startTyping()

  if (!message.member.voice.channel && !guild.voiceChannel) {
    message.channel.stopTyping()
    return message.channel.send('<:error:466995152976871434> You have to be connected to a voice channel to use this command!')
  }

  const vc = message.member.voice.channel

  let video
  let videos

  if (!ignoreQueue) {
    videos = await exports.getVideoByQuery(client, query, message)
    if (!videos[1]) {
      if (!videos[0]) {
        video = videos
        message.channel.stopTyping()
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
        guild.fixers = []
      // music not playing, something is in queue
      } else if ((!guild.playing || !guild.dispatcher) && guild.queue.length > 0) {
        guild.queue = []
      }

      if (!video) {
        let output = ''
        let i = 0
        for (i = 0; i < 5; i++) {
          if (!videos[i]) break
          output += `\`${i + 1}:\` **[${videos[i].title}](https://www.youtube.com/watch?v=${videos[i].videoId})** \`[${exports.createTimestamp(videos[i].lengthSeconds)}]\`\n`
        }

        message.channel.stopTyping()
        const embed = new MessageEmbed()
        embed.setTitle('Please reply with a number `1-' + i + '` to select which song you want to add to the queue.')
        embed.setColor(client.embedColour(message))
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
              return message.channel.send('<:error:466995152976871434> Invalid choice.')
            }
            break
          case 3:
            if (videos[2]) {
              video = videos[2]
            } else {
              return message.channel.send('<:error:466995152976871434> Invalid choice.')
            }
            break
          case 4:
            if (videos[3]) {
              video = videos[3]
            } else {
              return message.channel.send('<:error:466995152976871434> Invalid choice.')
            }
            break
          case 5:
            if (videos[4]) {
              video = videos[4]
            } else {
              return message.channel.send('<:error:466995152976871434> Invalid choice.')
            }
            break
          default:
            return message.channel.send('<:error:466995152976871434> Invalid choice.')
        }
      }

      if (!video && videos[0]) {
        video = videos[0]
      } else if (!video) {
        video = videos
      }

      // Add video to queue
      if (playNext === true) {
        guild.queue.splice(1, 0, { video: video, requestedBy: message.author })
      } else {
        guild.queue.push({ video: video, requestedBy: message.author })
      }
    }

    // Figure out if the bot should add it to queue or play it right now
    if (guild.playing) {
      message.channel.send('<:success:466995111885144095> Queued **' + video.title + '** `[' + exports.createTimestamp(video.lengthSeconds) + ']`')
    } else {
      guild.playing = true

      guild.voiceChannel = vc

      if (!guild.channel) {
        guild.channel = message.channel
      }

      console.log('[MUSIC DEBUG] joining vc');

      const connection = await vc.join()

      console.log('[MUSIC DEBUG] joined vc');

      const v = guild.queue[0]

      console.log('[MUSIC DEBUG] got v');

      try {
        console.log('[MUSIC DEBUG] getting link');
        let link = exports.getLinkFromID(v.video.videoId);
        console.log('[MUSIC DEBUG] got link: ' + (message.guild.id == '410990517841690625' ? link : 'not woomy server'));

        console.log('[MUSIC DEBUG] await ytdl');
        let y = await ytdl(link, { highWaterMark: 1024 * 1024 * 32 });
        console.log('[MUSIC DEBUG] got ytdl');

        console.log('[MUSIC DEBUG] connection.play');
        guild.dispatcher = connection.play(y, { type: 'opus' });

        console.log('[MUSIC DEBUG] got dispatcher');
      } catch (err) {
        console.error(err);

        if (playNext && playNext === true) {
          guild.queue.splice(1, 1)
        } else {
          guild.queue.pop()
        }

        client.logger.error('(YT API change, disregard) ' + err)
        return message.channel.send(`<:error:466995152976871434> An error has occured: \n\`${err}\``)
        // return message.channel.send('<:error:466995152976871434> YouTube have made changes to their site that break Woomy\'s music module. An announcement will be made in the development server when this issue is resolved.')
      }
      console.log('[MUSIC DEBUG] setting volume');
      guild.dispatcher.setVolume(0.25)
      console.log('[MUSIC DEBUG] set volume');

      guild.channel.send('<:player:467216674622537748> Now playing: **' + v.video.title + '** `[' + exports.createTimestamp(v.video.lengthSeconds) + ']`')

      // play next in queue on end
      guild.dispatcher.on('error', (err) => {
        console.error('[MUSIC ERROR] ' + String(err));
      });

      guild.dispatcher.once('finish', () => {
        console.log('[MUSIC DEBUG] dispatcher finish');

        guild.queue.shift()
        guild.playing = false

        if (guild.queue.length > 0) {
          exports.play(client, message, null, false, true)
        } else {
          guild.queue = []
          guild.playing = false
          guild.paused = false
          guild.skippers = []
          guild.fixers = []

          connection.disconnect()
        }
      })
    }
  } else {
    return message.channel.send('failed to find the video!')
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