const path = require('path')
const config = require('./env')

const isProduction = process.env.NODE_ENV === 'production'
const assetsSubDir = config[isProduction ? 'build' : 'dev'].assets.subDir

module.exports = curPath => path.posix.join(assetsSubDir, curPath)