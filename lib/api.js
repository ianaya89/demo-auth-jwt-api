const async = require('async')
const Server = require('./server')

class API {
  constructor (config, logger) {
    this.config = config
    this.logger = logger.child({ context: 'API' })
    this.isRunning = false
    this.server = new Server(config, this.logger)
  }

  start (cb) {
    if (this.isRunning) {
      throw new Error('Cannot start API because it is already running')
    }

    this.isRunning = true

    this.logger.verbose('Starting API')

    async.parallel([
      cb => this.server.listen(cb)
    ], (err) => {
      if (err) { return cb(err) }

      this.logger.verbose('API ready and awaiting requests')

      cb(null, { url: this.config.server.url })
    })
  }

  stop (cb) {
    if (!this.isRunning) {
      throw new Error('Cannot stop API because it is already stopping')
    }
    this.isRunning = false

    this.logger.verbose('Stopping API')
    async.parallel([
      (cb) => { this.server.close(cb) }
    ], (err) => {
      if (err) { return cb(err) }

      this.logger.verbose('API has closed all connections and successfully halted')
      cb(null)
    })
  }
}

module.exports = API
