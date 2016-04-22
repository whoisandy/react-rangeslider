'use strict';

var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

var HtmlPlugin = require('html-webpack-plugin');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);

var config;
var paths = {
	src: path.join(ROOT_PATH, 'src'),
	demo: path.join(ROOT_PATH, 'demo'),
};

var common = {
	entry: path.resolve(paths.demo, 'index'),

	resolve: {
		extensions: ['', '.js', '.less'],
	}
};

if (TARGET === 'start' || !TARGET) {
	config = start();
} else if (TARGET === 'build' || !TARGET) {
	config = build();
} else if (TARGET === 'deploy' || !TARGET) {
	config = deploy();
}

function start() {
	const IP = '0.0.0.0';
	const PORT = 3000;

	return merge(common, {
		ip: IP,
		port: PORT,
		devtool: 'eval-source-map',

		entry: [
			'webpack-dev-server/client?http://' + IP + ':' + PORT,
			'webpack/hot/only-dev-server',
			path.join(paths.demo, 'index'),
		],

		output: {
			path: __dirname,
			filename: 'bundle.js'
		},

		resolve: {
			alias: {
				'react-rangeslider$': paths.src,
			},
		},

		module: {
			preLoaders: [
				{
					test: /\.js$/,
					loaders: ['eslint'],
					include: [paths.demo, paths.src],
				}
			],
			loaders: [
				{
					test: /\.js?$/,
					loaders: ['react-hot', 'babel?stage=0'],
					include: [paths.demo, paths.src],
				},
				{
					test: /\.less$/,
					exclude: /node_modules/,
					loaders: ['style', 'css', 'less'],
				},
			]
		},

		plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development'),
			}
		}),
		new HtmlPlugin({
			title: 'React Rangeslider',
			inject: true,
		}),
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		],
	});
}

function build() {
	return merge(common, {
		entry: path.resolve(paths.src, 'index'),

	  output: {
	    library: 'ReactRangeslider',
	    libraryTarget: 'umd',
		path: __dirname,
		filename: 'bundle.js'
	  },

	  module: {
	    loaders: [
	      {
	        test: /\.js?$/,
	        exclude: /node_modules/,
	        loader: 'babel?stage=0',
	      }
	    ]
	  },

	  externals: [
	    {
	      "react": {
	        root: "React",
	        commonjs2: "react",
	        commonjs: "react",
	        amd: "react"
	      }
	    }
	  ]
	});
}

function deploy() {
	return merge(common, {
		entry: path.resolve(paths.demo, 'index'),

		output: {
			path: 'deploy',
			filename: 'bundle.js'
		},

		resolve: {
			alias: {
				'react-rangeslider$': paths.src,
			},
		},

		module: {
	    loaders: [
	      {
	        test: /\.js?$/,
	        exclude: /node_modules/,
	        loaders: ['babel?stage=0'],
	      },
	      {
	        test: /\.less$/,
	        exclude: /node_modules/,
	        loaders: ['style', 'css', 'less']
	      }
	    ]
	  },

	  plugins: [
	    new HtmlPlugin({
				title: 'React Rangeslider',
				inject: true,
			}),
	    new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      }
	    }),
	    new webpack.optimize.OccurenceOrderPlugin(),
	  ]
	});
}

module.exports = config;
