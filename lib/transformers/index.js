module.exports = {
    passThrough: require('./passThroughTransformer'),
    concatenate: require('./concatenateTransformer'),
    mutualExclusion: require('./mutualExclusionTransformer'),
    guard: require('./guardTransformer'),
    uppercase: require('./uppercaseTransformer'),
    lowercase: require('./lowercaseTransformer'),
    prefix: require('./prefixTransformer'),
    serial: require('./serialTransformer'),
    get default() { return this.passThrough }

}