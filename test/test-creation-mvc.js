/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('topcoat-touch generator mvc', function () {
    beforeEach(function (done) {
        var dir = path.join(__dirname, 'tempMVC');
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
            'app/css/app.css',
            'app/templates/home.ejs',
        ];


        helpers.mockPrompt(this.app, {
            projectName: 'Test App',
            lightDark: 'light',
            kitchenSink: false,
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
