import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'branchList.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const BranchManage = require('VIEW/BranchManage').default
      const reducer = require('REDUCER/branchManage').default
      injectReducer(store, { key: 'branchManage', reducer })
      cb(null, BranchManage)
    }, 'branchManage')
  }
})
