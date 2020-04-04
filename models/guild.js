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
    default: defaults.modRole
  }
}))
