import { injectReducer } from 'STORE/reducers'

export default store => ({
  path : 'postList.html',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const PostManage = require('VIEW/PostManage').default
      const reducer = require('REDUCER/postManage').default
      injectReducer(store, { key: 'postManage', reducer })
      cb(null, PostManage)
    }, 'postManage')
  }
})
