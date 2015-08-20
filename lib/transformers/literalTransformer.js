'use strict'

var debug = require('debug')('starscream:transformers:literalTransformer')

module.exports = function literalTransformer(config, value, cb) {
    cb(null, config.value)
}