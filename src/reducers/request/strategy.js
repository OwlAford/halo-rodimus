import API from 'CONSTANT/api'
import { BZ_REQUESTER } from 'MIDDLEWARE/requester'

const REL_MEUITM = ['REL_MEUITM_REQ', 'REL_MEUITM_SUC', 'REL_MEUITM_FAL']

export const getBsnListAction = selectOpt => ({
  [BZ_REQUESTER]: {
    types: REL_MEUITM,
    url: API.GET_BSN_LIST_URL, 
    body: selectOpt
  }
})

export const getStrategyAction = authId => ({
  [BZ_REQUESTER]: {
    types: REL_MEUITM,
    url: API.GET_STRATEGY_URL, 
    body: {
      authId
    }
  }
})

export const getStrategyListAction = params => ({
  [BZ_REQUESTER]: {
    types: REL_MEUITM,
    url: API.GET_STRATEGY_LIST_URL, 
    body: params
  }
})

export const setRelationAction = params => ({
  [BZ_REQUESTER]: {
    types: REL_MEUITM,
    url: API.SET_CONNECTION_URL, 
    body: params
  }
})

export const addStrategyAction = params => ({
  [BZ_REQUESTER]: {
    types: REL_MEUITM,
    url: API.ADD_STRATEGY_URL, 
    body: params
  }
})

export const editStrategyAction = params => ({
  [BZ_REQUESTER]: {
    types: REL_MEUITM,
    url: API.EDIT_STRATEGY_URL, 
    body: params
  }
})

export const deleteStrategyAction = params => ({
  [BZ_REQUESTER]: {
    types: REL_MEUITM,
    url: API.DELETE_STRATEGY_URL, 
    body: params
  }
})