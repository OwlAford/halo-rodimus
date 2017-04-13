const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const moment = require('moment')
const mkdirp = require('mkdirp')
const merge = require('webpack-merge')

const rootPath = path.resolve()
const getFullPath = relPath => path.join(rootPath, relPath)
const createDir = (path, islog) => mkdirp(path, err => err ? console.log(chalk.red(err)) : !islog && console.log(chalk.green(`${path} created successfully!`)))

exports.isEmptyObject = obj => {
  let name
  for ( name in obj ) {
    return false
  }
  return true
}

exports.deleteFolder = dir => {  
  let files = []
  if (fs.existsSync(dir)) {  
    files = fs.readdirSync(dir)
    files.forEach((file, index) => {  
      var curPath = path.join(dir, file) 
      if (fs.statSync(curPath).isDirectory()) {
        exports.deleteFolder(curPath)
      } else { 
        fs.unlinkSync(curPath)  
      }  
    })
    fs.rmdirSync(dir) 
  }  
}

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
  createDir(outputPath)
  exports.deleteEmptyProperty(resourceMap)
  exports.writeJSON(`./${outputPath}/${moment().format('YYYYMMDDHHmmss')}.json`, resourceMap)
  console.log(chalk.green('Resource mapping file has been generated!'))
}

exports.deleteEmptyProperty = object => {
  for (var key in object) {
    var value = object[key]
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length == 0) {
          delete object[key]
        }
      } else {
        if (exports.isEmptyObject(value)) {
          delete object[key]
        } else {
          exports.deleteEmptyProperty(value)
        }
      }
    } else if ((value === '' || value === null || value === undefined)) {
      delete object[key]
    }
  }
}

/**
  * @param [json] source
  * @param [json] target
  * @param [Array] compArr
  * @param [String] logPath
  *
  */
exports.compare = opts => {
  const sourceData = exports.readJSON(getFullPath(opts.source))
  const targetData = exports.readJSON(getFullPath(opts.target))

  // Get the list of new files
  let addList = {}
  let removeList = {}
  let modifiedList = {}
  opts.compArr.forEach(e => {
    addList[e] = {}
    modifiedList[e] = {}
    const tar = targetData[e]
    const old = sourceData[e]
    for (key in tar) {
      if (old[key]) {
        const tarItem = tar[key]
        const oldItem = old[key]
        if (tarItem.hash !== oldItem.hash || tarItem.size !== oldItem.size) {
          const oldHash = oldItem.hash
          const tarHash = tarItem.hash
          const hashChange = {
            oldHash,
            tarHash,
            change: oldHash == tarHash ? false : true
          }
          const oldSize = (oldItem.size / 1024).toFixed(3)
          const tarSize = (tarItem.size / 1024).toFixed(3)
          const numChange =((oldItem.size - tarItem.size) / 1024).toFixed(3)
          const sizeChange = {
            oldSize,
            tarSize,
            change: numChange > 0 ? `+${numChange}` : numChange
          }
          modifiedList[e][key] = {
            hashChange,
            sizeChange,
            newfilePath: tarItem.path
          }
        }
      } else {
        addList[e][key] = tar[key]
      }
    }
  })

  opts.compArr.forEach(e => {
    removeList[e] = {}
    const tar = targetData[e]
    const old = sourceData[e]
    for (key in old) {
      if (!tar[key]) {
        removeList[e][key] = old[key]
      }
    }
  })

  let report = {
    addList,
    modifiedList,
    removeList
  }
  exports.deleteEmptyProperty(report)
  createDir(opts.logPath)
  exports.writeJSON(`./${opts.logPath}/${moment().format('YYYYMMDDHHmmss')}.json`, report)
}

exports.copyFile = (filePath, tarDir) => {
  const files = fs.readFileSync(filePath)
  const spl = filePath.split('\\')
  const filename = spl[spl.length - 1]
  fs.writeFileSync(path.join(tarDir, filename), files)
}

exports.buildIncPackage = (map, outPath) => {
  exports.deleteFolder(getFullPath(outPath))
  createDir(outPath, true)
  const data = exports.readJSON(getFullPath(map))
  const bundleList = merge(data.addList, data.modifiedList)
  const incPath = getFullPath(outPath)
  if (!exports.isEmptyObject(bundleList)) {
    for (key in bundleList) {
      const curList = bundleList[key]
      for (itm in curList) {
        const item = curList[itm]
        const subDir = key === 'static' ? '' : key
        subDir && createDir(`${outPath}/${subDir}`, true)
        const filePath = item.path || item.newfilePath
        const curPath = path.join(incPath, subDir)
        exports.copyFile(filePath, curPath)
      }
    }
  }
  console.log(chalk.green('Files copy successfully!'))
}


