module.exports = function(grunt) {

	// require('grunt-postcss')(grunt);

    grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Sass
		 */
		sass: {
		  dev: {
		    options: {
				style: 'expanded',
				sourcemap: 'auto',
				require: 'susy'
		    },
		    files: {
		    	'style.css': 'sass/style.scss'
		    },		    
		  }
		},

		/*
		* Autoprefixer (via postcss)
		*/

		postcss: {
		    options: {
		      map: true, // inline sourcemaps
		      processors: [
		        require('pixrem')(), // add fallbacks for rem units
		        require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes
		        require('cssnano')() // minify the result
		      ]
		    },
		    dist: {
		      src: '*.css'
		    }
		  },

		/**
		* Browser sync / https://css-tricks.com/cross-browser-css-injection/
		*/
		browserSync: {
		    bsFiles: {
		        src : 'style.css'
		    },
		    options: {
		    	watchTask: true,
	            proxy: "longform.co.za.dev",
	            injectChanges: true
	        },
		},

	  	/**
	  	 * Watch
	  	 */
		watch: {
			
			sass: {
				files: ['sass/*.scss'] ,
				tasks: ['sass' , 'postcss'],
				// options: {
				// 	livereload: 35729,
				// },
			},
			php: {
				files: ['**/*.php'],
				options: {
				livereload: 35729,
					}
				}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['browserSync','watch']);

}