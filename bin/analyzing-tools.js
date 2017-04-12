const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const moment = require('moment')
const mkdirp = require('mkdirp')

const rootPath = path.resolve()
const getFullPath = relPath => path.join(rootPath, relPath)

exports.writeJSON = (path, obj) => {
  fs.writeFileSync(path, JSON.stringify(obj, null, 2))
}

exports.readJSON = (path) => {
  return JSON.parse(fs.readFileSync(path))
}

exports.readDir = (rootPath, relPath, cb) => {
  const curPath = path.join(rootPath, relPath)
  const files = fs.readdirSync(curPath)
  if (files) {
    files.forEach(filename => {
      let stat = fs.statSync(path.join(curPath, filename))
      if (stat.isFile()) {
        cb(curPath, filename, stat)
      } else if (stat.isDirectory()) {
        exports.readDir(curPath, filename, cb)
      }
    })
  }
}

const getInfo = str => {
  const arr = str.split('.')
  const len = arr.length
  const hasHash = len > 2 ? true : false;
  return {
    name: hasHash ? arr.slice(0,  len - 2).join('.') : arr[0],
    suffix: hasHash ? arr[len - 1] : arr[1],
    hash: hasHash ? arr[len - 2] : ''
  }
}

exports.getSnapshots = (readPath, outputPath) => {
  let resourceMap = {
    js: {},
    css: {},
    fonts: {},
    static: {},
    images: {}
  }
  exports.readDir(rootPath, readPath, (curPath, filename, stat) => {
    const info = getInfo(filename)
    const fullPath = path.join(curPath, filename)
    const hash = info.hash ? info.hash : ''
    const suffix = info.suffix
    if (filename.match(/\.(js|css)$/)) {
      resourceMap[suffix][`${info.name}.${suffix}`] = {
        hash: hash,
        path: fullPath,
        size: stat.size,
        birthTime: stat.birthtime
      }
    } else if (filename.match(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)) {
      resourceMap.fonts[`${info.name}.${suffix}`] = {
        hash: hash,
        path: fullPath,
        size: stat.size,
        birthTime: stat.birthtime
      }
    } else if (filename.match(/\.(png|jpe?g|gif|svg)(\?.*)?$/)) {
      resourceMap.images[`${info.name}.${suffix}`] = {
        hash: hash,
        path: fullPath,
        size: stat.size,
        birthTime: stat.birthtime
      }
    } else if (filename.match(/\.(html?|ico)$/)) {
      resourceMap.static[`${info.name}.${suffix}`] = {
        hash: hash,
        path: fullPath,
        size: stat.size,
        birthTime: stat.birthtime
      }
    }
  })
  mkdirp(outputPath, err => err ? console.log(chalk.red(err)) : console.log(chalk.green(`${outputPath} created successfully!`)))
  exports.writeJSON(`./${outputPath}/${moment().format('YYYYMMDDHHmmss')}.json`, resourceMap)
  console.log(chalk.green('Resource mapping file has been generated!'))
}

/**
  * @param [json] source
  * @param [json] target
  * @param [Array] compArr
  *
  */

// exports.compare = options => {

// }

const opts = {
  source: 'snapshots/20170412140457.json',
  target: 'snapshots/20170412140495.json',
  compArr: ['css', 'js', 'assets', 'static']
}

const sourceData = exports.readJSON(getFullPath(opts.source))
const targetData = exports.readJSON(getFullPath(opts.target))

// format
let report = {
  js: {
    'vendor.js': {
      hashChange: 'af33sdf -> af33Sdf',
      sizeChange: '23KB -> 22KB (-1KB)',
      filePath: 'D:\\react-halo\\dist\\js'
    }
  },
  css: {
    'app.css': {
      hashChange: 'af33sdf -> af33Sdf',
      sizeChange: '23KB -> 24KB (+1KB)',
      filePath: 'D:\\react-halo\\dist\\css'
    }
  }
}