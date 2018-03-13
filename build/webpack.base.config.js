'use strict'
const path = require('path')
const pagesInfo = require('./pages-info')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let configEntry = {}
let htmlPluginArr = []
pagesInfo.pagesNameArr.forEach(page => {
  // 遍历所有页面生成入口对象
  configEntry[page] = path.resolve(pagesInfo.pagesDir, page + '/' + page)

  // 遍历所有页面初始化html插件
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `pages/${page}.html`,
    template: path.resolve(pagesInfo.pagesDir, `./${page}/${page}.html`),
    chunks: [page, 'vendor', 'manifest', 'common'],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    chunksSortMode: 'dependency'
  })
  htmlPluginArr.push(htmlPlugin)
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: configEntry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name]/[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.css', '.less'],
    alias: {
      '@': resolve('src')
    }
  },
  // externals: {
  //   jquery: 'window.jQuery'
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        options: {
          presets: [["env", {
            "modules": false
          }]],
          cacheDirectory: true,
          plugins: ['transform-runtime']
        }
      },
      {
        test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        },{
          loader: 'expose-loader',
          options: '$'
        }]
      },
      {
        test: /\.html$/,
        include: [resolve('src')],
        loader: 'html-loader'
      },
      {
        // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
        // 如下配置，将小于8192byte的图片转成base64码
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: path.posix.join('/', 'img/[name].[hash:7].[ext]'),
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('/', 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // 把环境变量设置为全局常量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || '"development"'
    }),

    /* 全局shimming */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),

    ...htmlPluginArr
  ]
}
