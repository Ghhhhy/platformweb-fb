import { eachTree, toTreeArray, toDateString } from 'xe-utils'

/**
 * 根据列生成指定数量的行
 * @param count
 */
export function generateRows(count = 8, columns) {
  const rows = []
  for (let i = 0; i < count; i++) {
    const row = {}
    eachTree(columns, item => {
      if (item.field) {
        row[item.field] = ''
      }
    })
    rows.push(row)
  }
  return rows
}

/**
 * 生成校验规则
 * @param count
 * @return {{}}
 */
export function generateEditorRules(columns) {
  const rules = {}
  eachTree(columns, item => {
    if (item.field) {
      rules[item.field] = [
        {
          required: true,
          trigger: 'change',
          message: '该单元格为必填项'
        }
      ]
    }
  })
  return rules
}

/**
 * 获取tree结构深度
 * @param treeData
 * @return {number}
 */
export const getMaxFloor = (arr) => {
  let maxLevel = 0;
  (function callBack(arr, level) {
    ++level
    maxLevel = Math.max(level, maxLevel)
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i]
      if (item.children && item.children.length > 0) {
        callBack(item.children, level)
      } else {
        delete item.children
      }
    }
  })(arr, 0)
  return maxLevel
}

/**
 * 找到根节点
 */
export function generateFieldMap(columns) {
  const fieldMap = new Map()
  columns.filter(column => column.type !== 'checkbox')
    .forEach(item => {
      const { title, children } = item
      if (children && children.length) {
        const arr = toTreeArray(children).filter(node => node.field !== undefined)
        arr.forEach((it, index) => {
          const packageTitle = `${title}${index > 0 ? '_' + index : ''}`
          fieldMap.set(packageTitle, it)
        })
      } else {
        fieldMap.set(title, item)
      }
    })
  return fieldMap
}

/**
 * 获取Excel表中存储的日期时间戳
 * @description （Excel存储的日期是从1900年1月1日开始按天数来计算的，也就是说1900年1月1日在Excel中是1。js中是从1970年1月1日开始）
 * @param {number} num - excel存储的数字
 * @returns {string} js中的时间戳
 */
function getExcelTimestamp(num) {
  if (num instanceof Object) return
  num = Number(num)
  let millisecond = 0 // 转化后的毫秒数
  if (num > 60) { // 对大于60的日期进行减1处理
    millisecond = (num - 25568 - 1) * 3600 * 24 * 1000
  } else {
    millisecond = (num - 25568) * 3600 * 24 * 1000
  }
  return millisecond
}

/**
 * 根据导入xlsx生成表格数据
 */
export function generateImportTableData(data = [], columns = []) {
  const rows = []
  // 获取表头层级
  const deep = getMaxFloor(columns)
  // 截取真实数据
  const dataSource = data?.slice(deep - 1)
  // 获取title映射
  const fieldMap = generateFieldMap(columns)
  dataSource?.forEach(item => {
    // item为导入数据行{ [title]: value } 格式
    const row = Object.entries(item)
      .reduce((row, [key, value]) => {
        if (fieldMap.has(key)) {
          const { field, editRender } = fieldMap.get(key)
          // excel 对日期格式导入的时间戳有误差，需要进行转换
          if (editRender?.type === 'date' && value) {
            const timestamp = getExcelTimestamp(value)
            row[field] = toDateString(timestamp, 'yyyy-MM-dd')
            return
          }
          row[field] = value
        }
        return row
      }, {})
    rows.push(row)
  })
  return rows
}
