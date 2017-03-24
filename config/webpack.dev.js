const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const config = require('./env').dev
const baseWebpackConfig = require('./webpack.base')

const port = process.env.PORT || config.port

Object.keys(baseWebpackConfig.entry).forEach(name => {
  baseWebpackConfig.entry[name] = ['./bin/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  output: {
    publicPath: `http://localhost:${port}${config.publicPath}`
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.htmlTemplate,
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
