const winston = require('winston')
const path = require('path')
const root = path.join(__dirname, '..')

const levels = {
  levels: {
    error: 0,
    warn: 1,
    ready: 2,
    info: 3,
    cmd: 4
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    ready: 'green',
    info: 'cyan',
    cmd: 'white'
  }
}

winston.addColors(levels.colors)

const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: 'DD-MM-YYYY HH:mm:ss'
  }),
  winston.format.printf(
    info => `${info.timestamp} - ${info.level}: ${info.message}`
  )
)

const logger = winston.createLogger({
  levels: levels.levels,
  format: format,
  transports: [
    new winston.transports.Console()
  ]
})

logger.exitOnError = false

module.exports.log = logger
