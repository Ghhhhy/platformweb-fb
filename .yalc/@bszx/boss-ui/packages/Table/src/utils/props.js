/*
 * @Author: 轻语
 * @Date: 2021-11-01 10:48:36
 * @LastEditors: xietingting
 * @LastEditTime: 2022-12-28 16:36:29
 * @Description:
 */
export default {
  rowId: {
    type: String,
    default: '_XID'
  },
  customClass: {
    type: String,
    default: ''
  },
  useBsuiTableRowClass: {
    type: Boolean
  },
  tableRowClass: {
    type: [Function, Object, String],
    default: ''
  },
  cellClassName: {
    type: [Function, Object],
    default() {
      return {}
    }
  },
  headerCellClassName: {
    type: [String, Function],
    default () {
      return ''
    }
  },
  rowStyle: {
    type: [Function, Object],
    default: () => ({})
  },
  cellStyle: {
    type: [Object, Function, String],
    default: () => ({})
  },
  loading: { // 表格是否显示加载中
    type: Boolean
  },
  height: {
    type: [String, Number],
    default () {
      return 'auto'
    }
  },
  checkboxConfig: {
    type: Object,
    default: () => ({})
  },
  radioConfig: {
    type: Object,
    default: () => ({})
  },
  unidirectionalData: { // 是否单向数据，不拷贝数据
    type: Boolean,
    default: true
  },
  editRules: { // table 编辑配置
    type: [Object],
    default: () => ({})
  },
  columnFields: {
    type: [Array, Boolean],
    default () {
      return true
    }
  },
  cpColumnFields: {
    type: [Array, Boolean],
    default () {
      return true
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
  headerRowClassName: {
    type: [String, Function],
    default () {
      return ''
    }
  },
  showZero: {
    type: [Boolean],
    default: false
  },
  publicData: {
    type: Object,
    default() {
      return {
        rowPublicData: {},
        rowCalcData: {},
        cellCaclData: { },
        cellCodeCalcData: {}
      }
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
    default: () => ({})
  },
  spanMethod: {
    type: [Function],
    default: undefined
  },
  mergeCells: {
    type: [Array],
    default: undefined
  },
  tableConfig: { // 表格配置
    type: Object,
    default () {
      return {}
    }
  },
  contentTableConfig: {
    handler(newvalue, oldValue) {
    },
    deep: true,
    immediate: true
  },
  isTreeTable: {
    type: Boolean,
    default: false
  },
  // 是否将树形表格序号扁平化：[1, 2, 2.1, 2.11] => [1, 2, 3, 4]
  isTreeSeqToFlat: {
    type: Boolean,
    default: () => {
      return window['__BS_UI_GLOBAL_CONFIG__']?.project?.name === 'rh'
    }
  }
}
