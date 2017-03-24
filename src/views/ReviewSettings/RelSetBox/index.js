import connect from 'STORE/connect'
import { setRelation } from 'REDUCER/reviewSettings'
import { getStrategyList } from 'REDUCER/common/strategy'
import RelSetBoxView from './RelSetBoxView'

export default connect(

  state => ({
    strategyList: state.strategy.strategyList,
    strategyListSelOpt: state.strategy.strategyListSelOpt,
    totalNum: state.strategy.strategyListTotalNum
  }),

  {
    getStrategyList,
    setRelation
  },
  
  RelSetBoxView
)
