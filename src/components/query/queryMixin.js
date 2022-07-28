const QueryPublicItemConfig = {
  'acc_date': {
    'field': 'acc_date',
    'title': '生成日期',
    'span': 4,
    'itemRender': {
      name: '$vxeTime',
      defaultValue: '',
      props: {
        format: 'YYYY-MM-DD',
        type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
        placeholder: '生成日期'
      }
    }
  }
}

export default {
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
  setQueryItemConfig(QueryItemConfig) {
    // 设置查询项
    let QueryItemConfigField = []
    QueryItemConfig.forEach((item, index) => {
      if (item.field) {
        QueryItemConfigField.push(item.field)
      }
    })
    Object.keys(QueryPublicItemConfig).forEach((key, index) => {
      if (QueryItemConfigField.indexOf(key) === -1) {
        QueryItemConfig.push(this.deepCopy(QueryPublicItemConfig[key]))
      }
    })
  },
  getQueryParmas(obj) {
    // 设置查询参数
    // 逻辑
    let condition = {
      plan_month_code: [],
      acc_type_code: [],
      aeexpfunc_code: [],
      agency_code: [],
      bgt_mof_dep_code: [],
      bgt_rem_code: [],
      bgt_type_code: [],
      budget_level_code: [],
      clear_acct_code: [],
      clear_acct_bank_code: [],
      cor_bgt_doc_no_code: [],
      dept_code: [],
      dep_bgt_eco_code: []
    }
    for (let key in condition) {
      if ((obj[key + '__multiple'] !== undefined) & (obj[key + '__multiple'] !== null)) {
        condition[key] = obj[key + '__multiple']
      }
    }
    return obj
  }
}
