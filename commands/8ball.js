// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
  requiredPerms: [],
  cooldown: 2000
}

exports.help = {
  name: '8ball',
  category: 'Fun',
  description: 'Retrieves an answer to your question from the almighty 8ball.',
  usage: '`8ball [question]` - Retrieves an answer from 8ball based on the question or sentence provided.',
  parameters: '`question` - the question you want to ask'
}

// eslint-disable-next-line no-unused-vars
const responses = require('../assets/json/8ball.json').responses
exports.run = async (client, message, args, level, data) => {

  // Finish later
}
