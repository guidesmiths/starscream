module.exports = {
    jsonPointer: require('./jsonPointerReader'),
    serial: require('./serialReader'),
    get default() { return this.jsonPointer }
}