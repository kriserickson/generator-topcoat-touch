/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var rimraf  = require('rimraf');
var helpers = require('yeoman-generator').test;
var fs      = require('fs');

describe('topcoat-touch generator cordova kitchen mvc', function () {
    beforeEach(function (done) {
        var self = this;
        var dir = path.join(__dirname, 'tempCordovaKitchenMVC');
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

        var expected = [
            // add files you expect to exist here.
            '.bowerrc',
            'package.json',
            'bower.json',
            'Gruntfile.js',
            'app/index.html',
            'app/js/app.js',
            'app/css/app.css',
            'app/templates/about.ejs',
            'app/templates/buttonExample.ejs',
            'app/templates/carouselExample.ejs',
            'app/templates/checkRadioExample.ejs',
            'app/templates/formExample.ejs',
            'app/templates/galleryExample.ejs',
            'app/templates/help.ejs',
            'app/templates/home.ejs',
            'app/templates/waitingDialogExample.ejs'
        ];


        helpers.mockPrompt(this.app, {
            projectName: 'Test App',
            lightDark: 'light',
            platforms: ['ios', 'android'],
            kitchenSink: true,
            useCordova: true,
            jqueryZepto: 'jquery',
            includeHammer: true,
            includeIScroll: true,
            includeFastClick: true,
            mvcOrSingleDocument: 'mvc',
            testing: false
        });

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
