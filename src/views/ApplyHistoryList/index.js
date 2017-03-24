import connect from 'STORE/connect'
import { getStateList } from 'REDUCER/applyHistoryList'
import ApplyHistoryListView from './ApplyHistoryListView'

export default connect(

  state => ({
    stateList: state.applyHistoryList.stateList,
    stateListSelectOpt: state.applyHistoryList.stateListSelectOpt,
    totalNum: state.applyHistoryList.stateListTotalNum
  }),

  {
    getStateList
  }, 
  
  ApplyHistoryListView
)

