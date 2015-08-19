'use strict'

var debug = require('debug')('starscream:transformers:concatenateTransformer')
var R = require('ramda')

module.exports = function concatenate(config, value, cb) {
    if (!R.is(Array, value)) return cb(new Error('Cannot concatenate a non array value'))
    cb(null, value.join(config.separator || ' '))
}