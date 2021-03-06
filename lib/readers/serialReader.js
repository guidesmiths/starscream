'use strict'

var debug = require('debug')('starscream:readers:serialReader')
var async = require('async')
var format = require('util').format
var expandReaders = require('../config/expand').expandReaders

module.exports = function serialReader(options, config, original, next) {
    var results = []
    async.eachSeries(expandReaders(config.readers), function(entry, cb) {
        var fn = options.readers[entry.reader.type]
        var stash = function(err, result) {
            if (err) return cb(err)
            results.push(result)
            cb()
        }
        if (!fn) return cb(new Error(format('Unknown reader: %s', entry.reader.type)))
        if (fn.length === 3) return fn(entry.reader, original, stash)
        if (fn.length === 4) return fn(options, entry.reader, original, stash)
        return cb(new Error(format('Incorrect number of reader arguments: %s', entry.reader.type)))
    }, function(err) {
        next(err, results)
    })
}

