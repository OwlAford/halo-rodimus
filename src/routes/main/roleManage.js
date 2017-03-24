import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'Role.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const RoleManage = require('VIEW/RoleManage').default
      const reducer = require('REDUCER/roleManage').default
      injectReducer(store, { key: 'roleManage', reducer })
      cb(null, RoleManage)
    }, 'roleManage')
  }
})
