const tools = require('./analyzing-tools')

tools.compare({
  source: 'data/snapshots/20170413090609.json',
  target: 'data/snapshots/20170413090627.json',
  compArr: ['css', 'js', 'images', 'fonts', 'static'],
  logPath: 'data/compare'
})
