/* eslint-disable */
export default {
  // 获取界面高级查询参数condition
  highSearch(highQueryConfig = [], searchDataList = {}) {
    let condition = {}
    highQueryConfig.forEach(item => {
        // 下拉树
      if (item.itemRender && (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree')) {
        if (!item.field.endsWith('_')) {
          item.field = item.field+'_'
        }
        if (item.field) {
          condition[item.field + 'code'] = []
        }
      } else if (item.itemRender && item.itemRender.name === '$vxeTime'||(item.itemRender.name==='$input' && item.itemRender.props && item.itemRender.props.type==='date')) {
        // 时间
        if (item.field) {
          condition[item.field] = {
            format: 'time'
          }
        }
      } else if (item.itemRender && (item.itemRender.name === '$vxeMoney' || item.itemRender.name==='$formMoneyInputRender')) {
        // 金额 全匹配
        condition[item.field] = {
          format: 'money'
        }
      } else if (item.itemRender && (item.itemRender.name === '$vxeTimeDuring')) {
        // 时间段
        condition[item.field] = {
          format: 'during'
        }
       }else if (item.itemRender && item.itemRender.props && item.itemRender.props.readonly && item.itemRender.props.serverUri) {
        if (!item.field.endsWith('_')) {
          item.field = item.field+'_'
        }
        // 弹出框  
        if (item.field) {
            condition[item.field + 'code'] = []
          }
        } else {
        // 其他输入框，全模糊
        if (item.field) {
          condition[item.field] = {
            format: 'all'
          }
        }
      }
    })
    for (let key in condition) {
      if ((searchDataList[key] !== undefined) & (searchDataList[key] !== null)) {
        if (Array.isArray(searchDataList[key])){
          if (!condition[key] || condition[key].format !== 'during') {
            // 下拉树
            condition[key] = searchDataList[key]
          } else {
            condition[key] = searchDataList[key].join('-')
          }
        } else if (typeof (searchDataList[key]) === 'string') {
          // 非下拉树
          if (searchDataList[key].trim() !== '') {
            // 时间
            if (condition[key] && condition[key].format==='time') {
              condition[key] = new Date(searchDataList[key]).format('YYYYMMDD')
            } else {
              // 全匹配
              if (condition[key] && condition[key].format==='all') {
                condition[key] = {
                  'all': searchDataList[key]
                }
              } else if (condition[key] && condition[key].format==='money') {
                // 金额
                let amount = searchDataList[key] * 1
                if (isNaN(amount)) {
                  this.$message.error('金额格式错误')
                  return
                }
                if (amount === '0' || amount === '0.00') {
                  condition[key] = ''
                } else {
                  condition[key] = parseFloat(amount)
                }
              }else{
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
        if (renderName === '$formTreeInput' || renderName === '$vxeTree'){
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
  },
  DateFn: { // 时间处理函数
    getCurrentDate() {
      let t = new Date()
      let y = t.getFullYear()
      let m = t.getMonth()+1
      m = m < 10 ? '0' + m : m
      let d = t.getDate()
      d = d < 10 ? '0' + d : d
      return String(y) + String(m) + String(d)
    }
  }
}