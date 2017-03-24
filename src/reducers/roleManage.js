import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { getRoleTree } from './common/bindRole'
import { getAllRoleFnItemsAction, getInfoByRoleIdAction, getInfoByRoleNameAction, updateRoleAction, addRoleAction, itemsBindRoleAction, delRoleAction } from './request/role'

const CLEAR_TABLE_ITEMS = 'CLEAR_TABLE_ITEMS'
const UPDATE_TABLE_CUR_ITEMS = 'UPDATE_TABLE_CUR_ITEMS'
const UPDATE_CUR_ROLE_INFO = 'UPDATE_CUR_ROLE_INFO'
const SET_SELECT_TREE_VAL = 'SET_SELECT_TREE_VAL'
const SET_ADD_ROLE_VISIBLE = 'SET_ADD_ROLE_VISIBLE'
const SET_BIND_ROLE_VISIBLE = 'SET_BIND_ROLE_VISIBLE'
const UPDATE_MENU_FN_PAGE_ITEMS = 'UPDATE_MENU_FN_PAGE_ITEMS'
const CLEAR_MENU_FN_ITEMS = 'CLEAR_MENU_FN_ITEMS'
const SET_MENU_FN_SELECT_KEYS = 'SET_MENU_FN_SELECT_KEYS'


// 清空table列表
export const clearTableItems = () => ({
  type: CLEAR_TABLE_ITEMS
})

const updateTableItems = (tableCurPageItems, tableCurPage, tableTotalSize) => ({
  type: UPDATE_TABLE_CUR_ITEMS,
  data: {
    tableCurPageItems,
    tableCurPage,
    tableTotalSize
  }
})

// 清空綁定框
export const clearMenuFnItems = () => ({
  type: CLEAR_MENU_FN_ITEMS
})

export const setAllMenuFnSelectKeys = data => ({
  type: SET_MENU_FN_SELECT_KEYS,
  data
})

const updateMenuFnPageItems = (allMenuFnCurPageItems, allMenuFnCurPage, allMenuTotalSize) => ({
  type: UPDATE_MENU_FN_PAGE_ITEMS,
  data: {
    allMenuFnCurPageItems,
    allMenuFnCurPage,
    allMenuTotalSize
  }
})

// 获取角色详情和功能列表
export const getAllRoleFnItems = (curPage, roleId, roleName, reqType) => (dispatch, getState) => {
  !roleId ?
  dispatch(clearTableItems()) :
  dispatch(getAllRoleFnItemsAction(curPage, roleId, roleName, reqType, getState().roleManage.pageSize)).then(action => { 
    const dataBody = action.data.body
    if (dataBody.errorCode == '0') {
      const roleMenuItemRelList = dataBody.roleMenuItemRelList
      const turnPageTotalNum = dataBody.turnPageTotalNum
      // 复制数组，并为其添加key属性，用于table遍历生成
      let tableCurPageItems = [].concat(roleMenuItemRelList)
      roleMenuItemRelList.map((item, i) => {
        tableCurPageItems[i].key = item.menuItemId
      })
      if (reqType == 1) {
        dispatch(updateTableItems(tableCurPageItems, curPage, turnPageTotalNum))
      } else if (reqType == 2) {
        let selectKeys = []
        roleMenuItemRelList.map(item => {
          selectKeys.push(item.menuItemId)
        })
        dispatch(setAllMenuFnSelectKeys(selectKeys))
      } else {
        dispatch(updateMenuFnPageItems(tableCurPageItems, curPage, turnPageTotalNum))
      }
    } else {
      message.error('获取列表失败！')
    }
  })
}

// 清除当前选中角色信息
export const clearCurRoleInfo = () => ({
  type: UPDATE_CUR_ROLE_INFO,
  data: {
    roleDesc: '',
    selectModifyRole: '',
    roleStatus: '',
    roleName: '',
    roleId: ''
  }
})

const applyCurRoleInfo = info =>({
  type: UPDATE_CUR_ROLE_INFO,
  data: {
    roleDesc: info.roleDesc,
    selectModifyRole: info.rolePId,
    roleStatus: info.roleStatus,
    roleName: info.roleName,
    roleId: info.roleId && info.roleId != 'undefined' ? info.roleId : '' // 数据库拿到的数据带有'undefined'字符串，他们的锅，这个坑我填了
  }
})

// 通过角色id获取当前选中角色信息
export const getInfoByRoleId = roleId => (dispatch, getState) => {
  NProgress.start()
  dispatch(getInfoByRoleIdAction(roleId)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode == '0') {
      dispatch(applyCurRoleInfo(dataBody))
      NProgress.done()
    } else {
      NProgress.done()
      message.error('获取信息失败！')
    }
  })
}

