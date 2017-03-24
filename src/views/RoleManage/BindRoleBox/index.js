import connect from 'STORE/connect'
import { setBindRoleBoxVisible, getAllRoleFnItems, clearMenuFnItems, setAllMenuFnSelectKeys, itemsBindRole } from 'REDUCER/roleManage'
import BindRoleBoxView from './BindRoleBoxView'

export default connect(

  state => ({
    visible: state.roleManage.bindBoxVisible,
    pageSize: state.roleManage.pageSize,
    totalSize: state.roleManage.allMenuTotalSize,
    curPage: state.roleManage.allMenuFnCurPage,
    selectKeys: state.roleManage.allMenuFnSelectKeys,
    dataSource: state.roleManage.allMenuFnCurPageItems,
    curRoleId: state.roleManage.curRoleInfo.roleId
  }),

  {
    setBindRoleBoxVisible,
    getAllRoleFnItems,
    clearMenuFnItems,
    setAllMenuFnSelectKeys,
    itemsBindRole
  },
  
  BindRoleBoxView
)

