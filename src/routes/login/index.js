import { injectReducer } from 'STORE/reducers'

export default store => ({
  path: 'login',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      const Login = require('VIEW/Login').default
      const reducer = require('REDUCER/common/login').default
      injectReducer(store, {key: 'login', reducer})
      cb(null, Login)
    }, 'login')
  }
})
  