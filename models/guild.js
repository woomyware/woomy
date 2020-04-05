const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { defaultGuildSettings: defaults } = require('../config')

module.exports = mongoose.model('Guild', new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,

  prefix: {
    type: String,
    default: defaults.prefix
  },

  systemNotice: {
    type: Boolean,
    default: defaults.systemNotice
  },

  modRole: {
    type: String,
    default: defaults.modRole
  },

  adminRole: {
    type: String,
    default: defaults.adminRole
  },

  mutedRole: {
    type: String,
    default: defaults.mutedRole
  }
}))

// I SPWENT TWO FUCKONG DAUYS TRYING TO FIGURE OUT HOW TO UPDATE EXISTING DB ENTRIES WITH NEW SCHEMA SHIT AND IT DOES THIS BY FUCKING DEFAULT
