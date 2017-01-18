const path = require('path');
const webpack = require('webpack');

module.exports = {

  module: {
    loaders: [{
      loader: 'babel-loader',
      test: /\.json$/,
      query: {
        presets: 'es2015',
      },
    }]
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin()
  ],
  stats: {
    // Nice colored output
    colors: true
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map',
};