var R = require('ramda')

module.exports = {
    expandMapping: function expandMapping(mapping) {
        if (R.is(Array, mapping)) return expandArrayMapping(mapping)
        else if (R.is(Object, mapping)) return expandObjectMapping(mapping)
    },
    expandReaders: function expandReaders(readers) {
        if (R.is(Array, readers)) return expandArrayReaders(readers)
        else if (R.is(Object, readers)) return expandObjectReaders(readers)
    },
    expandTransformers: function expandTransformers(transformers) {
        if (R.is(Array, transformers)) return expandArrayTransformers(transformers)
        return transformers
    }
}

function expandArrayMapping(mapping) {
    return R.reduce(function(entries, entry) {
        var expanded = {
            reader: expandReader(entry),
            transformer: expandTransformer(R.is(Object, entry) ? entry : {}),
            writer: expandWriter(entry)
        }
        return entries.concat(R.clone(expanded))
    }, [], mapping)
}

function expandObjectMapping(mapping) {
    return R.keys(mapping).reduce(function(entries, key) {
        var value = mapping[key]
        var expanded = {
            reader: expandReader(value, key),
            transformer: expandTransformer(R.is(Object, value) ? value : {}),
            writer: expandWriter(value, key)
        }
        return entries.concat(expanded)
    }, [], mapping)
}

function expandArrayReaders(readers) {
    return R.reduce(function(entries, entry) {
        var expanded = {
            reader: R.is(String, entry) ? expandReader({}, entry) : expandReader({ reader: entry })
        }
        return entries.concat(R.clone(expanded))
    }, [], readers)
}

function expandObjectReaders(readers) {
    return R.keys(readers).reduce(function(entries, key) {
        var value = readers[key]
        var expanded = {
            reader: expandReader(value, key)
        }
        return entries.concat(expanded)
    }, [], readers)
}

function expandArrayTransformers(transformers) {
    return R.reduce(function(entries, entry) {
        var expanded = {
            transformer: R.is(String, entry) ? expandTransformer({}, entry) : expandTransformer({ transformer: entry })
        }
        return entries.concat(R.clone(expanded))
    }, [], transformers)
}

function expandReader(config, readerPath) {
    if (config.reader) return R.clone(config.reader)
    if (readerPath) return defaultReader(readerPath)
    if (R.is(String, config)) return defaultReader(config)
    return defaultReader(config.writer.path)
}

function expandTransformer(config, type) {
    if (config.transformer) return R.clone(config.transformer)
    if (R.is(String, config)) return { type: config }
    if (type) return { type: type }
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