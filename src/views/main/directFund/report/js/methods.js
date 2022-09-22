import getConfData from './config.js'
import reportQueryApi from '@/api/frame/main/directFund/dfrReportData/ReportQuery.js'
// import { get, post, del, put } from '@/api/http'

/**
 * 初始化方法
 */
const initMethods = {
  initCreated(param5) {
    this.initConfig(param5)
  },
  initMounted() {
    this.initTableColumns()
    let curYear = Number(this.userInfo.year)
    this.$refs.bsTableRef.formSearchData.year = curYear
  },
  initConfig(param5) {
    this.initProvince(param5)// 判段是否区县
    // 区划树
    this.mofDivTreeConfig = getConfData('leftTreeConf', 'mofDivTreeConfig')
    this.mofDivTreeQueryparams = getConfData('leftTreeConf', 'mofDivTreeQueryparams')
    // this.agencyTreeQueryparams.roleGuid = this.curNavModule.roleguid
    this.mofDivTreeFilterText = getConfData('leftTreeConf', 'mofDivTreeFilterText')
    this.mofDivTreeData = getConfData('leftTreeConf', 'mofDivTreeData')
    // 报表树
    this.inputTableTreeConfig = getConfData('leftTreeConf', 'inputTableTreeConfig')
    this.inputTableTreeQueryparams = getConfData('leftTreeConf', 'inputTableTreeQueryparams')
    this.inputTableTreeFilterText = getConfData('leftTreeConf', 'inputTableTreeFilterText')
    this.inputTableTreeData = getConfData('leftTreeConf', 'inputTableTreeData')
    // 表格配置
    this.footerConfig = getConfData('tableConf', 'footerConfig')
    this.pagerConfig = getConfData('tableConf', 'pagerConfig')
    this.toolbarConfig = getConfData('tableConf', 'toolbarConfig')
    let curYear = Number(this.userInfo.year)
    this.toolbarConfig.yearlist = [curYear - 1, curYear, curYear + 1]
    this.tableConfig = getConfData('tableConf', 'tableConfig')
    this.tableColumnsConfig = getConfData('tableConf', 'tableColumnsConfig')
    this.tableData = getConfData('tableConf', 'tableData')
    this.editRules = getConfData('tableConf', 'editRules')
    this.setButtons()
  },
  initTableColumns() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
  initTablePanelBtn(key) {
    this.tabStatusBtnConfig = getConfData('status2button', key)
  },
  initProvince(param5) {
    let self = this
    // this.handleHttpMethod(reportQueryApi.isArea()).then(data => {
    //   if (data.code === '100000') {
    //     if (data.data) {
    let obj = {}
    if (param5.isSummary === '0') { // 本级编制
      self.provinceFlag = true
      this.initTablePanelBtn('areaTablePanelConfig')
      obj.code = 'benji'
    } else if (param5.isSummary === '1') { // 汇总
      this.initTablePanelBtn('sumTabStatusBtnConfig')
      obj.code = 'summary'
    } else if (param5.isAccept === '1') { // 接收
      this.initTablePanelBtn('dataAcceptTabStatusBtnConfig')
      obj.code = 'unAccept'
    } else if (param5.isAudit === '1' || param5.isAudit === '2') { // 审核
      this.initTablePanelBtn('auditTabStatusBtnConfig')
      obj.code = 'unAudit'
    }
    this.onTabPaneltabClick(obj)
    //   } else {
    //     self.$message.error('区划配置信息初始化失败!')
    //   }
    // })
  }
}

/**
 * 界面交互逻辑方法
 */
