const mongoose = require('mongoose')

// doesnt work

module.exports = {
  init: () => {
    const dbOps = {
      useNewUrlParser: true,
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    }

    mongoose.connect(client.config.mongoDB, dbOps)
    mongoose.set('useFindAndModify', false)
    mongoose.Promise = global.Promise

    mongoose.connection.on('connected', () => {
      client.logger.info('Database connection established.')
    })

    mongoose.connection.on('err', err => {
      client.logger.error(`Database connection error:\n ${err.stack}`)
    })

    mongoose.connection.on('disconnected', () => {
      client.logger.info('Disconected from database.')
    })
  }
}
