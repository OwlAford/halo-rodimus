import connect from 'STORE/connect'
import { userPageByBrh, previewUser, modifyUser, userBindRole, delUserUpdate } from 'REDUCER/userManage'
import { getUserRoleTree } from 'REDUCER/common/bindRole'
import UserTableView from './UserTableView'

export default connect(

  state => ({
    dataSource: state.userManage.userList,
    userMenu: state.menu.userMenu,
    totalSize: state.userManage.totalSize,
    pageData: state.userManage.pageData
  }),

  {
    userPageByBrh,
    previewUser,
    modifyUser,
    userBindRole,
    getUserRoleTree,
    delUserUpdate
  },
  
  UserTableView
)
