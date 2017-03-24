import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'checkList.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const CheckList = require('VIEW/CheckList').default
      const reducer = require('REDUCER/checkList').default
      injectReducer(store, { key: 'checkList', reducer })
      cb(null, CheckList)
    }, 'checkList')
  }
})