// 通过角色名搜索相关信息
export const getInfoByRoleName = (roleName, cb) => (dispatch, getState) => {
  NProgress.start()
  dispatch(getInfoByRoleNameAction(roleName)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode == '0') {
      dispatch(applyCurRoleInfo(dataBody))
      NProgress.done()
      if (cb) cb(dataBody)
    } else {
      NProgress.done()
      message.error('获取信息失败！')
    }
  })
}

// 用户修改所属角色 selectTree
export const setSelectTreeVal = val => ({
  type: SET_SELECT_TREE_VAL,
  data: val ? val : ''
})

// 更新角色信息
export const updateRole = params => (dispatch, getState) => {
  dispatch(updateRoleAction(params)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode == '0') {
      notification.success({
        message: '成功',
        description: '角色更新成功！'
      })
      // 刷新一次选择的树
      dispatch(getRoleTree())
      dispatch(getInfoByRoleId(params.roleId))
    } else {
      notification.warning({
        message: '失败',
        description: '角色更新失败！'
      })
    }
  })
}

export const setAddRoleBoxVisible = state => ({
  type: SET_ADD_ROLE_VISIBLE,
  data: state
})


// 添加用户
export const addRole = (params, success, fail) => (dispatch, getState) => {
  dispatch(addRoleAction(params)).then(action => {
    if (action.data.body.errorCode == '0') {
      notification.success({
        message: '成功',
        description: '角色添加成功！'
      })
      // 刷新一次选择的树
      dispatch(getRoleTree())
      if (success) success()
    } else {
      notification.warning({
        message: '失败',
        description: '角色添加失败！'
      })
      if (fail) fail()
    }
  })
}

export const setBindRoleBoxVisible = state => ({
  type: SET_BIND_ROLE_VISIBLE,
  data: state
})

// 绑定功能列表到角色上
export const itemsBindRole = (roleId, roleMenuItemRelList, success, fail) => (dispatch, getState) => {
  dispatch(itemsBindRoleAction(roleId, roleMenuItemRelList)).then(action => {
    if (action.data.body.errorCode == '0') {
      notification.success({
        message: '成功',
        description: '功能关联成功！'
      })
      dispatch(getAllRoleFnItems(1, roleId, '', 1))
      if (success) success()
    } else {
      notification.warning({
        message: '失败',
        description: '功能关联失败！'
      })
      if (fail) fail()
    }
  })
}

// 删除角色
export const delRole = roleId => (dispatch, getState) => {
  dispatch(delRoleAction(roleId)).then(action => {
    if (action.data.body.errorCode == '0') {
      notification.success({
        message: '成功',
        description: '角色删除成功！'
      })
      dispatch(getRoleTree())
    } else {
      notification.warning({
        message: '失败',
        description: '角色删除失败！'
      })
    }
  })
}


const initialState = {
  pageSize: 8,

  tableCurPageItems: [],
  tableCurPage: 1,
  tableTotalSize: 0,

  allMenuFnCurPageItems: [],
  allMenuFnCurPage: 1,
  allMenuTotalSize: 0,
  allMenuFnSelectKeys: [],

  curRoleInfo: {
    roleDesc: '',
    selectModifyRole: '',
    roleStatus: '',
    roleName: '',
    roleId: ''
  },
  
  selectModifyRole: '',
  addBoxVisible: false,
  bindBoxVisible: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case CLEAR_TABLE_ITEMS: {
      return {
        ...state,
        tableCurPageItems: [],
        tableCurPage: 1,
        tableTotalSize: 0
      }
    }

    case SET_MENU_FN_SELECT_KEYS:
      return {
        ...state,
        allMenuFnSelectKeys: action.data
      }

    case UPDATE_TABLE_CUR_ITEMS:
      return {
        ...state,
        ...action.data
      }

    case CLEAR_MENU_FN_ITEMS: {
      return {
        ...state,
        allMenuFnCurPageItems: [],
        allMenuFnCurPage: 1,
        allMenuTotalSize: 0,
        allMenuFnSelectKeys: []
      }
    }

    case UPDATE_MENU_FN_PAGE_ITEMS:
      return {
        ...state,
        ...action.data
      }

    case UPDATE_CUR_ROLE_INFO:
      return {
        ...state,
        curRoleInfo: action.data,
        selectModifyRole: action.data.selectModifyRole
      }

    case SET_SELECT_TREE_VAL:
      return {
        ...state,
        selectModifyRole: action.data
      }

    case SET_ADD_ROLE_VISIBLE:
      return {
        ...state,
        addBoxVisible: action.data
      }

    case SET_BIND_ROLE_VISIBLE:
      return {
        ...state,
        bindBoxVisible: action.data
      }

    default:
      return state
  }
}
