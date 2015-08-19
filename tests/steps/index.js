'use strict'

var Yadda = require('yadda')
var English = Yadda.localisation.English
var Dictionary = Yadda.Dictionary
var assert = require('assert')
var safeParse = require("safe-json-parse/callback")
var starscream = require('../..')


module.exports = (function() {

    var dictionary = new Dictionary()
        .define('json', /([^\u0000]*)/, function(text, cb) {
            safeParse(text, cb)
        })
        .define('object', /([^\u0000]*)/, function(text, cb) {
            var x = undefined
            cb(null, eval('x = ' + text))
        })

    var library = English.library(dictionary)

    .when('I transform the following json:$json', function(source, cb) {
        this.ctx.source = source
        cb()
    })

    .define("Using the mapping:$json", function(mapping, cb) {
        this.ctx.options.mapping = mapping
        cb()
    })

    .then("I should get:$object", function(expected, cb) {
        starscream(this.ctx.options, this.ctx.source, function(err, output) {
            assert.ifError(err)
            assert.deepEqual(output, expected)
            cb()
        })
    })

    return library
})()