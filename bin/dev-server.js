require('./check-versions')()
const opn = require('opn')
const path = require('path')
const chalk = require('chalk')
const request = require('request')
const express = require('express')
const webpack = require('webpack')
const config = require('../config/env').dev
const webpackConfig = require('../config/webpack.dev')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV =  JSON.parse(config.env.NODE_ENV)
}

const port = process.env.PORT || config.port
const openBrowser = !!config.openBrowser
const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ 
      action: 'reload' 
    })
    cb()
  })
})

app.use('/inmanage', (req, res) => {
  const url = `http://139.224.128.69:9080/inmanage${req.url}`
  console.log(chalk.yellow(`[PROXY]: ${url}`))
  req.pipe(request(url)).pipe(res)
})
  
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

app.use(hotMiddleware)

const staticPath = path.posix.join(config.publicPath, config.assets.subDir)
app.use(staticPath, express.static('./public'))

const uri = `http://localhost:${port}`

devMiddleware.waitUntilValid(() => console.log(chalk.green(`> Listening at ${uri} \n`)))

module.exports = app.listen(port, err => {
  if (err) {
    console.log(chalk.red(err))
    return
  }
  if (openBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
