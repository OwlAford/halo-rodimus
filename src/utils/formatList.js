export const groupList = (list, id, parentId, childName, conver) => {
  let groupList = []
  let keyMap = {}

  list.map(item => keyMap[item[id]] = (conver ? conver(item) : item))

  list.map(item => {
    if (!item[parentId] || !keyMap[item[parentId]]) {
      groupList.push(keyMap[item[id]])
    } else if (keyMap[item[parentId]]) {
      keyMap[item[parentId]][childName] ? null : keyMap[item[parentId]][childName] = []
      keyMap[item[parentId]][childName].push(keyMap[item[id]])
    }
  })

  return groupList
}

export const getNodeFromList = (id, list, idName, childName, conver) => {
  let node = null
  for (var el of list) {
    let chName = el[childName]
    if (el[idName] == id) {
      node = conver ? conver(el) : el
    } else if (chName && chName.length > 0) {
      node = getNodeFromList(id, chName, idName, childName, conver)
      node ? node = (conver ? conver(node) : node) : null
    }
  }
  return node
}

