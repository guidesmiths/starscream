'use strict'

var debug = require('debug')('starscream:transformers:mapSeriesTransformer')
var async = require('async')
var R = require('ramda')

module.exports = function mapSeriesTransformer(options, config, value, next) {
    if (value === undefined) return next()
    if (!R.is(Array, value)) return next(new Error('Cannot iterate over a non array value'))
    async.mapSeries(value, function(item, cb) {
        options.transformers[config.transformer](config, item, cb)
    }, next)
}