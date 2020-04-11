/*
const ytdl = require('ytdl-core-discord')
const youtubeInfo = require('youtube-info')
const getYoutubeId = require('get-youtube-id')
const fetch = require('node-fetch')
*/

const ytdl = require('ytdl-core-discord');
const fetch = require('node-fetch');

module.exports = client => {
  client.music = {guilds: {}};

  // MUSIC - TIMESTAMP
  client.createTimestamp = function (duration) {
    var hrs = ~~(duration / 60 / 60)
    var min = ~~(duration / 60) % 60
    var sec = ~~(duration - min * 60)

    if (String(hrs).length < 2) {
      hrs = '0' + String(hrs) + ':'
    }

    if (String(min).length < 2) {
      min = '0' + String(min)
    }

    if (String(sec).length < 2) {
      sec = '0' + String(sec)
    }

    if (hrs === '00:') {
      hrs = ''
    }

    var time = hrs + min + ':' + sec
    return time
  }

  client.music.getGuild = function(id) {
    let guild = client.music.guilds[id];

    if(!guild) {
      guild = {};

      guild.dispatcher = null;
      guild.playing = false;
      guild.queue = [];

      client.music.guilds[id] = guild;
    };

    return guild;
  };

  client.music.isYouTubeLink = function(query) {
    return query.startsWith('https://youtube.com/') || query.startsWith('http://youtube.com/') || query.startsWith('https://youtu.be/') || query.startsWith('http://youtu.be/') || query.startsWith('https://m.youtube.com/') || query.startsWith('http://m.youtube.com/') || query.startsWith('https://www.youtube.com/') || query.startsWith('http://www.youtube.com/');
  };

  client.music.getLinkFromID = function(id) {
    return 'https://www.youtube.com/watch?v=' + id;
  };

  client.music.getVideoByQuery = async function(query) {
    let isLink = client.music.isYouTubeLink(query);

    let response;

    if(isLink) {
       response = await fetch('https://www.googleapis.com/youtube/v3/search?key=' + client.config.keys.yt + '&part=id,snippet&maxResults=1&type=video&id=' + id);
    } else {
      response = await fetch('https://www.googleapis.com/youtube/v3/search?key=' + client.config.keys.yt + '&part=id,snippet&maxResults=1&type=video&q=' + encodeURIComponent(query));
    };

    let parsed = await response.json();

    if(parsed.items) {
      let video = parsed.items[0];

      if(video) {
        return video;
      } else {
        return false;
      };
    } else {
      return false;
    };
  };

  client.music.play = async function(message, query) {
    let guild = client.music.getGuild(message.guild.id);

    if(!message.member.voice.channel && !guild.voiceChannel) {
      return message.member.reply('you are not in a voice channel!');
    }

    let vc = message.member.voice.channel;

    let video = await client.music.getVideoByQuery(query);

    if(video) {
      // Fix the bot if somehow broken
      // music "playing", nothing in queue
      if((guild.playing || guild.dispatcher) && guild.queue.length == 0) {
        guild.playing = false;
        guild.dispatcher = null;
      // music not playing, something is in queue
      } else if(!guild.playing && !guild.dispatcher && guild.queue.length > 0) {
        guild.queue = [];
      };

      // Add video to queue
      guild.queue.push({video: video, requestedBy: message.member.id});

      // Figure out if the bot should add it to queue or play it right now
      if(guild.playing) {
        message.reply('added **' + video.snippet.title + '** to the queue');
      } else {
        guild.playing = true;

        let connection = await vc.join();
        
        let v = guild.queue[0];

        guild.dispatcher = connection.play(await ytdl(client.music.getLinkFromID(v.video.id.videoId)), {type: 'opus'});
        guild.dispatcher.setVolume(0.25);

        message.reply('playing **' + v.video.snippet.title + '**');
      };
    } else {
      return message.member.reply('failed to find the video!');
    };
  };
}
