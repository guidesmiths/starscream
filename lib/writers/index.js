module.exports = {
    jsonPointer: require('./jsonPointerWriter'),
    get default() { return this.jsonPointer }
}