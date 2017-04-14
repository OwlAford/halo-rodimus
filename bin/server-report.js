const fs = require('fs')
const opn = require('opn')
const pug = require('pug')
const path = require('path')
const chalk = require('chalk')
const express = require('express')
const tools = require('./analyzing-tools')

const server = express()
const rootPath = path.resolve()
const layout = fs.readFileSync('./static/report.html', 'utf8')
const viewFn = pug.compileFile('./static/report.pug')
const Data = tools.readJSON(path.join(rootPath, 'data/compare.json'))
tools.deleteEmptyProperty(Data)
const reportView = viewFn(Data)

const uri = 'http://localhost:5000'
server.use('/static', express.static(path.join(rootPath, 'static')))
server.get('*', (req, res) => {
  res.send(layout.replace('<div id="app"></div>', reportView))
})
server.listen(5000, error => {
  if (error) {
    throw error
  } 
  console.log(chalk.green(`Server is running at ${uri}`))  
  opn(uri)
})