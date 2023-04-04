/*
 * @Author: 轻语
 * @Date: 2021-11-01 14:45:37
 * @LastEditors: xkj
 * @LastEditTime: 2023-02-03 14:08:28
 * @Description: 右键事件
 */
import { contextMenuConfig } from '../config/tableDefaultConfig'
export default {
  props: {
    contextMenuConfig: { // 右键菜单配置
      type: [Object, Boolean],
      default: () => ({})
    }
  },
  watch: {
    contextMenuConfig: { // 右键菜单
      handler() {
        this.initContextMenuConfig()
      }
      // immediate: true
    }
  },
  data() {
    return {
      contextMenuConfigIn: { // 右键菜单配置
        ...contextMenuConfig
      }
    }
  },
  methods: {
    initContextMenuConfig() { // 更新右键配置
      // 更新右键配置
      if (this.getBasicDataType(this.contextMenuConfig) === 'Undefined' || this.getBasicDataType(this.contextMenuConfig) === 'Boolean') {
        this.contextMenuConfigIn = {}
      } else {
        if (!this.tableGlobalConfigIn?.columnClearConfig?.openClearPanel && this.contextMenuConfigIn.header && this.contextMenuConfigIn.header.options) { // 如果右键不配置清空列，则去掉
          this.contextMenuConfigIn.header.options = [this.contextMenuConfigIn.header.options[0].filter(item => item.code !== 'clear')]
        }
        this.contextMenuConfigIn = Object.assign({}, this.contextMenuConfigIn, this.contextMenuConfig)
      }
    },
    onContextMenuClick({ menu, row, column, columnIndex, rowIndex }, event) { // 右键菜单
      event = event || window.event
      let self = this
      let xGrid = this.$refs.xGrid
      switch (menu.code) {
        case 'hideColumn':// 隐藏当前列
          xGrid.hideColumn(column)
          break
        case 'showAllColumn': // 显示所有列
          xGrid.resetColumn()
          break
        case 'recover_all': // 显示所有列
          self.reloadTableColumns(self.tableColumnsConfig)
          break
        case 'resetColumn': // 重新加载
          xGrid.resetColumn({ visible: true, resizable: true })
          break
        case 'toggleAllCheckboxRow': // 重新加载
          xGrid.toggleAllCheckboxRow()
          break
        case 'reload': // 重新加载
          break
        case 'insertAt': // 插入数据
          self.insertRowData({})
          break
        case 'remove': // 移除数据
          xGrid.remove(row)
          break
        case 'clear': // 清除单元格数据
          xGrid.clearData(row, column.property)
          break
        case 'verify': // 校验并定位到第一个错误
          // this.validate().catch(errMap => console.log(errMap))
          this.validEvent()
          break
        case 'maximize': // 表格最大化
          xGrid.maximize()
          break
        case 'revert': // 表格还原
          self.revertEvent()
          break
        case 'zoom': // 切换表格最大化
          xGrid.zoom()
          break
        case 'exportDataXlsx':
          this.triggerExportOption()
          break
        case 'print':
          xGrid.print({
            filename: 'printData',
            mode: 'current',
            isHeader: true,
            isFooter: true
          })
          break
        case 'logCurrentData':
          console.log('当前行数据:', row, '\n', '当前单元格数据:', row && row[column.property], '\n', '当前列配置数据:', column, '\n', '当前行索引:', rowIndex, '\n', '当前列索引:', columnIndex, '\n')
          console.log('当前表格数据:', this.getTableData())
          break
        case 'exportDataPdf':
          xGrid.exportData({
            filename: '导出',
            type: 'pdf'
          })
          break
        case 'clearSort':
          xGrid.clearSort()
          break
        case 'sortAsc':
          xGrid.sort(column.property, 'asc')
          break
        case 'sortDesc':
          xGrid.sort(column.property, 'desc')
          break
        case 'clear_column':
          this.clearColumn(column)
          break
        case 'revert_column':
          this.reLoadTableData()
          break
        case 'changeRecord': // 查看单元格值变更记录
          this.changeRecord(row, column)
          break
      }
      return false
    },
    revertEvent() {
      // 撤销操作
      this.$XModal.confirm('您确定要还原数据吗?').then(type => {
        if (type === 'confirm') {
          // this.$refs.xGrid.revertData()
          this.reLoadTable()
        }
      })
    },
    async validEvent(row = true) {
      // 校验
      const errMap = await this.$refs.xGrid.validate(row).catch(errMap => errMap)
      if (errMap) {
        this.$XModal.message({ status: 'error', message: '校验不通过！' })
      } else {
        this.$XModal.message({ status: 'success', message: '校验成功！' })
      }
    },
    async insertRowData(obj = {}) {
      // 新增行
      let self = this
      return new Promise((resolve, reject) => {
        const { data, rowIndexTo } = obj
        let rowTo = rowIndexTo === undefined ? -1 : rowIndexTo
        let dataObj = Object.assign({}, data === undefined ? {} : data, {
          insertMark: '新数据',
          date: new Date().format('YYYY-MM-DD hh:mm:ss:c'),
          isNew: true,
          _XID: ''
        })
        Object.keys(dataObj).forEach((key) => {
          if (key.indexOf('__') >= 0) {
            delete dataObj[key]
          }
        })
        self.$refs.xGrid.insertAt(dataObj, rowTo).then(({ row }) => {
          self.$refs.xGrid.setCurrentRow(row).then(() => {
            self.$refs.xGrid.setActiveCell(row).then(() => {
              self.$refs.xGrid.validate(row).then(() => {
                resolve({ tableData: self.getTableData, row: row }, self)
              }).catch(errMap => {
                // console.log('validate', errMap)
                resolve({ tableData: self.getTableData, row: row, errMap: errMap }, self)
              })
            }).catch(e => {
              reject(e)
            })
          }).catch(e => {
            reject(e)
          })
        }).catch(e => {
          reject(e)
        })
      })
    },
    reloadTableColumns(columns) {
      // 重加载表头
      this.$refs.xGrid.reloadColumn(columns ? this.generateTableColumns(columns, this.tableConfigCp.globalConfig) : self.initTableColumns()).then().catch()
    },
    reloadTableRenderData(data = []) {
      // 重加载渲染数据
      let xGrid = this.$refs.xGrid
      xGrid.reloadData(data)
      this.selection = []
      if (xGrid) {
        xGrid.removeCheckboxRow()
      }
    },
    reCalcAndReLoadTableData({ data, modifyItem, modifyData }) {
      // 重新计算tableData并刷新视图
      let self = this
      return new Promise((resolve, reject) => {
        self.rePerformAllCalcAndConstraintByData(data, true).then(({ dataCodeRowMap, dataCodeRowArr, afterCalcData }) => {
          self.updateFooter().then(() => {
            resolve({ data: afterCalcData, modifyItem, modifyData })
          }).catch((e) => {
            reject(e)
          })
        })
      })
    },
    clearDataRenderField(data) {
      // 删除__字段
      let self = this
      return data.map((item, index) => {
        let itemN = Object.assign({}, item)
        Object.keys(itemN).forEach((key, ki) => {
          if (key.indexOf('__') >= 0) {
            delete itemN[key]
          }
          if (Array.isArray(itemN.children) && itemN.children.length) {
            itemN.children = self.clearDataRenderField(itemN.children)
          }
        })
        return itemN
      })
    },
    changeRecord(row, column) {
      // 查看单元格值变更记录
      this.$emit('changeRecord', row, column)
    }
  },
  mounted() {
    this.initContextMenuConfig() // 更新右键配置
  }
}
