module.exports = {
    passThrough: require('./passThroughTransformer'),
    concatenate: require('./concatenateTransformer'),
    prefix: require('./prefixTransformer'),
    serial: require('./serialTransformer'),
    get default() { return this.passThrough }

}