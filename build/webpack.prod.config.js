'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const pagesInfo = require('./pages-info')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 分别初始化公共样式和页面单独样式对应的插件
const extractCommon = new ExtractTextPlugin(path.posix.join('/', 'css/common.[contenthash].css'))
const extractSrc = new ExtractTextPlugin(path.posix.join('/', 'css/[name].[contenthash].css'))

const webpackConfig = merge(baseWebpackConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name]/[name].[chunkhash].js',
    chunkFilename: 'js/[name]/[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [/node_modules/, /common/],
        use: extractCommon.extract([
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              '-autoprefixer': true
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          }
        ])
      },
      {
        test: /\.less$/,
        include: [/node_modules/, /common/],
        use: extractCommon.extract([
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              '-autoprefixer': true
            },
          },
          {
            loader: 'postcss-loader',
          },
        ])
      },
      {
        test: /\.css$/,
        exclude: /common/,
        include: [resolve('src')],
        use: extractSrc.extract([
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              '-autoprefixer': true
            },
          },
          {
            loader: 'postcss-loader',
          },
        ])
      },
      {
        test: /\.less$/,
        exclude: /common/,
        include: [resolve('src')],
        use: extractSrc.extract([
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              '-autoprefixer': true
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          }
        ])
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      parallel: true
    }),

    extractCommon,

    extractSrc,

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    }),

    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/Commons/[name].[chunkhash].js',
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'js/Commons/[name].[chunkhash].js',
      minChunks: Infinity
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/Commons/[name].[chunkhash].js',
      chunks: pagesInfo.pagesNameArr
    })
  ]
})

// 根据环境变量区分是否加载打包分析插件
if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
