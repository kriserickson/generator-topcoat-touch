module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-http-server');


    // Project configuration.
    grunt.initConfig({
        'http-server': {
            dev : {
                port: 3000,
                root: './app/'
            }
        }

    });



    // Default task.
    grunt.registerTask('default', ['http-server']);


};