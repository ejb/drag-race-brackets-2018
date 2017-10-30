var path = require('path');
module.exports = {
  entry: path.join(process.cwd(), 'app/client-render.js'),
  output: {
    path: './public/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  }
}
