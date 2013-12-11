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
            type: 'list',
            name: 'lightDark',
            message: 'Light or dark theme?',
            choices: ['light', 'dark'],
            default: 'dark'
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
            choices: [{name: 'ios', checked: true}, {name: 'android', checked: true}, {name: 'wp7'},
                {name: 'wp8'}, {name: 'windows8'}, {name: 'amazon-fireos'}, {name: 'firefoxos'}, {name: 'blackberry10'}]
        }
    ];

    this.prompt(prompts, function (props) {
        this.projectName = props.projectName;
        this.projectNameSlug = _s.slugify(this.projectName);
        this.useCordova = props.useCordova;
        this.lightDark = props.lightDark;
        this.platforms = props.platforms;



        cb();
    }.bind(this));
};

TopcoatTouchGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.template('_index.html', 'app/index.html');
    this.mkdir('app/js');
    this.copy('_app.js', 'app/js/app.js');
    this.mkdir('app/css');
    this.copy('_app.css', 'app/css/app.css');
    this.template('_bower.json', 'bower.json');
    this.copy('bowerrc', '.bowerrc');
    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.template('_package.json', 'package.json');
};

TopcoatTouchGenerator.prototype.projectfiles = function projectfiles() {


};
