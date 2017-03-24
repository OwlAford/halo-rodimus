import connect from 'STORE/connect'
import WelcomeView from './WelcomeView'

export default connect(

  state => ({
    main: state.main
  }),

  {},
  
  WelcomeView
)
