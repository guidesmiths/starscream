'use strict'

var debug = require('debug')('starscream:writers:jsonPointerWriter')
var jsonPointer = require('json-pointer')

module.exports = function jsonPointerWriter(config, obj, value, cb) {
    debug('%s: Setting: %s to: %s', config.type, config.path, value)
    try {
        jsonPointer.set(obj, config.path, value)
    } catch (err) {
        return cb(err)
    }
    cb(null, obj)
}