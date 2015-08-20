'use strict'

var assert = require('assert')
var toggle = require('../../lib/transformers').toggle
var async = require('async')
var R = require('ramda')

describe('toggle transformer', function() {

    it('should convert truthy to false', function(done) {
        async.series([
            expectFalse(true),
            expectFalse(1),
            expectFalse('a')
        ], done)
    })

    it('should convert falsy to true', function(done) {
        async.series([
            expectTrue(false),
            expectTrue(0),
            expectTrue(undefined),
            expectTrue(null)
        ], done)
    })
})

function assertToggle(expected, input, cb) {
    toggle({}, input, function(err, result) {
        assert.ifError(err)
        assert.strictEqual(expected, result)
        cb()
    })
}

var expectTrue = R.curry(assertToggle)(true)
var expectFalse = R.curry(assertToggle)(false)