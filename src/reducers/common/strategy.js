import { message } from 'antd'
import { getStrategyListAction } from '../request/strategy'
import NProgress from 'nprogress'

const SET_STRATEGY_LIST = 'SET_STRATEGY_LIST'


export const getStrategyList = selOpt => (dispatch, getState) => {
  NProgress.start()
  dispatch(getStrategyListAction(selOpt)).then(action => {
    const dataBody = action.data.body
    const authDefList = dataBody.authDefList
    let strategyList = []
    authDefList.map(item => {
      let tmp = {}
      const def = item.authDefine.split('')
      Object.assign(tmp, item, {
        add1: def[0],
        add2: def[1],
        add3: def[2],
        add4: def[3],
        add5: def[4]
      })
      strategyList.push(tmp)
    })
    dispatch({
      type: SET_STRATEGY_LIST,
      data: {
        strategyList,
        strategyListTotalNum: dataBody.turnPageTotalNum,
        strategyListSelOpt: selOpt
      }
    })
    NProgress.done()
  })
} 

const initialState = {
  strategyList: [],
  strategyListTotalNum: 0,
  strategyListSelOpt: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_STRATEGY_LIST:
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}