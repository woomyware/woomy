const config = {
  // ID's
  "owners": ["433790467830972417", "324937993972350976"],

  // Tokens
  "token": "NDM1OTYxNzA0MTQ1NDg1ODM1.XW762g.4uLWDkiz0tUkiAHZRrIW39ZJh6A",
  "devtoken": "NDM5NTk0Njc1MjMwMjEyMDk2.XW77ww.izMA1miEMwRcM1-B6CM58qZq9d8",
  "ytkey": "AIzaSyCCf9Q04Zy6tNOre3pTkiXRShI55kjGhmg",
  "owmkey": "c49ea77cf0d3216a1cbc6b683f8d9117",
  "dblkey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNTk2MTcwNDE0NTQ4NTgzNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTI5NDg5MzgzfQ.Wrjwn2ETwBfRZM7F3PiFf8Gy2MgBZ6Ry7vKv8WTxK_Y",

  // Default per-server settings 
  "defaultSettings" : {
    "prefix": "~",
    "devprefix": "!",
    "modRole": "None set",
    "adminRole": "None set",
    "mutedRole": "None set",
    "autorole": "off",
    "welcomeChannel": "off",
    "welcomeMessage": "off",
    "leaveMessage": "off",
    "chatlogsChannel": "off",
    "modlogsChannel": "off",
    "raidMode": "off",
    "raidModeStrict": "off",
    "blacklisted": "ARRAY",
    "botChannels": "ARRAY",
    "AFK": "ARRAY",
    "SAR": "ARRAY"
  },

  // Perm levels
  permLevels: [
    { level: 0,
      name: "User", 
      check: () => true
    },

    { level: 1,
      name: "Moderator",
      check: (message) => {
        try {
          if (message.member.roles.has(message.settings.modRole)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 2,
      name: "Administrator", 
      check: (message) => {
        try {
          if (message.member.roles.has(message.settings.adminRole)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Server Owner", 
      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },
  ]
};

module.exports = config;
