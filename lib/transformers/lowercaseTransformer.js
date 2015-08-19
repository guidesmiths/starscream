'use strict'

var debug = require('debug')('starscream:transformers:lowercaseTransformer')
var R = require('ramda')

module.exports = function lowercase(config, value, cb) {
    if (R.is(Array, value)) return cb(new Error('Cannot lowercase an array value'))
    cb(null, value.toLowerCase())
}