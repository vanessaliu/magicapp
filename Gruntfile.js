module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'css/style.css' : 'scss/style.scss'
        }
      }
    },
    watch: {
      files: 'scss/*.scss',
      tasks: ['sass'],
      options: {
        spawn: false,
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['sass']);
}