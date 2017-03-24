import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { getBsnListAction, getStrategyAction, getStrategyListAction, setRelationAction } from './request/strategy'

const GET_BSN_LIST = 'GET_BSN_LIST'
const SET_STRATEGY = 'SET_STRATEGY'

export const getBsnList = selectOpt => (dispatch, getState) => {
  NProgress.start()
  dispatch(getBsnListAction(selectOpt)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode == '0') {
      dispatch({
        type: GET_BSN_LIST,
        data: {
          bsnList: dataBody.bsnList,
          bsnListTotalNum: dataBody.turnPageTotalNum,
          bsnSelectOpt: selectOpt
        }
      })
    } else {
      message.error('获取列表失败！')
    }
    NProgress.done()
  })
} 

export const getStrategy = (authId, success, fail) => (dispatch, getState) => {
  dispatch(getStrategyAction(authId)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode == '0') {
      const authDefine = dataBody.authDefine
      const authDefArr = authDefine.split('')
      dispatch({
        type: SET_STRATEGY,
        data: {
          alias: dataBody.alias,
          authId: dataBody.authId,
          authType: dataBody.authType,
          areaNo: dataBody.areaNo,
          authDefine: authDefine,
          add1: authDefArr[0],
          add2: authDefArr[1],
          add3: authDefArr[2],
          add4: authDefArr[3],
          add5: authDefArr[4]
        }
      })
      if (success) success()
    } else {
      message.error('数据获取失败！')
      if (fail) fail()
    }
  })
} 

export const setRelation = params => (dispatch, getState) => {
  dispatch(setRelationAction(params)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode == '0') {
      dispatch(getBsnList(getState().reviewSettings.bsnSelectOpt))
      notification.success({
        message: '成功',
        description: '关联成功！'
      })
    } else {
      notification.warning({
        message: '失败',
        description: '关联失败！'
      })
    }
  })
} 

const initialState = {
  bsnList: [],
  bsnListTotalNum: 0,
  bsnSelectOpt: {},
  strategyDetail: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_BSN_LIST:
      return {
        ...state,
        ...action.data
      }

    case SET_STRATEGY:
      return {
        ...state,
        strategyDetail: action.data
      }

    default:
      return state
  }
}
