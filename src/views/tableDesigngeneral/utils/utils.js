import tools from './tool'
import renderMap from './renderMap'
const utils = {
  getRenderDataBylist(data, nestCodeKey = 'orderNum', editable) {
    let { treeData } = this.listToTreeByNestCodeLength(this.getSortDataList(data, nestCodeKey), nestCodeKey)
    return this.getRenderTheadData(treeData, editable)
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
  generateTheadLowestLevel(data, mapKey, map = { lowestLevelArr: [], LowestLevelMap: {} }) { // 根据嵌套表头生成数据低级映射，用来处理解析表体
    let self = this
    data.forEach((item, index) => {
      if (Array.isArray(item.children) && item.children.length) {
        self.generateTheadLowestLevel(item.children, mapKey, map)
      } else {
        map.lowestLevelArr.push(item)
        map.LowestLevelMap[item[mapKey]] = item
      }
    })
    return map
  },
  getRenderTheadData(data, editable, type = 'table', level = 1) { // 生成渲染数据
    let self = this
    data.forEach((item, index) => {
      if (Array.isArray(item.children) && item.children.length) {
        data[index] = renderMap.gloableRenderMap(item, type, editable)
        self.getRenderTheadData(data[index].children, editable, type, level + 1)
      } else {
        data[index] = renderMap.itemRendermap(item, type, editable)
      }
    })
    return data
  },
  getRenderThead(data) { // 获取渲染数据
    let theadData = this.listToTreeByNestCodeLength(tools.deepCopy(data), 'orderNum')
    let theadRenderData = this.getRenderTheadData(theadData, 'table')
    let { lowestLevelArr, LowestLevelMap } = this.generateTheadLowestLevel(theadRenderData, 'orderNum')
    return {
      theadRenderData,
      lowestLevelArr,
      LowestLevelMap
    }
  },
  getTheadRenderLeves(data, nestCodeKey) {
    let sortData = this.getSortDataList(data, nestCodeKey)
    return sortData[sortData.length - 1] ? sortData[sortData.length - 1][nestCodeKey].length / 4 : 1
  },
  getSortDataList(data, nestCodeKey) {
    let dataCache = [].concat(data)
    dataCache.sort((a, b) => {
      return a[nestCodeKey].localeCompare(b[nestCodeKey])
    })
    return dataCache
    // return String(+dataCache[dataCache.length - 1][nestCodeKey] + 1).padStart(dataCache[dataCache.length - 1][nestCodeKey].length, '0')
  },
  getInsertCildrenData(tableData, curSelectRow, nestCodeKey) {
    let { map } = this.listToTreeByNestCodeLength(tableData, nestCodeKey)
    let sortData = this.getSortDataList(map[curSelectRow[nestCodeKey]].children, nestCodeKey)
    let inserToIndex = 0
    tableData.forEach((row, index) => {
      if (row[nestCodeKey].startsWith(curSelectRow[nestCodeKey])) {
        inserToIndex = index + 1
      }
    })
    if (inserToIndex >= tableData.length) {
      inserToIndex = -1
    }
    let insertCode = ''
    if (map[curSelectRow[nestCodeKey]].children && map[curSelectRow[nestCodeKey]].children.length) {
      let codenext = sortData[sortData.length - 1][nestCodeKey].slice(curSelectRow[nestCodeKey].length)
      let codepre = sortData[sortData.length - 1][nestCodeKey].slice(0, curSelectRow[nestCodeKey].length)
      insertCode = codepre + (String(+codenext + 1).padStart(codenext.length, '0'))
    } else {
      insertCode = curSelectRow[nestCodeKey] + '1'.padStart(2, '0')
    }
    return { inserToIndex: inserToIndex, insertData: { [nestCodeKey]: insertCode } }
  },
  getViewDataConfigRenderColumns(columns) {
    let self = this
    columns.forEach((item, index) => {
      if ((Array.isArray(item.children) && !item.children.length) || !Array.isArray(item.children)) {
        columns[index] = Object.assign(item, {
          title: item.title,
          field: item.field,
          editRender: {
            name: '$vxeEditDownTextarea',
            props: {
              type: 'text'
            }
          }
        })
      } else {
        self.getViewDataConfigRenderColumns(item.children)
      }
    })
    return columns
  },
  getCellConfigBodyDataRenderSingle(data, config, nestCodekey) {
    return data.map((row, rowIndex) => {
      let rowRow = {}
      tools.each(row, (key) => {
        if (config[row[nestCodekey] + ':' + key]) {
          rowRow[key] = config[row[nestCodekey] + ':' + key].formula
        } else if (key === nestCodekey || key === 'itemCode' || key === 'itemName') {
          rowRow[key] = row[key]
        } else {
          rowRow[key] = ''
        }
      })
      return rowRow
    })
  },
  addMissField(data, lowestLevelCoumns) {
    let self = this
    return data.map((row, item) => {
      lowestLevelCoumns.forEach((column) => {
        row[column.property || column.field] = row[column.property || column.field] || ''
        if (Array.isArray(item.children) && item.children.length) {
          self.addMissField(item.children, lowestLevelCoumns)
        }
      })
      return row
    })
  }
}

export default utils
