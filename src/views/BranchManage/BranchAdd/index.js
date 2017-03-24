import connect from 'STORE/connect'
import { setAddBranchVisible, branchAdd } from 'REDUCER/branchManage'
import BranchAddView from './BranchAddView'

export default connect(

  state => ({
    visible: state.branchManage.addBranchBoxVisible,
    branchNodes: state.branchTree.selectTreeBranchList,
    allBranchList: state.branchTree.allBranchList
  }),

  {
    setAddBranchVisible,
    branchAdd
  }, 
  
  BranchAddView
)
