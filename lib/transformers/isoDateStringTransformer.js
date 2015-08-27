'use strict'

var debug = require('debug')('starscream:transformers:isoDateStringTransformer')

module.exports = function isoDateStringTransformer(config, value, cb) {
    if (!value) return cb(undefined, undefined)
    var result
    try {
        result = new Date(value).toISOString()
    } catch (err) {
        return cb(err)
    }
    cb(null, result)
}

