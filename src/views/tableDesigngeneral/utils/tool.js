/*
 * @Author: your name
 * @Date: 2021-08-27 10:13:11
 * @LastEditTime: 2021-09-01 19:51:49
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \caizheng-front\src\views\tableDesigngeneral\utils\tool.js
 */
const tool = {
  getbasicDataType(type, obj) {
    // 获取数据类型
    return Object.prototype.toString.call(obj).slice(8, -1)
  },
  getStrByte(str) {
    //  获取字符串字节数
    let arr = str.split('')
    let len = arr.length
    let count = 0
    for (let i = 0; i < len; i++) {
      let s = escape(arr[i])
      // 例如：s = '你'; escape(a); "%u4F60"
      if (s.indexOf('%u') >= 0) {
        count = count + 2
      } else {
        count++
      }
    }
    // console.log(str, count)
    return count
  },
  deepCopy(obj) {
    // 深拷贝通用方法
    let me = this
    if (typeof obj !== 'object' || obj === null) return obj
    let newObj = obj instanceof Array ? [] : {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
      }
    }
    return newObj
  },
  getUuid(hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') { // 获取mapid
    let s = []
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = ''
    let uuid = s.join('')
    return uuid
  },
  smallHump(str) {
    // 连字符转成小驼峰
    return str.split('_').map((item, index) => {
      return index === 0 ? item.toLowerCase() : item.toLowerCase().replace(/^[a-z]{1,1}/, ($1, $2, $3) => {
        return $1.toUpperCase()
      })
    }).join('')
  },
  each(object, callback) {
    /* 可终止循环each方法 */
    var type = (function (obj) {
      switch (obj.constructor) {
        case Object:
          return 'Object'
        case Array:
          return 'Array'
        case NodeList:
          return 'NodeList'
        default:
          return 'null'
      }
    })(object)
    // 为数组或类数组时, 返回: index, value
    if (type === 'Array' || type === 'NodeList') {
      // 由于存在类数组NodeList, 所以不能直接调用every方法
      [].every.call(object, function (v, i) {
        return callback.call(v, i, v) !== false
      })
    } else if (type === 'Object') {
      for (var i in object) {
        if (callback.call(object[i], i, object[i]) === false) {
          break
        }
      }
    }
  },
  getCharLength(str) {
    var iLength = 0 // 记录字符的字节数
    for (var i = 0; i < str.length; i++) { // 遍历字符串中的每个字符
      if (str.charCodeAt(i) > 255) { // 如果当前字符的编码大于255
        iLength += 3 // 所占字节数加2
      } else {
        iLength += 1 // 否则所占字节数加1
      }
    }

    return iLength // 返回字符所占字节数
  },
  generateTreeDateMap(treeData, mapKey, nestKey = '', map = {}) {
    let self = this
    treeData.forEach((item, index) => {
      item.nestKey = nestKey ? nestKey + '__' + item[mapKey] : item[mapKey]
      if (Array.isArray(item.children) && item.children.length) {
        self.generateTreeDateMap(item.children, mapKey, item.nestKey, map)
      } else {
        map[item[mapKey]] = item
      }
    })
    return map
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
    return {
      treeData,
      map
    }
  },
  gernarateTreeDataList(data, nodeKey, pItemCode = '', pNestItemCode = '', levelNo = 1, result = { list: [], map: {} }) {
    // 树形数据转换成平行数据
    let self = this
    data.forEach((item, index) => {
      result.list.push(Object.assign(item, {
        pItemCode: pItemCode,
        levelNo: levelNo,
        itemName: ''.padStart((levelNo - 1) * 2) + (String(item.itemName).replace(/undefined|\s+/ig, '')),
        pNestItemCode: pNestItemCode ? pNestItemCode + '__' + item[nodeKey] : item[nodeKey]
      }))
      result.map[item[nodeKey]] = item

      if (Array.isArray(item.children) && item.children.length) {
        item.isLeaf = 0
        self.gernarateTreeDataList(item.children, nodeKey, item[nodeKey], item.pNestItemCode, levelNo + 1, result)
      } else {
        item.isLeaf = 1
      }
    })
    return result
  },
  getSaveTbodyData(data, nestCodeKey) {
    let treeData = this.listToTreeByNestCodeLength(data, nestCodeKey).treeData
    return this.gernarateTreeDataList(treeData, nestCodeKey).list
  }
}
export default tool
