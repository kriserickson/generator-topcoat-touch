/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var rimraf  = require('rimraf');
var fs      = require('fs');

describe('topcoat-touch generator testing', function () {

    beforeEach(function (done) {
        var self = this;
        var dir = path.join(__dirname, 'tempTesting');
        function test() {
            helpers.testDirectory(dir, function (err) {
                if (err) {
                    return done(err);
                }
                self.app = helpers.createGenerator('topcoat-touch:app', [
                    '../../app'
                ]);
                done();
            });
        }
        if (fs.existsSync(dir)) {
            rimraf(dir, function() {
                test();
            });
        } else {
            test();
        }
    });

    it('creates expected files', function (done) {

        helpers.mockPrompt(this.app, {
            projectName: 'Test App',
            lightDark: 'light',
            kitchenSink: false,
            useCordova: false,
            jqueryZepto: 'jquery',
            includeHammer: true,
            includeIScroll: true,
            includeFastClick: true,
            mvcOrSingleDocument: 'single',
            testing: true
        });

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            helpers.assertFile('.bowerrc', 'package.json', 'bower.json', 'Gruntfile.js', 'app/index.html',
                'app/js/app.js', 'app/css/app.css', 'TestRunner.html', 'test/testApp.js');
            done();
        });
    });
});
