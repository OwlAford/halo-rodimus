import { getRoleByUserAction } from './request/role'
import { userPageByBrhAction, addUserAction, updateUserAction, delUserAction } from './request/user'
import NProgress from 'nprogress'
import { message, notification } from 'antd'

export const PAGE_USERS = 'PAGE_USERS'
export const SET_PREV_USER = 'SET_PREV_USER'
export const CLOSE_PREV_USER = 'CLOSE_PREV_USER'
export const SET_BIND_USER = 'SET_BIND_USER'
export const CLOSE_BIND_USER = 'CLOSE_BIND_USER'
export const APPLY_MODIFY_USER = 'APPLY_MODIFY_USER'
export const CLOSE_MODIFY_USER = 'CLOSE_MODIFY_USER'
export const SET_ADDUSER_VISIBLE = 'SET_ADDUSER_VISIBLE'
export const UPDATE_SELECTE_KEYS = 'UPDATE_SELECTE_KEYS'


const pageUsers = data => ({
  type: PAGE_USERS,
  userList: data.userList,
  currentPage: data.currentPage,
  totalSize: data.totalSize,
  turnPageShowNum: data.turnPageShowNum
})


// 查询用户信息 搜索功能 分页功能
export const userPageByBrh = (params, cb) => (dispatch, getState) => {
  NProgress.start()
  let pageShowNum = getState().userManage.pageData.turnPageShowNum
  dispatch(userPageByBrhAction(params, pageShowNum)).then(action => {
    let dataBody = action.data.body
    let userList = dataBody.userList.map(user => Object.assign(user, {
      key: user.userNo
    }))
    let data = {
      userList: userList,
      totalSize: dataBody.turnPageTotalNum,
      turnPageShowNum: dataBody.turnPageShowNum,
      currentPage: dataBody.currentPage
    }
    dispatch(updateSelectKeys([params.brhId]))
    dispatch(pageUsers(data))
    NProgress.done()
    if (cb) cb()
  })
}

export const closePreviewUser = () => ({
  type: CLOSE_PREV_USER
})

const setPreviewInfo = info => ({
  type: SET_PREV_USER,
  data: info
})

export const previewUser = (num, success, fail) => (dispatch, getState) => {
  dispatch(getRoleByUserAction(num)).then(action => { 
    dispatch(setPreviewInfo(action.data.body))
    if (success) success()
  }, () => {
    message.warning("获取失败！")
    if (fail) fail()
  })
}

export const userBindRole = info => ({
  type: SET_BIND_USER,
  data: info
})

export const closeBindRole = () => ({
  type: CLOSE_BIND_USER
})

export const setAddUserBoxVsisible = state => ({
  type: SET_ADDUSER_VISIBLE,
  visible: state
})

const applyInitVal = info => ({
  type: APPLY_MODIFY_USER,
  data: info
})

export const modifyUser = (num, success, fail) => (dispatch, getState) => {
  dispatch(getRoleByUserAction(num)).then(action => { 
    dispatch(applyInitVal(action.data.body))
    if (success) success()
  }, () => {
    message.warning("获取失败！")
    if (fail) fail()
  })
}


export const colseModifyUser = () => ({
  type: CLOSE_MODIFY_USER
})


export const addUser = (params, success, fail) => (dispatch, getState) => {
  dispatch(addUserAction(params)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode == '0') {
      let dataList = {
        brhId: params.brhId
      }
      dispatch(userPageByBrhAction(dataList, 10)).then(action => {
        const dataBody = action.data.body
        let userList = dataBody.userList.map(user => Object.assign(user, {
          key: user.userNo
        }))
        let data = {
          totalSize: dataBody.turnPageTotalNum,
          turnPageShowNum: dataBody.turnPageShowNum,
          currentPage: dataBody.currentPage,
          userList: userList
        }
        dispatch(updateSelectKeys([params.brhId]))
        dispatch(pageUsers(data))
      })
      notification.success({
        message: '成功',
        description: '用户添加成功！'
      })
      if (success) success()
    } else {
      notification.warning({
        message: '失败',
        description: '用户添加失败！'
      })
      if (fail) fail()
    }
  })
}

export const updateUser =(params, success, fail) => (dispatch, getState) => {
  let data = Object.assign({}, {
    currentPage: '1',
    brhId: params.brhId,
    brhName: ''
  })
  dispatch(updateUserAction(params)).then(action => {
    if (action.data.body.errorCode == '0') {
      dispatch(userPageByBrh(data))
      notification.success({
        message: '成功',
        description: '用户修改成功！'
      })
      if (success) success()
    } else {
      notification.warning({
        message: '失败',
        description: '用户修改失败！'
      })
      if (fail) fail()
    }
  })
}

// 删除并更新用户列表
export const delUserUpdate = (userNo, brhId, curPage) => (dispatch, getState) => {
  dispatch(delUserAction(userNo)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode == '0'){
      notification.success({
        message: '成功',
        description: '用户删除成功！'
      })
      dispatch(userPageByBrh({ brhId }))
    } else {
      notification.warning({
        message: '失败',
        description: `删除用户失败，errCode: ${dataBody.errorCode}，errMsg: ${dataBody.errorMsg}`
      })
    }
  })
}

export const updateSelectKeys = keys => ({
  type: UPDATE_SELECTE_KEYS,
  data: keys
})


const initialState = {
  count: 0,
  userList: [],
  totalSize: 0,
  userBox: {
    visible: false,
    initVal: {},
    type: 'ADD'
  },
  previewBox: {
    visible: false,
    info: {}
  },
  bindRoleBox: {
    visible: false,
    info: {}
  },
  pageData: {
    currentPage: 1,
    turnPageShowNum: 10
  },
  selectedKeys: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_PREV_USER:
      return {
        ...state,
        previewBox: {
          visible: true,
          info: action.data
        }
      }

    case CLOSE_PREV_USER:
      return {
        ...state,
        previewBox: {
          visible: false,
          info: {}
        }
      }

    case PAGE_USERS:
      return { 
        ...state,
        userList: action.userList,
        totalSize: action.totalSize,
        pageData: {
          currentPage: action.currentPage,
          turnPageShowNum: action.turnPageShowNum
        }
      }

    case SET_BIND_USER:
      return {
        ...state,
        bindRoleBox: {
          visible: true,
          info: action.data
        }
      }

    case CLOSE_BIND_USER:
      return {
        ...state,
        bindRoleBox: {
          visible: false,
          info: {}
        }
      }

    case SET_ADDUSER_VISIBLE:
      return {
        ...state,
        userBox: {
          visible: action.visible,
          initVal: {},
          type: 'ADD'
        }
      }

    case APPLY_MODIFY_USER:
      return {
        ...state,
        userBox: {
          visible: true,
          initVal: action.data,
          type: 'MODIFY'
        }
      }

    case CLOSE_MODIFY_USER:
      return {
        ...state,
        userBox: {
          visible: false,
          initVal: {},
          type: 'MODIFY'
        }
      }

    case UPDATE_SELECTE_KEYS:
      return {
        ...state,
        selectedKeys: action.data
      }
          
    default:
      return state
  }
}
