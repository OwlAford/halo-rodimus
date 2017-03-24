import connect from 'STORE/connect'
import { getPostList, resetPageState, setPageShowNum, setCurPageState, setAddPostState, setEditPostState, deletePost } from 'REDUCER/postManage'
import PostManageView from './PostManageView'

export default connect(

  state => ({
    userMenu: state.menu.userMenu,
    postList: state.postManage.postListData.postList,
    turnPageTotalNum: state.postManage.postListData.turnPageTotalNum,
    currentPage: state.postManage.currentPage,
    turnPageShowNum: state.postManage.turnPageShowNum
  }),

  {
    getPostList,
    resetPageState,
    setPageShowNum,
    setCurPageState,
    setAddPostState,
    setEditPostState,
    deletePost
  },
  
  PostManageView
)

