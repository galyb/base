module.exports = function(grunt) { // the general grunt function that is run

  grunt.initConfig({ // here we setup our config object with package.json and all the tasks

    pkg: grunt.file.readJSON('package.json'),

    sass: { // sass tasks
      dist: {
        options: {
          compass: true, // enable the combass lib, more on this later
          style: 'expanded' // we don't want to compress it
        },
        files: {
          'style/style.css': 'style/scss/app.scss' // this is our main scss file
        }
      }
    },

    cssmin: { // minifying css task
      dist: {
        files: {
          'style/style.min.css': 'style/style.css'
        }
      }
    },

    watch: { // watch task for general work
      scripts: {
        files: ['js/module/*.js', 'js/lib/*.js'],
        tasks: ['script']
      },
      sass: {
        files: ['style/**/*.scss'],
        tasks: ['sass']
      },
      styles: {
        files: ['style/master.css'],
        tasks: ['cssmin']
      }
    },

    concat: {
      options: {
        separator: ';',
      },

      modules: {
          src: [
              'js/module/bootload.js',
          ],
          dest: 'js/main.js',
        },
      libs: {

          src: [
              'js/lib/modernizr.js',
              'js/lib/jquery.1.11.1.js',
              'js/lib/jquery.imgpreload.js',
          ],
          dest: 'js/lib.js',
        },
    },
    uglify: {
      options: {
        separator: ';'
      },

      modules: {
          files: {
              'js/main.min.js': ['js/main.js']
            }
        },
      libs: {
          files: {
              'js/lib.min.js': ['js/lib.js']
            }
        }
    }


  });

  // all the plugins that is needed for above tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // registering the default task that we're going to use along with watch

  grunt.registerTask('script', ['concat', 'uglify']);
  grunt.registerTask('default', ['sass', 'cssmin','script']);
};