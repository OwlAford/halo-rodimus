import connect from 'STORE/connect'
import { closeBindRole } from 'REDUCER/userManage'
import { updateSelectedRole, userRoleAssociation } from 'REDUCER/common/bindRole'
import BindRoleBoxView from './BindRoleBoxView'

export default connect(

  state => ({
    visible: state.userManage.bindRoleBox.visible,
    treeNodes: state.bindRole.selectRoleTreeList,
    selectedRoleList: state.bindRole.selectedRoleList,
    allSelectRoleList: state.bindRole.allSelectRoleList,
    info: state.userManage.bindRoleBox.info
  }),

  {
    closeBindRole,
    updateSelectedRole,
    userRoleAssociation
  },
  
  BindRoleBoxView
)
