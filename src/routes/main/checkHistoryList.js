import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'checkHistoryList.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const CheckHistoryList = require('VIEW/CheckHistoryList').default
      const reducer = require('REDUCER/checkHistoryList').default
      injectReducer(store, { key: 'checkHistoryList', reducer })
      cb(null, CheckHistoryList)
    }, 'checkHistoryList')
  }
})
