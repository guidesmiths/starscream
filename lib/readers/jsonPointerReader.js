'use strict'

var debug = require('debug')('starscream:readers:jsonPointerReader')
var jsonPointer = require('json-pointer')
var R = require('ramda')

module.exports = function jsonPointerReader(overrides, obj, cb) {
    var config = R.merge({ ignoreMissing: true }, overrides)
    debug('%s: Getting: %s', config.type, config.path)
    var value
    try {
        value = (jsonPointer.has(obj, config.path) || !config.ignoreMissing) ? jsonPointer.get(obj, config.path) : undefined
    } catch (err) {
        return cb(err)
    }
    debug('%s: Got: %s from: %s', config.type, config.path, value)
    cb(null, value)
}