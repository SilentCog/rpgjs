module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: [
        'public/js/local-game.js'  ,
        'public/js/remote-game.js'
      ]
    },
    jshint: {
      files: ['Gruntfile.js', 'source/**/*.js', 'views/**/*.js'],
      options: {
        globals: {
          console: true
        },
        additionalSuffixes: ['.js']
      }
    },
    browserify: {
      dev: {
        options: {
          transform: ['reactify'],
          browserifyOptions: {
            debug: true
          }
        },
        files: {
          'public/js/local-game.js'  : 'source/app.local.js'  ,
          'public/js/remote-game.js' : 'source/app.remote.js'
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
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'browserify']);

};
