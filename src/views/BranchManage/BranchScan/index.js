import connect from 'STORE/connect'
import { resetForm, setAddBranchVisible, branchModify, branchDelete, changeBranchSelected } from 'REDUCER/branchManage'
import BranchScanView from './BranchScanView'

export default connect(

  state => ({
    userMenu: state.menu.userMenu,
    selectedBranch: state.branchManage.selectedObject,
    branchNodes: state.branchTree.selectTreeBranchList
  }),

  {
    resetForm,
    setAddBranchVisible,
    branchModify, 
    branchDelete,
    changeBranchSelected
  }, 
  
  BranchScanView
)
