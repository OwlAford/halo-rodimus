export const getCookieVal = offset => {
  const doc = window.document
  let endstr = doc.cookie.indexOf(';', offset)
  if (endstr == -1) 
    endstr = window.document.cookie.length
  return unescape(doc.cookie.substring(offset, endstr))
}

export const getCookie = name => {
  const doc = window.document
  const arg = `${name}=`
  const argSize = arg.length
  const ckSize = doc.cookie.length
  let i = 0
  while (i < ckSize) {
    let j = i + argSize
    if (doc.cookie.substring(i, j) == arg) 
      return getCookieVal(j)
    i = doc.cookie.indexOf(' ', i) + 1
    if (i == 0) 
      break
  }
  return null
}

export const setCookie = (name, value, delay) => {
  const exp = new Date()
  let delayTime = 1 * 24 * 60 * 60 * 1000
  if (delay)
    delayTime = delay
  exp.setTime(exp.getTime() + delayTime)
  window.document.cookie = `${name} = ${escape(value)}; expires=${exp.toGMTString()}; path=/`
}


export const delCookie = name => {
  const exp = new Date()
  exp.setTime(exp.getTime() - 100)
  const cval = getCookie(name)
  window.document.cookie = `${name} = ${cval}; expires=${exp.toGMTString()}; path=/`
}

export const delCookies = nameArray => {
  if (Array.isArray(nameArray)) {
    nameArray.map(item => delCookie(item))
  }
}