/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var fs      = require('fs');
var helpers = require('yeoman-generator').test;


describe('topcoat-touch generator kitchen simple', function () {
    beforeEach(function (done) {
        var dir = path.join(__dirname, 'tempKitchen');
        if (fs.existsSync(dir)) {
            fs.readdirSync(dir).forEach(function(fileName) {
                console.log('Deleting: ' + fileName);
                fs.unlinkSync(fileName);
            });
        }
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
            'app/css/app.css'
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
            mvcOrSingleDocument: 'single',
            testing: false
        });

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
