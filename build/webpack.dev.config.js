'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    watchContentBase: false,
    publicPath: '/',
    // quiet: true, // necessary for FriendlyErrorsPlugin
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        include: [resolve('src')],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        include: [resolve('src')],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),

    new webpack.NoEmitOnErrorsPlugin()
  ]
})

module.exports = devWebpackConfig
