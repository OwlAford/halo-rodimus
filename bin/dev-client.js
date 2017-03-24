require('eventsource-polyfill')
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(event => event.action === 'reload' ? window.location.reload() : null)
