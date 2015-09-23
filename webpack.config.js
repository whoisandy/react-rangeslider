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
  dist: path.join(ROOT_PATH, 'dist'),
};

var common = {
  entry: path.resolve(paths.demo, 'index'),
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.less'],
  }
};

if (TARGET === 'start' || !TARGET) {
  config = start();
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
        title: 'React Rangeslider'
      }),
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
}

module.exports = config;
