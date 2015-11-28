var webpack = require('webpack');
module.exports = {

  entry: [
    'webpack/hot/only-dev-server',
    "./src/app.js"
  ],
  output: {
    path: __dirname + '/build',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react'] }
      },
      { test: /\.scss$/, loader: ["style", "css", "sass"] }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]

};
