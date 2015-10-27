module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		webpack: {
			build: {
				devtool: 'source-map',
				entry: './index.js',
				output: {
					library: 'TieredRate',
					path: 'dist/',
					filename: 'TieredRate.js'
				}
			}
		},

		uglify: {
			build: {
				files: {
					'dist/TieredRate-min.js': ['dist/TieredRate.js']
				}
			}
		},

		banner: '/**\n * TieredRate.js v<%= pkg.version %>\n */',
		usebanner: {
			dist: {
				options: {
					position: 'top',
					banner: '<%= banner %>'
				},
				files: {
					'dist/TieredRate.js': ['dist/TieredRate.js'],
					'dist/TieredRate-min.js': ['dist/TieredRate-min.js']
				}
			}
		},

		watch: {
			jasmine: {
				files: ['test/*.js'],
				tasks: ['test']
			}
		}
	});

	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-banner');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['webpack', 'uglify', 'usebanner']);
};