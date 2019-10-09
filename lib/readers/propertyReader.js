'use strict'

var debug = require('debug')('starscream:readers:propertyReader')
var R = require('ramda')
var get = require('lodash.get')
var has = require('lodash.get')
var format = require('util').format

module.exports = function propertyReader(overrides, obj, cb) {
    var config = R.merge({ ignoreMissing: true }, overrides)
    debug('%s: Getting: %s, %s', config.type, config.path)
    var value
    try {
        if (isMissing() && failOnMissing()) return cb(Error(format('%s is missing', config.path)))
        value = get(obj, config.path)
    } catch (err) {
        return cb(err)
    }
    debug('%s: Got: %s from: %s', config.type, config.path, value)
    cb(null, value)

    function isMissing() {
        return !has(obj, config.path)
    }

    function failOnMissing() {
        return !config.ignoreMissing
    }
}
