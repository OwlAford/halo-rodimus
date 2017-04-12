const tools = require('./analyzing-tools')

// tools.getSnapshots('dist', 'snapshots')

const options = {
  source: 'snapshots/20170412184931.json',
  target: 'snapshots/20170412184950.json',
  compArr: ['css', 'js', 'images', 'fonts', 'static'],
  logPath: 'log'
}

// tools.compare(options)

tools.buildIncPackage('log/compare-20170412185050.json', 'inc-dist')