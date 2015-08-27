'use strict'

var debug = require('debug')('starscream:transformers:dateTransformer')

module.exports = function dateTransformer(config, value, cb) {
    if (!value) return cb(undefined, undefined)
    var result
    try {
        result = new Date(value)
    } catch (err) {
        return cb(err)
    }
    if (isNaN(result)) return cb(new Error('Invalid date: ' + value))
    cb(null, result)
}

