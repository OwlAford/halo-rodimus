import connect from 'STORE/connect'
import { setPasswordVisible } from 'REDUCER/common/main'
import { changePassword } from 'REDUCER/common/password'
import ChangePswdView from './ChangePswdView'

export default connect(

  state => ({
  }),

  {
    setPasswordVisible,
    changePassword
  },
  
  ChangePswdView
)
