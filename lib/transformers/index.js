module.exports = {
    passThrough: require('./passThroughTransformer'),
    concatenate: require('./concatenateTransformer'),
    mutualExclusion: require('./mutualExclusionTransformer'),
    conditional: require('./conditionalTransformer'),
    guard: require('./guardTransformer'),
    uppercase: require('./uppercaseTransformer'),
    lowercase: require('./lowercaseTransformer'),
    prefix: require('./prefixTransformer'),
    serial: require('./serialTransformer'),
    get default() { return this.passThrough }

}