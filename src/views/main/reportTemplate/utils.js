export default {
  // 获取界面高级查询参数condition
  highSearch(highQueryConfig = [], searchDataList = {}) {
    let condition = {}
    highQueryConfig.forEach((item) => {
      let match = item.itemRender?.match || ''
      let dbField = item.itemRender?.dbField || ''
      // 下拉树
      if (
        item.itemRender &&
        (item.itemRender.name === '$formTreeInput' ||
          item.itemRender.name === '$vxeTree')
      ) {
        if (!item.field.endsWith('_')) {
          item.field = item.field + '_'
        }
        if (item.field) {
          condition[item.field + 'code'] = []
          if (dbField) {
            condition[item.field + 'code_dbField'] = dbField
          }
        }
      } else if (
        item.itemRender &&
        (item.itemRender.name === '$vxeTime' ||
          (item.itemRender.name === '$input' &&
            item.itemRender.props &&
            item.itemRender.props.type === 'date'))
      ) {
        // 时间
        if (item.field) {
          condition[item.field] = {
            match: match,
            format: 'time',
            dbField
          }
        }
      } else if (
        item.itemRender &&
        (item.itemRender.name === '$vxeMoney' ||
          item.itemRender.name === '$formMoneyInputRender')
      ) {
        // 金额 全匹配
        condition[item.field] = {
          match: match,
          format: 'money',
          dbField
        }
      } else if (item.itemRender && item.itemRender.name === '$vxeTimeDuring') {
        // 时间段
        condition[item.field] = {
          match: match,
          format: 'during',
          dbField
        }
      } else if (
        item.itemRender &&
        item.itemRender.props &&
        item.itemRender.props.readonly &&
        item.itemRender.props.serverUri
      ) {
        if (!item.field.endsWith('_')) {
          item.field = item.field + '_'
        }
        // 弹出框
        if (item.field) {
          condition[item.field + 'code'] = []
        }
      } else {
        condition[item.field] = {
          match: match,
          format: 'input',
          dbField
        }
      }
    })
    for (let key in condition) {
      if (key.endsWith('_dbField')) continue
      if (
        (searchDataList[key] !== undefined) &
        (searchDataList[key] !== null)
      ) {
        if (Array.isArray(searchDataList[key])) {
          if (!condition[key] || condition[key].format !== 'during') {
            // 下拉树
            condition[key] = searchDataList[key]
          } else {
            condition[key] = searchDataList[key].join('-')
          }
        } else if (typeof searchDataList[key] === 'string') {
          // 非下拉树
          let match = condition[key]?.match || ''
          if (searchDataList[key].trim() !== '') {
            if (!condition[key].dbField) {
              delete condition[key].dbField
            }
            // 时间
            if (condition[key] && condition[key].format === 'time') {
              let time = new Date(searchDataList[key]).format('YYYYMMDD')
              if (match) {
                condition[key][match] = time
                delete condition[key]['match']
                delete condition[key]['format']
              } else {
                condition[key] = time
              }
            } else {
              // 全匹配
              if (condition[key] && condition[key].format === 'money') {
                // 金额
                let amount = searchDataList[key] * 1
                if (isNaN(amount)) {
                  this.$message.error('金额格式错误')
                  return
                }
                if (amount === '0' || amount === '0.00') {
                  condition[key] = ''
                } else {
                  if (match) {
                    condition[key][match] = parseFloat(amount)
                    delete condition[key]['match']
                    delete condition[key]['format']
                  } else {
                    condition[key] = parseFloat(amount)
                  }
                }
              } else if (condition[key] && condition[key].format === 'input') {
                if (match) {
                  condition[key][match] = searchDataList[key]
                  delete condition[key]['match']
                  delete condition[key]['format']
                } else {
                  condition[key] = searchDataList[key]
                }
              } else {
                searchDataList[key].split(',').forEach((item) => {
                  condition[key].push(item)
                })
              }
            }
          } else {
            condition[key] = ''
          }
        }
      } else {
        condition[key] = ''
      }
      if (key + '_dbField' in condition) {
        condition[condition[key + '_dbField']] = condition[key] || []
        delete condition[key]
        delete condition[key + '_dbField']
      }
    }
    return condition
  },
  // 初始化高级查询参数
  initHightSearch(hightQueryConfig) {
    // 下拉树
    let searchDataObj = {}
    hightQueryConfig.forEach((item) => {
      let field = item.field
      if (item.itemRender) {
        let renderName = item.itemRender.name
        if (renderName === '$formTreeInput' || renderName === '$vxeTree') {
          searchDataObj[field] = ''
        } else if (
          renderName === '$vxeInput' &&
          item.itemRender.props.readonly
        ) {
          if (field) {
            searchDataObj[field] = ''
          }
        } else {
          if (field) {
            searchDataObj[field] = ''
          }
        }
      } else {
        if (field) {
          searchDataObj[field] = ''
        }
      }
    })
    return searchDataObj
  },
  // 获取穿透弹窗标题
  getPenetrateTitle(row, column, defaultVal) {
    if (column.own.penetrateTitle) {
      return column.own.penetrateTitle.replaceAll(
        /(\{[^{]+})/g,
        (a) => row[a.replaceAll(/\{|}/g, '')] || ''
      )
    }
    return defaultVal || '明细信息'
  },
  // 获取穿透查询条件
  getPenetrateParams(row, column) {
    let configParams = column.own.params || {}
    let params = column.own.penetrateParams
    if (params) {
      for (let c in params) {
        if (row[c]) {
          configParams[params[c]] = row[c]
        }
      }
    }
    return configParams
  }
}

// const toUnderline = (str) => str.replace(/([A-Z])/g, '_$1').toLowerCase()
