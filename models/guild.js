const { Schema, model } = require('mongoose')
const { defaultPrefix } = require('../config')

module.exports = model('Guild', new Schema({
  _id: Schema.Types.ObjectId,
  guildID: String,

  prefix: {
    type: String,
    default: defaultPrefix
  },

  modRole: {
    type: String,
    default: null
  },

  adminRole: {
    type: String,
    default: null
  },

  mutedRole: {
    type: String,
    default: null
  },

  autoRole: {
    type: String,
    default: null
  },

  systemNotice: {
    type: Object,
    default: {
      enabled: true,
      autoDelete: 0
    }
  },

  music: {
    type: Object,
    default: {
      defaultVolume: 0.25
    }
  },

  plugins: {
    type: Object,
    default: {
      welcome: {
        enabled: false,
        channel: null,
        message: null
      },
      goodbye: {
        enabled: false,
        channel: null,
        message: null
      },
      chatLogs: {
        enabled: false,
        channel: null
      },
      modLogs: {
        enabled: false,
        channel: null
      }
    }
  },

  botChannels: {
    type: Array,
    default: []
  },

  blacklisted: {
    type: Array,
    default: []
  },

  customCommands: {
    type: Array,
    default: []
  },

  disabledCommands: {
    type: Array,
    default: []
  },

  disabledCategories: {
    type: Array,
    default: []
  }
}))

// I SPWENT TWO FUCKONG DAUYS TRYING TO FIGURE OUT HOW TO UPDATE EXISTING DB ENTRIES WITH NEW SCHEMA SHIT AND IT DOES THIS BY FUCKING DEFAULT
