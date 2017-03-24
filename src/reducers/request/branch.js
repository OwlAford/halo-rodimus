import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const GET_BRANCH_LIST = ['GET_BRANCH_LIST_REQ', 'GET_BRANCH_LIST_SUC', 'GET_BRANCH_LIST_FAL']
const BRACH_MODIFY = ['BRACH_MODIFY_REQ', 'BRACH_MODIFY_SUC', 'BRACH_MODIFY_FAL']
const BRACH_DELETE = ['BRACH_DELETE_REQ', 'BRACH_DELETE_SUC', 'BRACH_DELETE_FAL']
const BRANCH_ADD = ['BRANCH_ADD_REQ', 'BRANCH_ADD_SUC', 'BRANCH_ADD_FAL']


export const getBranchListAction = () => ({
  [BZ_REQUESTER]: {
    types: GET_BRANCH_LIST,
    url: API.GET_BRANCH_LIST_URL,
    body: {
      queryType: '1'
    }
  }
})

// 查询操作
export const getBranchAction = data => ({
  [BZ_REQUESTER]: {
    types: GET_BRANCH_LIST,
    url: API.GET_BRANCH_URL_BYID,
    body: data
  }
})

// 修改操作
export const modifyBranchAction = params => ({
  [BZ_REQUESTER]: {
    types: BRACH_MODIFY,   
    url: API.GET_BRANCH_MODIFY,
    body: params,
    header: {
      type: 'K'
    }
  }
})

// 删除操作
export const deleteBranchAction = params => ({
  [BZ_REQUESTER]: {
    types: BRACH_DELETE, 
    url: API.GET_BRANCH_DELETE,
    body: {
      brhId: params.brhId
    },
    header: {
      type: 'K'
    }
  }
}) 

// 增加操作
export const addBranchAction = params => ({
  [BZ_REQUESTER]: {
    types: BRANCH_ADD,
    url: API.GET_BRANCH_ADD,
    body: params
  }
})