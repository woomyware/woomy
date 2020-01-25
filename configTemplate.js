const config = {
    // ID's
    "owners": ["433790467830972417", "324937993972350976"],
  
    // Tokens
    "token": "",
    "devtoken": "",
    "ytkey": "",
    "dblkey": "",
  
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