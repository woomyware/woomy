const { Schema, model } = require('mongoose')

module.exports = model('Member', new Schema({
  _id: Schema.Types.ObjectId,
  userID: String

  // Will chuck in some stuff like timed mutes, warning system, levelling, etc
}))
