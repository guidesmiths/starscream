'use strict'

var debug = require('debug')('starscream:transformers:mutualExclusionTransformer')
var R = require('ramda')

module.exports = function mutualExclusionTransformer(config, value, cb) {
    if (!R.is(Array, value)) return cb(new Error('Cannot mutually exclude a non array value'))
    cb(null, value[0] ? value[0] : value[1])
}