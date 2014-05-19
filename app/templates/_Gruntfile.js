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

    var libJs = ['app/libs/topcoat-touch/js/topcoat-touch.js', 'app/libs/topcoat-touch/js/<%= jqueryZepto %>.js'
        <% if (mvc) { %>,'app/libs/topcoat-touch/js/lodash.js' <% } %><% if (includeHammer) { %>,'app/libs/topcoat-touch/js/hammer.js' <% } %>
        <% if (includeIScroll) { %>,'app/libs/topcoat-touch/js/iscroll.js' <% } %>
        <% if (includeFastClick) { %>,'app/libs/topcoat-touch/js/fastclick.js' <% } %>];

    var libCss = ['app/libs/topcoat-touch/css/topcoat-touch.css', 'app/libs/topcoat-touch/css/topcoat-mobile-<%= lightDark %>.css'];

<% } %>

    // Project configuration.
    grunt.initConfig({
        'http-server': {
            dev : {
                port: 3000,
                root: './app/'
            }
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
            cordova: ['cordova/www/index.html', 'cordova/www/img/**', 'cordova/www/css/**', 'cordova/www/font/**',
                'cordova/www/js/**', 'cordova/www/libs/js/**', 'cordova/www/libs/css/**', 'cordova/www/libs/font/**',
                'cordova/www/libs/img/**', 'cordova/www/libs/**' ]

        },
        concat:{
            js:{
                src: grunt.file.expand(libJs.concat(['app/js/*.js'])),
                dest:'dist/<%= projectNameSlug %>.combined.js'
            },
            css:{
                src: grunt.file.expand(libCss.concat(['app/css/*.css'])),
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
                    'dist/<%= projectNameSlug %>.min.css':['<banner:meta.banner>', 'dist/<%= projectNameSlug %>.css']
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
                    { dest: 'cordova/www/', cwd: 'app', expand: true, src: ['img/**']},
                    { dest: 'cordova/www/', cwd: 'app', expand: true, src: ['templates/**']},
                    { dest: 'cordova/www/', cwd: 'app/libs/topcoat-touch', expand: true, src: ['img/**', 'font/**']}
                ]
            },
            debugCordova: {
                files: [
                    { dest: 'cordova/www/', cwd: 'app/', expand: true,
                        src: ['index.html', 'css/*.css', 'js/*.js', 'img/**', 'libs/topcoat-touch/img/**',
                            'libs/topcoat-touch/font/**'].concat(libJs, libCss)}
                ]
            }
        },
        cordovacli: {
            options: {
                path: 'cordova',
                platforms: [<%= '"' + platforms.join('","') + '"'  %>]
            },
            create: {
                options: {
                    command: 'create'
                }
            },
            prepare: {
                options: {
                    command: 'prepare'
                }
            },
            build: {
                options: {
                    command: 'build'

                }
            },
            run: {
                options: {
                    command: 'run'
                }
            },
            emulate: {
                options: {
                    command: 'emulate'
                }
            }
        }
<% } %>
    , availabletasks: {
        tasks: {
            options: {
                filter: 'include',
                tasks: ['http-server'<% if (useCordova) { %>, 'cordova', 'debug-cordova', 'build', 'extension', 'test' <% } %>],
                descriptions: {
                    'http-server': 'Run an http-server on port 3000'<% if (useCordova) { %>,
                    cordova: 'Build the cordova(phonegap) project.  This requires running cordova prepare or cordova build afterwards.',
                    'debug-cordova': 'Build the cordova(phonegap) project, however do not minimize the code.  This requires running cordova prepare or cordova build afterwards.',
                    build: 'Builds the cordova project, runs prepare first',
                    prepare: 'Prepares the cordova project',
                    emulate: 'Runs build and then emulates the project',
                    run: 'Runs build and the runs the project on a device if attached'
                    <% } %>
                }
            }
        }
}

});

<% if (useCordova) { %>
    grunt.registerTask('debug-build', ['debugCordova', 'cordovacli:build']);
    grunt.registerTask('build', ['cordova', 'cordovacli:build']);
    grunt.registerTask('prepare', ['cordova', 'cordovacli:prepare']);
    grunt.registerTask('debug-prepare', ['cordova', 'cordovacli:prepare']);
    grunt.registerTask('cordova', ['clean:dist', 'clean:cordova', 'concat', 'uglify', 'cssmin', 'transform_html', 'copy:cordova']);
    grunt.registerTask('debug-cordova', ['clean:dist', 'clean:cordova', 'copy:debugCordova']);
    grunt.registerTask('cordova-debug', ['debugCordova']);
    grunt.registerTask('emulate', ['build', 'cordovacli:emulate']);
    grunt.registerTask('emulate', ['run', 'cordovacli:run']);
<% } %>

    // Default task.
    grunt.registerTask('default', ['availableTasks']);


};