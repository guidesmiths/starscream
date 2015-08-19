'use strict'

var debug = require('debug')('starscream:transformers:serialTransformer')
var async = require('async')
var format = require('util').format
var expandTransformers = require('../config/expand').expandTransformers

module.exports = function serialTransformer(options, config, wip, next) {
    async.eachSeries(expandTransformers(config.transformers), function(entry, cb) {
        var fn = options.transformers[entry.transformer.type]
        var stash = function(err, result) {
            if (err) return cb(err)
            wip = result
            cb()
        }
        if (!fn) return cb(new Error(format('Unknown transformer: %s', entry.transformer.type)))
        if (fn.length === 3) return fn(entry.transformer, wip, stash)
        if (fn.length === 4) return fn(options, entry.transformer, wip, stash)
        return cb(new Error(format('Incorrect number of transformer arguments: %s', entry.transformer.type)))
    }, function(err) {
        next(err, wip)
    })
}

