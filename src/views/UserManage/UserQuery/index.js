import connect from 'STORE/connect'
import { userPageByBrh, setAddUserBoxVsisible, updateSelectKeys } from 'REDUCER/userManage'
import UserQueryView from './UserQueryView'

export default connect(

  state => ({
    userMenu: state.menu.userMenu,
    level: state.config.level,
    userBox: state.userManage.userBox
  }),

  {
    userPageByBrh,
    setAddUserBoxVsisible,
    updateSelectKeys
  },
  
  UserQueryView
)

