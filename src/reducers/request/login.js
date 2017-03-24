import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const APP_MGR = ['APP_MGR_REQ', 'APP_MGR_SUC', 'APP_MGR_FAL']

export const setSessionIDAction = () => ({
  [BZ_REQUESTER]: {
    types: APP_MGR,
    url: API.SESSION_URL,
    body: ''
  }
})

export const loginAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_MGR,
    url: API.LOGIN_URL,
    body: data
  }
})

export const logoutAction = () => ({
  [BZ_REQUESTER]: {
    types: APP_MGR,
    url: API.LOGOUT_URL
  }
})
