module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-screeps');

  grunt.initConfig({
    creds: grunt.file.readJSON("credentials.json"),
    screeps: {
      options: {
        email: "<%= creds.user %>",
        password: "<%= creds.pass %>",
        branch: 'default',
        ptr: false
      },
      dist: {
        src: ['src/*.js']
      }
    }
  });
}
