module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
              'cubesviewer/cubes/cubes.js',
              'cubesviewer/cubes/cubes-cvextensions.js',
              'cubesviewer/cubes/cubes-service.js',
              'cubesviewer/core/cubesviewer.js',
//              'cubesviewer/core/cache.js',
//              'cubesviewer/views/views.js',
//              'cubesviewer/views/cube.js',
//              'cubesviewer/views/explore.js',
              /*
              'cubesviewer/cubesviewer.views.cube.explore.js',
              'cubesviewer/cubesviewer.views.cube.datefilter.js',
              'cubesviewer/cubesviewer.views.cube.rangefilter.js',
              'cubesviewer/cubesviewer.views.cube.series.js',
              'cubesviewer/cubesviewer.views.cube.chart.js',
              'cubesviewer/cubesviewer.views.cube.facts.js',
              'cubesviewer/cubesviewer.views.cube.dimensionfilter.js',
              'cubesviewer/cubesviewer.views.cube.columns.js',
              'cubesviewer/cubesviewer.views.cube.export.js',
              'cubesviewer/cubesviewer.views.undo.js',
              */

              'cubesviewer/studio/studio.js',
//              'cubesviewer/studio/serialize.js',
//              'cubesviewer/studio/app.js',

              'cubesviewer/cubesviewer.templates.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    less: {
    	options: {
    	},
    	dist: {
	    	files: {
	    		'dist/cubesviewer.css': 'cubesviewer/cubesviewer.less'
	    	}
    	}
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    copy: {
      	dist: {
    		files: [
	        ]
    	}
    },
    qunit: {
      files: ['test/**/*.html']
    },
    bower: {
    	install: {
    		options: {
    			targetDir: 'html/lib/',
    			layout: 'byComponent',
    			verbose: true
		    }
	    }
    },
    /*
    wiredep: {
	  dist: {
          src: [
        	  'html/*.html'
          ],
          options: {
        	 ignorePath: '../bower_components/',
        	 fileTypes: {
        		 html: {
        			 replace: {
        				 js: '<script src="../lib/{{filePath}}"></script>',
        				 css: '<link rel="stylesheet" href="../lib/{{filePath}}" />'
        			 }
        		 }
        	 }
          }
      }
	},
	*/
    jshint: {
      files: ['Gruntfile.js', 'bower,json', 'cubesviewer/**/*.js', 'cubesviewer/**/*.less', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'bower.json', 'cubesviewer/**/**.*'],
      tasks: ['default']
    },
    ngtemplates:  {
    	  app:        {
    	    cwd:      'cubesviewer',
    	    src:      '**/**.html',
    	    dest:     'cubesviewer/cubesviewer.templates.js',
    	    options: {
    	    	module:	  "cv",
    	    }
    	  }
    	}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bower-task')
  //grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['less', 'ngtemplates', 'concat', 'uglify']); // 'bower',

};

