import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'pendHistoryList.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ApplyHistoryList = require('VIEW/ApplyHistoryList').default
      const reducer = require('REDUCER/applyHistoryList').default
      injectReducer(store, { key: 'applyHistoryList', reducer })
      cb(null, ApplyHistoryList)
    }, 'applyHistoryList')
  }
})
