'use strict'

var debug = require('debug')('starscream:transformers:uppercaseTransformer')
var R = require('ramda')

module.exports = function uppercase(config, value, cb) {
    if (R.is(Array, value)) return cb(new Error('Cannot uppercase an array value'))
    cb(null, value.toUpperCase())
}