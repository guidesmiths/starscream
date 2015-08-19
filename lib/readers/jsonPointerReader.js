'use strict'

var debug = require('debug')('starscream:readers:jsonPointerReader')
var jsonPointer = require('json-pointer')
var R = require('ramda')

module.exports = function jsonPointerReader(overrides, obj, cb) {
    var config = R.merge({ ignoreMissing: true }, overrides)
    debug('%s: Getting: %s', config.type, config.path)
    var value
    try {
        value = (hasPath() || getAnyway()) ? jsonPointer.get(obj, config.path) : undefined
    } catch (err) {
        return cb(err)
    }
    debug('%s: Got: %s from: %s', config.type, config.path, value)
    cb(null, value)

    function hasPath() {
        return jsonPointer.has(obj, config.path)
    }

    function getAnyway() {
        return !config.ignoreMissing
    }
}