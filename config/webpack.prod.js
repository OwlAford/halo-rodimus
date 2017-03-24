const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const assetsPath = require('./assetsPath')
const config = require('./env').build
const assets = config.assets
const baseWebpackConfig = require('./webpack.base')

const webpackConfig = merge(baseWebpackConfig, {
  devtool: config.sourceMap ? '#source-map' : false,
  output: {
    path: assets.root,
    publicPath: config.publicPath,
    filename: assetsPath(`${assets.jsDir}/[name].[${config.jsHashType}].js`),
    chunkFilename: assetsPath(`${assets.jsDir}/[id].[name].[${config.jsHashType}].js`)
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: assetsPath(`${assets.cssDir}/[name].[${config.cssHashType}].css`),
      allChunks : true
    }),
    new OptimizeCSSPlugin(),
    new HtmlWebpackPlugin({
      filename: assetsPath(assets.htmlFileName),
      template: config.htmlTemplate,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor', 'manifest']
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../public'),
      to: assets.subDir,
      ignore: ['.*']
    }])
  ]
})

if (config.gzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(`\\.(${config.gzipExtensions.join('|')})$`),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
