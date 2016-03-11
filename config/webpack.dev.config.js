var config = require('./webpack.base.config')
var cssLoaders = require('./css-loaders')

config.devtool = '#eval-source-map'

config.vue = config.vue || {}
config.vue.loaders = config.vue.loaders || {}
cssLoaders({
  sourceMap: true,
  extract: false
}).forEach(function (loader) {
  config.vue.loaders[loader.key] = loader.value
})

module.exports = config
