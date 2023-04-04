/*
 * @Author: 轻语
 * @Date: 2021-11-01 10:06:07
 * @LastEditors: 罗景丹 luojingdan@bosssoft.com.cn
 * @LastEditTime: 2023-03-31 14:46:23
 * @Description:
 */
// 向外暴露的方法
const exportMethods = {
  /**
   * 全局表格组件xGrid调用实例
   * @return {*}
   */
  tableOptionFn() {
    return this.$refs.xGrid
  },
  updateBodyTopRows() {
    return this.$refs.xGrid.updateBodyTopRows && this.$refs.xGrid.updateBodyTopRows()
  },
  /**
   * 更新表尾
   */
  updateFooter() {
    return this.$refs.xGrid.updateFooter()
  },
  /**
   * 更新表格数据
   */
  updateData() {
    let self = this
    this.$refs.xGrid.updateData().then(() => {
      self.updateFooter()
      self.updateBodyTopRows()
    })
  },
  /**
   * 导出数据
   */
  exportData(obj) {
    this.$refs.xGrid.openExport({
      original: true // 默认勾选源
    })
  },
  /**
   * 导入数据
   */
  importDataEvent() {
    this.$refs.xGrid.importData()
  },
  /**
   * 设置所有选中
   */
  setAllCheckboxRow() {
    this.updateBodyTopRows()
    this.$refs.xGrid.setAllCheckboxRow(true).then(() => {
      this.updateFooter().then(() => { }).catch(() => { })
    })
  },
  /**
   * 清除所有选中
   */
  clearCheckboxRow() {
    this.updateBodyTopRows()
    this.$refs.xGrid.clearCheckboxRow().then(() => {
      this.updateFooter().then(() => { }).catch(() => { })
    })
  },
  /**
   * 删除选中行操作
   */
  removeCheckboxRow() {
    let self = this
    this.$XModal.confirm('您确定要删除所选中数据吗?').then(type => {
      if (type === 'confirm') {
        self.$refs.xGrid.removeCheckboxRow()
      }
    })
  },
  /**
   * 撤销操作
   */
  revertEvent() {
    this.$XModal.confirm('您确定要还原数据吗?').then(type => {
      if (type === 'confirm') {
        // this.$refs.xGrid.revertData()
        this.reLoadTable()
      }
    })
  },
  /**
   * 清空当前列
   * @param {*} column
   */
  clearColumn(column) {
    let self = this
    // 如果某列可编辑，则提供清空某列数据功能
    if (column.formula || !column.editRender) {
      this.$warn('选中的列为非编辑列，不支持清空列操作')
      return
    }
    if (column.property) {
      let renderName = column.editRender.name
      self.tableDataIn.forEach(row => {
        switch (renderName) {
          case '$vxeInput':
          case '$vxeMoney':
            row[column.property] = ''
            break
          default:
            this.$warn('选中的列不支持清空操作')
            break
        }
      })
    }
    this.reCalcAndReLoadTableData({ data: this.getTableData().fullData }).then(() => {
    })
  },
  /**
   * 删除选中行操作
   * @param {*} rows
   */
  deleteRowData(rows) {
    let self = this
    this.$XModal.confirm('您确定要删除所选中数据吗?').then(type => {
      if (type === 'confirm') {
        self.$refs.xGrid.removeCheckboxRow(rows)
      }
    })
  },
  /**
   * 复制选中行数据
   *
   * @param {*} [obj={}] 当前选中的行数据(单行)
   * @return {*}
   */
  async copySelectionRowData(obj = {}) {
    let self = this
    return new Promise((resolve, reject) => {
      const { rowIndexTo, data } = obj
      let rowTo = rowIndexTo === undefined ? -1 : rowIndexTo
      let newRowSelectionsData = data || self.$refs.xGrid.getCheckboxRecords()
      if (newRowSelectionsData.length) {
        newRowSelectionsData.forEach((item, index) => {
          Object.keys(item).forEach((key) => {
            if (key.indexOf('__') >= 0) {
              delete item[key]
            }
          })
          item = Object.assign({}, item, {
            insertMark: '新数据',
            date: new Date().format('YYYY-MM-DD hh:mm:ss:c'),
            isNew: true,
            _XID: ''
          })
        })
        self.$refs.xGrid.insert(newRowSelectionsData).then(({ row, rows }) => {
          self.$refs.xGrid.setActiveCell(rowTo).then(() => {
            resolve({ tableData: self.getTableData, row: row }, self)
          }).catch(e => {
            reject(e)
          })
        }).catch(e => {
          reject(e)
        })
      } else {
        reject(new Error('请先选择新增数据的模版!'))
        self.$XModal.message({ message: '请先选择新增数据的模版!' })
      }
    })
  },
  /**
   * 复制行
   *
   * @param {*} [obj={}]
   */
  async copyRowData(obj = {}) {
    let self = this
    const { rowSource, rowIndexTo } = obj
    let rowSourceData = rowSource === undefined ? 0 : rowSource
    let rowTo = rowIndexTo === undefined ? -1 : rowIndexTo
    // 复制行
    let newRowDataObj = { ...self.$refs.xGrid.getData(rowSourceData) }
    Object.keys(newRowDataObj).forEach((key) => {
      if (key.indexOf('__') >= 0) {
        delete newRowDataObj[key]
      }
    })
    newRowDataObj = Object.assign({}, newRowDataObj, {
      insertMark: '新数据',
      date: new Date().format('YYYY-MM-DD hh:mm:ss:c'),
      isNew: true,
      _XID: ''
    })
    let { row } = await self.$refs.xGrid.insertAt(newRowDataObj, rowTo)
    await self.$refs.xGrid.setCurrentRow(row)
    await self.$refs.xGrid.setActiveCell(row)
    await self.$refs.xGrid.validate(row).catch(errMap => errMap)
    this.$XModal.message({ message: `复制单条数据完成，行号为 ${rowTo + 1}` })
  },
  /**
   * 新增行
   *
   * @param {*} [obj={}]
   * @return {*}
   */
  async insertRowData(obj = {}) {
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
    // await this.$refs.xGrid.fullValidate(row).catch(errMap => {
    //   console.log('fullValidate', errMap)
    //   return errMap
    // })
    // this.$XModal.message({ message: `复制单条数据完成，行号为 ${rowTo + 1}` })
  },
  /**
   * 重新加载数据
   */
  reLoadTable() {
    let self = this
    let xGrid = this.$refs.xGrid
    this.initTable()
    xGrid.reloadColumn(self.initTableColumns())
    xGrid.reloadData(self.initTableData()).then().catch()
  },
  /**
   * 重新加载表格数据
   */
  reLoadTableData() {
    let xGrid = this.$refs.xGrid
    xGrid.reloadData(this.initTableData()).then().catch()
  },

  refreshTable(data) {
    let self = this
    let xGrid = this.$refs.xGrid
    // 重新加载所有
    if (data) {
      // 重新加载数据刷新视图 调整 即将废弃
      // 重新加载数据刷新视图 调整 即将废弃
      xGrid.reloadData(data || this.tableDataIn).then(() => {
        this.$refs.xGrid.updateBodyTopRows && this.$refs.xGrid.updateBodyTopRows()
        self.updateFooter()
      }).catch()
    } else {
      xGrid.reloadData(this.tableDataIn).then(() => {
        this.$refs.xGrid.updateBodyTopRows && this.$refs.xGrid.updateBodyTopRows()
        self.updateFooter()
      }).catch()
      // this.ifRenderTable = false
      // this.$nextTick(() => {
      //   this.ifRenderTable = true
      // })
    }
  },
  /**
   * 重加载表头
   *
   * @param {*} columns
   */
  reloadTableColumns(columns) {
    this.$refs.xGrid.reloadColumn(columns ? this.generateTableColumns(columns, this.tableConfigCp.globalConfig) : this.initTableColumns()).then().catch()
  },
  /**
   * 重加载渲染数据
   *
   * @param {*} [data=[]]
   */
  reloadTableRenderData(data = []) {
    let xGrid = this.$refs.xGrid
    this.selection = []
    if (xGrid) {
      xGrid.removeCheckboxRow()
      return xGrid.reloadData(data)
    }
  },
  /**
   * 重新计算tableData并刷新视图
   *
   * @param {*} { data, modifyItem, modifyData }
   * @return {*} promise
   */
  reCalcAndReLoadTableData({ data, modifyItem, modifyData }) {
    let self = this
    return new Promise((resolve, reject) => {
      self.rePerformAllCalcAndConstraintByData(data, true).then(({ dataCodeRowMap, dataCodeRowArr, afterCalcData }) => {
        self.$refs.xGrid.updateBodyTopRows && this.$refs.xGrid.updateBodyTopRows()
        self.updateFooter().then(() => {
          resolve({ data: afterCalcData, modifyItem, modifyData })
        }).catch((e) => {
          reject(e)
        })
      })
    })
  },
  /**
   * 删除__字段
   *
   * @param {*} data
   * @return {*}
   */
  clearDataRenderField(data) {
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
  /**
   * 根据列表展开情况过滤导出数据
   * @param fullData
   * @param cloneFullData
   * @returns {*}
   */
  fliterTableDataUnexpand(fullData, cloneFullData = this.$XEUtils.clone(fullData, true)) {
    fullData.forEach((row, rowIndex) => {
      if (!this.$refs.xGrid?.isTreeExpandByRow(row)) {
        Reflect.deleteProperty(cloneFullData[rowIndex], 'children')
      } else {
        this.fliterTableDataUnexpand(row.children, cloneFullData[rowIndex].children)
      }
    })
    return cloneFullData
  },
  /**
   * 获取表格数据
   *
   * @return {*}
   */
  getTableData() {
    const insertRecords = this.$refs.xGrid.getInsertRecords()
    const updateRecords = this.$refs.xGrid.getUpdateRecords()
    const removeRecords = this.$refs.xGrid.getRemoveRecords()
    const { keepSource, tableSourceData } = this.$refs.xGrid.$refs.xTable
    const { fullData, visibleData, tableData, footerData } = this.$refs.xGrid.getTableData()
    const treeExpandData = this.fliterTableDataUnexpand(fullData)
    const selection = this.$refs.xGrid.getCheckboxRecords()
    const { tableColumnsConfig, editRules } = this
    return { keepSource, tableSourceData, fullData, visibleData, tableData, footerData, tableColumnsConfig, selection, editRules, insertRecords, removeRecords, updateRecords, treeExpandData }
  },
  /**
   * 获取结合数据
   *
   * @param {*} data
   * @param {*} tableColumnsConfig
   * @param {*} [combinedData={}]
   * @return {*}
   */
  getCombinedData(data, tableColumnsConfig, combinedData = {}) {
    let self = this
    data.forEach((row, index) => {
      tableColumnsConfig.forEach((column, columnIndex) => {
        if (Array.isArray(column.children) && column.children.length) {
          self.getCombinedData(data, column.children, combinedData)
        } else if (column.combinedType && column.combinedType.indexOf('total') >= 0) {
          combinedData[column.field] = this.accurateJiafa((combinedData[column.field] || 0), (+this.transToNumber(row[column.field], 3) || 0))
        }
      })
    })
    return combinedData
  },
  /**
   * 获取表格纯净数据
   *
   * @return {array} table
   */
  getPureTableData() {
    const listData = this.getListData()
    const insertRecords = this.$refs.xGrid.getInsertRecords()
    const updateRecords = this.$refs.xGrid.getUpdateRecords()
    const removeRecords = this.$refs.xGrid.getRemoveRecords()
    const { keepSource, tableSourceData } = this.$refs.xGrid.$refs.xTable
    const { fullData, visibleData, tableData, footerData } = this.$refs.xGrid.getTableData()
    const selection = this.$refs.xGrid.getCheckboxRecords()
    const { tableColumnsConfig, editRules } = this
    const combinedData = this.getCombinedData(fullData, tableColumnsConfig)
    return { combinedData, keepSource, tableSourceData: this.clearDataRenderField(tableSourceData), fullData: this.clearDataRenderField(fullData), visibleData: this.clearDataRenderField(visibleData), tableData: this.clearDataRenderField(tableData), footerData, tableColumnsConfig, selection: this.clearDataRenderField(selection), editRules, listData: this.clearDataRenderField(listData), insertRecords: this.clearDataRenderField(insertRecords), updateRecords: this.clearDataRenderField(updateRecords), removeRecords: this.clearDataRenderField(removeRecords) }
  },
  /**
   * 获取当前操作数据
   *
   * @return {*}
   */
  getOptionData() {
    return this.$refs.xGrid.getRecordset()
  },
  /**
   * 获取新增行
   *
   * @return {*}
   */
  getInsertRowData() {
    return this.$refs.xGrid.getInsertRecords()
  },
  /**
   * 获取选中
   *
   * @return {*}
   */
  getSelectionData() {
    return this.$refs.xGrid.getCheckboxRecords()
  },
  /**
   * 获取getData
   *
   * @param {*} [rowIndex=[]]
   * @return {*}
   */
  getData(rowIndex = []) {
    return this.$refs.xGrid.getData(rowIndex)
  },
  validate(row = true) {
    return this.$refs.xGrid.validate(row)
  },
  /**
   * 校验
   *
   * @param {boolean} [row=true]
   */
  async validEvent(row = true) {
    const errMap = await this.$refs.xGrid.validate(row).catch(errMap => errMap)
    if (errMap) {
      this.$XModal.message({ status: 'error', message: '校验不通过！' })
    } else {
      this.$XModal.message({ status: 'success', message: '校验成功！' })
    }
  },
  /**
   * 所有校验
   *
   * @param {boolean} [row=true]
   */
  async fullValidEvent(row = true) {
    const errMap = await this.$refs.xGrid.fullValidate(row).catch(errMap => errMap)
    if (errMap) {
      let msgList = []
      Object.values(errMap).forEach(errList => {
        errList.forEach(params => {
          let { rowIndex, column, rules } = params
          rules.forEach(rule => {
            msgList.push(`第 ${rowIndex} 行 ${column.title} 校验错误：${rule.message}`)
          })
        })
      })
      this.$XModal.message({
        status: 'error',
        message: () => {
          return [
            <div class="red" style="max-height: 400px;overflow: auto;">
              {
                msgList.map(msg => <div>{ msg }</div>)
              }
            </div>
          ]
        }
      })
    } else {
      this.$XModal.message({ status: 'success', message: '校验成功！' })
    }
  },
  /**
   * 选中校验
   *
   * @return {*}
   */
  async selectValidEvent() {
    let selectRecords = this.$refs.xGrid.getCheckboxRecords()
    if (selectRecords.length > 0) {
      const errMap = await this.$refs.xGrid.validate(selectRecords).catch(errMap => errMap)
      if (errMap) {
        this.$XModal.message({ status: 'error', message: '校验不通过！' })
        return false
      } else {
        this.$XModal.message({ status: 'success', message: '校验成功！' })
        return true
      }
    } else {
      this.$XModal.message({ status: 'warning', message: '未选中数据！' })
    }
  },
  /**
   * 插入数据
   *
   * @param {*} row
   * @param {*} column
   */
  insertEvent(row, column) {
    let xTable = this.$refs.xTable
    xTable.insertAt(null, row)
      .then(({ row }) => xTable.setActiveCell(row, column.property))
  },
  /**
   * 获取原始传入表头数据
   *
   * @param {array} column 通过xTable.getTableColumn().fullColumn获取转换后的column
   * @return {array} 原始表头数据  (vxe3.0弃用own属性)
   */
  transTableColumnsToSource(column) {
    if (!column) return []
    const newColumn = []
    column.forEach((k, v) => {
      k.own && newColumn.push(k.own)
      if (k && k.children) {
        newColumn[v].children = []
        newColumn[v].children.push(...this.transTableColumnsToSource(k.children))
      }
    })
    return newColumn
  }
}
const proxyFn = {
  handleSearch() {
    const filterName = this.$XEUtils.toString(this.filterName).trim().toLowerCase()
    if (filterName) {
      const filterRE = new RegExp(filterName, 'gi')
      const options = { children: 'list' }
      const searchProps = ['name', 'desc', 'type', 'enum', 'defVal']
      const rest = this.$XEUtils.searchTree(this.tableData, item => searchProps.some(key => item[key].toLowerCase().indexOf(filterName) > -1), options)
      this.$XEUtils.eachTree(rest, item => {
        searchProps.forEach(key => {
          item[key] = item[key].replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
        })
      }, options)
      this.apiList = rest
      this.$nextTick(() => {
        if (this.$refs.xTable) {
          this.$refs.xTable.setAllTreeExpand(true)
        }
      })
    } else {
      this.apiList = this.tableData
      this.$nextTick(() => {
        if (this.$refs.xTable) {
          this.$refs.xTable.setTreeExpand(this.defaultExpandRows, true)
        }
      })
    }
  },
  // 调用频率间隔 500 毫秒
  searchEvent() {
    this.$XEUtils.debounce(function () {
      this.handleSearch()
    }, 500, { leading: false, trailing: true })
  }
}

const lifeCycleMethods = {
  initTreeConfig() {
    // 表格树配置
    if (this.getBasicDataType(this.treeConfig) === 'Boolean') {
      this.treeConfigIn = false
    } else if (this.getBasicDataType(this.treeConfig) === 'Undefined') {
      this.treeConfigIn = false
    } else {
      this.treeConfigIn = Object.assign({
        dblExpandAll: false, // 双击展开当前节点树形数据
        onlyDblTreeNodeExpand: false, // 在不允许编辑模式下是否仅仅双击树列才允许执行展开
        dblExpand: false, // 是否执行双击展开树形数据
        children: 'children',
        accordion: true
      }, this.getBasicDataType(this.treeConfig) === 'Object' ? this.treeConfig : {})
    }
  },
  // 根据数据结构，如果行数据有children则添加行样式
  rowClassName({ row, rowIndex, $rowIndex }) {
    if (row.children && row.children.length) {
      return 'tr-line-bold'
    }
  },
  onCopyColumnSureClick({ columnField, columnCpField }) {
    // 列复制确认
    const fullData = this.$refs.xGrid.getTableData().fullData
    const data = (this.toolbarConfigIn.copyColumn.checkbox && this.selection.length) ? this.selection : fullData
    data.forEach((row, index) => {
      row[columnCpField] = row[columnField]
    })
    this.reCalcAndReLoadTableData(data).then(() => {})
  },
  getDataCodeRowMapCumulativeResult(dataCodeRowMap, field) {
    // 获取重复itemcode的计算结果
    return isNaN(parseFloat(dataCodeRowMap[field])) ? 0 : parseFloat(dataCodeRowMap[field])
  },
  onBatchModifyItemChange(obj, modifyForm) {
    this.$emit('onBatchModifyItemChange', obj, modifyForm)
  },
  omBatchModifySureClick({ modifyItem, formData }) {
    // 批量修改确认
    let self = this
    const selection = this.selection
    selection.forEach((row, index) => {
      row = Object.assign(row, formData)
    })
    self.reCalcAndReLoadTableData({ data: this.getTableData().fullData, modifyItem, modifyData: formData }).then((obj) => {
      self.$emit('onBatchModifySuccess', obj, self, self.$refs.xGrid)
    })
  },
  handleCheckboxChange(obj, e) {
    // 多选选中或去选某一条事件
    this.selection = obj.records
    this.updateBodyTopRows()
    this.updateFooter().then(() => {
      this.$emit('checkboxChange', obj, e)
      this.$emit('ProxyEvent', 'checkboxChange', obj, this, this.$refs.xGrid)
    }).catch(() => { })
  },
  radioChange(obj) {
    this.$emit('radioChange', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'radioChange', obj, this, this.$refs.xGrid)
  }, // 只对 type = radio 有效， 当手动勾选并且值发生改变时触发的事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  handleCheckboxAllChange(obj, e) {
    // 全选选中或去选某一条事件
    this.selection = obj.records
    this.updateBodyTopRows()
    this.updateFooter().then(() => {
      this.$emit('checkboxAll', obj, e)
      this.$emit('ProxyEvent', 'checkboxAll', obj, this, this.$refs.xGrid)
    }).catch(() => { })
  },

  headerCellClick(obj) {
    this.$emit('headerCellClick', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'headerCellClick', obj, this, this.$refs.xGrid)
  },
  getColumnsList() {
    let newColumnsList = []
    this.tableColumnsConfig.forEach(v => {
      newColumnsList.push(v.field)
    })
    return newColumnsList
  },
  delSearchfromMain() {
    // 父组件调用此方法清空查询数据
    this.formSearchData.filterValue = ''
  },

  sortChange(obj) {
    this.$emit('sortChange', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'sortChange', obj, this, this.$refs.xGrid)
  }, // 当排序条件发生变化时会触发该事件 { column, column.property, order, $event }
  filterChange(obj) {
    this.$emit('filterChange', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'filterChange', obj, this, this.$refs.xGrid)
  }, // 当筛选条件发生变化时会触发该事件 { column, property, values, datas, filters, $event }{ column, property, values, datas, filters, $event }
  resizableChange(obj) {
    this.$emit('resizableChange', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'resizableChange', obj, this, this.$refs.xGrid)
  }, // 当列宽拖动发生变化时会触发该事件 { $rowIndex, column, columnIndex, $columnIndex, $event }
  toggleRowExpand(obj) {
    // 给树形表格(非treeTable，是配置了treeConfig的table)数据设置属性
    this.treeConfig && this.setRowProperty(obj.row)
    this.$emit('toggleRowExpand', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'toggleRowExpand', obj, this, this.$refs.xGrid)
  }, // 当行展开或收起时会触发该事件 { expanded, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  toggleTreeExpand(obj) {
    this.$emit('toggleTreeExpand', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'toggleTreeExpand', obj, this, this.$refs.xGrid)
  }, // 当树节点展开或收起时会触发该事件 { expanded, row, column, columnIndex, $columnIndex, $event }

  // 获取选中行
  getCheckboxRecords (isFull = false) {
    return this.$refs.xGrid.getCheckboxRecords(isFull)
  }
}

const batchModify = { // 批量修改
  onBatchModifyItemChange(obj, modifyForm) {
    this.$emit('onBatchModifyItemChange', obj, modifyForm)
  },
  omBatchModifySureClick({ modifyItem, formData }) {
    // 批量修改确认
    const selection = this.selection
    selection.forEach((row, index) => {
      row = Object.assign(row, formData)
    })
    self.reCalcAndReLoadTableData({ data: this.getTableData().fullData, modifyItem, modifyData: formData }).then((obj) => {
      self.$emit('onBatchModifySuccess', obj, self, self.$refs.xGrid)
    })
  }
}

export default {
  ...batchModify,
  ...exportMethods,
  ...proxyFn,
  ...lifeCycleMethods
}
