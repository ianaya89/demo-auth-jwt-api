const config = require('./config')
const logger = require('./logger')
const DemoAuthJwtApi = require('./lib/api')

exports = module.exports = new DemoAuthJwtApi(config, logger)
exports.DemoAuthJwtApi = DemoAuthJwtApi
