'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');


var TopcoatTouchGenerator = module.exports = function TopcoatTouchGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TopcoatTouchGenerator, yeoman.generators.Base);

TopcoatTouchGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            name: 'projectName',
            message: 'Topcoat Touch Project Name?'
        },
        {
            type: 'confirm',
            name: 'useCordova',
            message: 'Would you like to enable Cordova for this project?',
            default: true
        },
        {
        when: function(response) {
                return response.useCordova;
            },
            type: 'checkbox',
            name: 'platforms',
            message: 'Cordova platforms',
            choices: [{name: 'ios', checked: true}, {name: 'android', checked: true},
                {name: 'wp8'}, {name: 'windows8'}, {name: 'amazon-fireos'}, {name: 'firefoxos'}, {name: 'blackberry10'}]
        },
        {
            type: 'list',
            name: 'lightDark',
            message: 'Light or dark theme?',
            choices: ['light', 'dark'],
            default: 'light'
        },
        {
            type: 'list',
            name: 'jqueryZepto',
            message: 'User jQuery or Zepto as Dom manipulation library?',
            choices: ['jquery', 'zepto'],
            defaults: 'jquery'
        },
        {
            type: 'confirm',
            name: 'includeHammer',
            message: 'Include Hammer.js for gesture support?',
            default: true
        },
        {
            type: 'confirm',
            name: 'includeFastClick',
            message: 'Include fastclick.js to remove click delays?',
            default: true
        },
        {
            type: 'confirm',
            name: 'includeIScroll',
            message: 'Include IScroll.js for scrolling (required for KitchenSink demo)?',
            default: true
        },
        {
            type: 'list',
            name: 'mvcOrSingleDocument',
            message: 'MVC or Single Document?',
            choices: ['mvc', 'single document'],
            default: 'mvc'
        },
        {
            type: 'confirm',
            name: 'kitchenSink',
            message: 'Include the KitchenSink demo?',
            default: false
        },
        {
            type: 'confirm',
            name: 'testing',
            message: 'Include testing framework?',
            default: true
        }
    ];

    this.prompt(prompts, function (props) {
        this.projectName = props.projectName;
        this.projectNameSlug = _s.slugify(this.projectName);
        this.useCordova = props.useCordova;
        this.lightDark = props.lightDark;
        this.platforms = props.platforms;
        this.kitchenSink = props.kitchenSink;
        this.jqueryZepto = props.jqueryZepto;
        this.includeHammer = props.includeHammer;
        this.includeIScroll = props.includeIScroll;
        this.includeFastClick = props.includeFastClick;
        this.mvc = props.mvcOrSingleDocument == 'mvc';
        this.testing = props.testing;
        cb();
    }.bind(this));
};

TopcoatTouchGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.template('_index.html', 'app/index.html');
    this.mkdir('app/js');
    this.template('_app.js', 'app/js/app.js');
    this.mkdir('app/css');
    this.template('_app.css', 'app/css/app.css');
    this.template('_bower.json', 'bower.json');
    this.template('_README.md', 'README.md');
    this.copy('bowerrc', '.bowerrc');
    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.template('_package.json', 'package.json');
    if (this.useCordova) {
        this.copy('_cordova.js', 'app/cordova.js');
    }
    if (this.mvc) {
        if (this.kitchenSink) {
            this.copy('waitingDialogExample.ejs', 'app/templates/waitingDialogExample.ejs');
            this.copy('home.ejs', 'app/templates/home.ejs');
            this.copy('help.ejs', 'app/templates/help.ejs');
            this.copy('galleryExample.ejs', 'app/templates/galleryExample.ejs');
            this.copy('formExample.ejs', 'app/templates/formExample.ejs');
            this.copy('checkRadioExample.ejs', 'app/templates/checkRadioExample.ejs');
            this.copy('carouselExample.ejs', 'app/templates/carouselExample.ejs');
            this.copy('buttonExample.ejs', 'app/templates/buttonExample.ejs');
            this.copy('about.ejs', 'app/templates/about.ejs');
        } else {
            this.copy('homeDefault.ejs', 'app/templates/home.ejs');
        }
    }
    if (this.testing) {
        this.copy('TestRunner.html', 'TestRunner.html');
        this.mkdir('test');
        this.copy('testApp.js', 'test/testApp.js');
    }
};

TopcoatTouchGenerator.prototype.projectfiles = function projectfiles() {


};
