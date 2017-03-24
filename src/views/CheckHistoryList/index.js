import connect from 'STORE/connect'
import { getHistoryList } from 'REDUCER/checkHistoryList'
import CheckHistoryListView from './CheckHistoryListView'

export default connect(

  state => ({
    historyList: state.checkHistoryList.historyList,
    historyListSelectOpt: state.checkHistoryList.historyListSelectOpt,
    totalNum: state.checkHistoryList.historyListTotalNum
  }),

  {
    getHistoryList
  }, 
  
  CheckHistoryListView
)
