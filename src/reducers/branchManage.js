import NProgress from 'nprogress'
import { initBranchList } from './common/branchTree'
import { getBranchAction, modifyBranchAction, deleteBranchAction, addBranchAction } from './request/branch'
import { message, notification } from 'antd'

const RESET_FORM = 'RESET_FORM'
const APPLY_BRANCH = 'APPLY_BRANCH'
const SET_ADD_BRANCH_VISIBLE = 'SET_ADD_BRANCH_VISIBLE'

export const resetForm = () => ({
  type: RESET_FORM
})

export const applyBranch = branchList => ({
  type: APPLY_BRANCH,
  data: branchList ? branchList : ''      
})


// 设置增加机构弹框显示隐藏
export const setAddBranchVisible = state => ({
  type: SET_ADD_BRANCH_VISIBLE,
  visible: state
})

// 树选择的节点
export const changeBranchSelected = data => (dispatch, getState) => {
  if (data.brhId != null || data.brhId != undefined) {
    NProgress.start()
    dispatch(getBranchAction(data)).then(action => {
      const dataBody = action.data.body
      let brhParentId = dataBody.brhParentId
      dispatch(applyBranch(dataBody))
      NProgress.done()
    })
  } else {
    message.warning("当前未选中机构！")
    dispatch(resetForm())
  }
}

// 修改机构
export const branchModify = (params, success, fail) => (dispatch, getState) => {
  dispatch(modifyBranchAction(params)).then(action => {
    if (action.data.body.errorCode == '0') {
      dispatch(initBranchList())   
      notification.success({
        message: '成功',
        description: '修改成功！'
      })   
      if (success) success()
    } else {
      notification.warning({
        message: '失败',
        description: '修改失败！'
      })
      if (fail) fail()
    }
  })   
}

// 删除机构
export const branchDelete = (params, success, fail) => (dispatch, getState) => {
  dispatch(deleteBranchAction(params)).then(action => {
    if (action.data.body.errorCode == '0' && action.data.body.op_result != '0') {     
      dispatch(initBranchList())
      dispatch(resetForm())
      notification.success({
        message: '成功',
        description: '删除成功！'
      }) 
      if (success) success()
    } else {
      notification.warning({
        message: '失败',
        description: '删除失败！'
      }) 
      if (fail) fail()
    }
  })  
}

// 添加机构
export const branchAdd = (params, success, fail) => (dispatch, getState) => {
  dispatch(addBranchAction(params)).then(action => {
    if(action.data.body.errorCode == '0') {
      console.log(params)
      dispatch(initBranchList())
      // 添加完毕后选中该节点
      dispatch(changeBranchSelected(params))
      notification.success({
        message: '成功',
        description: '添加成功！'
      })  
      if (success) success()
    } else {
      notification.warning({
        message: '失败',
        description: '添加失败！'
      }) 
      if (fail) fail()
    }
  })
}


const initialState = {
  brhId: '',
  selectedObject: {},
  addBranchBoxVisible: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_ADD_BRANCH_VISIBLE:
      return {
        ...state,
        addBranchBoxVisible: action.visible
      }

    case RESET_FORM:
      return {
        ...state,
        selectedObject: {},
        brhId: ''
      }

    case APPLY_BRANCH:
      return {
        ...state,
        selectedObject: action.data,
        brhId: action.data.brhId
      }

    default:
      return state
  }
}