const interfaceMethods = {
  onTreeLoaded({ tree, treeData }) {
  },
  onAgencyTreeNodeCheckClick({ node, nodes }) {
    if (nodes && nodes.length > 0) {
      this.agencyIds = nodes.map(item => {
        return item.id
      })
      this.getSpecTableData()
    } else {
      this.tableData = []
    }
  },
  onInputTableTreeNodeCheckClick({ nodes }) {
    let self = this
    let tablDataObj = {}
    let selectKeys = []
    if (nodes && nodes.length > 0) {
      nodes.forEach(node => {
        if (node.isleaf || node.isleaf === '1') {
          self.curreportguid = node.id
          self.curTable = {
            name: node.label
          }
          let tabData = {
            label: node.label,
            id: node.id,
            tableColumns: []
          }
          selectKeys.push(node.id)
          tablDataObj[node.id] = tabData
        }
      })
      let result = []
      let pushedKeys = []
      if (this.tabDatas.length > 0) {
        this.tabDatas.forEach(data => {
          if (selectKeys.includes(data.id)) {
            pushedKeys.push(data.id)
            result.push(data)
          }
        })
      }
      let selectNodes = Object.values(tablDataObj)
      if (selectNodes.length > 0) {
        selectNodes.forEach(data => {
          if (!pushedKeys.includes(data.id)) {
            result.push(data)
          }
        })
      }
      this.tabDatas = result
      this.tabSelect = result[result.length - 1]
      this.$refs.bsTab.curTabSelect = this.tabSelect
      this.clickTab(result[result.length - 1])
    } else {
      this.tabDatas = []
      this.tableColumnsConfig = []
      this.curTable = {
        name: '请选择报表'
      }
      this.curreportguid = ''
    }
  },
  onInputTableTreeNodeCheckChange({ checked, childrenChecked, node }) {
  },
  clickTab(obj, flag) {
    let self = this
    if (obj !== undefined && obj.id) {
      let tableName
      if (self.curStatusNum === 1 && self.mofDivTreeClick.code !== '') {
        tableName = '(' + self.mofDivTreeClick.code + '-' + self.mofDivTreeClick.name + ')' + obj.label
      } else {
        tableName = obj.label
      }
      this.curTable = {
        name: tableName
      }
      this.curreportguid = obj.id
      this.curreportcode = obj.code
      this.queryBossFiscalTableConfig.reportguid = obj.id
      this.handleHttpMethod(reportQueryApi.queryBossFiscalTableConfig(obj.id)).then(res => {
        if (res) {
          self.tableColumnsConfig = self.getNewDataColumns(res.data.columns, flag)
          self.fieldSize = self.tableColumnsConfig.length
          self.getSpecTableData()
        }
      })
    } else {
      this.tableColumnsConfig = []
      this.tableData = []
    }
  },
  // 递归调整数据结构
  getNewDataColumns(dataColums, useEdit) {
    dataColums.map(item => {
      // this.$delete(item, 'width')
      if (item.children) {
        // item.children = item.childrens
        this.$delete(item, 'field')
        //  this.$delete(item, 'childrens')
        this.getNewDataColumns(item.children)
      } else {
        item.width = 'fit'
        item.minWidth = '200'
        if (item.type === 'select') {
          item.cellRender = {
            name: '$vxeSelect',
            options: ((str) => {
              return str.split('+').map((item, index) => {
                return { value: item.split('#')[0], label: item.split('#')[1] }
              })
            })(item.refmodel)
          }
        }
        if (item.type === 'money') {
          item.align = 'right'
          item.combinedType = ['average', 'subTotal', 'total', 'totalAll']
          item.cellRender = {
            name: '$vxeMoney',
            props: {
              type: 'float'
            }
          }
          if (useEdit) {
            console.log(useEdit)
            item.editRender = {
              name: '$vxeMoney',
              props: {
                clearable: false,
                min: 0,
                type: 'float'
              }
            }
          }
        } else {
          item.align = 'left'
        }
        if (item.isShow === 'false') {
          item.visible = false
        }
      }
      return item
    })
    return dataColums
  },
  setButtons() {
    this.buttonConfig = [
      { code: 'toolbar-query', name: '查询', status: 'primary', callback: this.getSpecTableData },
      { code: 'toolbar-export', name: '导出', callback: this.govExport }
      // { code: 'toolbar-extract', name: '提取', callback: this.batchExport },
      // { code: 'toolbar-tableCommit', name: '提交', callback: this.tableCommit }
    ]
  },
  ajaxData({ params, currentPage, pageSize }) {
    this.getTableDatas(params, currentPage, pageSize)
  },
  onTableToolbarBtnClick(obj, $this) {
    if (obj.code === 'refresh') {
      this.getSpecTableData()
    }
  },
  onInputTableTreeNodeClick({ node }) {
    let self = this
    if (self.editStatus) {
      this.$XModal.message({ status: 'error', message: '请先退出编辑状态再进行操作' })
      return
    }
    if (self.curStatusNum === 1 && self.curMofDivCode === '') {
      self.curMofDivCode = self.userInfo.province
    }
    let tablDataObj = {}
    if (node.isleaf || node.isleaf === '1') {
      self.curreportguid = node.id
      self.reportTableClickNode.id = node.id
      self.reportTableClickNode.name = node.name
      self.curTable = {
        name: node.label
      }
      let tabData = {
        label: node.label,
        id: node.id,
        code: node.code,
        tableColumns: []
      }
      tablDataObj[node.id] = tabData
      let result = []
      this.tabDatas = result
      this.tabSelect = tabData
      this.$refs.bsTab.curTabSelect = this.tabSelect
      this.clickTab(tabData)
    }
  },
  mofDivTreeNodeCheckChange({ checked, childrenChecked, node }) {
  },
  mofDivTreeNodeCheckClick({ nodes }) {
  },
  mofDivTreeNodeClick({ node }) {
    if (node.code.indexOf('99000') > 0 || node.isleaf) { // 排除辖区
      this.curMofDivCode = node.code
      this.mofDivTreeClick = {
        code: node.code,
        name: node.name
      }
    }
    if (node.parentId === '0') {
      this.isAllParent = true
    } else {
      this.isAllParent = false
    }
  }
}

