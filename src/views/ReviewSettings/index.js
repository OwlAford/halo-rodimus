import connect from 'STORE/connect'
import { getBsnList, getStrategy} from 'REDUCER/reviewSettings'
import { getStrategyList } from 'REDUCER/common/strategy'
import ReviewSettingsView from './ReviewSettingsView'

export default connect(

  state => ({
    userMenu: state.menu.userMenu,
    bsnList: state.reviewSettings.bsnList,
    bsnListTotalNum: state.reviewSettings.bsnListTotalNum,
    bsnSelectOpt: state.reviewSettings.bsnSelectOpt
  }),

  {
    getBsnList,
    getStrategy,
    getStrategyList
  },
  
  ReviewSettingsView
)
