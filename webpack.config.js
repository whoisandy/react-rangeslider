'use strict'

var path = require('path')
var ExtractPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src', 'index'),

  output: {
    library: 'ReactRangeslider',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractPlugin.extract('style-loader', 'css-loader!less-loader')
      }
    ]
  },

  plugins: [
    new ExtractPlugin('RangeSlider.css')
  ],

  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ]
}
