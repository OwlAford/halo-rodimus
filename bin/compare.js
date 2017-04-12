const tools = require('./analyzing-tools')

tools.compare({
  source: 'data/snapshots/20170412200630.json',
  target: 'data/snapshots/20170412201724.json',
  compArr: ['css', 'js', 'images', 'fonts', 'static'],
  logPath: 'data/compare'
})
