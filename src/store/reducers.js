import { combineReducers } from 'redux'
import locationReducer from './location'

const getCombineReducer = asyncReducers => combineReducers({
  location: locationReducer,
  ...asyncReducers
})

const reduceInjector = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key))
    return
  store.asyncReducers[key] = reducer
  store.replaceReducer(getCombineReducer(store.asyncReducers))
}

export const injectReducer = (store, params) => 
  Array.isArray(params) ? 
  params.map(item => reduceInjector(store, item)) :
  reduceInjector(store, params)

export default getCombineReducer
