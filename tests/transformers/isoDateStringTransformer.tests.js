'use strict'

var assert = require('assert')
var isoDateString = require('../../lib/transformers').isoDateString

describe('iso date string transformer', function() {

    it('should convert date to an ISO string', function(done) {
        isoDateString({}, new Date(), function(err, result) {
            assert.ifError(err)
            assert.ok(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(result))
            done()
        })
    })

    it('should convert non date string to an ISO string', function(done) {
        isoDateString({}, 'Thu Aug 27 2015 08:17:03 GMT+0100 (BST)', function(err, result) {
            assert.ifError(err)
            assert.ok(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(result))
            done()
        })
    })

    it('should tolerate falsey values', function(done) {
        isoDateString({}, null, function(err, result) {
            assert.ifError(err)
            assert.equal(result, null)
            done()
        })
    })

    it('should yield errors for unconvertables', function(done) {
        isoDateString({}, 'not-a-date', function(err, result) {
            assert.ok(err)
            done()
        })
    })
})
