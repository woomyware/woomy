'use strict';

const Discord = require("discord.js");
exports.run = (client, message, args) => {
  var queue = client.music.getGuild(message.guild.id).queue;

  if(queue.length < 1) {
    return message.channel.send("<:error:466995152976871434> Nothing is playing.");
  }

  let lists = [];

  function generateList(start, number) {
    var list = "";
    var timestamp;
    var livestream;

    if(start == 1 && queue.length == 1) {
      return ["There's nothing else waiting to be played!", 1];
    }

    if(number == 1 && queue.length + 1 < start) {
      return false;
    };

    let q = queue.slice(start);

    let i = 0;

    for(i = 0; i < q.length; i++) {
        let song = q[i];

        if(song.duration == 0) {
          timestamp = "LIVE";
          livestream = true;
        } else {
          timestamp = client.createTimestamp(song.duration);
        };

        let aaa = list + `\`${(i + 1) + start - 1}:\` **[${song.title}](https://www.youtube.com/watch?v=${song.id})** added by ${song.requestedBy} \`[${timestamp}]\`\n`;

        if(aaa.length > 1024) {
          return [list, start + i - 1];
        } else {
          list = aaa;
        }

        //totalDuration = totalDuration + song.duration;
    };

    return [list, start + i + 1];
  };

  let songsInQueue = queue.length - 1;
  let songsInQueueEnglish = "song";
  let timeRemaining = 0;

  function generatePage(list, page) {
    if(!list || list == "") {
      return false;
    }

    var embed = new Discord.RichEmbed();
    embed.setTitle(`Queue for: ${message.guild.name}`);
    embed.setColor(client.embedColour(message));
  
    var elapsedTime = client.music.getGuild(message.guild.id).dispatcher.time / 1000
    var totalDuration = queue[0].duration - elapsedTime;

    let timeRemaining = "";
    
    for(let i = 1; i < queue.length; i++) {
      let b = queue[i];

      if(b.duration ==  0) {
        timeRemaining = "∞";

        break;
      }

      totalDuration += b.duration;
    }
  
    if(timeRemaining == "") {
      let queueDuration = client.createTimestamp(totalDuration);

      timeRemaining = queueDuration;
    }

    let timestamp;

    if(queue[0].duration == 0) {
      timestamp = "LIVE";
      livestream = true;
    } else {
      timestamp = client.createTimestamp(queue[0].duration);
    };

    embed.addField(`Now playing:`, `**[${queue[0].title}](https://www.youtube.com/watch?v=${queue[0].id})** added by ${queue[0].requestedBy} \`[${timestamp}]\``)
    
    embed.addField(`Up next:`, list);

    if(songsInQueue > 1) {
      songsInQueueEnglish = "songs";
    }

    embed.setFooter(`Page ${page}/${lists.length} | ${songsInQueue + " " + songsInQueueEnglish} in queue | ${timeRemaining} time remaining`);

    return embed;
  };

  var myMessage = null;

  function displayPage(number) {
    let page = generatePage(lists[number - 1], number);

    if(page) {
      if(myMessage) {
        myMessage.edit(page);
      } else {
        myMessage = message.channel.send(page);
      }

      return true;
    } else {
      return false;
    }
  };

  function aFunction(start) {
    // start - index of song, which we should start with
    // end - index of song, which we ended with

    let [list, end] = generateList(start, lists.length + 1);

    if(list && list != "") {
      lists.push(list);
      
      if(queue[end + 1]) {
        aFunction(end + 1);
      }
    }
  };

  aFunction(1);

  let page = 1;

  if(args[0]) {
    let userPage = Number(args[0]);

    if(userPage) {
      page = userPage;
    } else {
      return message.channel.send(
        `<:error:466995152976871434> Invalid page. Usage: \`${client.commands.get(`queue`).help.usage}\``
      );
    }
  };

  if(displayPage(page)) {

  } else {
    return message.channel.send(
      `<:error:466995152976871434> Page ${page} doesn't exist!`
    );
  }
};

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
