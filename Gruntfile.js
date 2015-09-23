module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: ['public/js/console-game.js']
    },
    jshint: {
      files: ['Gruntfile.js', 'source/**/*.js'],
      options: {
        globals: {
          console: true
        }
      }
    },
    browserify: {
      dev: {
        options: {
          browserifyOptions: {
            debug: true
          }
        },
        files: {
          'public/js/console-game.js': 'source/app.js'
        }
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      dev: {
        files: ['source/**/*.js'],
        tasks: ['jshint', 'browserify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'browserify']);

};
