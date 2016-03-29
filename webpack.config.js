const path = require('path')
const webpack = require('webpack');

const PROD = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname),
    filename: PROD ? 'obscene.min.js' : 'obscene.js',
    library: 'obscene',
    libraryTarget: 'var',
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ] : [],
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: path.join(__dirname, 'src'), loader: 'babel-loader' },
      { test: path.join(__dirname, 'scenes', '\.html$'), loader: 'html-loader' },
      // { test: path.join(__dirname, 'scenes','\.json$'), loader: 'json-loader' }
    ],
  },
}
