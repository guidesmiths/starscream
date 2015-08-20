'use strict'

var debug = require('debug')('starscream:transformers:toggleTransformer')
var R = require('ramda')

module.exports = function uppercase(config, value, cb) {
    if (R.is(Array, value)) return cb(new Error('Cannot toggle an array value'))
    cb(null, !value)
}