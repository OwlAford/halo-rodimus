import { groupList, getNodeFromList } from 'UTIL/formatList'
import NProgress from 'nprogress'
import { HOME_MENU } from 'GLOBAL'
import { getMenuAction } from '../request/menu'
import { refreshInfo } from './main'

const SAVE_USER_MENU = 'SAVE_USER_MENU'
const MERGE_FINAL_MENU = 'MERGE_FINAL_MENU'
const SELECT_LEFT_MENU = 'SELECT_LEFT_MENU'

export const selectMenu = currentMenu => ({
  type: SELECT_LEFT_MENU,
  currentMenu: currentMenu
})

const converMenu = menu => ({
  id: menu.menuId,
  parentId: menu.menuParentId,
  logo: menu.menuLogo,
  url: menu.menuUrl,
  title: menu.menuName,
  level: menu.menuLevel,
  menus: [],
  branchList: []
})

const treeNodeToMenu = item => ({
  id: item.id,
  parentId: item.parentId,
  logo: item.logo,
  url: item.url,
  level: item.level,
  name: item.title
})

const addWithoutPNode = (id, sourceList, targetList) => {
  let sourceNode = getNodeFromList(id, sourceList, 'id', 'menus', treeNodeToMenu)
  let node = getNodeFromList(id, targetList, 'id', 'menus', treeNodeToMenu)

  if (sourceNode || !node)
    return

  sourceList.push(node)
  addWithoutPNode(node.parentId, sourceList, targetList)
}

export const initUserMenu = cb => (dispatch, getState) => {
  let authMenu = [], userMenu = [], topMenu = []
  NProgress.start()
  dispatch(getMenuAction()).then(action => {
    const dataBody = action.data.body
    const sourceList = dataBody.menuList

    dispatch({
      type: SAVE_USER_MENU,
      userMenu: {
        menuList: sourceList,
        menuItemList: dataBody.menuItemList
      }
    })

    authMenu = groupList(dataBody.menuList, 'id', 'parentId', 'menus', converMenu)
    authMenu.map(data => data.level == '0' ? topMenu.push(data) : null)

    let userMenuMap = {}
    sourceList.map(item => userMenuMap[item.id] = item)
    sourceList.map(item => item.parentId && !userMenuMap[item.parentId] ? addWithoutPNode(item.parentId, sourceList, authMenu) : null)

    userMenu = groupList(sourceList, 'menuId', 'menuParentId', 'menus', converMenu)
    dispatch({
      type: MERGE_FINAL_MENU,
      items: userMenu
    })

    dispatch(refreshInfo(action.data))
    NProgress.done()
    if (cb) cb()
  })
}


const initialState = {
  items: [],
  topMenu: [],
  userMenu: {},
  currentMenu: HOME_MENU
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SAVE_USER_MENU:
      return {
        ...state,
        userMenu: action.userMenu
      }

    case MERGE_FINAL_MENU:
      return {
        ...state,
        items: action.items
      }

    case SELECT_LEFT_MENU:
      return {
        ...state,
        currentMenu: action.currentMenu,
        userMenu: Object.assign({}, state.userMenu, {currentMenu: action.currentMenu}) 
      }

    default:
      return state
  }
}
