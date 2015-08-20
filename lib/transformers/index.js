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
    mapSeries: require('./mapSeriesTransformer'),
    toggle: require('./toggleTransformer'),
    starscream: require('./starscreamTransformer'),
    literal: require('./literalTransformer'),
    get default() { return this.passThrough }

}