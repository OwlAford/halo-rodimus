import connect from 'STORE/connect'
import { getRoleTree } from 'REDUCER/common/bindRole'
import { getAllRoleFnItems, getInfoByRoleId, clearCurRoleInfo, getInfoByRoleName } from 'REDUCER/roleManage'
import RoleManageView from './RoleManageView'

export default connect(

  state => ({
    roleTreeList: state.bindRole.roleTreeList,
    curRoleId: state.roleManage.curRoleInfo.roleId
  }),

  {
    getRoleTree,
    getAllRoleFnItems,
    getInfoByRoleId,
    clearCurRoleInfo,
    getInfoByRoleName
  },
  
  RoleManageView
)

