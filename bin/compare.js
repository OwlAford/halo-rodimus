const tools = require('./analyzing-tools')
const chalk = require('chalk')
const path = require('path')

let shotArr = []
const relPath = 'data/snapshots'
tools.readDir(path.resolve(), relPath, (curPath, filename, cb) => {
  shotArr.push(filename.split('.')[0] * 1)
})
shotArr = shotArr.sort((a, b) => b - a)

if (shotArr.length > 1) {
  tools.compare({
    source: `${relPath}/${shotArr[1]}.json`,
    target: `${relPath}/${shotArr[0]}.json`,
    compArr: ['css', 'js', 'images', 'fonts', 'static'],
    logPath: 'data',
    callback: data => tools.buildIncPackage(data, 'dist_inc')
  })
  require('./server-report')
} else {
  console.log(chalk.red('Can not be compared!'))
}
