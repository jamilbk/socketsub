module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowercopy: {
      libs: {
        options: {
          destPrefix: 'public/javascripts'
        },
        files: {
          'jquery.js': 'bower_components/jquery/dist/jquery.min.js',
          'jquery-ui.js': 'bower_components/jquery-ui/jquery-ui.min.js',
          'bootstrap.js': 'bower_components/bootstrap/dist/js/bootstrap.min.js'
        }
      },
      stylesheets: {
        options: {
          destPrefix: 'public/stylesheets'
        },
        files: {
          'bootstrap.css': 'bower_components/bootstrap/dist/css/bootstrap.min.css',
          'bootstrap-theme.css': 'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
        }
      },
      fonts: {
        files: {
          'public/fonts': 'bower_components/bootstrap/dist/fonts'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-bowercopy');

  // Default task(s).
  grunt.registerTask('default', ['bowercopy']);
};
