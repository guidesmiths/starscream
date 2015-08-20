'use strict'

var debug = require('debug')('starscream:transformers:mapSeriesTransformer')
var async = require('async')
var R = require('ramda')
var expandTransformers = require('../config/expand').expandTransformers
var format = require('util').format


module.exports = function mapSeriesTransformer(options, config, value, next) {
    if (value === undefined) return next()
    if (!R.is(Array, value)) return next(new Error('Cannot iterate over a non array value'))
    var transformer = expandTransformers(config.transformer)
    async.mapSeries(value, function(item, cb) {
        var fn = options.transformers[transformer.type]
        if (!fn) return cb(new Error(format('Unknown transformer: %s', transformer.type)))
        if (fn.length === 3) return fn(transformer, item, cb)
        if (fn.length === 4) return fn(R.clone(options), transformer, item, cb)
        return cb(new Error(format('Incorrect number of transformer arguments: %s', transformer.type)))

    }, function(err, results) {
        return next(err, results)
    })
}