/*
const ytdl = require('ytdl-core-discord')
const youtubeInfo = require('youtube-info')
const getYoutubeId = require('get-youtube-id')
const fetch = require('node-fetch')
*/

module.exports = client => {
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
}
