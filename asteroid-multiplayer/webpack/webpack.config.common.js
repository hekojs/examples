'use strict'

const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const root = path.join(__dirname, '..')

module.exports = {
  plugins: [
    new CopyPlugin([
      { from: path.join(root, 'static'), to: path.join(root, 'dist') },
    ]),
  ],

  entry: {
    main: path.join(root, 'src', 'index')
  },

  output: {
    filename: 'bundle.js',
    path: path.join(root, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  },

  devServer: {
    overlay: true,
    contentBase: path.join(root, 'static')
  }
}
