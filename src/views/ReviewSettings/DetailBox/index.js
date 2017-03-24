import connect from 'STORE/connect'
import DetailBoxView from './DetailBoxView'

export default connect(

  state => ({
    detail: state.reviewSettings.strategyDetail
  }),

  {},
  
  DetailBoxView
)

