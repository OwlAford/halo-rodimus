const config = require('./env')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

const styleLoader = (loader, options) => {
  options = options || {}

  let loaders = [{
    loader: 'css-loader',
    options: {
      minimize: isProduction,
      sourceMap: !isProduction
    }
  }, 'postcss-loader']

  if (loader) {
    loaders.push({
      loader: loader,
      options: Object.assign({}, options, {
        sourceMap: !isProduction
      })
    })
  }

  if (isProduction) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'style-loader'
    })
  } else {
    return ['style-loader'].concat(loaders)
  }
}

module.exports = styleLoader
