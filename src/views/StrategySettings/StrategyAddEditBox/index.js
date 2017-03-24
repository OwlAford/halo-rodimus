import connect from 'STORE/connect'
import { setAddEditModalVisible, addStrategy, editStrategy } from 'REDUCER/strategySettings'
import StrategyAddEditBoxView from './StrategyAddEditBoxView'

export default connect(

  state => ({

  }),

  {
    setAddEditModalVisible,
    addStrategy,
    editStrategy
  },
  
  StrategyAddEditBoxView
)


