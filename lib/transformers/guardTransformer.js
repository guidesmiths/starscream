'use strict'

var debug = require('debug')('starscream:transformers:guardTransformer')
var R = require('ramda')

module.exports = function guardTransformer(config, value, cb) {
    if (!R.is(Array, value)) return cb(new Error('Cannot guard a non array value'))
    cb(null, value[0] ? undefined : value[1])
}