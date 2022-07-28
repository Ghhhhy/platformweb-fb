export default {
  groupBy(data, key) {
    let itemMap = {}
    let itemkeys = []
    data.forEach((item, index) => {
      if (itemMap[item[key]]) {
        itemMap[item[key]].count = itemMap[item[key]].count + 1
        itemMap[item[key]].list.push(item)
      } else {
        itemMap[item[key]] = {
          count: 1,
          list: [item],
          firstItem: item
        }
        itemkeys.push(item[key])
      }
    })
    return {
      itemMap,
      itemkeys
    }
  },
  listToTreeByNestCodeLength(data, nestCodeKey) { // 根据nestCodeKey 长度 生成嵌套数据
    let map = {} // 构建map
    data.forEach(function (item) {
      map[item[nestCodeKey]] = item
      item.children = []
    })
    let treeData = []
    data.forEach(item => {
      let pnestCodeKey = item[nestCodeKey]
      pnestCodeKey = pnestCodeKey.slice(0, pnestCodeKey.length - 1)
      let mapItem = map[item[pnestCodeKey]]
      while (!mapItem && pnestCodeKey !== '') {
        pnestCodeKey = pnestCodeKey.slice(0, pnestCodeKey.length - 1)
        mapItem = map[pnestCodeKey]
      }
      if (mapItem) {
        (mapItem.children || (mapItem.children = [])).push(item)
      } else {
        treeData.push(item)
      }
    })
    return treeData
  },
  listToTree(tempData, idkey = 'id', pidKey = 'pid') {
    // 删除所有的children,以防止多次调用
    let map = {} // 构建map
    tempData.forEach(function (item) {
      map[item[idkey]] = item // 构建以id为键 当前数据为值
      item.children = []
    })
    let treeData = []
    tempData.forEach(child => {
      const mapItem = map[child[pidKey]] // 判断当前数据的pid是否存在map中
      if (mapItem) {
        // 存在则表示当前数据不是最顶层的数据
        // 注意： 这里的map中的数据是引用了tempData的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
        (mapItem.children || (mapItem.children = [])).push(child) // 这里判断mapItem中是否存在child
      } else {
        // 不存在则是顶层数据
        treeData.push(child)
      }
    })
    return treeData
  },
  treeToList(data, result = []) {
    // 树形数据转换成平行数据
    let self = this
    data.forEach((item, index) => {
      result.push(item)
      if (Array.isArray(item.children) && item.children.length) {
        self.treeToList(item.children, result)
      }
    })
    return result
  },
  getleafChildrenList(data, result = []) {
    let self = this
    data.forEach((item, index) => {
      if (Array.isArray(item.children) && item.children.length) {
        self.getleafChildrenList(item.children, result)
      } else {
        result.push(item)
      }
    })
    return result
  }
}
