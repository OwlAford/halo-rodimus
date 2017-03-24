import API from 'CONSTANT/api'
import { BZ_REQUESTER } from 'MIDDLEWARE/requester'

const APP_PSWD = ['APP_PSWD_REQ', 'APP_PSWD_SUC', 'APP_PSWD_FAL']

export const changePasswordAction = (data) => ({
  [BZ_REQUESTER]: {
    types: APP_PSWD,
    url: API.CHANGE_PASSWORD_URL,
    body: data
  }
})