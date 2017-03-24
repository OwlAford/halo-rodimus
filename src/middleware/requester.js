// import 'isomorphic-fetch'
import { getCookie, setCookie } from 'UTIL/cookie'
import { Modal } from 'antd'

export const BZ_REQUESTER = Symbol('BZ REQUESTER')

const PREFIX_HEADER = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

const DEFAULT_REQ_TYPE = {
  dataType: 'JSON',
  method: 'post',
  crossDomain: true
}

const Object2KeyValue = obj => {
  if (typeof obj != 'object') {
    throw Error('only transform simple Object to k-v params!')
  }
  let kvArray = []
  for (let key in obj) {
    let item = obj[key]
    if (item instanceof Array) {
      arrayFormatter(kvArray, key, item)
    } else {
      kvArray.push(`${key}=${item}`)
    }
  }
  return kvArray.join('&')
}

const arrayFormatter = (tar, arrName, arr) => {
  for (let i in arr) {
    let son = arr[i]
    for (let j in son) {
      let grandson = son[j]
      typeof grandson == 'object' 
      ? tar.push(`${arrName}[${i}][${j}]=${JSON.stringify(grandson)}`) 
      : tar.push(`${arrName}[${i}][${j}]=${grandson}`)
    }
  }
}

let isError = false

export default store => next => action => {
  const reqParams = action[BZ_REQUESTER]

  if (typeof reqParams === 'undefined') {
    return next(action)
  }
  
  let { url, body, header, method, dataType, mode, types, session, requestType, error, success} = reqParams

  if (typeof url === 'function') 
    url = url(store.getState())

  if (typeof url !== 'string')
    throw new Error('Specify a string url.')

  if (!Array.isArray(types) || types.length !== 3)
    throw new Error('Expected an array of three action types.')

  if (!types.every(type => typeof type === 'string'))
    throw new Error('Expected action types to be strings.') 

  const type = !requestType ? 'K' : requestType
  const finalHeader = getRequestHeader(header, type, url)
  const finalBody = getRequestBody(body, finalHeader)
  const req = getRequest(url, finalHeader, dataType, method, finalBody)

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[BZ_REQUESTER]
    return finalAction
  }

  const [reqType, successType, failType] = types
  next(actionWith({ type: reqType, url: url }))

  if (process.env.NODE_ENV === 'development') {
    console.log(`BZ_REQUESTER action url: ${url} body: ${finalBody}`)
  }

  return doRequest(req).then(json => {
    return requestSuccess(next, actionWith, successType, json, success, url)
  }).catch(json => {
    return requestError(next, actionWith, failType, json, error, url)
  })
}

const getRequestHeader = (header, type, url) => {
  const date = new Date()
  const transId = `AT${Date.now()}`
  const iCIFID = getCookie('iCIFID')
  const eCIFID = getCookie('eCIFID')
  header = {
    type: type,
    encry: '0',
    channel: 'AT',
    transId: transId,
    channelFlow: transId,
    transCode: url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.')),
    channelDate: `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`,
    channelTime: `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`,
    iCIFID: iCIFID ? iCIFID : '',
    eCIFID: eCIFID ? eCIFID : ''
  }

  return type == 'J' ? Object.assign({}, PREFIX_HEADER, {'Content-Type': 'application/json; charset=UTF-8', 'type': 'J'}, header) : Object.assign({}, PREFIX_HEADER, header)
}

const getRequestBody = (body, header) => {
  let finalBody = ''
  const type = header.type
  if (!body) {
    body = {}
  }
  if (type == 'K') {
    finalBody = Object2KeyValue(body)
  } else if (type == 'J') {
    finalBody = JSON.stringify({body: body, header: header})
  } else {
    throw new Error('unExcept type!')
  }
  return finalBody
}

const requestSuccess = (next, actionWith, successType, json, success, url) => {
  if(success && typeof(success) == 'function') {
    success(json)
  } else {
    const { header, body } = json
    const { errorCode } = body
    header.iCIFID ? setCookie('iCIFID', header.iCIFID) : setCookie('iCIFID', body.iCIFID)
    if (errorCode !== '0') {
      Modal.error({
        title: `请求失败！[${errorCode}]`,
        content: body.errorMsg,
        onOk: onClose => {
          // 数据校验失败返回登录页
          if (errorCode == 'BLEC0001' || errorCode == 'SYEC0002') {
            window.location.replace('/')
          }
          onClose()
        }
      })
    }
  }
  return next(actionWith({ type: successType, data: json, url: url }))
}

const requestError = (next, actionWith, failType, json, error, url) => {
  if(typeof(error) == 'function') {
    error()
  } else if(!isError) {
    isError = true
    Modal.error({
      title: '请求失败！',
      onOk: onClose => {
        isError = false
        onClose()
      }
    })
  }
  return next(actionWith({type: failType, data: json}))
}

const doRequest = request => {
  return fetch(request).then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
  })
}

const getRequest = (url, header, dataType, method, body) => {
  let params = {
    headers: header,
    dataType: dataType ? dataType : DEFAULT_REQ_TYPE.dataType,
    method: method ? method : DEFAULT_REQ_TYPE.method
  }
  if (method != 'GET' && method != 'HEAD') {
    params.body = body 
  }
  if (method == 'GET') {
    url += '?' + body
  }
  return new Request(url, params)
}