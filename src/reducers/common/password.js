import { message } from 'antd'
import { changePasswordAction } from '../request/password'

export const changePassword = (data, cb) => (dispatch, getState) => {
  dispatch(changePasswordAction(data)).then(action => {
    action.data.body.opResult == '1' ? 
    message.success('密码修改成功！') : 
    message.error('密码修改失败，请重试！')
    if (cb) cb()
  })
}

