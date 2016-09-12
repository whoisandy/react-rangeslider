module.exports = function (config) {
  config.set({
    port: 9876,
    colors: true,
    singleRun: true,
    reporters: ['mocha'],
    browsers: ['PhantomJS'],
    frameworks: ['chai', 'mocha'],

    files: [
      'tests/**/*Spec.js'
    ],

    preprocessors: {
      'tests/**/*Spec.js': ['webpack']
    },

    plugins: [
      'karma-chai',
      'karma-mocha',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher'
    ],

    webpack: {
      module: {
        loaders: [
          {
            exclude: /node_modules/,
            loader: 'babel',
            test: /\.js?$/
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  })
}
