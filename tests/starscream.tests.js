'use strict'

var Yadda = require('yadda')
var steps = require('./steps')

Yadda.plugins.mocha.StepLevelPlugin.init()

new Yadda.FeatureFileSearch('./tests/features').each(function(file) {

    global.featureFile(file, function(feature) {

        var yadda = Yadda.createInstance(steps)

        global.scenarios(feature.scenarios, function(scenario) {
            var ctx = { options: {} }
            global.steps(scenario.steps, function(step, done) {
                yadda.run(step, { ctx: ctx }, done)
            })
        })
    })
})