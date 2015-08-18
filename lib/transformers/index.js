module.exports = {
    passThrough: require('./passThroughTransformer'),
    get default() { return this.passThrough }

}