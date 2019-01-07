const config = require('./config')

module.exports = function(grunt) {
    // load plugin
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
    ].forEach(function(task){
        grunt.loadNpmTasks(task)
    })

    // config plugin
    grunt.initConfig({
        cafemocha: {
            all: {
                src: 'qa/tests-*.js',
                options: {
                    ui: 'tdd',
                },
            }
        },
        jshint: {
            app: [
                'meadowlark.js',
                'public/js/**/*.js',
                'lib/**/*.js',
            ],
            qa: [
                'Gruntfile.js',
                'public/qa/**/*.js',
                'qa/**/*.js',
            ],

        },
        exec: {
            linkchecker: {
                'cmd': 'linkchecker http://localhost:' + config.PORT + config.URL_PREFIX,
            },
        },
    })

    // register task
    grunt.registerTask('default', ['cafemocha', 'jshint', 'exec'])
}
