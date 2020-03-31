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

  //
  permLevels: [
    {
      level: 0,
      name: 'User',

      check: () => true
    }
  ]
}

module.exports = config
