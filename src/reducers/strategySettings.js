import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { getStrategyList } from './common/strategy'
import { addStrategyAction, editStrategyAction, deleteStrategyAction } from './request/strategy'

const SET_ADD_EDIT_VISIBLE = 'SET_ADD_EDIT_VISIBLE'


// 设置新增修改模态框方法
export const setAddEditModalVisible = state => ({
  type: SET_ADD_EDIT_VISIBLE,
  data: state
})

// 刷新策略列表
const refreshStrategy = (dispatch, getState) => dispatch(getStrategyList({
  currentPage: 1,
  turnPageShowNum: getState().strategy.strategyListSelOpt.turnPageShowNum
}))

// 新增策略
export const addStrategy = (data, success, fail) => (dispatch, getState) => {
  dispatch(addStrategyAction(data)).then(action => {
    if (action.data.body.errorCode == '0') {
      notification.success({
        message: '成功',
        description: '策略新增成功！'
      })
      refreshStrategy(dispatch, getState)
      if (success) success()
    } else {
      notification.warning({
        message: '失败',
        description: '策略新增失败！'
      })
      if (fail) fail()
    }
  }) 
} 


// 修改策略
export const editStrategy = (data, success, fail) => (dispatch, getState) => {
  dispatch(editStrategyAction(data)).then(action => {
    if (action.data.body.errorCode == '0') {
      notification.success({
        message: '成功',
        description: '策略修改成功！'
      })
      refreshStrategy(dispatch, getState)
      if (success) success()
    } else {
      notification.warning({
        message: '失败',
        description: '策略修改失败！'
      })
      if (fail) fail()
    }
  }) 
} 

// 删除策略
export const deleteStrategy = data => (dispatch, getState) => {
  dispatch(deleteStrategyAction(data)).then(action => {
    if (action.data.body.errorCode == '0') {
      notification.success({
        message: '成功',
        description: '策略删除成功！'
      })
      refreshStrategy(dispatch, getState)
    } else {
      notification.warning({
        message: '失败',
        description: '策略删除失败！'
      })
    }
  }) 
} 

const initialState = {
  addEditBoxVisible: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_ADD_EDIT_VISIBLE:
      return {
        ...state,
        addEditBoxVisible: action.data
      }

    default:
      return state
  }
}
