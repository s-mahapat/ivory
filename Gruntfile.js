module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    'src/main/webapp/resources/css/style.css'
                ],
                dest: 'src/main/webapp/resources/css/combined.css'
            },
            js: {
                src: [
                    'src/main/webapp/resources/js/controllers/*'
                ],
                dest: 'src/main/webapp/resources/js/combined_controllers.js'
            }
        },
        cssmin: {
            css: {
                src: 'src/main/webapp/resources/css/combined.css',
                dest: 'src/main/webapp/resources/css/ivory.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'src/main/webapp/resources/js/controllers.min.js': ['src/main/webapp/resources/js/combined_controllers.js']
                }
            }
        },
        watch: {
          files: ['src/main/webapp/resources/css/*', 'src/main/webapp/resources/js/**/*'],
          tasks: ['concat', 'cssmin', 'uglify']
       },
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'uglify:js']);
};
