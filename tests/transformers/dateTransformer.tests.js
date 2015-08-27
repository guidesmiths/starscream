'use strict'

var assert = require('assert')
var date = require('../../lib/transformers').date

describe('date transformer', function() {

    it('should convert an ISO string to a date', function(done) {
        var now = new Date()
        date({}, now.toISOString(), function(err, result) {
            assert.ifError(err)
            assert.equal(now.getTime(), result.getTime())
            done()
        })
    })

    it('should tolerate falsey values', function(done) {
        date({}, null, function(err, result) {
            assert.ifError(err)
            assert.equal(result, null)
            done()
        })
    })

    it('should yield errors for unconvertables', function(done) {
        date({}, 'not-a-date', function(err, result) {
            assert.ok(err)
            done()
        })
    })
})
