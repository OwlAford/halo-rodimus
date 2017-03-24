import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const ROLE_QUERY = ['ROLE_QUERY_REQ', 'ROLE_QUERY_SUC', 'ROLE_QUERY_FAL']
const USER_COMMON = ['USER_COMMON_REQ', 'USER_COMMON_SUC', 'USER_COMMON_FAL']
const ITEM_QUERY = ['ITEM_QUERY_REQ', 'ITEM_QUERY_SUC', 'ITEM_QUERY_FAL']
const ROLE_SUBMIT = ['ROLE_SUBMIT_REQ', 'ROLE_SUBMIT_SUC', 'ROLE_SUBMIT_FAL']

export const getRoleListAction = () => ({
  [BZ_REQUESTER]: {
    types: ROLE_QUERY,
    url: API.GET_ROLE_LIST_URL,
    body: {}
  }
})

export const getRoleByUserAction = num => ({
  [BZ_REQUESTER]: {
    types: ROLE_QUERY,
    url: API.GET_ROLE_BY_USER_URL,
    body:{
      userNo: num
    }
  }
})

export const getUserRoleListAction = userNo => ({
  [BZ_REQUESTER]: {
    types: ROLE_QUERY,
    url: API.USER_BIND_ROLE_URL,
    body: {
      userNo: userNo
    }
  }
})

export const userRoleAssociationAction = (userNo, userName, roleList) => ({
  [BZ_REQUESTER]: {
    types: USER_COMMON,
    url: API.CONNET_USER_AND_ROLE_URL,
    body: {
      userNo: userNo,
      name: userName,
      roleList: roleList ? roleList : []
    }
  }
})

export const getAllRoleFnItemsAction = (curPage, roleId, roleName, state, pageSize) => ({
  [BZ_REQUESTER]: {
    types: ITEM_QUERY,
    url: API.GET_ALL_ITEM_PAGE_URL,
    body: {
      currentPage: curPage,
      turnPageShowNum: pageSize,
      roleId: roleId ? roleId : '',
      roleName: roleName ? roleName : '',
      state: state ? state : ''
    }
  }
})

export const getInfoByRoleIdAction = roleId => ({
  [BZ_REQUESTER]: {
    types: ROLE_QUERY,
    url: API.GET_ITEM_BY_ROLE_URL,
    body: {
      roleId: roleId
    }
  }
})

export const getInfoByRoleNameAction = roleName => ({
  [BZ_REQUESTER]: {
    types: ROLE_QUERY,
    url: API.GET_ITEM_BY_ROLE_URL,
    body: {
      roleName: roleName ? roleName : ''
    }
  }
})

export const updateRoleAction = params => ({
  [BZ_REQUESTER]: {
    types: ROLE_SUBMIT,
    url: API.ROLE_UPDATE_URL,
    body: params
  }
})

export const addRoleAction = params => ({
  [BZ_REQUESTER]: {
    types: ROLE_SUBMIT,
    url: API.ROLE_ADD_URL,
    body: {
      roleName: params.roleName,
      roleStatus: params.roleStatus,
      rolePId: params.rolePId,
      roleDesc: params.roleDesc,
      rolePName: params.rolePName
    }
  }
})

export const itemsBindRoleAction = (roleId, roleMenuItemRelList) => ({
  [BZ_REQUESTER]: {
    types: ROLE_SUBMIT,
    url: API.ROLE_BIND_ITEM_URL,
    body: {
      roleId: roleId ? roleId : '',
      roleMenuItemRelList: roleMenuItemRelList
    }
  }
})

export const delRoleAction = roleId => ({
  [BZ_REQUESTER]: {
    types: ROLE_QUERY,
    url: API.ROLE_DEL_URL,
    body: {
      roleId: roleId
    }
  }
})