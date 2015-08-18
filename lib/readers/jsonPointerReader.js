'use strict'

var debug = require('debug')('starscream:readers:jsonPointerReader')
var jsonPointer = require('json-pointer')

module.exports = function jsonPointerReader(config, obj, cb) {
    debug('%s: Getting: %s', config.type, config.path)
    var value
    try {
        value = jsonPointer.get(obj, config.path)
    } catch (err) {
        return cb(err)
    }
    debug('%s: Got: %s from: %s', config.type, config.path, value)
    cb(null, value)
}