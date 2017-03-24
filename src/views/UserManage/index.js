import connect from 'STORE/connect'
import { initBranchList } from 'REDUCER/common/branchTree'
import { userPageByBrh } from 'REDUCER/userManage'
import UserManageView from './UserManageView'

export default connect(

  state => ({
    treeBranchList: state.branchTree.treeBranchList,
    allBranchList: state.branchTree.allBranchList,
    selectedKeys: state.userManage.selectedKeys
  }),

  {
    initBranchList,
    userPageByBrh
  },
  
  UserManageView
)
