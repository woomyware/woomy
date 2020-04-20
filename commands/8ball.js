// Copyright 2020 Emily J. / mudkipscience. Subject to the AGPLv3 license.

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

exports.run = async (client, message, args, level, data) => {

  // Finish later
  const responses = [
    'No darndested clue.',
    '¯\\_(ツ)_/¯',
    'Stupid question. You should be ashamed of yourself for even asking.',
    'Yes!',
    'Not in your wildest dreams!',
    'No chance.',
    'Never.',
    'Possibly.',
    'There\'s a high chance.',
    'I\'d rather not say.'
  ]
}
