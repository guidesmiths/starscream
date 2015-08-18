var R = require('ramda')

module.exports = function expand(mapping) {
    if (R.is(Array, mapping)) return expandLonghandMapping(mapping)
    else if (R.is(Object, mapping)) return expandShorthandMapping(mapping)
}

function expandLonghandMapping(mapping) {
    return R.reduce(function(entries, entry) {
        return entries.concat(R.clone(entry))
    }, [], mapping)
}

function expandShorthandMapping(mapping) {
    return R.keys(mapping).reduce(function(entries, key) {
        var value = mapping[key]
        var entry = {
            reader: expandReader(key, value),
            transformer: R.is(String, value) || !value.transformer ? defaultTransformer() : R.clone(value.transformer),
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