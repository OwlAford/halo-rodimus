import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'relationSet.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const StrategySettings = require('VIEW/StrategySettings').default
      const reducer = require('REDUCER/strategySettings').default
      injectReducer(store, { key: 'strategySettings', reducer })
      cb(null, StrategySettings)
    }, 'strategySettings')
  }
})
