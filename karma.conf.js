'use strict';

module.exports = function(config) {
	config.set({
		port: 9876,

		colors: true,

		singleRun: true,

		reporters: ['mocha'],

		browsers: ['PhantomJS'],

		frameworks: ['chai', 'mocha'],

		files: [
		'src/tests/**/*Spec.js'
		],

		preprocessors: {
			'src/tests/index.js': ['webpack']
		},

		plugins: [
		'karma-chai',
		'karma-mocha',
		'karma-webpack',
		'karma-mocha-reporter',
		'karma-phantomjs-launcher',
		],

		webpack: {
			module: {
				loaders: [
				{
					exclude: /node_modules/,
					loader: 'babel?stage=0',
					test: /\.js?$/
				}
				],
			}
		},

		webpackServer: {
			noInfo: true
		},
	});
};
