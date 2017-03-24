import connect from 'STORE/connect'
import { setSelectTreeVal, updateRole, setAddRoleBoxVisible, setBindRoleBoxVisible, delRole } from 'REDUCER/roleManage'
import EditRoleView from './EditRoleView'

export default connect(

  state => ({
    userMenu: state.menu.userMenu,
    treeNodes: state.bindRole.selectRoleTreeList,
    info: state.roleManage.curRoleInfo,
    selectModifyRole: state.roleManage.selectModifyRole
  }),

  {
    setSelectTreeVal,
    updateRole,
    setAddRoleBoxVisible,
    setBindRoleBoxVisible,
    delRole
  },
  
  EditRoleView
)
