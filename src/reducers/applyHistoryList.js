import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { getStateListAction } from './request/check'

const GET_STATE_LIST = 'GET_STATE_LIST'

export const getStateList = selectOpt => (dispatch, getState) => {
  NProgress.start()
  dispatch(getStateListAction(selectOpt)).then(action => {
    const dataBody = action.data.body
    dispatch({
      type: GET_STATE_LIST,
      data: {
        stateList: dataBody.stateList,
        stateListTotalNum: dataBody.turnPageTotalNum,
        stateListSelectOpt: selectOpt
      }
    })
    NProgress.done()
  })
} 

const initialState = {
  stateList: [],
  stateListTotalNum: 0,
  stateListSelectOpt: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_STATE_LIST:
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}
