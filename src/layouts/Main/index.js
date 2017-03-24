import connect from 'STORE/connect'
import { initUserForm } from 'REDUCER/common/main'
import { initUserMenu } from 'REDUCER/common/menu'
import MainView from './MainView'

export default connect(

  state => ({
  }),

  {
    initUserMenu,
    initUserForm
  },
  
  MainView
)
