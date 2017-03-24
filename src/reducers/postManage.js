import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { postListAction, addPostListAction, modifyPostAction, delPostAction } from './request/post'

const SET_POST_LIST = 'SET_POST_LIST'
const RESET_PAGE_STATE = 'RESET_PAGE_STATE'
const SET_CUR_PAGE_STATE = 'SET_CUR_PAGE_STATE'
const SET_PAGE_SHOW_NUM = 'SET_PAGE_SHOW_NUM'
const CLOSE_ADD_EDT_BOX = 'CLOSE_ADD_EDT_BOX'
const SET_ADD_POST_STATE = 'SET_ADD_POST_STATE'
const SET_EDT_POST_STATE = 'SET_EDT_POST_STATE'


// 查询所有岗位
export const getPostList = () => (dispatch, getState) => {
  NProgress.start()
  let state = getState().postManage
  dispatch(postListAction(state.currentPage, state.turnPageShowNum)).then(action => {
    if (action.data.body.errorCode == '0') {
      dispatch({
        type: SET_POST_LIST,
        data: action.data.body
      })
    }
    NProgress.done()
  })
}

// 设置翻页状态
export const setCurPageState = current => ({
  type: SET_CUR_PAGE_STATE,
  data: current
})

// 重置页面翻页状态
export const resetPageState = () => ({
  type: RESET_PAGE_STATE
})

// 设置单页显示条数
export const setPageShowNum = num => ({
  type: SET_PAGE_SHOW_NUM,
  data: num
})

// 关闭新增&修改弹框显示状态
export const closeAddEditBox = () => ({
  type: CLOSE_ADD_EDT_BOX
})

// 设置新增岗位弹框
export const setAddPostState = () => ({
  type: SET_ADD_POST_STATE
})

// 设置修改岗位弹框
export const setEditPostState = params => ({
  type: SET_EDT_POST_STATE,
  data: {
    addEditBoxVisible: true,
    addEditBoxType: 'edit',
    addEditBoxInitVals: params
  }
})

// 新增岗位到服务器
export const addPostList = (data, success, fail) => (dispatch, getState) => {
  dispatch(addPostListAction(data)).then(action => {
    if (action.data.body.errorCode == '0') {
      notification.success({
        message: '成功',
        description: '岗位添加成功！'
      })
      // 刷新一次岗位列表
       dispatch(getPostList())
      if (success) success()
    } else {
      notification.warning({
        message: '失败',
        description: '岗位添加失败！'
      })
      if (fail) fail()
    }
  })
}

// 修改岗位到服务器
export const modifyPost = (data, success, fail) => (dispatch, getState) => {
  dispatch(modifyPostAction(data)).then(action => {
    if (action.data.body.errorCode == '0') {
      notification.success({
        message: '成功',
        description: '岗位修改成功！'
      })
      // 刷新一次岗位列表
       dispatch(getPostList())
      if (success) success()
    } else {
      notification.warning({
        message: '失败',
        description: '岗位修改失败！'
      })
      if (fail) fail()
    }
  })
}

// 删除岗位
export const deletePost = data => (dispatch, getState) => {
  dispatch(delPostAction(data)).then(action => {
    if (action.data.body.errorCode == '0') {
      notification.success({
        message: '成功',
        description: '岗位删除成功！'
      })
      // 刷新一次岗位列表
       dispatch(getPostList())
    } else {
      notification.warning({
        message: '失败',
        description: '岗位删除失败！'
      })
    }
  })
}


const initialState = {
  postListData: [],
  currentPage: 1,
  turnPageShowNum: 10,

  addEditBoxVisible: false,
  addEditBoxType: 'add',
  addEditBoxInitVals: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_POST_LIST:
      return {
        ...state,
        postListData: action.data
      }

    case SET_CUR_PAGE_STATE:
      return {
        ...state,
        currentPage: action.data
      }

    case SET_PAGE_SHOW_NUM:
      return {
        ...state,
        turnPageShowNum: action.data
      }

    case RESET_PAGE_STATE:
      return {
        ...state,
        currentPage: 1,
        turnPageShowNum: 10
      }

    case CLOSE_ADD_EDT_BOX:
      return {
        ...state,
        addEditBoxVisible: false
      }

    case SET_ADD_POST_STATE:
      return {
        ...state,
        addEditBoxVisible: true,
        addEditBoxType: 'add',
        addEditBoxInitVals: {}
      }

    case SET_EDT_POST_STATE:
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}
