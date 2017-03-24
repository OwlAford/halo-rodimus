import connect from 'STORE/connect'
import { setSessionID, validateLogin } from 'REDUCER/common/login'
import LoginView from './LoginView'

export default connect(

  state => ({
    vcodeSrc : state.login.checkCodeSrc
  }),

  {
    setSessionID,
    validateLogin
  }, 

  LoginView
)
