var webpack = require('webpack')
var config = require('./webpack.base.config')
var cssLoaders = require('./css-loaders')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

config.output.publicPath = './'
config.output.filename = '[name].[chunkhash].js'
config.output.chunkFilename = '[id].[chunkhash].js'

config.devtool = false

config.vue = config.vue || {}
config.vue.loaders = config.vue.loaders || {}
cssLoaders({
  sourceMap: false,
  extract: true
}).forEach(function (loader) {
  config.vue.loaders[loader.key] = loader.value
})

config.plugins = (config.plugins || []).concat([

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),

  new ExtractTextPlugin('[name].[contenthash].css'),

  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),

  new HtmlWebpackPlugin({
    favicon:'./favicon.ico',
    filename: '../dist/index.html',
    template: './static/index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }),

  new webpack.optimize.OccurenceOrderPlugin()

])

module.exports = config
