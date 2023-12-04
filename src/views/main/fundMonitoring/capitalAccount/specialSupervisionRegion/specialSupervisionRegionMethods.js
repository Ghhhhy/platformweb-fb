export default {
  // 获取界面高级查询参数condition
  highSearch(highQueryConfig = [], searchDataList = {}) {
    let condition = {}
    highQueryConfig.forEach(item => {
      let match = item.itemRender?.match || ''
      // 下拉树
      if (item.itemRender && (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree')) {
        if (!item.field.endsWith('_')) {
          item.field = item.field + '_'
        }
        if (item.field) {
          condition[item.field + 'code'] = []
        }
      } else if (item.itemRender && (item.itemRender.name === '$vxeTime' || (item.itemRender.name === '$input' && item.itemRender.props && item.itemRender.props.type === 'date'))) {
        // 时间
        if (item.field) {
          condition[item.field] = {
            match: match,
            format: 'time'
          }
        }
      } else if (item.itemRender && (item.itemRender.name === '$vxeMoney' || item.itemRender.name === '$formMoneyInputRender')) {
        // 金额 全匹配
        condition[item.field] = {
          match: match,
          format: 'money'
        }
      } else if (item.itemRender && (item.itemRender.name === '$vxeTimeDuring')) {
        // 时间段
        condition[item.field] = {
          match: match,
          format: 'during'
        }
      } else if (item.itemRender && item.itemRender.props && item.itemRender.props.readonly && item.itemRender.props.serverUri) {
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
          format: 'input'
        }
      }
    })
    for (let key in condition) {
      if ((searchDataList[key] !== undefined) & (searchDataList[key] !== null)) {
        if (Array.isArray(searchDataList[key])) {
          if (!condition[key] || condition[key].format !== 'during') {
            // 下拉树
            condition[key] = searchDataList[key]
          } else {
            condition[key] = searchDataList[key].join('-')
          }
        } else if (typeof (searchDataList[key]) === 'string') {
          // 非下拉树
          let match = condition[key]?.match || ''
          if (searchDataList[key].trim() !== '') {
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
                searchDataList[key].split(',').forEach(item => {
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
    }
    return condition
  },
  // 初始化高级查询参数
  initHightSearch(hightQueryConfig) {
    // 下拉树
    let searchDataObj = {}
    hightQueryConfig.forEach(item => {
      let field = item.field
      if (item.itemRender) {
        let renderName = item.itemRender.name
        if (renderName === '$formTreeInput' || renderName === '$vxeTree') {
          if (!field.endsWith('_')) {
            field = field + '_'
          }
          searchDataObj[field + 'code'] = ''
        } else if (renderName === '$vxeInput' && item.itemRender.props.readonly) {
          if (field) {
            searchDataObj[field + 'code'] = ''
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
  }
}
