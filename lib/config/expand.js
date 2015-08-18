var R = require('ramda')

module.exports = function expand(mapping) {
    if (R.is(Array, mapping)) return expandArrayMapping(mapping)
    else if (R.is(Object, mapping)) return expandObjectMapping(mapping)
}

function expandArrayMapping(mapping) {
    return R.reduce(function(entries, entry) {
        var entry = {
            reader: expandReader(entry.writer && entry.writer.path, entry),
            transformer: expandTransformer(entry),
            writer: expandWriter(entry.reader && entry.reader.path, entry)
        }
        return entries.concat(R.clone(entry))
    }, [], mapping)
}

function expandObjectMapping(mapping) {
    return R.keys(mapping).reduce(function(entries, key) {
        var value = mapping[key]
        var entry = {
            reader: expandReader(key, value),
            transformer: expandTransformer(value),
            writer: defaultWriter(key)
        }
        return entries.concat(entry)
    }, [], mapping)
}

function expandReader(writerPath, config) {
    if (R.is(String, config)) return defaultReader(config)
    if (config.reader) return R.clone(config.reader)
    return defaultReader(writerPath)
}

function expandTransformer(config) {
    return R.is(String, config) || !config.transformer ? defaultTransformer() : R.clone(config.transformer)
}

function expandWriter(readerPath, config) {
    if (R.is(String, config)) return defaultWriter(config)
    if (config.writer) return R.clone(config.writer)
    return defaultWriter(readerPath)

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