import { delCookies, setCookie } from 'UTIL/cookie'
import NProgress from 'nprogress'
import { message } from 'antd'
import md5 from 'md5'
import API from 'CONSTANT/api'
import { setSessionIDAction, loginAction, logoutAction } from '../request/login'

export const LOGONIN = 'LOGONIN'
export const LOGONOUT = 'LOGONOUT'
export const SETSESSIONID = 'SETSESSIONID'
export const LOGIN_FAIL = 'LOGIN_FAIL'


export const setSesionId_OP = data => {
  const checkCodeSrc = `${API.CHECKCODE_URL}?nocache=${Date.now()}&iCIFID=${data}`
  return {
    type: SETSESSIONID,
    iCIFID: data,
    checkCodeSrc: checkCodeSrc
  }
}

export const setSessionID = () => (dispatch, getState) => {
  delCookies(['cstName', 'iCIFID', 'eCIFID'])
  dispatch(setSessionIDAction()).then(action => {
    const { header, body } = action.data
    if (header.iCIFID) {
      setCookie('iCIFID', header.iCIFID)
      dispatch(setSesionId_OP(header.iCIFID))
    } else {
      setCookie('iCIFID', body.iCIFID)
      dispatch(setSesionId_OP(body.iCIFID))
    }
  })
}

export const login_OP = (name) => ({
  type: LOGONIN,
  name
})

export const logout_OP = () => ({
  type: LOGONOUT
})

export const loginFailed = () => ({
  type: LOGIN_FAIL
})

export const logout = () => (dispatch, getState) => {
  dispatch(logoutAction())
  dispatch(logout_OP())
}

//验证登陆
export const validateLogin = (data, success, fail) => (dispatch, getState) => {
  const newData = {
    loginName: data.userName,
    loginPassword: md5(data.pswd.toString()),
    isLogin: data.isLogin,
    validateCodeText: data.vcode
  }
  dispatch(loginAction(newData)).then(action => {
    NProgress.done()
    const dataBody = action.data.body
    if (dataBody.result == '1') {
      setCookie('eCIFID', dataBody.cstNo)
      setCookie('cstName', dataBody.cstName)
      dispatch(login_OP(dataBody.cstName))
      if (success) success()
     } else {
      dataBody.errorMsg ? 
      message.error(dataBody.errorMsg) : 
      message.error('登录信息有误！')
      dispatch(loginFailed())
      dispatch(setSessionID())
      if (fail) fail()
     }
  })
}


const initialState = {
  isLogin: 'false',
  iCIFID: '',
  time: '',
  cstname: '',
  checkCodeSrc: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGONIN:
      return {
        ...state,
        isLogin: 'true',
        cstname: action.name
      }
    case LOGONOUT:
      return {
        ...state,
        isLogin: 'false'
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLogin: 'FAILED',
        time: Date.now()
      }
    case SETSESSIONID :
      return {
        ...state,
        iCIFID: action.iCIFID,
        checkCodeSrc: action.checkCodeSrc
      }
    default:
      return state
  }
}
