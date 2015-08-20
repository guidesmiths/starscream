'use strict'

var debug = require('debug')('starscream:transformers:concatenateTransformer')
var R = require('ramda')

module.exports = function concatenateTransformer(config, value, cb) {
    if (!R.is(Array, value)) return cb(new Error('Cannot concatenate a non array value'))
    cb(null, value.join(config.separator || ' '))
}