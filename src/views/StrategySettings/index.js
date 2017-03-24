import connect from 'STORE/connect'
import { getStrategyList } from 'REDUCER/common/strategy'
import { setAddEditModalVisible, deleteStrategy } from 'REDUCER/strategySettings'
import StrategySettingsView from './StrategySettingsView'

export default connect(

  state => ({
    userMenu: state.menu.userMenu,
    strategyList: state.strategy.strategyList,
    strategyListSelOpt: state.strategy.strategyListSelOpt,
    totalNum: state.strategy.strategyListTotalNum,
    addEditBoxVisible: state.strategySettings.addEditBoxVisible
  }),

  {
    getStrategyList,
    setAddEditModalVisible,
    deleteStrategy
  },
  
  StrategySettingsView
)
