import connect from 'STORE/connect'
import { setAddUserBoxVsisible, addUser, colseModifyUser, updateUser } from 'REDUCER/userManage'
import UserAddEditBoxView from './UserAddEditBoxView'

export default connect(

  state => ({
    userBox: state.userManage.userBox,
    branchNodes: state.branchTree.selectTreeBranchList,
    allBranchList: state.branchTree.allBranchList,
    certType: state.config.certType,
    postList: state.config.post.postList,
    level: state.config.level
  }),

  {
    setAddUserBoxVsisible,
    addUser,
    colseModifyUser,
    updateUser
  },
  
  UserAddEditBoxView
)

