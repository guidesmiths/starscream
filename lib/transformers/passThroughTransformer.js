'use strict'

var debug = require('debug')('starscream:transformers:passThroughTransformer')

module.exports = function passThroughTransformer(config, value, cb) {
    debug('%s: before: %s, after: %s', config.type, value, value)
    cb(null, value)
}