import NProgress from 'nprogress'
import { groupList } from 'UTIL/formatList'
import { getBranchListAction } from '../request/branch'

const GET_BRANCH_LIST = 'GET_BRANCH_LIST'
const USER_GROUP_BRANCH = 'USER_GROUP_BRANCH'


const getBranch = branch => ({
  label: branch.brhName,
  value: branch.brhId,
  key: branch.brhId,
  children: []
})

const converRole = branch => ({
  id: branch.brhId,
  parentId: branch.brhParentId,
  name: branch.brhName,
  children: []
})

export const initBranchList = cb => (dispatch, getState) => {
  NProgress.start()
  dispatch(getBranchListAction()).then(action => {
    const allBranchList = action.data.body.branchList
    const treeBranchList = groupList(allBranchList, 'brhId', 'brhParentId', 'children', converRole)
    const selectTreeBranchList = groupList(allBranchList, 'brhId', 'brhParentId', 'children', getBranch)

    // 新增的时候查机构列表
    dispatch({
      type: GET_BRANCH_LIST,
      data: { 
        selectTreeBranchList
      }
    })
    dispatch({
      type: USER_GROUP_BRANCH,
      data: {
        allBranchList,
        treeBranchList
      }
    })
    NProgress.done()
    if (cb) cb()
  })
}

const initialState = {
  allBranchList: [],
  selectTreeBranchList: [],
  treeBranchList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
        
    case GET_BRANCH_LIST:
      return {
        ...state,
        ...action.data
      }

    case USER_GROUP_BRANCH:
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}
