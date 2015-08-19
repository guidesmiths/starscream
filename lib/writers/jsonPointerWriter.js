'use strict'

var debug = require('debug')('starscream:writers:jsonPointerWriter')
var jsonPointer = require('json-pointer')
var R = require('ramda')


module.exports = function jsonPointerWriter(overrides, obj, value, cb) {
    var config = R.merge({ ignoreMissing: true }, overrides)

    debug('%s: Setting: %s to: %s', config.type, config.path, value)
    try {
        console.log(hasValue(), setAnyway())
        if (hasValue() || setAnyway()) jsonPointer.set(obj, config.path, value)
    } catch (err) {
        return cb(err)
    }
    cb(null, obj)

    function hasValue() {
        return value !== undefined
    }

    function setAnyway() {
        return !config.ignoreMissing
    }
}