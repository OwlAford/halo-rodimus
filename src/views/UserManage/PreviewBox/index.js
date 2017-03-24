import connect from 'STORE/connect'
import { closePreviewUser } from 'REDUCER/userManage'
import PreviewBoxView from './PreviewBoxView'

export default connect(

  state => ({
    visible: state.userManage.previewBox.visible,
    level: state.config.level,
    certType: state.config.certType,
    info: state.userManage.previewBox.info
  }),

  {
    closePreviewUser
  },
  
  PreviewBoxView
)
