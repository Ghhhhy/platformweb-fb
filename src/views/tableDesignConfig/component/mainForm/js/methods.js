import { extend } from '@/utils'
import config from './config.js'
import { SequenceGenerator } from '../../../utils/tableUtils.js'
import { del, post, get } from '@/api/http'
import Sortable from 'sortablejs'

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
    this.queryFormItemConfigIn = config('formConf', 'defaultConfig', 'queryFormItemConfig')
    this.queryFormData = config('formConf', 'defaultConfig', 'queryFormData')
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
  commonBtnClick(boo) {
    this.saveVisible = boo
    setTimeout(() => {
      this.rowDrop()
    }, 120)
    this.$emit('onBtnClick', boo)
  },
  doInsert() {
    this.queryFormItemConfigIn = config('formConf', 'defaultConfig', 'queryFormItemEditConfig')
    this.queryFormData = config('formConf', 'defaultConfig', 'queryFormData')
    if (this.curDicInfoId !== null && !this.isBlank(this.curDicInfoId.dicType)) {
      this.queryFormData.dicType = this.curDicInfoId.dicType
      if (!['dicType', 'root'].includes(this.curDicInfoId.guid) && !this.curDicInfoId.guid.startsWith('dicType') && Number(this.curDicInfoId.isfolder) === 1) {
        this.queryFormData.parentId = this.curDicInfoId.guid
        this.queryFormData.parentCode = this.curDicInfoId.dicCode
        this.queryFormData.parentName = this.curDicInfoId.dicName
      }
    }
    this.formValidationConfig = config('formConf', 'defaultConfig', 'validateConfig')
    this.tableEditConfig = config('tableConf', 'defaultConfig', 'tableEditConfig')
    this.tableCols = config('tableConf', 'defaultConfig', 'tableEditCols')
    this.tableData = []
    this.modifyStatus = 'insert'
    this.commonBtnClick(true)
    // if (this.curDicInfoId !== null && this.curDicInfoId.isfolder === 0 && !['dicType', 'root'].includes(this.curDicInfoId.guid)) {
    //   this.$XModal.message({ status: 'warning', message: `您当前选择的[${this.curDicInfoId.dicName}]为叶子节点数据，无法新增子级配置！` })
    //
    // }
    // let queryFormItems = config('formConf', 'defaultConfig', 'queryFormItemEditConfig')
    // this.queryFormData = config('formConf', 'defaultConfig', 'queryFormData')
    // this.tableEditConfig = config('tableConf', 'defaultConfig', 'tableEditConfig')
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
    // this.queryFormItemConfigIn = queryFormItems
    // this.commonBtnClick(true)
  },
  doUpdate() {
    this.queryFormItemConfigIn = config('formConf', 'defaultConfig', 'queryFormItemEditConfig')
    this.formValidationConfig = config('formConf', 'defaultConfig', 'validateConfig')
    this.tableEditConfig = config('tableConf', 'defaultConfig', 'tableEditConfig')
    this.tableCols = config('tableConf', 'defaultConfig', 'tableEditCols')
    this.modifyStatus = 'update'
    this.commonBtnClick(true)
  },
  doCopy() {
    this.queryFormItemConfigIn = config('formConf', 'defaultConfig', 'queryFormItemEditConfig')
    this.formValidationConfig = config('formConf', 'defaultConfig', 'validateConfig')
    this.tableEditConfig = config('tableConf', 'defaultConfig', 'tableEditConfig')
    this.tableCols = config('tableConf', 'defaultConfig', 'tableEditCols')
    this.modifyStatus = 'copy'
    this.commonBtnClick(true)
  },
  doCancel({ refreshConfig }) {
    this.modifyStatus = ''
    this.queryFormItemConfigIn = config('formConf', 'defaultConfig', 'queryFormItemConfig')
    this.formValidationConfig = []
    this.tableCols = config('tableConf', 'defaultConfig', 'tableCols')
    this.tableEditConfig = false
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
    this.validate().then(() => {
      switch (self.modifyStatus) {
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
      let tableValid = this.$refs.bsTableRef.validate()
      let formValid = this.$refs.queryForm.validate()
      let tableFormValid = this.tableFormValidate()
      return Promise.all([formValid, tableValid, tableFormValid])
    }
  },
  tableFormValidate() {
    let self = this
    return new Promise((resolve, reject) => {
      let formData = self.$refs.queryForm.getFormData()
      let tableData = self.$refs.bsTableRef.getListData()
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
        this.handleHttpMethod(this.getBasDicGroupformulaByDicId(this.curDicInfoId.guid)).then((res) => {
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
    let rows = this.$refs.bsTableRef.getListData()
    let orderNum = SequenceGenerator.getOrderNum(rows, 'orderNum')
    let type = this.$refs.queryForm.getFormData().dicType
    // let currentRow = this.$refs.bsTableRef.tableOptionFn().getCurrentRecord()
    let row = {
      data: {
        orderNum: orderNum,
        visible: '1',
        required: '0',
        editable: '1',
        disabled: '1',
        align: 'left',
        sortable: '0',
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
    rows = this.$refs.bsTableRef.getListData()
    let sortedRows = SequenceGenerator.sortRows(rows, 'orderNum')
    this.tableData = extend(true, [], sortedRows)
  },
  insertChildRow() {
    let currRow = this.$refs.bsTableRef.tableOptionFn().getCurrentRecord()
    if (currRow === null) {
      this.$XModal.message({ status: 'info', message: '请选中父行！' })
      return
    }
    let rows = this.$refs.bsTableRef.getListData()
    let orderNum = SequenceGenerator.getOrderNum(rows, 'orderNum', currRow)
    let row = {
      data: {
        orderNum: orderNum,
        visible: '1',
        required: '0',
        editable: '1',
        disabled: '1',
        align: 'left',
        sortable: '0',
        isExportCol: '1',
        isparentrow: false,
        width: 180
      }
    }
    this.tableIndex++
    this.$refs.bsTableRef.insertRowData(row)
    rows = this.$refs.bsTableRef.getListData()
    let sortedRows = SequenceGenerator.sortRows(rows, 'orderNum')
    this.tableData = extend(true, [], sortedRows)
    let self = this
    setTimeout(() => {
      self.$refs.bsTableRef.tableOptionFn().setCurrentRow(currRow)
    }, 120)
  },
  delRow() {
    let self = this
    let rows = this.$refs.bsTableRef.getListData()
    let currRow = this.$refs.bsTableRef.tableOptionFn().getCurrentRecord()
    if (currRow === null) {
      this.$XModal.message({ status: 'info', message: '请选中要删除的行记录！' })
      return
    }
    let resData = SequenceGenerator.delRow(currRow, rows, 'orderNum')
    // 删除调取后端接口查询接口
    this.$XModal.confirm('您确定要删除所选中数据吗?').then(type => {
      if (type === 'confirm') {
        // 如果是修改，且当前行是有guid的时候再去查接口
        // 不用判断是不是测算表，因为他万一改了呢？
        if (this.modifyStatus === 'update' && !self.isBlank(currRow.guid)) {
          let loading = this.$loading({
            lock: true,
            text: '正在删除中...请您稍候',
            spinner: 'ri-loader-4-line roll',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.handleHttpMethod(this.getBasDicGroupformulaByDicColId(currRow.guid)).then((res) => {
            loading.close()
            if (res) {
              if (res.data) {
                this.$XModal.message({ status: 'success', message: '该行被用作测算字段暂不能删除！' })
              } else {
                if (resData) {
                  this.tableData = resData
                } else {
                  this.$XModal.message({ status: 'info', message: '请先删除子级记录！' })
                }
              }
            }
          })
        } else {
          if (resData) {
            this.tableData = resData
          } else {
            this.$XModal.message({ status: 'info', message: '请先删除子级记录！' })
          }
        }
      }
    })
  },
  moveRowUp() {
    let rows = this.$refs.bsTableRef.getListData()
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
    //   let tableData = this.$refs.bsTableRef.getListData()
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
    let rows = this.$refs.bsTableRef.getListData()
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
    //   let tableData = this.$refs.bsTableRef.getListData()
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
  setData({ basicInfo, columns }, isleaf) {
    this.queryFormData = extend(true, {}, basicInfo)
    let tableData = extend(true, [], columns)
    this.tableData = SequenceGenerator.sortRows(tableData, 'orderNum')
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
  saveData() {
    let basicInfo = this.$refs.queryForm.getFormData()
    let cols = this.$refs.bsTableRef.getListData()
    let attrs = []
    let loading = this.$loading({
      lock: true,
      text: '正在保存中...请您稍候',
      spinner: 'ri-loader-4-line roll',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.handleHttpMethod(this.saveAllDicInfo(basicInfo, cols, attrs)).then(res => {
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
    let basicInfo = this.$refs.queryForm.getFormData()
    let cols = this.$refs.bsTableRef.getListData()
    let attrs = []
    let loading = this.$loading({
      lock: true,
      text: '正在保存中...请您稍候',
      spinner: 'ri-loader-4-line roll',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.handleHttpMethod(this.updateAllDicInfo(basicInfo, cols, attrs)).then(res => {
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
  copyData() {
    let basicInfo = this.$refs.queryForm.getFormData()
    let cols = this.$refs.bsTableRef.getListData()
    let attrs = []
    let loading = this.$loading({
      lock: true,
      text: '正在保存中...请您稍候',
      spinner: 'ri-loader-4-line roll',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.handleHttpMethod(this.copyAllDicInfo(basicInfo, cols, attrs)).then(res => {
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
  saveAllDicInfo(basicInfo, cols, attrs) {
    let param = extend(true, {}, basicInfo)
    if (this.isBlank(param.parentCode)) {
      param.parentId = '0'
    }
    param.cols = cols
    param.attrs = attrs
    return post('bisConfig/config/basDicInfo/saveAllDicInfo', param)
  },
  updateAllDicInfo(basicInfo, cols, attrs) {
    let param = extend(true, {}, basicInfo)
    if (this.isBlank(param.parentCode)) {
      param.parentId = '0'
    }
    param.cols = cols
    param.attrs = attrs
    return post('bisConfig/config/basDicInfo/updateAllDicInfo', param)
  },
  copyAllDicInfo(basicInfo, cols, attrs) {
    let param = extend(true, {}, basicInfo)
    if (this.isBlank(param.parentCode)) {
      param.parentId = '0'
    }
    param.cols = cols
    param.attrs = attrs
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

export const myMethods = {
  ...initMethods,
  ...interfaceMethods,
  ...dataMethods,
  ...validateMethods
}
