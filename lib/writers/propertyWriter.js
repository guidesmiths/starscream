'use strict'

var debug = require('debug')('starscream:writers:propertyWriter')
var set = require('lodash.set')
var R = require('ramda')


module.exports = function propertyWriter(overrides, obj, value, cb) {
    var config = R.merge({ ignoreMissing: true }, overrides)

    debug('%s: Setting: %s to: %s', config.type, config.path, value)
    try {
        if (hasValue() || setAnyway()) set(obj, config.path, value)
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
