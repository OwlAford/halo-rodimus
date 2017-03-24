import connect from 'STORE/connect'
import { initBranchList } from 'REDUCER/common/branchTree'
import { changeBranchSelected, resetForm } from 'REDUCER/branchManage'
import BranchManageView from './BranchManageView'

export default connect(

  state => ({
    treeBranchList: state.branchTree.treeBranchList,
    branchId: state.branchManage.brhId
  }),

  {
    initBranchList,
    changeBranchSelected,
    resetForm
  }, 
  
  BranchManageView
)
