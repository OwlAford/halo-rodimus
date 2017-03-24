import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'User.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const UserManage = require('VIEW/UserManage').default
      const reducer = require('REDUCER/userManage').default
      injectReducer(store, { key: 'userManage', reducer })
      cb(null, UserManage)
    }, 'userManage')
  }
})
