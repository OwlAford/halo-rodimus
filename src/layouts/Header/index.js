import connect from 'STORE/connect'
import HeaderView from './HeaderView'

export default connect(

  state => ({
    items: state.menu.items,
    passwordVisible: state.main.passwordVisible
  }),

  {},
  
  HeaderView
)


