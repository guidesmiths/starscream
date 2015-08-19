module.exports = {
    jsonPointer: require('./jsonPointerReader'),
    property: require('./propertyReader'),
    serial: require('./serialReader'),
    get default() { return this.jsonPointer }
}