const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const moment = require('moment')

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

let resourceMap = {
  js: {},
  css: {},
  static: {},
  assets: {}
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

exports.readDir(rootPath, 'dist', (curPath, filename, stat) => {
  const info = getInfo(filename)

  if (info.suffix === 'js') {
    resourceMap.js[info.name] = {
      hash: info.hash,
      path: curPath,
      size: stat.size,
      birthTime: stat.birthtime
    }
  } else if (info.suffix === 'css') {
    resourceMap.css[info.name] = {
      hash: info.hash,
      path: curPath,
      size: stat.size,
      birthTime: stat.birthtime
    }
  } else if (!info.hash) {
    resourceMap.static[info.name] = {
      suffix: info.suffix,
      path: curPath,
      size: stat.size,
      birthTime: stat.birthtime
    } 
  } else {
    resourceMap.assets[info.name] = {
      suffix: info.suffix,
      hash: info.hash,
      path: curPath,
      size: stat.size,
      birthTime: stat.birthtime
    }
  }
})

exports.writeJSON(`./log/${moment().format('MMDDhhmmss')}.json`, resourceMap)
console.log(chalk.green('Resource mapping file has been generated!'))