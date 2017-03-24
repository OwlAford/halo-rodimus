import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'relationList.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ReviewSettings = require('VIEW/ReviewSettings').default
      const reducer = require('REDUCER/reviewSettings').default
      injectReducer(store, { key: 'reviewSettings', reducer })
      cb(null, ReviewSettings)
    }, 'reviewSettings')
  }
})
