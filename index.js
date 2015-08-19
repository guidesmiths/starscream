var async = require('async')
var format = require('util').format
var R = require('ramda')
var readers = require('./lib/readers')
var transformers = require('./lib/transformers')
var writers = require('./lib/writers')
var expandMapping = require('./lib/config/expand').expandMapping

module.exports = function starscream(overrides, original, done) {

    var options = R.merge({
        readers: readers,
        transformers: transformers,
        writers: writers
    }, overrides);

    async.reduce(expandMapping(options.mapping), {}, function(wip, entry, next) {
        async.seq(
            function(cb) {
                var fn = options.readers[entry.reader.type]
                if (!fn) return cb(new Error(format('Unknown reader: %s', entry.reader.type)))
                if (fn.length === 3) return fn(entry.reader, original, cb)
                if (fn.length === 4) return fn(options, entry.reader, original, cb)
                return cb(new Error(format('Incorrect number of reader arguments: %s', entry.reader.type)))
            },
            function(raw, cb) {
                var fn = options.transformers[entry.transformer.type]
                if (!fn) return cb(new Error(format('Unknown transformer: %s', entry.transformer.type)))
                if (fn.length === 3) return fn(entry.transformer, raw, cb)
                if (fn.length === 4) return fn(options, entry.transformer, raw, cb)
                return cb(new Error(format('Incorrect number of transformer arguments: %s', entry.transformer.type)))
            },
            function(transformed, cb) {
                var fn = options.writers[entry.writer.type]
                if (!fn) return cb(new Error(format('Unknown writer: %s', entry.writer.type)))
                if (fn.length === 4) return fn(entry.writer, wip, transformed, cb)
                if (fn.length === 5) return fn(options, entry.writer, wip, transformed, cb)
                return cb(new Error(format('Incorrect number of writer arguments: %s', entry.writer.type)))
            }
        )(next)
    }, done)
}