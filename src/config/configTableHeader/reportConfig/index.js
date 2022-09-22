// 导入所有功能模块的报表配置
import template from './template'
import adjBudgetConfig from './AdjBudget'
import carriedOverBudget from './CarriedOverBudget'
import reply from './Reply'
import transBudget from './TransBudget'

const config = {
  ...transBudget,
  ...template,
  ...adjBudgetConfig,
  ...carriedOverBudget,
  ...reply,
  '114514': {
    tableCols: [],
    editTableCols: [],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}

export default function (dicCode) {
  if (config[dicCode]) {
    return config[dicCode]
  } else {
    return false
  }
}
