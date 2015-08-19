module.exports = {
    jsonPointer: require('./jsonPointerWriter'),
    property: require('./propertyWriter'),
    get default() { return this.jsonPointer }
}