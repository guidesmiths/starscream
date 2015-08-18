var async = require('async')
var format = require('util').format
var R = require('ramda')
var readers = require('./lib/readers')
var transformers = require('./lib/transformers')
var writers = require('./lib/writers')
var expand = require('./lib/config/expand')

module.exports = function starscream(overrides, original, done) {

    var options = R.merge({
        readers: readers,
        transformers: transformers,
        writers: writers
    }, overrides);

    async.reduce(expand(options.mapping), {}, function(wip, entry, next) {
        async.seq(
            function(cb) {
                if (!options.readers.hasOwnProperty(entry.reader.type)) return cb(new Error(format('Unknown reader: %s', entry.reader.type)))
                options.readers[entry.reader.type](entry.reader, original, cb)
            },
            function(raw, cb) {
                if (!options.transformers.hasOwnProperty(entry.transformer.type)) return cb(new Error(format('Unknown transformer: %s', entry.transformer.type)))
                options.transformers[entry.transformer.type](entry.transformer, raw, cb)
            },
            function(transformed, cb) {
                if (!options.writers.hasOwnProperty(entry.writer.type)) return cb(new Error(format('Unknown writer: %s', entry.writer.type)))
                options.writers[entry.reader.type](entry.writer, wip, transformed, cb)
            }
        )(next)
    }, done)
}