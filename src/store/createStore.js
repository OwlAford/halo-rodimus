import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import getCombineReducer from './reducers'
import { updateLocation } from './location'
import requester from 'MIDDLEWARE/requester'

export default (initialState = {}) => {
  const enhancers = []
  let composeEnhancers = compose

  let middleware = [thunk, requester]

  if (process.env.NODE_ENV === 'development') {
    middleware = [thunk, requester, logger]
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  const store = createStore(
    getCombineReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  store.asyncReducers = {}
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
