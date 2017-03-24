import NProgress from 'nprogress'
import { message } from 'antd'
import { getHistoryListAction } from './request/check'

const GET_HISTORY_LIST = 'GET_HISTORY_LIST'

export const getHistoryList = selectOpt => (dispatch, getState) => {
  NProgress.start()
  dispatch(getHistoryListAction(selectOpt)).then(action => {
    const dataBody = action.data.body
    dispatch({
      type: GET_HISTORY_LIST,
      data: {
        historyList: dataBody.hisList,
        historyListTotalNum: dataBody.turnPageTotalNum,
        historyListSelectOpt: selectOpt
      }
    })
    NProgress.done()
  })
} 

const initialState = {
  historyList: [],
  historyListTotalNum: 0,
  historyListSelectOpt: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_HISTORY_LIST:
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}
