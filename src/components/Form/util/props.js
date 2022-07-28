// props   Author:Titans@2396757591@qq.com
export default {
  formGloabalConfig: { // 表单全局配置
    type: Object,
    default() {
      return {}
    }
  },
  formItemsConfig: { // 表单每一条目配置
    type: Array,
    default () {
      return []
    }
  },
  formDataList: { // 表单数据集
    type: Object,
    default () {
      return {}
    }
  },
  formConfig: { // 表单用户配置
    type: Object,
    default () {
      return {}
    }
  },
  formValidationConfig: { // form表单校验配置
    type: Object,
    default () {
      return {}
    }
  },
  editable: { // 表单是否可编辑
    type: Boolean,
    default() {
      return true
    }
  },
  uneditableBorder: { // 表单不可编辑时是否显示边框
    type: Boolean,
    default() {
      return true
    }
  },
  moneyInputSwich: { // 标哥是否开启录入金额切换
    type: Boolean,
    default() {
      return true
    }
  },
  defaultMoneyUnit: { // 默认金额单位
    type: Number,
    default() {
      return 10000
    }
  },
  formInitGloabalData: { // form表单初始化数据 废弃
    type: Object,
    default() {
      return {}
    }
  },
  moneyUnitOptions: {
    type: Array,
    default() {
      return [ // 金额单位配置
        {
          value: 1,
          label: '元', // 元
          inputDigits: 2, // 录入最大允许位数
          viewDigits: 2 // 显示位数
        },
        {
          value: 10000,
          label: '万元', // 万元
          inputDigits: 2, // 录入最大允许位数
          viewDigits: 2 // 显示位数
        }
      ]
    }
  }
}

// formGloabalConfig: {},// 表单全局配置
// formItemsConfig: [] // 表单每一条目配置
// formDataList: {}, // 表单数据集
// formConfig: { }, // 表单用户配置
// formValidationConfig: {} // form表单校验配置
