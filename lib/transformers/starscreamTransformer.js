'use strict'

var debug = require('debug')('starscream:transformers:starscreanTransformer')
var starscream = require('../..')

module.exports = function starscreamTransformer(options, config, value, next) {
    options.mapping = config.mapping
    starscream(options, value, next)
}