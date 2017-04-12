const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const moment = require('moment')
const mkdirp = require('mkdirp')
const rootPath = path.resolve()

exports.writeJSON = (path, obj) => {
  fs.writeFileSync(path, JSON.stringify(obj, null, 2))
}

exports.readJSON = (path, obj) => {
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

const getSnapshots = (outputPath, readPath) => {
  let resourceMap = {
    js: {},
    css: {},
    static: {},
    assets: {}
  }
  exports.readDir(rootPath, readPath, (curPath, filename, stat) => {
    const info = getInfo(filename)
    if (info.suffix === 'js' || info.suffix === 'css') {
      resourceMap[info.suffix][`${info.name}.${info.suffix}`] = {
        hash: info.hash ? info.hash : '',
        path: curPath,
        size: stat.size,
        birthTime: stat.birthtime
      }
    } else {
      const dir = info.hash ? 'assets' : 'static'
      resourceMap[dir][`${info.name}.${info.suffix}`] = {
        hash: info.hash ? info.hash : '',
        path: curPath,
        size: stat.size,
        birthTime: stat.birthtime
      }
    }
  })
  mkdirp(outputPath, err => err ? console.log(chalk.red(err)) : console.log(chalk.green(`${outputPath} created successfully!`)))
  exports.writeJSON(`./${outputPath}/${moment().format('YYYYMMDDhhmmss')}.json`, resourceMap)
  console.log(chalk.green('Resource mapping file has been generated!'))
}

getSnapshots('snapshots', 'dist')
