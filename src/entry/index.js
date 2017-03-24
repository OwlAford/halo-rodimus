const userAgent = navigator.userAgent 
const hasString = str => userAgent.indexOf(str) > -1
const isOpera = hasString('Opera')
const isIE = hasString('compatible') && hasString('MSIE') && !isOpera
const isEdge = hasString('Edge') || !isIE && hasString('Windows NT') && hasString(' Trident/7.0;')
const isFF = hasString('Firefox')
const isSafari = hasString('Safari') && !hasString('Chrome')
const isChrome = hasString('Chrome') && hasString('Safari')
let IEVersion = ''

if (isIE) {  
  const reIE = new RegExp('MSIE (\\d+\\.\\d+);') 
  reIE.test(userAgent) 
  IEVersion = parseFloat(RegExp['$1'])
}

// console.log(userAgent)

isIE || isEdge ? window.fetch = null : null

if (isIE) {
  require.ensure(['es5-shim', 'es6-shim', 'isomorphic-fetch'], require => {
    require('es5-shim')
    require('es6-shim')
    require('isomorphic-fetch')
    require('./main')
  }, 'es5&es6&fetch')
} else {
  if (!window.Promise && window.fetch) {
    require.ensure('es6-promise', require => {
      require('es6-promise').polyfill()
      require('./main')
    }, 'es6')
  } else if (window.Promise && !window.fetch) {
    require.ensure('isomorphic-fetch', require => {
      require('isomorphic-fetch')
      require('./main')
    }, 'fetch')
  } else if (!window.Promise && !window.fetch) {
    require.ensure(['es6-promise', 'isomorphic-fetch'], require => {
      require('es6-promise').polyfill()
      require('isomorphic-fetch')
      require('./main')
    }, 'es6&fetch')
  } else {
    require('./main')
  }
}


