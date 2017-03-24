import connect from 'STORE/connect'
import { logout } from 'REDUCER/common/login'
import { setPasswordVisible } from 'REDUCER/common/main'
import AccountView from './AccountView'

export default connect(

  state => ({
    loginInfo: state.login
  }),

  {
    logout,
    setPasswordVisible
  },
  
  AccountView
)
