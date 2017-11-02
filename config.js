const milieu = require('milieu')

const config = milieu('pma', {
  server: {
    url: 'http://localhost:8989'
  },

  secret: 'iamsupersecret',

  logger: {
    console: {
      level: 'debug',
      timestamp: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      colorize: true
    }
  }
})

module.exports = config
