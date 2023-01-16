// props   Author:Titans@2396757591@qq.com
// import { tableFormConfig, tableConfig, columns, tableData, toolbarConfig } from '../config/config'
export default {
  // 树形表格序号扁平化：[1, 2, 2.1, 2.11] => [1, 2, 3, 4]
  isTreeSeqToFlat: {
    type: Boolean,
    default: true
  },
  unidirectionalData: { // 是否单向数据，不拷贝数据
    type: Boolean,
    default: true
  },
  rowId: {
    type: String,
    default() {
      return '_XID'
    }
  },
  id: {
    type: String,
    default () {
      return 'TableGeneral'
    }
  },
  highConfig: {
    type: [Object],
    default() {
      return {
        scrollY: {
        },
        scrollX: {
        }
      }
    }
  },
  tableGlobalConfig: {
    type: Object,
    default() {
      return {}
    }
  },
  tableFormConfig: { // 表格form配置
    type: [Object, Boolean],
    default () {
      return false
    }
  },
  keyboardConfig: { // keyboardConfig
    type: Object,
    default () {
      return {
        isArrow: true,
        isDel: false,
        isEnter: false,
        isTab: false,
        isEdit: false
      }
    }
  },
  tableConfig: { // 表格配置
    type: Object,
    default () {
      return {}
    }
  },
  toolbarConfig: { // 工具栏配置
    type: [Object, Boolean],
    default () {
      return {}
    }
  },
  pagerConfig: { // 分页配置
    type: [Object, Boolean],
    default () {
      return {}
    }
  },
  tableColumnsConfig: { // 表头配置
    type: Array,
    default () {
      return []
    }
  },
  tableData: { // 表内容
    type: Array,
    default () {
      return []
    }
  },
  editConfig: { // table 编辑配置
    type: [Object, Boolean],
    default () {
      return {
        trigger: 'click',
        mode: 'cell'
        // activeMethod({ row, rowIndex, column, columnIndex }) {

        // }
      }
    }
  },
  editRules: { // table 编辑配置
    type: [Object],
    default () {
      return {}
    }
  },
  expandConfig: { // table 展开行配置
    type: [Boolean, Object],
    default () {
      return false
    }
  },
  footerConfig: { // 表尾配置
    type: [Object],
    default () {
      return {
        showFooter: false
      }
    }
  },
  treeConfig: { // table tree配置
    type: [Object, Boolean]
  },
  loading: { // 表格是否显示加载中
    type: Boolean
  },
  autoResize: {
    type: Boolean,
    default: true
  },
  contextMenuConfig: { // 右键菜单配置
    type: [Object, Boolean],
    default () {
      return {}
    }
  },
  height: {
    type: [String],
    default () {
      return 'auto'
    }
  },
  checkboxConfig: {
    type: Object,
    default () {
      return {
        // checkMethod({ row }) {
        //   return true
        // }
      }
    }
  },
  rowStyle: {
    type: [Function, Object],
    default () {
      return {}
    }
  },
  cellStyle: {
    type: [Object, Function, String],
    default () {
      return {}
    }
  },
  cellClassName: {
    type: [String, Function],
    default: ''
  },
  showZero: {
    type: [Boolean],
    default: true
  },
  defaultMoneyUnit: {
    type: Number,
    default: 1
  },
  calculateConstraintConfig: {
    type: Object,
    default () {
      return {}
    }
  },
  contentTableConfig: {
    type: Object,
    default() {
      return {}
    }
  },
  batchModifyFields: {
    type: [Array, Boolean],
    default() {
      return true
    }
  },
  scrollLoadConfig: {
    type: Object,
    default() {
      return {}
    }
  },
  spanMethod: {
    type: [Function],
    default: undefined
  },
  mergeCells: {
    type: [Array],
    default: undefined
  },
  publicData: {
    type: Object,
    default() {
      return {
        rowPublicData: {},
        rowCalcData: {},
        cellCaclData: {},
        cellCodeCalcData: {}
      }
    }
  },
  // 导出配置{Object} 属性参考Export组件中exportModalFormData
  exportModalConfig: {
    type: Object,
    default: () => ({})
  }
}
