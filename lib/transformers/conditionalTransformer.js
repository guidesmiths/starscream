'use strict'

var debug = require('debug')('starscream:transformers:conditionalTransformer')
var R = require('ramda')

module.exports = function conditional(config, value, cb) {
    if (!R.is(Array, value)) return cb(new Error('Cannot conditionally transform a non array value'))
    cb(null, value[0] ? value[1] : undefined)
}