const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {
    filename: 'app-bundle.js',
    path: path.resolve(__dirname),
  },
  devtool: 'source-map',
};
