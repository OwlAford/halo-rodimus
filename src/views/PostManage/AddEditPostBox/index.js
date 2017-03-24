import connect from 'STORE/connect'
import { closeAddEditBox, addPostList, modifyPost } from 'REDUCER/postManage'
import AddEditPostBoxView from './AddEditPostBoxView'

export default connect(

  state => ({
    visible: state.postManage.addEditBoxVisible,
    formType: state.postManage.addEditBoxType,
    initVals: state.postManage.addEditBoxInitVals
  }),

  {
    closeAddEditBox,
    addPostList,
    modifyPost
  },
  
  AddEditPostBoxView
)


