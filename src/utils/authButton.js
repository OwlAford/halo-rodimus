import React from 'react'

const listHasItem = (list, key, val) => {
  let hasIt = false
  list.map(item => item[key] === val ? hasIt = true : null)
  return hasIt
}

export const checkBtnList = (menu, btnList, noDivider) => {
  const ableBtn = []
  const divider = <span className="ant-divider"/>
  const size = btnList.length
  btnList.map((item, i) => {
    const btn = checkBtn(menu, item.item, item.button)
    if (btn) {
      ableBtn.push(btn)
      !noDivider && i != size - 1 ? ableBtn.push(divider) : null
    }
  })
  return ableBtn.length == 0 ? <span>无操作权限</span> : ableBtn.map((item, i) =>(<span key={i}>{item}</span>))
}

export const checkBtn = (menu, item, button) => {
  let menuItem = item
  item.length > 4 ? null : menuItem = menu.currentMenu + item
  return listHasItem(menu.menuItemList, 'menuItemId', menuItem) ? button : null
}