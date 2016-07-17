module.exports = function gruntTasks(grunt) {
  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    creds: grunt.file.readJSON('credentials.json'),
    screeps: {
      options: {
        email: '<%= creds.user %>',
        password: '<%= creds.pass %>',
        branch: 'default',
        ptr: false,
      },
      dist: {
        src: ['dist/*.js'],
      },
    },
    watch: {
      scripts: {
        files: ['dist/*.js'],
        tasks: ['screeps'],
        options: {
          spawn: false,
        },
      },
    },
  });
};
