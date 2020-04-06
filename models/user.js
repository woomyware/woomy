const { Schema, model } = require('mongoose')
const { defaultPrefix } = require('../config')

module.exports = model('User', new Schema({
  _id: Schema.Types.ObjectId,
  userID: String,

  prefix: {
    type: String,
    default: defaultPrefix
  },

  profile: {
    type: Object,
    default: {
      bio: 'I should run ~setbio :P',
      birthdate: null,
      pronouns: null,
      favColour: null
    }
  },

  // polyamory uwu
  marriages: {
    type: Array,
    default: []
  }
}))
