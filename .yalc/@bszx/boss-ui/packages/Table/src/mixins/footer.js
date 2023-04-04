/*
 * @Author: 轻语
 * @Date: 2021-11-08 17:24:53
 * @LastEditors: Comer
 * @LastEditTime: 2022-11-09 16:17:54
 * @Description:
 */
import { footerConfig, bodyTopRowsConfig } from '../config/tableDefaultConfig'
export default {
  props: {
    footerConfig: { // 表尾配置
      type: [Object],
      default () {
        return {
          showFooter: true
        }
      }
    },
    bodyTopRowsConfig: {
      type: [Object],
      default() {
        return {
          enabled: false
        }
      }
    },
    bodyTopRowsData: {
      type: [Array],
      default() {
        return []
      }
    },
    footerData: {
      type: [Array],
      default() {
        return []
      }
    },
    renderCellClass: {
      type: [Function, Array],
      default: (params) => {
        // let { $table, $seq, $$seq, seq, rowid, row, rowIndex, $rowIndex, _rowIndex, column, columnIndex, $columnIndex, _columnIndex, fixed, type, isHidden, level, visibleData, data, items } = params
        let { column, $table } = params
        let self = $table.$parent.$parent
        if (self.editConfigIn && self.tableGlobalConfigIn.cellEditableStatusStyle && self.hasEditCol) {
          if (!column.editRender) {
            return ['column-editable-false cell-editable-false']
          } else {
            let cellClass = ['column-editable-true']
            if (typeof (self.editConfigIn.activeMethod) === 'function' && self.editConfigIn.activeMethod(params)) {
              cellClass.push('cell-editable-true')
            } else {
              let { name, props = {} } = column.editRender
              if (name === '$vxeTree') {
                let { editable } = (props && props.config) || {}
                if (editable) {
                  cellClass.push('cell-editable-true')
                } else {
                  cellClass.push('cell-editable-false')
                }
              } else if (props.editable) {
                cellClass.push('cell-editable-true')
              } else {
                cellClass.push('cell-editable-false')
              }
            }
            return cellClass
          }
        }
      }
    }
  },
  data() {
    return {
      footerConfigIn: { // 表尾配置
        ...footerConfig
      },
      bodyTopRowsConfigIn: {
        ...bodyTopRowsConfig
      },
      renderCellClassIn: [],
      hasEditCol: false
    }
  },
  watch: {
    footerConfig: { // 表尾配置
      handler() {
        this.initFooterConfig()
      },
      deep: true,
      immediate: true
    },
    bodyTopRowsData: {
      handler(newvalue, oldValue) {
      },
      immediate: true
    },
    bodyTopRowsConfig: {
      handler(newvalue, oldValue) {
        this.initBodyTopRowsConfig()
      },
      deep: true,
      immediate: true
    },
    footerData: {
      handler(newvalue, oldValue) {
      },
      immediate: true
    },
    renderCellClass: {
      handler(newvalue, oldValue) {
        this.renderCellClassIn = this.renderCellClass
      },
      immediate: true
    }
  },
  methods: {
    initFooterConfig() { // 更新footer配置
      let totalObj = this.footerConfig.totalObj
      for (var i in totalObj) {
        // 将总计数据改为小写key
        let a = i.toLowerCase()
        totalObj[a] = totalObj[i]
      }
      this.footerConfigIn = Object.assign({}, this.footerConfigIn, this.footerConfig)
    },
    initBodyTopRowsConfig() {
      this.bodyTopRowsConfigIn = this.deepAssign({}, this.bodyTopRowsConfigIn, this.bodyTopRowsConfig)
    }
  },
  mounted() {
    this.initFooterConfig()
  }
}
