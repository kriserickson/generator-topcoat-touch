/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var fs      = require('fs');
var helpers = require('yeoman-generator').test;



describe('topcoat-touch generator kitchen mvc', function () {
    beforeEach(function (done) {
        var dir = path.join(__dirname, 'tempKitchenMVC');
        helpers.testDirectory(dir, function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('topcoat-touch:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
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
            kitchenSink: true,
            useCordova: false,
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
