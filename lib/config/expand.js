var R = require('ramda')

module.exports = function expand(mapping) {
    if (R.is(Array, mapping)) return expandArrayMapping(mapping)
    else if (R.is(Object, mapping)) return expandObjectMapping(mapping)
}

function expandArrayMapping(mapping) {
    return R.reduce(function(entries, entry) {
        var entry = {
            reader: expandReader(entry),
            transformer: expandTransformer(entry),
            writer: expandWriter(entry)
        }
        return entries.concat(R.clone(entry))
    }, [], mapping)
}

function expandObjectMapping(mapping) {
    return R.keys(mapping).reduce(function(entries, key) {
        var value = mapping[key]
        var entry = {
            reader: expandReader(value, key),
            transformer: expandTransformer(value),
            writer: expandWriter(value, key)
        }
        return entries.concat(entry)
    }, [], mapping)
}

function expandReader(config, readerPath) {
    if (config.reader) return R.clone(config.reader)
    if (readerPath) return defaultReader(readerPath)
    if (R.is(String, config)) return defaultReader(config)
    return defaultReader(config.writer.path)
}

function expandTransformer(config) {
    if (config.transformer) return R.clone(config.transformer)
    return defaultTransformer()
}

function expandWriter(config, readerPath) {
    if (config.writer) return R.clone(config.writer)
    if (R.is(String, config)) return defaultWriter(config)
    return defaultWriter(readerPath || config.reader.path)
}

function defaultWriter(path) {
    return {
        type: 'default',
        path: path
    }
}

function defaultReader(path) {
    return {
        type: 'default',
        path: path
    }
}

function defaultTransformer() {
    return {
        type: 'default'
    }
}