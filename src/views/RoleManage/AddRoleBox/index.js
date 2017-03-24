import connect from 'STORE/connect'
import { setAddRoleBoxVisible, addRole } from 'REDUCER/roleManage'
import AddRoleBoxView from './AddRoleBoxView'

export default connect(

  state => ({
    treeNodes: state.bindRole.selectRoleTreeList,
    visible: state.roleManage.addBoxVisible
  }),

  {
    setAddRoleBoxVisible,
    addRole
  },
  
  AddRoleBoxView
)

