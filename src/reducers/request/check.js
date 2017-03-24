import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const CHECK = ['CHECK_REQ', 'CHECK_SUC', 'CHECK_FAL']

export const getCheckListAction = data => ({
  [BZ_REQUESTER]: {
    types: CHECK,
    url: API.GET_CHECK_LIST_URL, 
    body: data
  }
})

export const getStateListAction = data => ({
  [BZ_REQUESTER]: {
    types: CHECK,
    url: API.GET_STATE_LIST_URL, 
    body: data
  }
})

export const getHistoryListAction = data => ({
  [BZ_REQUESTER]: {
    types: CHECK,
    url: API.GET_CHECK_HISTORY_LIST_URL, 
    body: data
  }
})

export const checkDecideAction = data => ({
  [BZ_REQUESTER]: {
    types: CHECK,
    url: API.OPERATE_CHECK_URL, 
    body: data
  }
})


