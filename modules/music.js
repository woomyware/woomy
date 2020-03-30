module.exports = client => {
  client.music = {guilds: {}}

  client.music.isYoutubeLink = function(input) {
    return input.startsWith('https://www.youtube.com/') || input.startsWith('http://www.youtube.com/') || input.startsWith('https://youtube.com/') || input.startsWith('http://youtube.com/') || input.startsWith('https://youtu.be/') || input.startsWith('http://youtu.be/') || input.startsWith('http://m.youtube.com/') || input.startsWith('https://m.youtube.com/')
  }

  client.music.search = async function(query)
  {
      return new Promise(function(resolve, reject)
      {
        try{
          fetch("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + process.env.YTKEY)
            .then(res => res.json())
            .then(json => {
              if(!json.items) { reject() return }
              resolve(json.items[0])
            })
          } catch (err) {
            client.logger.error("Music search err: ", err)
            throw err
          }
      })
  }

  client.music.getGuild = function(id)
  {
      if(client.music.guilds[id]) return client.music.guilds[id]
  
      return client.music.guilds[id] =
      {
          queue: [],
          playing: false,
          paused: false,
          dispatcher: null,
          skippers: []
      }
  }
  
  client.music.getMeta = async function(id)
  {
      return new Promise(function(resolve, reject)
      {
          youtubeInfo(id, function(err, videoInfo)
          {
              if(err) throw err
  
              resolve(videoInfo)
          })
      })
  }
  
  client.music.play = async function(message, input, bypassQueue)
  {
      let voiceChannel = message.member.voice.channel
      if(!voiceChannel) return message.channel.send('<:error:466995152976871434> You need to be in a voice channel to use this command!')

      let permissions = voiceChannel.permissionsFor(client.user)
      if (!permissions.has('CONNECT')) {
          return message.channel.send('<:error:466995152976871434> I do not have permission to join your voice channel.')
      }
      if (!permissions.has('SPEAK')) {
          return message.channel.send('<:error:466995152976871434> I do not have permission to join your voice channel.')
      }
      if (voiceChannel.joinable != true) {
          return message.channel.send("<:error:466995152976871434> I do not have permission to join your voice channel.")
      }

      let id = undefined

      if(client.music.isYoutubeLink(input))
      {
          id = await getYoutubeId(input)
      } else {
          let item = await client.music.search(input)
          if(!item) {
            return message.channel.send(`<:error:466995152976871434> No results found.`)
          }
          id = item.id.videoId
      }

      if(client.music.getGuild(message.guild.id).queue.length == 0 || bypassQueue)
      {
          let meta = await client.music.getMeta(id)

          if(!bypassQueue) client.music.getGuild(message.guild.id).queue.push({input: input, id: id, requestedBy: message.author, title: meta.title, author: meta.owner, thumbnail: meta.thumbnailUrl, duration: meta.duration})

          let connection = await new Promise((resolve, reject) =>
          {
              voiceChannel.join().then((connection) =>
              {
                  resolve(connection)
              })
          })

          function end(silent)
          {
              client.music.getGuild(message.guild.id).queue.shift()
              client.music.getGuild(message.guild.id).dispatcher = null

              if(client.music.getGuild(message.guild.id).queue.length > 0)
              {
                  client.music.play(message, client.music.getGuild(message.guild.id).queue[0].input, true)
              } else {
                  client.music.getGuild(message.guild.id).playing = false

                  if(!silent) {
                    message.channel.send("<:play:467216788187512832> Queue is empty! Disconnecting from the voice channel.")
                  }
                  
                  connection.disconnect()
              }
          }

          client.music.getGuild(message.guild.id).playing = true

          let song = client.music.getGuild(message.guild.id).queue[0]

          try
          {
              let dispatcher = client.music.getGuild(message.guild.id).dispatcher = connection.play(await ytdl("https://www.youtube.com/watch?v=" + id, {highWaterMark: 1024 * 1024 * 32}), {type: 'opus'})

              dispatcher.on('finish', (a, b) =>
              {
                  end(a == "silent")
              })
          } catch(err) {
              message.channel.send('<:error:466995152976871434> Failed to play **' + song.title + '** ' + err)

              end()
          }
          
          client.music.getGuild(message.guild.id).skippers = []
          message.channel.send(`<:play:467216788187512832> Now playing: **${song.title}**`)
      } else {
          let meta = await client.music.getMeta(id)
          let song = {input: input, id: id, requestedBy: message.author, title: meta.title, author: meta.owner, thumbnail: meta.thumbnailUrl, duration: meta.duration}
          
          client.music.getGuild(message.guild.id).queue.push(song)

          message.channel.send(`<:success:466995111885144095> Added to queue: **${song.title}**`)
      }
  }
  
  // MUSIC - TIMESTAMP
  client.createTimestamp = function(duration){
    hrs = ~~(duration / 60 / 60),
    min = ~~(duration / 60) % 60,
    sec = ~~(duration - min * 60)
  
    if(String(hrs).length < 2) {
      hrs = "0" + String(hrs) + ":"
    }
  
    if(String(min).length < 2) {
      min = "0" + String(min)
    }
  
    if(String(sec).length < 2) {
      sec = "0" + String(sec)
    }

    if(hrs == "00:") {
      hrs = ""
    }
  
    var time = hrs + min + ":" + sec
    return time
  }
}
