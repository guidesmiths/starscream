'use strict'

var debug = require('debug')('starscream:transformers:prefixTransformer')
var R = require('ramda')

module.exports = function concatenate(config, value, cb) {
    if (R.is(Array, value)) return cb(new Error('Cannot prefix an array value'))
    cb(null, config.prefix + value)
}