/**
 * 数据方法（AJAX）
 */
const dataMethods = {
  getSpecTableData() {
    let self = this
    // if (this.tabDatas.length === 0) {
    //   this.$XModal.message({ status: 'warning', message: '请选择报表' })
    //   return
    // }
    // if (!this.agencyIds || this.agencyIds.length === 0) {
    //   this.$XModal.message({ status: 'warning', message: '请选择单位' })
    //   return
    // }
    self.getTableDatas({}, 1, 10000)
  },
  getTableDatas(params, currentPage, pageSize) {
    let self = this
    self.pagerConfig.currentPage = currentPage || 1
    self.pagerConfig.pageSize = 10000
    let year = params.year || self.userInfo.year
    let filterValue = params.filterValue
    self.queryBossDesignReportData = Object.assign(this.queryBossDesignReportData, {
      year,
      filterValue,
      currentPage,
      pageSize
    })
    this.queryBossDesignReportData.reportId = self.curreportguid
    this.queryBossDesignReportData.reportCode = self.curreportcode
    this.queryBossDesignReportData.fieldSize = self.fieldSize
    this.queryBossDesignReportData.mofDivCode = self.curMofDivCode
    if (Number(self.fiscalConfig.dataType) > 2) {
      this.queryBossDesignReportData.queryConditions.whereSql = ' and datatype>2 '
    }
    this.queryBossDesignReportData.status = self.curStatusNum
    this.queryBossDesignReportData.summaryType = self.param5.summaryType
    // 设置区划
    self.showLoading = true
    self.handleHttpMethod(reportQueryApi.getSummaryTableData(self.queryBossDesignReportData)).then(data => {
      if (data) {
        try {
          self.showLoading = false
          self.pagerConfig.total = data.data.total
          let dataResult = data.data.dataList
          // if (dataResult && dataResult.length > 0 && dataResult[0].itemcode !== undefined) {
          //   dataResult.sort((a, b) => a.itemcode.localeCompare(b.itemcode))
          // }
          // 分组
          // this.groupList = this.groupBy(this.dataResult, function(item) {
          //   return [item.eleType]
          // })
          let resDat = dataResult.filter(item => { return item !== null })
          self.tableData = resDat
        } catch (err) {
          console.log(err)
          self.tableData = []
        }
      } else {
        self.tableData = []
      }
    })
  },
  groupBy: function(array, f) {
    let groups = {}
    array.forEach(function(o) {
      let group = JSON.stringify(f(o))
      groups[group] = groups[group] || []
      groups[group].push(o)
    })
    return Object.keys(groups).map(function(group) {
      return groups[group]
    })
  },
  doEextract() {
    let params = {}
    let self = this
    if (self.curreportguid === '') {
      self.$message.warning('请选择报表!')
      return
    }
    self.showLoading = true
    params.reportguid = self.curreportguid
    let queryConditions = {}
    queryConditions.agencyguid = ''
    params.queryConditions = queryConditions
    params.pageSize = self.queryBossDesignReportData.pageSize
    params.currentPage = self.queryBossDesignReportData.currentPage
    self.handleHttpMethod(reportQueryApi.queryBossDesignReportData(params)).then(data => {
      if (data) {
        try {
          self.showLoading = false
          self.pagerConfig.total = data.data.total
          let dataResult = data.data.dataList
          if (dataResult && dataResult.length > 0 && dataResult[0].itemcode !== undefined) {
            dataResult.sort((a, b) => a.itemcode.localeCompare(b.itemcode))
          }
          let resDat = dataResult.filter(item => { return item !== null })
          self.tableData = resDat
        } catch (err) {
          console.log(err)
          self.tableData = []
        }
      } else {
        self.tableData = []
      }
    })
  },
  doCommit(type) {
    let self = this
    if (self.curreportguid === '') {
      self.$message.warning('请选择报表!')
      return
    }
    let params = {}
    params.reportId = self.curreportguid
    params.reportCode = self.curreportcode
    params.fieldSize = self.fieldSize
    params.type = type
    if (type === 1) {
      params.tableData = self.$refs.bsTableRef.tableDataIn
      if (!params.tableData || params.tableData.length < 1) {
        self.$message.warning('报表数据为空，不可保存!')
        return
      }
    }
    self.handleHttpMethod(reportQueryApi.doSave(params)).then(data => {
      self.showLoading = false
      if (data.code === '100000') {
        self.$message.success((type === 1 ? '保存' : '提交') + '成功!')
        self.cancelEdit()
      } else {
        if (data.message) {
          self.$message.error((type === 1 ? '保存' : '提交') + '失败!' + data.message)
        } else {
          self.$message.error((type === 1 ? '保存' : '提交') + '失败!' + data.msg)
        }
      }
    })
  },
  doAudit(type) {
    let self = this
    if (self.curreportguid === '') {
      self.$message.warning('请选择报表!')
      return
    }

    let params = {}
    let checks = []
    checks.push(self.userInfo.province)
    params.mofDivCodes = checks
    params.actionType = type
    params.reportId = self.curreportguid
    // if (type === 1) {
    //   params.tableData = self.$refs.bsTableRef.tableDataIn
    //   if (!params.tableData || params.tableData.length < 1) {
    //     self.$message.warning('报表数据为空，不可保存!')
    //     return
    //   }
    // }
    self.handleHttpMethod(reportQueryApi.doAudit(params)).then(data => {
      self.showLoading = false
      if (data.code === '100000') {
        self.$message.success('操作成功!')
        self.cancelEdit()
      } else {
        if (data.message) {
          self.$message.error('操作失败!' + data.message)
        } else {
          self.$message.error('操作失败!' + data.msg)
        }
      }
    })
    self.clickTab({ id: self.reportTableClickNode.id, label: self.reportTableClickNode.name }, true)
  },
  doSummary() {
    let self = this
    if (self.curreportguid === '') {
      self.$message.warning('请选择报表!')
      return
    }
    self.editStatus = true
    self.isSum = true
    this.$refs.bsTabPanel.rButtons = [
      {
        code: 'summary-save',
        label: '保存',
        status: 'primary'
      }]
    // 暂时注释掉 用于演示
    self.showLoading = true
    // self.handleHttpMethod(reportQueryApi.summaryData(self.curreportguid, self.fieldSize, self.param5.summaryType)).then(data => {
    self.showLoading = false
    //   if (data.code === '100000') {
    //     let dataResult = data.data
    //     if (dataResult && dataResult.length > 0 && dataResult[0].itemcode !== undefined) {
    //       dataResult.sort((a, b) => a.itemcode.localeCompare(b.itemcode))
    //     }
    //     self.tableData = dataResult
    //     self.refreshTable2Edit(true)
    //   } else {
    //     self.tableData = []
    //     if (data.message) {
    //       self.$message.error('汇总失败!' + data.message)
    //     } else {
    //       self.$message.error('汇总失败!' + data.msg)
    //     }
    //   }
    // })
  },
  refreshTable2Edit(flag) {
    let self = this
    this.handleHttpMethod(reportQueryApi.queryBossFiscalTableConfig(self.curreportguid)).then(res => {
      if (res) {
        self.tableColumnsConfig = self.getNewDataColumns(res.data.columns, flag)
        self.fieldSize = self.tableColumnsConfig.length
      }
    })
  },
  summmarySave() {
    let self = this
    let params = {}
    params.reportId = self.curreportguid
    params.reportCode = self.curreportcode
    params.fieldSize = self.fieldSize
    params.tableData = self.$refs.bsTableRef.tableDataIn
    params.summaryType = self.param5.summaryType
    if (!params.tableData || params.tableData.length < 1) {
      self.$message.warning('报表数据为空，不可保存!')
      return
    }
    if (self.isSum) {
      let msg = '汇总保存后会覆盖您历史已编辑的汇总数据，你确定这样操作么?'
      this.$XModal.confirm(msg).then(type => {
        if (type === 'confirm') {
          let loading = this.$loading({
            lock: true,
            text: '正在删除中...请您稍候',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          self.handleHttpMethod(reportQueryApi.doSummmarySave(params)).then(data => {
            if (data.code === '100000') {
              loading.close()
              self.$message.success('保存成功!')
              self.summaryCancelEdit()
            } else {
              if (data.message) {
                self.$message.error('保存失败!' + data.message)
              } else {
                self.$message.error('保存失败!' + data.msg)
              }
              loading.close()
            }
          })
        }
      })
    } else {
      self.showLoading = true
      self.handleHttpMethod(reportQueryApi.doSummmarySave(params)).then(data => {
        if (data.code === '100000') {
          self.showLoading = false
          self.$message.success('保存成功!')
          self.summaryCancelEdit()
        } else {
          if (data.message) {
            self.$message.error('保存失败!' + data.message)
          } else {
            self.$message.error('保存失败!' + data.msg)
          }
          self.showLoading = false
        }
      })
    }
  },
  toEditSummary() {
    let self = this
    if (self.curreportguid === '') {
      self.$message.warning('请选择报表!')
      return
    }
    self.editStatus = true
    self.isSum = false
    this.$refs.bsTabPanel.rButtons = [
      {
        code: 'summary-save',
        label: '保存',
        status: 'primary'
      }]
    self.clickTab({ id: self.reportTableClickNode.id, label: self.reportTableClickNode.name }, true)
  },
  doCurrentLevelCommit() {
    let self = this
    self.handleHttpMethod(reportQueryApi.currentLevelCommit({ menuGuid: this.$store.state.curNavModule.guid, menuName: this.$store.state.curNavModule.name, reportId: self.curreportguid })).then(data => {
      self.showLoading = false
      if (data.code === '100000') {
        self.$message.success('提交成功!')
      } else {
        if (data.message) {
          self.$message.error('提交失败!' + data.message)
        } else {
          self.$message.error('提交失败!' + data.msg)
        }
      }
    })
    self.clickTab({ id: self.reportTableClickNode.id, label: self.reportTableClickNode.name }, true)
  },
  doBack() {
    let self = this
    self.handleHttpMethod(reportQueryApi.currentLevelBack(this.curStatusNum)).then(data => {
      self.showLoading = false
      if (data.code === '100000') {
        self.$message.success('撤销成功!')
      } else {
        if (data.message) {
          self.$message.error('撤销失败!' + data.message)
        } else {
          self.$message.error('撤销失败!' + data.msg)
        }
      }
    })
  },
  doExport() {
    this.$refs.bsTableRef.triggerExportOption({ fileName: this.curTable.name })
  }
}

/**
 * 校验方法（表单、表格）
 */
const validateMethods = {
  validateTableData() {
    return this.$refs.bsTableRef.validate()
  }
}

const utilMethods = {
  isBlank(value) {
    return (value === undefined || value === null || value === '')
  },
  handleHttpMethod(promise, needLoading = false, message) {
    let loading = {
      close: () => { }
    }
    if (needLoading) {
      loading = this.$loading({
        lock: true,
        text: message || '正在请求中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
    return new Promise((resolve, reject) => {
      promise.then(res => {
        if (res) {
          resolve(res)
          // if (res.code === '100000') {
          //   resolve(res.data)
          // } else {
          //   console.log(res.errorInfor)
          //   if (res.code === 0) {
          //     this.$XModal.message({ status: 'error', message: res.errorInfor.response.data.msg })
          //   } else if (res.msg) {
          //     this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
          //   } else {
          //     this.$XModal.message({ status: 'error', message: '未知错误' })
          //   }
          // }
        } else {
          this.$XModal.message({ status: 'error', message: '服务错误，请查看日志' })
          console.log(res)
        }
        loading.close()
        resolve(false)
      }).catch(err => {
        loading.close()
        this.$XModal.message({ status: 'error', message: '网络连接失败，或前端逻辑错误。请查看日志' })
        console.log(err)
        resolve(false)
      })
    })
  }
}

// 导出
const getExportDialog = {
  govExport() {
    this.$BsFcUtil.govBudgetExport({
      exportConfig: {
        hasMofDiv: this.queryBossDesignReportData.summaryFlag,
        reportFilteSql: 'and (code like \'999%\')',
        exportUrl: 'bisGovbudget/govFiscal/govSummary/summary/export',
        isSummary: this.queryBossDesignReportData.summaryFlag,
        down2zip: true
      },
      // 导出确认
      exportSure(config) {
        console.log(config)
      },
      cancel() {
      }
    })
  }
}

export const myMethods = {
  ...initMethods,
  ...interfaceMethods,
  ...dataMethods,
  ...validateMethods,
  ...utilMethods,
  ...getExportDialog
}
