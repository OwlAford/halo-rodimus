const path = require('path')
const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"'
    },
    assets: {
      root: resolve('dist'),
      subDir: '',
      htmlFileName: 'index.html',
      cssDir: 'css',
      jsDir: 'js'
    },
    jsHashType: 'chunkhash:8',
    cssHashType: 'contenthash:8',
    publicPath: '/inmanage/',
    sourceMap: false,
    gzip: false,
    gzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    htmlTemplate: resolve('static/index.html')
  },
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    port: 8080,
    openBrowser: true,
    assets: {
      subDir: ''
    },
    publicPath: '/',
    htmlTemplate: resolve('static/index.html')
  }
}


