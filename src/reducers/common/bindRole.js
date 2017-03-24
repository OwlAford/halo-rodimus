import { groupList } from 'UTIL/formatList'
import NProgress from 'nprogress'
import { getUserRoleListAction, userRoleAssociationAction, getRoleListAction } from '../request/role'
import { notification } from 'antd'

const USER_GET_ROLE = 'USER_GET_ROLE'
const UPDATE_USER_ROLE = 'UPDATE_USER_ROLE'
const UPDATE_ROLE_TREE_LIST = 'UPDATE_ROLE_TREE_LIST'
const UPDATE_ROLE_TREE = 'UPDATE_ROLE_TREE'


// 用户绑定角色所需要数据的类型
const converTreeSelectRole = roleList => ({
  label: roleList.roleName,
  value: roleList.roleId,
  key: roleList.roleId,
  children: [] 
})

// 查询所有角色时，树所需要的类型
const converTreeRole = role => ({
  roleId: role.roleId,
  rolePId: role.rolePId,
  roleName: role.roleName,
  roleDesc: role.roleDesc,
  roleStatus: role.roleStatus,
  roleType: role.roleType,
  children: []
})

export const getUserRoleTree = userNo => (dispatch, getState) => {
  dispatch(getUserRoleListAction(userNo)).then(action => {
    const dataBody = action.data.body
    let selectKeys = []
    let userRoleRelList = dataBody.userRoleRelList
    userRoleRelList.map(item => {
      item.state == '1' ? selectKeys.push(item.roleId) : null
    })
    dispatch(updateSelectedRole(selectKeys))
    let allSelectRoleList = dataBody.userRoleRelList
    let selectRoleTreeList = groupList(allSelectRoleList, 'roleId', 'rolePId', 'children', converTreeSelectRole)
    dispatch({
      type: USER_GET_ROLE,
      data: {
        selectRoleTreeList,
        allSelectRoleList
      }
    })
  })
}

// 绑定角色的方法
export const userRoleAssociation = (userNo, userName, roleList) => (dispatch, getState) => {
  dispatch(userRoleAssociationAction(userNo, userName, roleList)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode == '0') {
      notification.success({
        message: '成功',
        description: '綁定成功！'
      })
    } else {
      notification.warning({
        message: '失败',
        description: '绑定失败！'
      })
    }
  })
}

export const getRoleTree = () => (dispatch, getState) => {
  NProgress.start()
  dispatch(getRoleListAction()).then(action => {
    const dataBody = action.data.body
    const flatRoleList = dataBody.roleList
    let roleTreeList = groupList(flatRoleList, 'roleId', 'rolePId', 'children', converTreeRole)
    let selectRoleTreeList = groupList(flatRoleList, 'roleId', 'rolePId', 'children', converTreeSelectRole)
    dispatch({
      type: UPDATE_ROLE_TREE_LIST,
      data: selectRoleTreeList
    })
    dispatch({
      type: UPDATE_ROLE_TREE,
      data: roleTreeList
    })
    NProgress.done()
  })
}

export const updateSelectedRole = selectedRoleList => ({
  type: UPDATE_USER_ROLE,
  data: selectedRoleList
})


const initialState = {
  roleTreeList: [],
  selectRoleTreeList: [],
  allSelectRoleList: [],
  selectedRoleList: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case USER_GET_ROLE:
      return {
        ...state,
        ...action.data
      }

    case UPDATE_ROLE_TREE:
      return {
        ...state,
        roleTreeList: action.data
      }

    case UPDATE_USER_ROLE:
      return {
        ...state,
        selectedRoleList: action.data
      }

    case UPDATE_ROLE_TREE_LIST:
      return {
        ...state,
        selectRoleTreeList: action.data
      }

    default:
      return state
  }
}
