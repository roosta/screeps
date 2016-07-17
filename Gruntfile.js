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
        src: ['src/*.js'],
      },
    },
    watch: {
      scripts: {
        files: ['src/*.js'],
        tasks: ['screeps'],
        options: {
          spawn: false,
        },
      },
    },
  });
};
