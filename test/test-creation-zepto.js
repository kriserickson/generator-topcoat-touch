/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('topcoat-touch generator zepto', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'tempZepto'), function (err) {
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
            'app/css/app.css'
        ];


        helpers.mockPrompt(this.app, {
            projectName: 'Test App',
            lightDark: 'light',
            kitchenSink: false,
            useCordova: false,
            jqueryZepto: 'zepto',
            includeHammer: true,
            includeIScroll: true,
            includeFastClick: true,
            mvcOrSingleDocument: 'single'
        });

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
