import { getUserConfigDataAction } from '../request/config'
import { postListAction } from '../request/post'

const SET_USER_TYPE_LEVEL = 'SET_USER_TYPE_LEVEL'
const POST_LIST = 'POST_LIST'

const setUserTypeLevel = (certType, level) => ({
  type: SET_USER_TYPE_LEVEL,
  certType: certType,
  level: level
})

export const getUserConfigData = () => (dispatch, getState) => {
  dispatch(getUserConfigDataAction('')).then(action => {
    let paramList = action.data.body.paramList
    let levelList = [],
        certTypeList = []
    if (paramList) {  
      paramList.filter(item => {
        if (item.paramType == 'level') {
          levelList.push(item)
        } else if (item.paramType == 'certType') {
          certTypeList.push(item)
        }
      })
      dispatch(setUserTypeLevel(certTypeList, levelList))
    }
  })
}

// 查询所有岗位
export const postList = data => (dispatch, getState) => {
  dispatch(postListAction(data)).then(action => {
      dispatch({
        type: POST_LIST,
        data: action.data.body
      })
  })
}


const initialState = {
  certType: [],
  level: [],
  post: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case POST_LIST:
      return {
        ...state,
        post: action.data
      }

    case SET_USER_TYPE_LEVEL:
      return {
        ...state,
        certType: action.certType,
        level: action.level
      }

    default:
      return state
  }
}
