const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname),
    filename: 'obscene.js',
    library: 'obscene',
    libraryTarget: 'var',
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: path.join(__dirname, 'src'), loader: 'babel-loader' },
      { test: path.join(__dirname, 'scenes', '\.html$'), loader: 'html-loader' },
      // { test: path.join(__dirname, 'scenes','\.json$'), loader: 'json-loader' }
    ],
  },
}
