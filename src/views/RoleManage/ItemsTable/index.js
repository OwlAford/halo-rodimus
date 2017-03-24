import connect from 'STORE/connect'
import { getAllRoleFnItems, clearTableItems } from 'REDUCER/roleManage'
import ItemsTableView from './ItemsTableView'

export default connect(

  state => ({
    pageSize: state.roleManage.pageSize,
    totalSize: state.roleManage.tableTotalSize,
    curPage: state.roleManage.tableCurPage,
    dataSource: state.roleManage.tableCurPageItems,
    curRoleId: state.roleManage.curRoleInfo.roleId
  }),

  {
    getAllRoleFnItems,
    clearTableItems
  },
  
  ItemsTableView
)