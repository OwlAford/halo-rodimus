import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

const AUTH_MENU = ['AUTH_MENU_REQ', 'AUTH_MENU_SUC', 'AUTH_MENU_FAL']

export const getMenuAction = () => ({
  [BZ_REQUESTER]: {
    types: AUTH_MENU,
    url: API.AUTHRESOURCE_URL
  }
})
