const config = {
  // Users added to this embed get access to developer-level commands
  devs: ['433790467830972417', '324937993972350976', '343081377249493044'],

  // Default settings for individual users
  defaultUserSettings: {
    prefixes: ['~']
  },

  // Default per-guild settings
  defaultGuildSettings: {
    prefixes: ['~'],
    systemNotice: true
  },

  // Permission levels
  permLevels: [
    {
      level: 0,
      name: 'User',
      check: () => true
    },

    {
      level: 1,
      name: 'Moderator',
      check: (message) => {
        try {
          if (message.member.roles.cache.has(message.settings.modRole)) return true
        } catch (e) {
          return false
        }
      }
    },

    {
      level: 2,
      name: 'Administrator',
      check: (message) => {
        try {
          if (message.member.roles.cache.has(message.settings.adminRole) || message.member.permissions.has('ADMINISTRATOR')) return true
        } catch (e) {
          return false
        }
      }
    },

    {
      level: 3,
      name: 'Server Owner',

      check: (message) => message.channel.type === 'text' ? (message.guild.ownerID === message.author.id) : false
    }
  ]
}

module.exports = config
