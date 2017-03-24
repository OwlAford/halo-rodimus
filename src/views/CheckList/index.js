import connect from 'STORE/connect'
import { getCheckList, checkDecide } from 'REDUCER/checkList'
import CheckListView from './CheckListView'

export default connect(

  state => ({
    userMenu: state.menu.userMenu,
    checkList: state.checkList.checkList,
    checkListSelectOpt: state.checkList.checkListSelectOpt,
    totalNum: state.checkList.checkListTotalNum
  }),

  {
    getCheckList,
    checkDecide
  }, 
  
  CheckListView
)
