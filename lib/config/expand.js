var R = require('ramda')

module.exports = function expand(mapping) {
    var entries = []
    if (R.is(Array, mapping)) {
        R.forEach(function(entry) {
            entries.push(R.clone(entry))
        }, mapping)
    } else if (R.is(Object, mapping)) {
        R.keys(mapping).forEach(function(key) {
            var value = mapping[key]
            var entry = {
                writer: {
                    type: 'default',
                    path: key
                }
            }
            if (R.is(String, value)) {
                entry.transformer = {
                    type: 'default'
                }
                entry.reader = {
                    type: 'default',
                    path: value
                }
            }
            entries.push(entry)
        })
    }
    return entries
}