// Copyright 2020 Emily J. / mudkipscience. Subject to the AGPLv3 license.

const mongoose = require('mongoose')

module.exports = {
  init: (client) => {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      family: 4
    }

    try {
      mongoose.connect(client.config.mongoDB, options)
      mongoose.set('useFindAndModify', false)
      mongoose.Promise = global.Promise
    } catch (err) {
      client.logger.error(`Could not connect to the database:\n ${err.stack}`)
    }

    mongoose.connection.on('connected', () => {
      client.logger.info('Connected to the database.')
    })

    mongoose.connection.on('err', err => {
      client.logger.error(`Database connection error:\n ${err.stack}`)
    })

    mongoose.connection.on('disconnected', () => {
      client.logger.info('Disconected from the database.')
    })

    mongoose.connection.on('reconnected', () => {
      client.logger.info('Reconnected to the database.')
    })
  }
}
