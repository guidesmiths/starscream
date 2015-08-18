module.exports = {
    jsonPointer: require('./jsonPointerReader'),
    get default() { return this.jsonPointer }
}