export default {
  getbasicDataType(obj) {
    // 获取数据类型
    return Object.prototype.toString.call(obj).slice(8, -1)
  },
  deepCopy(obj) {
    // 深拷贝通用方法
    let me = this
    let newObj = null
    if (typeof obj !== 'object' || obj === null) {
      newObj = obj
    } else {
      if (obj instanceof Array) {
        newObj = obj.map((item, index) => {
          return me.deepCopy(item)
        })
      } else if (obj instanceof Object) {
        newObj = {}
        for (let key in obj) {
          newObj[key] = me.deepCopy(obj[key])
        }
      } else if (obj instanceof Map) {
        newObj = new Map()
        obj.keys().forEach((mapV, mapK) => {
          newObj.set(mapK, me.deepCopy(mapV))
        })
      } else if (obj instanceof Set) {
        newObj = new Map()
        Set.forEach((setV, setI) => {
          newObj.add(me.deepCopy(setV))
        })
      } else {
      }
    }
    return newObj
  },
  listToTreeByNestCodeLength(data, nestCodeKey) { // 平行数据 根据nestCodeKey 长度 生成嵌套数据
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
  muchfieldarrsort(sarr, keys) {
    // 多字段排序
    // sarr：原始数组。 keys:要排序的多个字段,必须为数组
    return sarr.sort(compare)
    function compare(a, b, c = keys[0], i = 0) { // 按合并类型递归排序
      // var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : groupfieldarr[0];
      // var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      if (a[c] === b[c]) { // 等于的话进行判断是否还有后续字段需要排序，没有则返回0；有则递归进行后续字段排序处理。
        if (i === (keys.length - 1)) { // 没有后续字段
          i = 0
          return 0
        }
        i += 1
        return compare(a, b, keys[i], i) // 递归排序后续字段
      } else if (a[c] > b[c]) { // 大于返回1
        return 1
      } else { // 小于返回-1
        return -1
      }
    }
  },
  getColumnsMap(columns, map = { keyColIndexMap: {}, fieldMap: {}, titleMap: {} }) {
    columns.forEach((column, columnIndex) => {
      map.keyColIndexMap[column.property || column.field] = columnIndex
      map.fieldMap[column.property || column.field] = column
      map.titleMap[column.title] = column
    })
    return map
  },
  colspanmergeOneKey(data, key, keyPrev, map = {}) { // 生成当前key合并行数据映射
    let mergeCache = {
      count: 1,
      startIndex: 1,
      key: key,
      value: '',
      group: []
    }
    data.forEach(function (row, index) {
      if (index === 0) {
        mergeCache = Object.assign({}, mergeCache, {
          rowSpan: 1,
          startIndex: index,
          endIndex: index,
          key: key,
          prevKeyValue: keyPrev ? row[keyPrev] : '',
          value: row[key],
          group: [row]
        })
        row['_mergeInfo'][key] = {
          mergeFrom: [index],
          mergeTo: index,
          key: key
        }
        map[index + '__' + key] = mergeCache
      } else if (mergeCache.value === row[key] && (keyPrev ? row[keyPrev] === mergeCache.prevKeyValue : true)) {
        mergeCache.rowSpan = mergeCache.rowSpan + 1
        mergeCache.endIndex = index
        mergeCache.group[0]['_mergeInfo'][key].mergeFrom.push(index)
        mergeCache.group.push(row)
        row['_mergeInfo'][key] = {
          mergeFrom: null,
          mergeTo: mergeCache.startIndex,
          key: key
        }
      } else if (mergeCache.value !== row[key]) {
        mergeCache = Object.assign({}, mergeCache, {
          rowSpan: 1,
          startIndex: index,
          endIndex: index,
          key: key,
          mergeToIndex: index,
          prevKeyValue: keyPrev ? row[keyPrev] : '',
          value: row[key],
          group: [row]
        })
        row['_mergeInfo'][key] = {
          mergeFrom: [index],
          mergeTo: index,
          key: key
        }
        map[index + '__' + key] = mergeCache
      } else {

      }
    })
    return map
  },
  getColspanMergeMap(data, keys) { // 生成所有当前key合并行数据映射
    data = this.muchfieldarrsort(data, keys)
    data.forEach(function (row, index) {
      row['_mergeInfo'] = {}
    })
    let self = this
    let map = {}
    keys.forEach((item, index) => {
      self.colspanmergeOneKey(data, item, index === 0 ? undefined : keys[index - 1], map)
    })
    return map
  }
}
