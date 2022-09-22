import { extend } from '@/utils'
import config from './config.js'
import { SequenceGenerator } from '../../../utils/tableUtils.js'
import { del, post, get } from '@/api/http'
import Sortable from 'sortablejs'
import utils from '../../../utils/utils.js'
import tools from '../../../utils/tool.js'

/**
 * 初始化方法
 */
const initMethods = {
  initCreated() {
    this.initConfig()
  },
  initMounted() {
  },
  initConfig() {
    this.formGloabalConfigIn = config('formConf', 'defaultConfig', 'formGloabalConfig')
    this.queryFormItemConfigIn = config('formConf', 'defaultConfig', 'queryFormItemEditConfig')
    this.queryFormData = Object.assign(config('formConf', 'defaultConfig', 'queryFormData'), { guid: tools.getUuid() })
    this.tableConfig = config('tableConf', 'defaultConfig', 'tableConfig')
    this.tableCols = config('tableConf', 'defaultConfig', 'tableCols')
    this.tableEditRules = config('tableConf', 'defaultConfig', 'tableEditRules')
    this.tableKeyboardConfig = config('tableConf', 'defaultConfig', 'tableKeyboardConfig')
  }
}
/**
 * 界面交互逻辑方法
 */
const interfaceMethods = {
  advanceAttr(type) {
    if (this.curDicInfoId === null || ['dicType', 'root'].includes(this.curDicInfoId.guid) || this.curDicInfoId.guid.startsWith('dicType')) {
      this.$XModal.message({ status: 'info', message: '请选择一条表格配置' })
      return
    }
    let currentRow = this.$refs.bsTableRef.tableOptionFn().getCurrentRecord()
    if (currentRow === null && type === '2') {
      this.$XModal.message({ status: 'info', message: '请选中一行 列数据' })
      return
    }
    this.advanceType = type
    this.curColId = currentRow === null ? null : currentRow.guid
    this.curColType = currentRow === null ? null : currentRow.type
    this.advanceAttrVisible = !this.advanceAttrVisible
  },
  overview() {
    if (this.curDicInfoId === null || ['dicType', 'root'].includes(this.curDicInfoId.guid) || this.curDicInfoId.guid.startsWith('dicType')) {
      this.$XModal.message({ status: 'info', message: '请选择一条表格配置' })
      return
    }
    if (this.curDicInfoId.isfolder === '1') {
      this.$XModal.message({ status: 'info', message: '请选择底级报表' })
      return
    }
    this.overviewVisible = !this.overviewVisible
  },
  commonBtnClick(saveVisible) {
    this.saveVisible = saveVisible
    setTimeout(() => {
      this.rowDrop()
    }, 120)
    this.$emit('onBtnClick', saveVisible)
  },
  doInsert() {
    this.queryFormData = Object.assign({}, config('formConf', 'defaultConfig', 'queryFormData'), {
      guid: tools.getUuid(),
      fisalYear: this.$store.state.userInfo.year,
      orderNum: 1,
      dicType: 1,
      mofDivCode: this.$store.state.userInfo.province
    })
    if (this.curDicInfoId !== null && !this.isBlank(this.curDicInfoId.dicType)) {
      this.queryFormData.dicType = this.curDicInfoId.dicType
      if (!['dicType', 'dicType1', 'dicType2', 'dicType3', 'dicType4', 'root'].includes(this.curDicInfoId.guid) && Number(this.curDicInfoId.isfolder) === 1) {
        this.queryFormData.parentId = this.curDicInfoId.guid
        this.queryFormData.parentCode = this.curDicInfoId.dicCode
        this.queryFormData.parentName = this.curDicInfoId.dicName
      }
    }
    this.formValidationConfig = config('formConf', 'defaultConfig', 'validateConfig')
    this.tableCols = config('tableConf', 'defaultConfig', 'tableEditCols')
    this.modifyStatus = 'insert'
    this.clearAllData()
    this.commonBtnClick(true)
    // if (this.curDicInfoId !== null && this.curDicInfoId.isfolder === 0 && !['dicType', 'root'].includes(this.curDicInfoId.guid)) {
    //   this.$XModal.message({ status: 'warning', message: `您当前选择的[${this.curDicInfoId.dicName}]为叶子节点数据，无法新增子级配置！` })
    //
    // }
    // let queryFormItems = config('formConf', 'defaultConfig', 'queryFormItemEditConfig')
    // this.queryFormData = config('formConf', 'defaultConfig', 'queryFormData')
    // this.tableCols = config('tableConf', 'defaultConfig', 'tableEditCols')
    // this.tableData = []
    // if (this.curDicInfoId !== null) {
    //   this.queryFormData.dicType = this.curDicInfoId.dicType
    //   if (!['dicType', 'root'].includes(this.curDicInfoId.guid)) {
    //     this.queryFormData.parentId = this.curDicInfoId.guid
    //   } else if (this.curDicInfoId.guid === 'root') {
    //     queryFormItems.forEach(element => {
    //       if (element.field === 'dicType') {
    //         element.itemRender.props.disabled = true
    //       }
    //     })
    //   }
    // }
    // this.commonBtnClick(true)
  },
  doUpdate() {
    this.formValidationConfig = config('formConf', 'defaultConfig', 'validateConfig')
    this.tableCols = config('tableConf', 'defaultConfig', 'tableEditCols')
    this.modifyStatus = 'update'
    this.commonBtnClick(true)
  },
  doCopy() {
    if (this.dicInfoCode === '') {
      this.$XModal.message({ status: 'info', message: '请先 选择复制模版！' })
      return
    }
    this.formValidationConfig = config('formConf', 'defaultConfig', 'validateConfig')
    this.tableCols = config('tableConf', 'defaultConfig', 'tableEditCols')
    this.beforeCopyBasicInfoGuid = this.$refs.queryForm.getFormData().guid
    this.queryFormData = Object.assign({}, this.$refs.queryForm.getFormData(), {
      guid: tools.getUuid(),
      dicCode: ''
    })
    this.modifyStatus = 'copy'
    this.commonBtnClick(true)
  },
  doCancel({ refreshConfig }) {
    if (this.itemEditStatusConfig.curEditItem) {
      this.itemEditStatusConfig[this.itemEditStatusConfig.curEditItem] = false
      this.tableHeightConfig[this.itemEditStatusConfig.curEditItem] = '1000px'
      this.itemEditStatusConfig.curEditItem = ''
    }
    this.itemEditStatusConfig.curEditItem = false
    this.modifyStatus = ''
    this.clearAllData()
    this.tableCols = config('tableConf', 'defaultConfig', 'tableCols')
    this.$refs.queryForm.clearValidate()
    this.commonBtnClick(false)
    if (!refreshConfig) {
      refreshConfig = {}
      if (this.curDicInfoId.guid) {
        refreshConfig = {
          dicInfoId: this.curDicInfoId.guid,
          isleaf: this.curDicInfoId.isleaf
        }
      }
    }
    this.$emit('onRefersh', refreshConfig)
  },
  doSave() {
    let self = this
    let { editItems, editItemMap } = this.itemEditStatusConfig
    let curEditItem = null
    let ishaveItem = editItems.some((item) => {
      curEditItem = item
      return this.itemEditStatusConfig[item]
    })
    if (ishaveItem) {
      this.$XModal.message({ status: 'info', message: `请先结束 ${editItemMap[curEditItem]} 编辑` })
      return false
    }
    this.validate().then(() => {
      switch (self.modifyStatus) {
        case 'import':
          self.saveData()
          break
        case 'insert':
          self.saveData()
          break
        case 'copy':
          self.copyData()
          break
        case 'update':
          self.updateData()
      }
    })
  },
  clearAllData() {
    this.calculateConstraintConfigSource = {
      calcAndConstraintItemCodeField: 'itemCode',
      colFormulaConfig: { // 列公式配置
      },
      getDataConfig: { // 取数配置
      },
      rowCodeFormulaConfig: { },
      constraintConfig: { // 表间约束配置
      }
    }
    this.tableData = []
    this.tableTbodyColumns = []
    this.tableTbodyData = []
    this.getDataConfigTableConfig = { }
    this.getDataConfigColumns = []
    this.getDataConfigBodyData = []
    this.rowCodeFormulaConfigTableConfig = { }
    this.rowCodeFormulaConfigColumns = []
    this.rowCodeFormulaConfigBodyData = []
    this.constraintConfigTableConfig = { }
    this.constraintConfigColumns = []
    this.constraintConfigBodyData = []
  },
  rowDrop() {
    let self = this
    let orginSort = []
    this.$nextTick(() => {
      const xTable = this.$refs.bsTableRef.$refs.xGrid
      this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
        handle: '.drag-btn-custom',
        chosenClass: 'td-sortable-chosen',
        animation: 180,
        delay: 60,
        sort: true,
        dataIdAttr: 'data-rowid',
        onStart: (data) => {
          orginSort = extend(true, [], self.sortable.toArray())
          console.log(orginSort)
        },
        onEnd: ({ newIndex, oldIndex }) => {
          self.sortable.sort(orginSort, true)
          if (newIndex === oldIndex) {
            return self.$XModal.message({ status: 'warning', message: '未移动任何列！' })
          }
          let rows = self.$refs.bsTableRef.getPureTableData().fullData
          SequenceGenerator.moveRowStep(rows, 'orderNum', oldIndex, newIndex).then(res => {
            self.tableData = [...res]
          }).catch(e => {
            return self.$XModal.message({ status: 'error', message: e.message })
          })
        }
      })
    })
  },
  validate() {
    let isFolder = this.$refs.queryForm.getFormData().isfolder
    if (isFolder === '1') {
      return this.$refs.queryForm.validate()
    } else {
      let tableTbodyValid = this.$refs.bsTableTbodyRef.validate()
      let tableValid = this.$refs.bsTableRef.validate()
      let formValid = this.$refs.queryForm.validate()
      let tableFormValid = this.tableFormValidate()
      return Promise.all([formValid, tableValid, tableFormValid, tableTbodyValid])
    }
  },
  tableFormValidate() {
    let self = this
    return new Promise((resolve, reject) => {
      let formData = self.$refs.queryForm.getFormData()
      let tableData = self.$refs.bsTableRef.getPureTableData().fullData
      if (formData.isfolder === '0') {
        if (tableData.length === 0) {
          self.$XModal.message({ status: 'warning', message: '需填写列信息！' })
          reject(new Error('需填写列信息！'))
        }
      }
      resolve()
    })
  },
  onFormItemChange({ $form, property, itemValue, data }, bsform) {
    switch (property) {
      case 'isfolder':
        if (itemValue === '1') {
          this.btmVisible = false
        } else {
          this.btmVisible = true
        }
        break
      case 'dicType':
        if (itemValue === '4') {
          this.childrenRowVisible = false
        } else {
          this.childrenRowVisible = true
        }
        break
      default:
    }
  },
  delTableDesignConfig() {
    if (this.curDicInfoId === null || ['dicType', 'root'].includes(this.curDicInfoId.guid) || this.curDicInfoId.guid.startsWith('dicType')) {
      this.$XModal.message({ status: 'info', message: '当前未选中表' })
      return
    }
    if (!this.curDicInfoId.isleaf || this.curDicInfoId.isleaf === '0') {
      this.$XModal.message({ status: 'warning', message: '请选择底级报表进行删除' })
      return
    }
    let msg = `您确定要删除该报表配置[${this.curDicInfoId.dicName}]的所有数据吗?`
    this.$XModal.confirm(msg).then(type => {
      if (type === 'confirm') {
        let loading = this.$loading({
          lock: true,
          text: '正在删除中...请您稍候',
          spinner: 'ri-loader-4-line roll',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.handleHttpMethod(/* this.getBasDicGroupformulaByDicId(this.curDicInfoId.guid)).then((res) => {
          if (res) {
            if (res.data) {
              loading.close()
              this.$XModal.message({ status: 'success', message: ' 该报表已使用不能删除 !' })
            } else {
              this.handleHttpMethod(this.delAllDicInfo(this.curDicInfoId.guid)).then((delRes) => {
                if (delRes) {
                  this.$XModal.message({ status: 'success', message: '删除成功!' })
                  let refreshConfig = {
                    isleaf: '1',
                    isAfterDel: true
                  }
                  this.$emit('onRefersh', refreshConfig)
                }
                loading.close()
              })
            }
          }
          loading.close()
        } */
          this.delAllDicInfo(this.curDicInfoId.guid)).then((delRes) => {
          if (delRes) {
            this.$XModal.message({ status: 'success', message: '删除成功!' })
            let refreshConfig = {
              isleaf: '1',
              isAfterDel: true
            }
            this.$emit('onRefersh', refreshConfig)
          }
          loading.close()
        })
      }
    })
  },
  fixedCol(obj) {
    let val = obj.value
    let tableColsCp = extend(true, [], this.tableCols)
    for (let i = 0; i < tableColsCp.length; i++) {
      if (i < val) {
        tableColsCp[i].fixed = 'left'
      } else {
        tableColsCp[i].fixed = undefined
      }
    }
    this.tableCols = tableColsCp
  },
  insertRow() {
    let rows = this.$refs.bsTableRef.getPureTableData().fullData
    let orderNum = SequenceGenerator.getOrderNum(rows, 'orderNum')
    let type = this.$refs.queryForm.getFormData().dicType
    // let currentRow = this.$refs.bsTableRef.tableOptionFn().getCurrentRecord()
    let row = {
      data: {
        orderNum: orderNum,
        visible: 1,
        required: 0,
        editable: 1,
        disabled: 1,
        align: 'left',
        sortable: 0,
        type: '$vxeInput',
        isparentrow: false,
        isExportCol: '1',
        width: 180
      }
    }
    // if (currentRow && currentRow !== null) {
    //   row.rowIndexTo = currentRow
    // }
    // debugger
    if (type && type === '4') {
      row.data.width = 4
    }
    this.tableIndex++
    this.$refs.bsTableRef.insertRowData(row)
    rows = this.$refs.bsTableRef.getPureTableData().fullData
    let sortedRows = SequenceGenerator.sortRows(rows, 'orderNum')
    this.tableData = extend(true, [], sortedRows)
  },
  insertChildRow() {
    let currRow = this.$refs.bsTableRef.tableOptionFn().getCurrentRecord()
    if (currRow === null) {
      this.$XModal.message({ status: 'info', message: '请选中父行！' })
      return
    }
    let rows = this.$refs.bsTableRef.getPureTableData().fullData
    let orderNum = SequenceGenerator.getOrderNum(rows, 'orderNum', currRow)
    let row = {
      data: {
        orderNum: orderNum,
        visible: 1,
        required: 0,
        editable: 1,
        disabled: 1,
        align: 'left',
        sortable: 0,
        type: '$vxeInput',
        isparentrow: false,
        isExportCol: '1',
        width: 180
      }
    }
    this.tableIndex++
    this.$refs.bsTableRef.insertRowData(row)
    rows = this.$refs.bsTableRef.getPureTableData().fullData
    let sortedRows = SequenceGenerator.sortRows(rows, 'orderNum')
    this.tableData = extend(true, [], sortedRows)
    let self = this
    setTimeout(() => {
      self.$refs.bsTableRef.tableOptionFn().setCurrentRow(currRow)
    }, 120)
  },
  delRow() {
    let rows = this.$refs.bsTableRef.getPureTableData().fullData
    let currRow = this.$refs.bsTableRef.tableOptionFn().getCurrentRecord()
    if (currRow === null) {
      this.$XModal.message({ status: 'info', message: '请选中要删除的行记录！' })
      return
    }
    let resData = SequenceGenerator.delRow(currRow, rows, 'orderNum')
    if (resData) {
      this.tableData = resData
    } else {
      this.$XModal.message({ status: 'info', message: '请先删除子级记录！' })
    }
  },
  moveRowUp() {
    let rows = this.$refs.bsTableRef.getPureTableData().fullData
    let currRow = this.$refs.bsTableRef.tableOptionFn().getCurrentRecord()
    if (currRow === null) {
      this.$XModal.message({ status: 'info', message: '请选中要移动的行记录！' })
      return
    }
    this.tableData = SequenceGenerator.moveRow(rows, 'orderNum', currRow, true)
    // let selections = this.$refs.bsTableRef.tableOptionFn().getCurrentRecord()
    // if (selections !== null) {
    //   this.currentRow = selections
    // } else {
    //   this.$refs.bsTableRef.tableOptionFn().setCurrentRow(this.currentRow)
    //   selections = this.currentRow
    // }
    // if (selections !== null) {
    //   let tableData = this.$refs.bsTableRef.getPureTableData().fullData
    //   let tableIndex = -1
    //   for (let index = 0; index < tableData.length; index++) {
    //     if (tableData[index]._XID === selections._XID) {
    //       tableIndex = index
    //     }
    //   }
    //   if (tableIndex !== -1 && tableIndex > 0) {
    //     let temp = tableData[tableIndex - 1]
    //     this.$set(tableData, tableIndex - 1, tableData[tableIndex])
    //     this.$set(tableData, tableIndex, temp)
    //     this.tableData = tableData
    //   }
    //   if (tableIndex === -1) {
    //     this.$XModal.message({ status: 'info', message: '请选择移动行！' })
    //   }
    // } else {
    //   this.$XModal.message({ status: 'info', message: '请选择移动行！' })
    // }
  },
  moveRowDown() {
    let rows = this.$refs.bsTableRef.getPureTableData().fullData
    let currRow = this.$refs.bsTableRef.tableOptionFn().getCurrentRecord()
    if (currRow === null) {
      this.$XModal.message({ status: 'info', message: '请选中要移动的行记录！' })
      return
    }
    this.tableData = SequenceGenerator.moveRow(rows, 'orderNum', currRow, false)
    // let selections = this.$refs.bsTableRef.tableOptionFn().getCurrentRecord()
    // if (selections !== null) {
    //   this.currentRow = selections
    // } else {
    //   this.$refs.bsTableRef.tableOptionFn().setCurrentRow(this.currentRow)
    //   selections = this.currentRow
    // }
    // if (selections !== null) {
    //   let tableData = this.$refs.bsTableRef.getPureTableData().fullData
    //   let tableIndex = -1
    //   for (let index = 0; index < tableData.length; index++) {
    //     if (tableData[index]._XID === selections._XID) {
    //       tableIndex = index
    //     }
    //   }
    //   if (tableIndex !== -1 && tableIndex < tableData.length - 1) {
    //     let temp = tableData[tableIndex + 1]
    //     this.$set(tableData, tableIndex + 1, tableData[tableIndex])
    //     this.$set(tableData, tableIndex, temp)
    //     this.tableData = tableData
    //   }
    //   if (tableIndex === -1) {
    //     this.$XModal.message({ status: 'info', message: '请选择移动行！' })
    //   }
    // } else {
    //   this.$XModal.message({ status: 'info', message: '请选择移动行！' })
    // }
  },
  onSplitPaneResize(leftWidth) {
    if (leftWidth > 1) {
      this.curSplitPaneTopWidth = leftWidth
      this.topVisible = true
    } else {
      this.topVisible = false
    }
    if (this.itemEditStatusConfig.curEditItem) {
      this.tableHeightConfig[this.itemEditStatusConfig.curEditItem] = (this.$refs.tableDesignboxRef.offsetHeight - 50) + 'px'
    }
  },
  onSplitPaneClick() {
  }
}

/**
 * 数据方法（AJAX）
 */
const dataMethods = {
  doing() {
    this.$XModal.message({ status: 'info', message: '开发中，敬请期待' })
  },
  delCache() {
    this.handleHttpMethod(this.delCacheApi()).then(res => {
      if (res) {
        this.$XModal.message({ status: 'success', message: res.data })
      }
    })
  },
  setCalculateConstraintConfigSource({ basicInfo = {}, columns = [], cellsConfig = [], cellsConstraint = [], tableBody = [], basDicAttrDTOS = {} }) {
    let rowCodeFormulaConfig = {}
    let getDataConfig = {}
    let constraintConfig = {}
    // inputType：0 录入1 提取 2 计算 4 约束

    cellsConfig.forEach((cell) => {
      if (cell.inputType === 1) {
        getDataConfig[cell.itemCode + ':' + cell.colField] = cell
      } else if (cell.inputType === 2) {
        rowCodeFormulaConfig[cell.itemCode + ':' + cell.colField] = cell
      } else if (cell.inputType === 3) {
        // constraintConfig[cell.itemCode + ':' + cell.colField] = cell
      } else if (cell.inputType === 4) {
        constraintConfig[cell.itemCode + ':' + cell.colField] = cell
      } else {
      }
    })
    this.calculateConstraintConfigSource = {
      calcAndConstraintItemCodeField: this.$refs.queryForm.getFormData().rowCoordFieldName || 'itemCode',
      rowCodeFormulaConfig,
      getDataConfig,
      constraintConfig
    }
  },
  getCellConfigSaveData() {
    let cellsConfig = []
    let { rowCodeFormulaConfig, getDataConfig, constraintConfig } = this.calculateConstraintConfigSource
    tools.each(getDataConfig, (key, value) => {
      if (value.formula) {
        cellsConfig.push(value)
      }
    })
    tools.each(rowCodeFormulaConfig, (key, value) => {
      if (value.formula) {
        cellsConfig.push(value)
      }
    })
    tools.each(constraintConfig, (key, value) => {
      if (value.formula) {
        cellsConfig.push(value)
      }
    })
    return cellsConfig
  },
  setData(obj, isleaf) {
    // let { basicInfo = {}, itemsConfig = [], constraintsConfig:[], valueConfig: [], data = [], basDicAttrDTOS = {} } = obj
    this.setCalculateConstraintConfigSource(obj)
    let { basicInfo = {}, columns = [], cellsConfig = [], tableBody = [] } = obj
    this.cellsConfig = cellsConfig
    this.queryFormData = tools.deepCopy(basicInfo)
    let tableData = tools.deepCopy(columns)
    this.tableData = SequenceGenerator.sortRows(tableData, 'orderNum')
    this.tableTbodyData = tableBody
    this.tableTbodyColumns = utils.getRenderDataBylist(columns, 'orderNum', true)
    this.theadRenderLevels = utils.getTheadRenderLeves(columns, 'orderNum', true)
    this.$nextTick(() => {
      this.setCellConfigColumnRender(this.tableTbodyColumns)
      this.setCellConfigBodyDataRender(this.tableTbodyColumns, tableBody)
    })
    this.curDicInfoId = null
    if (basicInfo.guid) {
      this.curDicInfoId = {
        guid: basicInfo.guid,
        isfolder: basicInfo.isfolder,
        isleaf: isleaf,
        dicName: basicInfo.dicName,
        dicCode: basicInfo.dicCode,
        dicType: basicInfo.dicType
      }
    }
  },
  saveAllDicInfo(params) {
    return post('bisConfig/config/basDicInfo/saveAllDicInfo', params)
  },
  saveData() {
    let self = this
    let basicInfo = this.$refs.queryForm.getFormData()
    let columns = this.getSaveColumns(this.$refs.bsTableRef.getPureTableData().fullData)
    let tbody = tools.getSaveTbodyData(this.$refs.bsTableTbodyRef.getPureTableData().fullData, this.$refs.queryForm.getFormData().rowCoordFieldName || 'itemCode')
    let attrs = []
    let loading = this.$loading({
      lock: true,
      text: '正在保存中...请您稍候',
      spinner: 'ri-loader-4-line roll',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.handleHttpMethod(this.saveAllDicInfo(
      // basicInfo: basicInfo,
      // columns: columns,
      // cellsConfig: [],
      // tableBody: tbody,
      // cellsConstraint: [],
      // basDicAttrDTOS: attrs
      {
        ...basicInfo,
        attrs: attrs,
        cols: columns,
        tableBody: tbody,
        cellsConfig: self.getCellConfigSaveData()
      }
    )).then(res => {
      if (res) {
        this.modifyStatus = ''
        this.$XModal.message({ status: 'success', message: '保存成功' })
        let refreshConfig = {
          dicInfoId: res.data,
          isleaf: '1',
          needRefreshTree: true
        }
        this.doCancel({ refreshConfig })
      }
      loading.close()
    })
  },
  updateData() {
    let self = this
    let basicInfo = this.$refs.queryForm.getFormData()
    let columns = this.getSaveColumns(this.$refs.bsTableRef.getPureTableData().fullData)
    let tbody = tools.getSaveTbodyData(this.$refs.bsTableTbodyRef.getPureTableData().fullData, this.$refs.queryForm.getFormData().rowCoordFieldName || 'itemCode')
    let attrs = []
    let loading = this.$loading({
      lock: true,
      text: '正在保存中...请您稍候',
      spinner: 'ri-loader-4-line roll',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.handleHttpMethod(this.updateAllDicInfo({
      ...basicInfo,
      attrs: attrs,
      cols: columns,
      tableBody: tbody,
      cellsConfig: self.getCellConfigSaveData()
    })).then(res => {
      if (res) {
        this.modifyStatus = ''
        this.$XModal.message({ status: 'success', message: '保存成功' })
        let refreshConfig = {
          dicInfoId: res.data,
          isleaf: '1',
          needRefreshTree: true
        }
        this.doCancel({ refreshConfig })
      }
      loading.close()
    })
  },
  getSaveColumns(data) {
    return data.map((column, index) => {
      return Object.assign(column, { dicId: this.$refs.queryForm.getFormData().guid })
    })
  },
  copyData() {
    let self = this
    let basicInfo = this.$refs.queryForm.getFormData()
    let columns = this.getSaveColumns(this.$refs.bsTableRef.getPureTableData().fullData)
    let tbody = this.$refs.bsTableTbodyRef.getPureTableData().fullData
    let attrs = []
    let loading = this.$loading({
      lock: true,
      text: '正在保存中...请您稍候',
      spinner: 'ri-loader-4-line roll',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.handleHttpMethod(this.copyAllDicInfo({
      ...basicInfo,
      attrs: attrs,
      cols: columns,
      tableBody: tbody,
      cellsConfig: self.getCellConfigSaveData()
    })).then(res => {
      if (res) {
        this.modifyStatus = ''
        this.$XModal.message({ status: 'success', message: '保存成功' })
        let refreshConfig = {
          dicInfoId: res.data,
          isleaf: '1',
          needRefreshTree: true
        }
        this.doCancel({ refreshConfig })
      }
      loading.close()
    })
  },

  delAllDicInfo(dicInfoId) {
    return del(`bisConfig/config/basDicInfo?dicInfoId=${dicInfoId}`)
  },
  delCacheApi() {
    return get('bisConfig/config/report/delBossReportConfigCache')
  },
  getBasDicGroupformulaByDicColId(dicColId) {
    // 获取在bas_dic_info中与guid相同
    return get(`bisProject/project/basDicGroupformula/getBasDicGroupformulaByDicColId?dicColId=${dicColId}`)
  },
  getBasDicGroupformulaByDicId(dicId) {
    // 获取在bas_dic_info中与guid相同
    return get(`bisProject/project/basDicGroupformula/getBasDicGroupformulaByDicId?dicId=${dicId}`)
  },
  updateAllDicInfo(param) {
    if (this.isBlank(param.parentCode)) {
      param.parentId = '0'
    }
    return post('bisConfig/config/basDicInfo/updateAllDicInfo', param)
  },
  copyAllDicInfo(param) {
    if (this.isBlank(param.parentCode)) {
      param.parentId = '0'
    }
    return post('bisConfig/config/basDicInfo/copyAllDicInfo', param)
  }
}

/**
 * 校验方法（表单、表格）
 */
const validateMethods = {
  isBlank(value) {
    return (value === undefined || value === null || value === '')
  }
}

const newAddFunction = {
  doImport() { // 新增导入配置
    this.queryFormData = Object.assign({}, config('formConf', 'defaultConfig', 'queryFormData'), {
      isDeleted: '0',
      guid: tools.getUuid(),
      fisalYear: this.$store.state.userInfo.year,
      orderNum: 1,
      dicType: 1,
      mofDivCode: this.$store.state.userInfo.province
    })
    if (this.curDicInfoId !== null && !this.isBlank(this.curDicInfoId.dicType)) {
      this.queryFormData.dicType = this.curDicInfoId.dicType
      if (!['dicType', 'dicType1', 'dicType2', 'dicType3', 'dicType4', 'root'].includes(this.curDicInfoId.guid) && Number(this.curDicInfoId.isfolder) === 1) {
        this.queryFormData.parentId = this.curDicInfoId.guid
        this.queryFormData.parentCode = this.curDicInfoId.dicCode
        this.queryFormData.parentName = this.curDicInfoId.dicName
      }
    }
    this.formValidationConfig = config('formConf', 'defaultConfig', 'validateConfig')
    this.tableCols = config('tableConf', 'defaultConfig', 'tableEditCols')
    this.clearAllData()
    this.modifyStatus = 'import'
    this.commonBtnClick(true)
  },
  performImportTbody() { // 执行导入
    let self = this
    if (this.itemEditStatusConfig.curEditItem === 'basicInfoEditConfig') {
      this.$XModal.message({ status: 'info', message: '请先结束 报表基础信息和配置 的编辑后再导入' })
      return
    }
    this.$refs.queryForm.validate().then(() => {
      if (this.currentNode) {
        this.$XModal.message({ status: 'info', message: '请先选导入的父表！' })
      }
      // 调用示例
      this.$BsFcUtil.importTable({
        content: '',
        importConfig: {
          downloadSample: true,
          columns: self.tableTbodyColumns,
          theadDefaultData: {
            visible: 1,
            required: 0,
            editable: 1,
            disabled: 0,
            align: 'left',
            sortable: 0,
            isExportCol: 1,
            isparentrow: false,
            width: 250,
            clearable: 1
          }
        },
        downloadSample() {

        },
        reSetConfig(config) {
          let columns = self.$refs.bsTableRef.getPureTableData().fullData
          if (!config.importThead) {
            config.columns = utils.getRenderDataBylist(columns, 'orderNum', true)
          }
          return config
        },
        importSuccess({ importUtil, curImportConfig, filename, name, excelDataMap, firstSheetData, excelDataArray }) {
          let { importTbody, importThead } = curImportConfig
          let { tbody, theadList, theadLevel } = firstSheetData
          if (importThead) {
            self.theadLevels = theadLevel
            self.tableData = theadList
            self.theadRenderlevels = utils.getTheadRenderLeves(theadList, 'orderNum', true)
          }
          if (importTbody) {
            self.tableTbodyData = tbody
            self.tableTbodyColumns = utils.getRenderDataBylist(theadList, 'orderNum', true)
            self.setCellConfigColumnRender(self.tableTbodyColumns)
            self.setCellConfigBodyDataRender(self.tableTbodyColumns, tbody)
          }
        },
        cancel() {

        }
      })
    }).catch(() => {
      this.$XModal.message({ status: 'info', duration: 10000, message: '请先完成 报表基础信息和配置 的编辑' })
    })
  },
  performImport() { // 执行导入
    let self = this
    if (this.itemEditStatusConfig.curEditItem === 'basicInfoEditConfig') {
      this.$XModal.message({ status: 'info', message: '请先结束 报表基础信息和配置 的编辑后再导入' })
      return
    }
    this.$refs.queryForm.validate().then(() => {
      if (this.currentNode) {
        this.$XModal.message({ status: 'info', message: '请先选导入的父表！' })
      }
      // 调用示例
      this.$BsFcUtil.importTable({
        content: '',
        importConfig: {
          downloadSample: false,
          columns: self.tableTbodyColumns,
          theadDefaultData: {
            visible: 1,
            required: 0,
            editable: 1,
            disabled: 0,
            align: 'left',
            sortable: 0,
            isExportCol: 1,
            isparentrow: false,
            width: 250,
            clearable: 1
          }
        },
        reSetConfig(config) {
          let columns = self.$refs.bsTableRef.getPureTableData().fullData
          if (!config.importThead) {
            config.columns = utils.getRenderDataBylist(columns, 'orderNum', true)
          }
          return config
        },
        importSuccess({ importUtil, curImportConfig, filename, name, excelDataMap, firstSheetData, excelDataArray }) {
          let { importTbody, importThead } = curImportConfig
          let { tbody, theadList, theadLevel } = firstSheetData
          if (importThead) {
            self.theadLevels = theadLevel
            self.tableData = theadList
            self.theadRenderlevels = utils.getTheadRenderLeves(theadList, 'orderNum', true)
          }
          if (importTbody) {
            self.tableTbodyData = tbody
            self.tableTbodyColumns = utils.getRenderDataBylist(theadList, 'orderNum', true)
            self.setCellConfigColumnRender(self.tableTbodyColumns)
            self.setCellConfigBodyDataRender(self.tableTbodyColumns, tbody)
          }
        },
        cancel() {

        }
      })
    }).catch(() => {
      this.$XModal.message({ status: 'info', duration: 10000, message: '请先完成 报表基础信息和配置 的编辑' })
    })
  },
  onTabClick(obj) { // getData
    this.curSelectTbodyCellInfo = null
    this.defaultSelect = obj
  },
  getTableTheadData(data) {

  },
  insertTbodyRow(editItem) { // 新增行
    let bsTable = this.$refs.bsTableTbodyRef
    bsTable.insertRowData()
    // let sortData = utils.getSortDataList(bsTable.getPureTableData().fullData, nestCodeKey)
    // let nestCodeKey = 'itemCode'
    // bsTable.insertRowData({
    //   data: {
    //     [nestCodeKey]: String(+sortData[sortData.length - 1][nestCodeKey] + 1).padStart(sortData[sortData.length - 1][nestCodeKey].length, '0')
    //   }
    // })
  },
  // insertTbodyChildRow() { // 新增子行
  //   let bsTable = this.$refs.bsTableTbodyRef
  //   let xGrid = bsTable.tableOptionFn()
  //   let curSelectRow = xGrid.getCurrentRecord()
  //   let { inserToIndex, insertData } = utils.getInsertCildrenData(bsTable.getPureTableData().fullData, curSelectRow, 'itemCode')
  //   bsTable.insertRowData({
  //     rowIndexTo: inserToIndex,
  //     data: insertData
  //   })
  // },
  delTbodyRow(editItem) { // 删除行
    let xGrid = this.$refs.bsTableTbodyRef.tableOptionFn()
    let curSelectRow = xGrid.getCheckboxRecords(true)
    if (curSelectRow.length) {
      xGrid.remove(curSelectRow)
    } else {
      this.$XModal.message({ status: 'error', message: '当前未选中数据，请选中底级进行删除' })
    }
  },
  configDynamicTbodyRow(editItem) {
    this.dynamicTbodyDialogVisible = true
  },
  configDynamicTbodySureClick() {

  },
  doConfigColFormula() { // 配置列公式

  },

  onTheadCellClick({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode, $event }) {

  },

  viewConfig(type) {
    switch (type) {
      case 'rowCodeFormulaConfig': // 查看单元格计算配置
        break
      case 'getDataConfig':// 查看单元格取数配置
        break
      case 'constraintConfig':// 查看约束配置
        break
      case 'colFormulaConfig': // 查看列公式
        break
      case 'advanceAttr':// 查看高级属性
        this.advanceAttr('1')
        break
    }
    // switch (type) {
    //   case 'rowCodeFormulaConfig': // 查看单元格计算配置
    //     break
    //   case 'getDataConfig':// 查看单元格取数配置
    //     break
    //   case 'constraintConfig':// 查看约束配置
    //     break
    //   case 'colFormulaConfig': // 查看列公式
    //     break
    //   case 'advanceAttr':// 查看高级属性
    //     break
    // }
    // let titleMap = {
    //   rowCodeFormulaConfig: '单元格计算配置',
    //   getDataConfig: '单元格取数配置',
    //   constraintConfig: '约束配置',
    //   colFormulaConfig: '列公式',
    //   advanceAttr: '高级属性'
    // }

    // this.viewGetDataOrFormulaConfig = {
    //   title: titleMap[type],
    //   type
    // }
    // this.configBasicInfo = this.$refs.queryForm.getFormData()
    // this.configCellFormulaTableTbodyColumns = this.tableTbodyColumns
    // this.configCellFormulaTableTbodyData = this.$refs.bsTableTbodyRef.getPureTableData().fullData
    // this.viewGetDataOrFormulaDialogVisible = true
    // this.$XModal.message({ status: 'info', message: '开发中，敬请期待' })
  },
  refreshConfig() {
    return new Promise((resolve, reject) => {
    })
  },
  doRefreshConfig() {
    this.refreshConfig().then(() => {
      this.$XModal.message({ status: 'info', message: '配置已经刷新' })
    })
  },
  toggleEditStatus(itemEditable) {
    this.curSelectTbodyCellInfo = null
    let curEditItem = null
    let { editItems, editItemMap, editConfigItems } = this.itemEditStatusConfig
    let ishaveItem = editItems.some((item) => {
      curEditItem = item
      return this.itemEditStatusConfig[item]
    })
    if (!this.itemEditStatusConfig[itemEditable]) {
      if (ishaveItem) {
        this.$XModal.message({ status: 'info', message: `请先完成并退出 ${editItemMap[curEditItem]} 编辑` })
        return false
      }
      if (itemEditable === 'basicInfoEditConfig') {
        this.beforeCopyBasicInfo = Object.assign({}, this.$refs.queryForm.getFormData(), { guid: this.beforeCopyBasicInfoGuid })
        this.itemEditStatusConfig.curEditItem = itemEditable
        this.itemEditStatusConfig[itemEditable] = this.itemEditStatusConfig[itemEditable + 'Editing']
      } else {
        this.$refs.queryForm.validate().then(() => {
          this.itemEditStatusConfig.curEditItem = itemEditable
          this.tableHeightConfig[itemEditable] = (this.$refs.tableDesignboxRef.offsetHeight - 40) + 'px'
          this.itemEditStatusConfig[itemEditable] = this.itemEditStatusConfig[itemEditable + 'Editing']
          if (itemEditable === 'tableTheadEditConfig') {

          }
          if (editConfigItems.indexOf(itemEditable) >= 0) {
            this.$refs.bsTableTbodyRef.validate().then(() => {
              this.$XModal.message({ status: 'warning', duration: 30000, message: '填报报表及配置请注意实际执行顺序：提取-->行内计算-->分级汇总-->父级行内计算-->单元格交叉计算-->行约束-->单元格约束' })
            }).catch(() => {
              this.itemEditStatusConfig.curEditItem = ''
              this.itemEditStatusConfig[itemEditable] = false
              this.tableHeightConfig[itemEditable] = '1000px'
              this.itemEditStatusConfig.curEditItem = 'tableTbodyEditConfig'
              this.itemEditStatusConfig['tableTbodyEditConfig'] = this.itemEditStatusConfig['tableTbodyEditConfig' + 'Editing']
              this.tableHeightConfig['tableTbodyEditConfig'] = (this.$refs.tableDesignboxRef.offsetHeight - 40) + 'px'
              this.$XModal.message({ status: 'warning', duration: 10000, message: '请核查并完善 表体配置！' })
            })
          }
        }).catch(e => {
          this.toggleEditStatus('basicInfoEditConfig')
          this.$XModal.message({ status: 'info', duration: 10000, message: '请先完成 报表基础信息和配置 录入' })
        })
      }
    } else {
      this.$refs.queryForm.validate().then(() => {
        if (curEditItem === 'tableTheadEditConfig') {
          this.$refs.bsTableRef.validate().then(() => {
            this.itemEditStatusConfig.curEditItem = ''
            this.itemEditStatusConfig[itemEditable] = false
            this.tableHeightConfig[itemEditable] = '1000px'
            this.updataOtherItemConfig(itemEditable)
          }).catch(() => {
            this.$XModal.message({ status: 'warning', duration: 10000, message: '请核查并完善 表头配置！' })
          })
        } else if (curEditItem === 'tableTbodyEditConfig') {
          this.$refs.bsTableTbodyRef.validate().then(() => {
            this.itemEditStatusConfig.curEditItem = ''
            this.itemEditStatusConfig[itemEditable] = false
            this.tableHeightConfig[itemEditable] = '1000px'
            this.updataOtherItemConfig(itemEditable)
          }).catch(() => {
            this.$XModal.message({ status: 'warning', duration: 10000, message: '请核查并完善 表体配置！' })
          })
        } else {
          this.itemEditStatusConfig.curEditItem = ''
          this.itemEditStatusConfig[itemEditable] = false
          this.tableHeightConfig[itemEditable] = '1000px'
          this.updataOtherItemConfig(itemEditable)
        }
      }).catch(e => {
        this.$XModal.message({ status: 'info', duration: 10000, message: '请先完成 报表基础信息和配置 录入' })
      })
    }
  },
  updataOtherItemConfig(curEditItem) {
    let columns = this.$refs.bsTableRef.getPureTableData().fullData
    let tableBody = this.$refs.bsTableTbodyRef.getPureTableData().fullData
    switch (curEditItem) {
      case 'basicInfoEditConfig': // 表头配置
        this.configBasicInfo = this.$refs.queryForm.getFormData()
        this.$refs.bsTableRef.getPureTableData().fullData.forEach((row) => {
          row.dicId = this.configBasicInfo.guid
        })
        this.updataCellsConfig(this.configBasicInfo, this.beforeCopyBasicInfo)
        this.setCellConfigColumnRender(this.tableTbodyColumns)
        this.setCellConfigBodyDataRender(this.tableTbodyColumns, tableBody)
        break
      case 'tableTheadEditConfig': // 表头配置
        this.tableTbodyColumns = utils.getRenderDataBylist(columns, 'orderNum', true)
        this.theadRenderLevels = utils.getTheadRenderLeves(columns, 'orderNum', true)
        this.tableTbodyData = tableBody
        this.setCellConfigColumnRender(this.tableTbodyColumns)
        this.setCellConfigBodyDataRender(this.tableTbodyColumns, tableBody)
        break
      case 'tableTbodyEditConfig': // 表体配置
        this.tableTbodyColumns = utils.getRenderDataBylist(columns, 'orderNum', true)
        this.theadRenderLevels = utils.getTheadRenderLeves(columns, 'orderNum', true)
        this.setCellConfigColumnRender(this.tableTbodyColumns)
        this.setCellConfigBodyDataRender(this.tableTbodyColumns, tableBody)
        break
      case 'getDataConfigEditConfig': // 表体单元格取数配置
        break
      case 'rowCodeFormulaConfigEditConfig': // 表体单元格公式配置
        break
      case 'constraintConfigEditConfig': // 表体单元格约束配置
        break
    }
  },
  updataCellsConfig(configBasicInfo, beforeCopyBasicInfo) {
    let { rowCodeFormulaConfig, constraintConfig } = this.calculateConstraintConfigSource
    tools.each(rowCodeFormulaConfig, (key, value) => {
      if (beforeCopyBasicInfo.guid && configBasicInfo.guid) {
        value.formula = String(value.formula).replace(new RegExp(beforeCopyBasicInfo.guid, 'ig'), configBasicInfo.guid)
        if (beforeCopyBasicInfo.dicName && configBasicInfo.dicName) {
          value.formulaCn = String(value.formulaCn).replace(new RegExp(beforeCopyBasicInfo.dicName, 'ig'), configBasicInfo.dicName)
        }
      }
    })
    tools.each(constraintConfig, (key, value) => {
      if (beforeCopyBasicInfo.guid && configBasicInfo.guid) {
        value.formula = value.formula.replace(new RegExp(beforeCopyBasicInfo.guid, 'ig'), configBasicInfo.guid)
        if (beforeCopyBasicInfo.dicName && configBasicInfo.dicName) {
          value.formulaCn = String(value.formulaCn).replace(new RegExp(beforeCopyBasicInfo.dicName, 'ig'), configBasicInfo.dicName)
        }
      }
    })
  },
  setCellConfigColumnRender(columns) {
    let columnsCp = utils.getViewDataConfigRenderColumns(tools.deepCopy(columns))
    this.getDataConfigColumns = tools.deepCopy(columnsCp)
    this.rowCodeFormulaConfigColumns = tools.deepCopy(columnsCp)
    this.constraintConfigColumns = tools.deepCopy(columnsCp)
  },
  setCellConfigBodyDataRender(columns, data, type) {
    let { lowestLevelArr } = utils.generateTheadLowestLevel(columns, 'orderNum')
    let dataCp = utils.addMissField(data, lowestLevelArr)
    if (type) {
      this[type + 'BodyData'] = utils.getCellConfigBodyDataRenderSingle(dataCp, this.calculateConstraintConfigSource[type], this.calculateConstraintConfigSource.calcAndConstraintItemCodeField)
    } else {
      this.getDataConfigBodyData = utils.getCellConfigBodyDataRenderSingle(dataCp, this.calculateConstraintConfigSource['getDataConfig'], this.calculateConstraintConfigSource.calcAndConstraintItemCodeField)
      this.rowCodeFormulaConfigBodyData = utils.getCellConfigBodyDataRenderSingle(dataCp, this.calculateConstraintConfigSource['rowCodeFormulaConfig'], this.calculateConstraintConfigSource.calcAndConstraintItemCodeField)
      this.constraintConfigBodyData = utils.getCellConfigBodyDataRenderSingle(dataCp, this.calculateConstraintConfigSource['constraintConfig'], this.calculateConstraintConfigSource.calcAndConstraintItemCodeField)
    }
  },
  onCellConfigTbodycellClick({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode, $event }, context, type) {
    if (this.itemEditStatusConfig[type]) {
      this.curSelectTbodyCellInfo = {
        column: column,
        row: row,
        colField: column.property,
        colTitle: column.title,
        itemCode: row[this.calculateConstraintConfigSource.calcAndConstraintItemCodeField],
        itemName: row['itemName']
      }
    } else {
      this.curSelectTbodyCellInfo = null
    }
  },
  deleteCellConfig(type) {
    if (this.curSelectTbodyCellInfo) {
      let { row, column } = this.curSelectTbodyCellInfo
      let colField = column.property
      let { getDataConfig, rowCodeFormulaConfig, constraintConfig } = this.calculateConstraintConfigSource
      let itemCode = row[this.calculateConstraintConfigSource.calcAndConstraintItemCodeField]
      if (type === 'rowCodeFormulaConfigEditConfig') {
        if (rowCodeFormulaConfig[itemCode + ':' + colField]) {
          row[colField] = ''
          delete rowCodeFormulaConfig[itemCode + ':' + colField]
        } else {
          this.$XModal.message({ duration: 10000, status: 'info', message: '当前单元格没有配置单元格计算' })
        }
      } else if (type === 'getDataConfigEditConfig') {
        if (getDataConfig[itemCode + ':' + colField]) {
          row[colField] = ''
          delete getDataConfig[itemCode + ':' + colField]
        } else {
          this.$XModal.message({ duration: 10000, status: 'info', message: '当前单元格没有配置取数' })
        }
      } else if (type === 'constraintConfigEditConfig') {
        if (constraintConfig[itemCode + ':' + colField]) {
          row[colField] = ''
          delete constraintConfig[itemCode + ':' + colField]
        } else {
          this.$XModal.message({ duration: 10000, status: 'info', message: '当前单元格没有配置约束' })
        }
      } else {
      }
      this.$refs.bsTableTbodyRef.tableOptionFn().setSelectCell(row, colField)
    } else {
      this.$XModal.message({ duration: 10000, status: 'info', message: '请先选择要删除配置的单元格' })
    }
  },
  onCellConfigTbodyCellEditClosed({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }, context, type) {
    // let colField = column.property
    // let { getDataConfig, rowCodeFormulaConfig } = this.calculateConstraintConfigSource
    // let itemCode = row[this.calculateConstraintConfigSource.calcAndConstraintItemCodeField]
    // if (type === 'rowCodeFormulaConfigEditConfig') {
    //   if (row[colField] === '' && rowCodeFormulaConfig[itemCode + ':' + colField]) {
    //     delete rowCodeFormulaConfig[itemCode + ':' + colField]
    //   } else {
    //   }
    // } else if (type === 'getDataConfigEditConfig') {
    //   if (row[colField] === '' && getDataConfig[itemCode + ':' + colField]) {
    //     delete getDataConfig[itemCode + ':' + colField]
    //   } else {
    //   }
    // } else {
    // }
    // this.$refs.bsTableTbodyRef.tableOptionFn().setSelectCell(row, colField)
  },
  doConfigGetData(curEditItem) { // 配置取数
    let { editItemMap } = this.itemEditStatusConfig
    if (!this.itemEditStatusConfig[curEditItem]) {
      this.$XModal.message({ duration: 10000, status: 'info', message: '请先激活' + editItemMap[curEditItem] + '编辑状态' })
    } else if (this.curSelectTbodyCellInfo === null) {
      this.$XModal.message({ duration: 10000, status: 'info', message: '请先选择要配置的单元格' })
    } else {
      // { itemCode: 2010101, colField: 'F001', formula: 'tableId$1255:f001:1111111', inputType: 1 },
      // let { rowCodeFormulaConfig, getDataConfig, constraintConfig } = this.calculateConstraintConfigSource
      let { getDataConfig } = this.calculateConstraintConfigSource
      const { colField, itemCode } = this.curSelectTbodyCellInfo
      this.configBasicInfo = this.$refs.queryForm.getFormData()
      this.curSelectTbodyCellInfo = Object.assign(this.curSelectTbodyCellInfo, { inputType: 1 }, getDataConfig[itemCode + ':' + colField] ? getDataConfig[itemCode + ':' + colField] : {})
      this.configGetDataDialogVisible = true
    }
  },
  onConfigGetDataSureClick({ configCellInfo, formula }) {
    let { itemCode, colField, row } = configCellInfo
    row[colField] = formula
    let { getDataConfig } = this.calculateConstraintConfigSource
    getDataConfig[itemCode + ':' + colField] = Object.assign(configCellInfo, { formula })
    this.$refs.bsTableTbodyRef.tableOptionFn().setSelectCell(row, colField)
  },
  doConfigCellFormula(curEditItem) { // 配置单元格计算
    let { editItemMap } = this.itemEditStatusConfig
    if (!this.itemEditStatusConfig[curEditItem]) {
      this.$XModal.message({ duration: 10000, status: 'info', message: '请先激活' + editItemMap[curEditItem] + '编辑状态' })
    } else if (this.curSelectTbodyCellInfo === null) {
      this.$XModal.message({ duration: 10000, status: 'info', message: '请先选择要配置的单元格' })
    } else {
      const { colField, itemCode } = this.curSelectTbodyCellInfo
      let { rowCodeFormulaConfig } = this.calculateConstraintConfigSource
      this.configBasicInfo = this.$refs.queryForm.getFormData()
      this.configCellFormulaTableTbodyColumns = tools.deepCopy(this.tableTbodyColumns)
      this.configCellFormulaTableTbodyData = tools.deepCopy(this.tableTbodyData)
      this.curSelectTbodyCellInfo = Object.assign(this.curSelectTbodyCellInfo, { inputType: 2 }, rowCodeFormulaConfig[itemCode + ':' + colField] ? rowCodeFormulaConfig[itemCode + ':' + colField] : {})
      this.configCellFormulaVisible = true
    }
  },
  onConfigCellFormulaSureClick({ configCellInfo, formula }) {
    let { itemCode, colField, row } = configCellInfo
    row[colField] = formula
    let { rowCodeFormulaConfig } = this.calculateConstraintConfigSource
    rowCodeFormulaConfig[itemCode + ':' + colField] = Object.assign(configCellInfo, { formula })
    this.$refs.bsTableTbodyRef.tableOptionFn().setSelectCell(row, colField)
  },
  doConfigConstraint(curEditItem) { // 配置约束
    let { editItemMap } = this.itemEditStatusConfig
    if (!this.itemEditStatusConfig[curEditItem]) {
      this.$XModal.message({ duration: 10000, status: 'info', message: '请先激活' + editItemMap[curEditItem] + '编辑状态' })
    } else if (this.curSelectTbodyCellInfo === null) {
      this.$XModal.message({ duration: 10000, status: 'info', message: '请先选择要配置的单元格' })
    } else {
      const { colField, itemCode } = this.curSelectTbodyCellInfo
      let { constraintConfig } = this.calculateConstraintConfigSource
      this.configBasicInfo = this.$refs.queryForm.getFormData()
      this.configCellFormulaTableTbodyColumns = tools.deepCopy(this.tableTbodyColumns)
      this.configCellFormulaTableTbodyData = tools.deepCopy(this.tableTbodyData)
      this.curSelectTbodyCellInfo = Object.assign(this.curSelectTbodyCellInfo, { inputType: 4 }, constraintConfig[itemCode + ':' + colField] ? constraintConfig[itemCode + ':' + colField] : {})
      this.configConstraintVisible = true
    }
  },
  onConfigConstraintSureClick({ configCellInfo, formula }) {
    let { itemCode, colField, row } = configCellInfo
    row[colField] = formula
    let { constraintConfig } = this.calculateConstraintConfigSource
    constraintConfig[itemCode + ':' + colField] = Object.assign(configCellInfo, { formula })
    this.$refs.bsTableTbodyRef.tableOptionFn().setSelectCell(row, colField)
  }
}
export const myMethods = {
  ...initMethods,
  ...interfaceMethods,
  ...dataMethods,
  ...validateMethods,
  ...newAddFunction
}
