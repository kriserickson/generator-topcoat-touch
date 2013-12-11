module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-http-server');
<% if (useCordova) { %>
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-transform-html');
    grunt.loadNpmTasks('grunt-cordovacli');

    var jsFiles = [''],
        cssFiles = ['' ];
<% } %>

    // Project configuration.
    grunt.initConfig({
        'http-server': {
            port: 3000,
            root: './app/'
        }
<% if (useCordova) { %>
        ,
        meta:{
            version:'2.0.0',
            projectName: '<%= projectNameSlug %>',
            banner:'/*! <%%= meta.projectName %> - v<%%= meta.version %> - <%%= grunt.template.today("yyyy-mm-dd") %>*/\n'
        },
        clean: {
            dist: ['dist/*'],
            cordova: ['cordova/www/index.html', 'cordova/www/img/*', 'cordova/www/css/**', 'cordova/www/font/**', 'cordova/www/js/*', 'cordova/www/libs/*' ]

        },
        concat:{
            js:{
                src:jsFiles,
                dest:'dist/<%= projectNameSlug %>.combined.js'
            },
            css:{
                src:cssFiles,
                dest:'dist/<%= projectNameSlug %>.css'
            }
        },
        uglify:{
            dist:{
                src:['<banner:meta.banner>', 'dist/<%= projectNameSlug %>.combined.js'],
                dest:'dist/<%= projectNameSlug %>.min.js'
            }
        },
        cssmin:{
            compress:{
                files:{
                    'dist/neomobile.min.css':['<banner:meta.banner>', 'dist/<%= projectNameSlug %>.css']
                }
            }
        },
        transform_html:{
            dist:{
                src:'app/index.html',
                dest:'dist/index.html',
                target:'PRODUCTION'
            }
        },
        copy:{
            cordova:{
                files: [
                    { dest: 'cordova/www/', cwd: 'dist', expand: true, src: 'index.html'},
                    { dest: 'cordova/www/css/', cwd: 'dist', expand: true, src: '<%= projectNameSlug %>.min.css'},
                    { dest: 'cordova/www/js/', cwd: 'dist', expand: true, src: '<%= projectNameSlug %>.min.js'},
                    { dest: 'cordova/www/', cwd: 'app', expand: true, src: ['img/**', 'font/**']}
                ]
            },
            debugCordova: {
                files: [
                    { dest: 'cordova/www/', cwd: 'app/', expand: true,
                        src: ['index.html', 'css/*.css', 'js/*.js', 'img/**', 'libs/*', 'fonts/**']}
                ]
            }
        },
        cordovacli: {
            options: {
                path: 'cordova'
            },
            cordova: {
                options: {
                    command: ['build'],
                    platforms: ['ios','android'],
                    path: 'cordova',
                    id: 'com.storefront.<%= projectNameSlug %>',
                    name: '<%= projectName %>'
                }
            },
            build: {
                options: {
                    command: 'build',
                    platforms: [<%= '"' + platforms.join('","') + '"'  %>]
                }
            }
        }
<% } %>
    });

<% if (useCordova) { %>
    grunt.registerTask('debugBuild', ['debugCordova', 'cordovacli:build']);
    grunt.registerTask('build', ['cordova', 'cordovacli:build']);
    grunt.registerTask('cordova', ['clean:dist', 'clean:cordova', 'concat', 'uglify', 'cssmin', 'transform_html', 'copy:cordova']);
    grunt.registerTask('debugCordova', ['clean:dist', 'clean:cordova', 'copy:debugCordova']);
    grunt.registerTask('cordovaDebug', ['debugCordova']);
<% } %>

    // Default task.
    grunt.registerTask('default', ['http-server']);

};