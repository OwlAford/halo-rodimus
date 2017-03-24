import connect from 'STORE/connect'
import { selectMenu } from 'REDUCER/common/menu'
import SidebarView from './SidebarView'

export default connect(

  state => ({
  }),

  {
    selectMenu
  },
  
  SidebarView
)


