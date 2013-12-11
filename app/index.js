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
            type: 'list',
            name: 'lightDark',
            message: 'Light or dark theme?',
            choices: ['light', 'dark'],
            default: 'dark'
        }
    ];

    this.prompt(prompts, function (props) {
        this.projectName = props.projectName;
        this.projectNameSlug = _s.slugify(this.projectName);
        this.useCordova = props.useCordova;
        this.lightDark = props.lightDark;

        cb();
    }.bind(this));
};

TopcoatTouchGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.copy('_bower.json', 'app/bower.json');
    this.copy('_index.html', 'app/index.html');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.copy('_package.json', 'package.json');
};

TopcoatTouchGenerator.prototype.projectfiles = function projectfiles() {


};
