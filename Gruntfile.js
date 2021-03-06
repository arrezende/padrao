module.exports = function(grunt) {
	'use strict';
	var gruntConfig = {
		pkg: grunt.file.readJSON('package.json'),
		min: {
			dist: {
				src: ['src/assets/js/main.js'],
				dest: 'src/assets/js/all.min.js'
			}
		},
        //cssmin: {
        //    dist: {
        //        src: ['src/assets/css/main.css'],
        //        dest: 'src/assets/css/all.min.css'
        //    }
        //},
        imageoptim: {
            dist: {
                options: {
                    jpegMini: false,
                    imageAlpha: true,
                    quitAfter: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/assets/img',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: 'src/assets/img'
                }]
            }
        },

        // uncomment for use less and comment cssmin configs
		less: {
            development: {
                options: {
                    yuicompress: true
                },
                files: {
                    "./src/assets/css/all.min.css":
                    ["./src/assets/css/less/main.less"]
                }
            }
        },

        // Deploy using Rsync task
		rsync: {
			dist: {
				src: './src/',
				dest: '/dist/',
				recursive: true,
				syncDest: true,
				exclude: ['main.*', 'less']
			},
            // uncomment and config
			 deploy: {
			 	src: './dist/',
			 	dest: '/var/www',
			 	host: 'root@vagnersantana.com',
			 	recursive: true,
			 	syncDest: true
			 }
		},
		
		//Jade
		jade: {
	      compile: {
	        options: {
	          pretty: true,
	        },
	        
	        files: [ {
              cwd: "./src/assets/templates/jade/",
              src: "**/*.jade",
              dest: "./src/assets/templates/",
              expand: true,
              ext: ".html"
            } ]
	      }
	    }
	};
	grunt.initConfig(gruntConfig);

	var keys = Object.keys(gruntConfig);
	var tasks = [];

	for(var i = 1, l = keys.length; i < l; i++) {
		tasks.push(keys[i]);
	}

	grunt.loadNpmTasks('grunt-yui-compressor');
	grunt.loadNpmTasks('grunt-imageoptim');
	grunt.loadNpmTasks('grunt-rsync');
    // uncomment for use less
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.registerTask('default', tasks);
};