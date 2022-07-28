import getConfData from './config.js'
// import { extend } from '@/utils'

/**
 * 初始化方法
 */
const initMethods = {
  initCreated() {
  },
  async initMounted() {
    await this.initFiscalConfig()
    this.initConfig()
  },
  initConfig() {
    const initFormLocal = String(this.param5.initFromLocal || 0) === '1'
    this.leftTreeConfig = getConfData('leftTreeConf', 'leftTreeConfig')
    this.treeQueryparams = getConfData('leftTreeConf', 'treeQueryparams')
    this.treeConfig = getConfData('commonConf', 'treeConfig')
    this.tableData = getConfData('tableConf', 'tableData')
    this.footerConfig = getConfData('tableConf', 'footerConfig')
    this.tableConfig = getConfData('tableConf', 'tableConfig')
    if (initFormLocal) {
      this.tabStatusBtnConfig = {
        buttons: getConfData('commonConf', 'statusButtons'),
        curButton: getConfData('commonConf', 'curStatusButton'),
        buttonsInfo: getConfData('commonConf', 'buttonsInfos'),
        methods: {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
      }
      this.toolbarConfig = {
        disabledMoneyConversion: false,
        ...getConfData('tableConf', 'toolbarConfig')
      }
      this.tableColumnsConfig = getConfData('tableConf', 'tableColumnsConfig')
      this.editRules = getConfData('tableConf', 'editRules')
    } else {
      this.initConfigViaService()
    }
    this.topTreeData = this.deepCopy(this.$store.state.systemMenu || [])
  },
  initConfigViaService() {
    let self = this
    const dicCode = 'CONF-0001'
    let tableConf = {}
    this.getDicConfig(dicCode, tableConf).then(config => {
      self.tableColumnsConfig = JSON.parse(config.editTableCols)
      self.editRules = JSON.parse(config.validateRules)
      let toolbarConfig = getConfData('tableConf', 'toolbarConfig')
      toolbarConfig = Object.assign(toolbarConfig, tableConf)
      self.toolbarConfig = toolbarConfig
    })
    this.getDicConfig('CONF-0002', tableConf).then(config => {
      self.statusColumnsConfig = JSON.parse(config.editTableCols)
    })
    // this.getTabButtons().then(btnConfig => {
    //   self.tabStatusBtnConfig = {
    //     ...btnConfig,
    //     methods: {
    //       bsToolbarClickEvent: self.bsToolbarClickEvent
    //     }
    //   }
    // })
  }
}

/**
 * 界面交互逻辑方法
 */
const interfaceMethods = {
  onImportSuccess(importData) {
  },
  onNodeCheckClick({ node, nodes, treeData }, UnitTree, tree) {
  },
  onNodeClick({ node, treeData }, UnitTree, tree) {
  },
  getTableData(menuguid) {
    this.tableData = []
    this.tableLoading = true
    this.handleHttpMethod(this.$http.get(`bisConfig/config/interface/statusBtn/button/${menuguid}`)).then(res => {
      this.tableLoading = false
      if (res) {
        this.tableData = res.data
      }
    })
  },
  getStatusTreeData(menuguid) {
    this.statusTreeLoading = true
    this.handleHttpMethod(this.$http.get(`bisConfig/config/interface/statusBtn/statusTree/${menuguid}`)).then(res => {
      this.statusTreeLoading = false
      if (res) {
        this.bottomTreeData = res.data
      }
    })
  },
  onTopTreeNodeClick({ node, treeData }, UnitTree, tree) {
    let menuguid = node.guid
    this.curMenuId = node.guid
    this.statusTreeLoading = true
    this.tableLoading = true
    let promiseOne = this.handleHttpMethod(this.$http.get(`bisConfig/config/interface/statusBtn/statusTree/${menuguid}`))
    let promiseTwo = this.handleHttpMethod(this.$http.get(`bisConfig/config/interface/statusBtn/button/${menuguid}`))
    Promise.all([promiseOne, promiseTwo]).then(res => {
      if (res[0]) {
        this.statusTreeLoading = false
        this.bottomTreeData = res[0].data
      }
      if (res[1]) {
        this.tableLoading = false
        this.tableData = res[1].data
      }
    })
  },
  onTabPaneltabClick(obj) {
  },
  onQueryConditionsClick(isOpen) {
    this.isShowQueryConditions = isOpen
  },
  onSearchClick(queryData) {},
  onSearchResetClick() {
    this.doRefresh()
  },
  bsToolbarClickEvent(obj, $this) {
  },
  onTabPanelBtnClick(obj) {
    const { selection } = this.$refs.bsTableRef.getTableData()
    switch (obj.code) {
      case 'edit':
        if (selection.length === 1) {
          this.modelData = selection[0]
          this.addDialogVisible = true
        } else {
          this.$message.warning('请选择一条数据进行编辑')
        }
        break
    }
  },
  changeInput(val) {
    this.letftTreeFilterText = val
  },
  ajaxData({ currentPage, pageSize }) {
    this.pagerConfig.currentPage = currentPage
    this.queryParams = Object.assign(this.queryParams, {
      currentPage,
      pageSize
    })
    this.getTableDatas(currentPage, pageSize)
  },
  toolbarButtonClickEvent(obj, context, e) {
    switch (obj.code) {
      default:
        console.log('default fallback')
    }
  },
  insertRow() {
    this.$refs.bsTableRef.insertRowData({
      data: {
        menuguid: this.curMenuId,
        parentid: '0'
      }
    })
  },
  insertRowStatus() {
    this.$refs.statusTable.insertRowData({
      data: {
        iconNameActive: 'base-daiban-active.png',
        iconName: 'base-daiban.png',
        parentid: '0',
        isActive: 0,
        isCount: 0,
        orderNum: 1,
        menuguid: this.curMenuId
      }
    })
  },
  copyRow() {
    this.copyRowData = this.$refs.bsTableRef.getSelectionData()
    this.$XModal.message({ status: 'success', message: '复制成功' })
  },
  pasteRow() {
    if (this.isBlank(this.curMenuId)) {
      this.$XModal.message({ status: 'info', message: '先选菜单' })
      return
    }
    if (this.copyRowData.length === 0) {
      this.$XModal.message({ status: 'info', message: '空数据' })
    } else {
      let insertData = []
      this.copyRowData.map(item => {
        let da = this.deepCopy(item)
        da.guid = null
        da.menuguid = this.curMenuId
        insertData.push(da)
      })
      this.$refs.bsTableRef.$refs.xGrid.insert(insertData)
      this.$XModal.message({ status: 'success', message: '粘贴成功' })
    }
  },
  copyRowStatus() {
    this.copyRowStatusData = this.$refs.statusTable.getSelectionData()
    this.$XModal.message({ status: 'success', message: '复制成功' })
  },
  pasteRowStatus() {
    if (this.isBlank(this.curMenuId)) {
      this.$XModal.message({ status: 'info', message: '先选菜单' })
      return
    }
    if (this.copyRowStatusData.length === 0) {
      this.$XModal.message({ status: 'info', message: '空数据' })
    } else {
      let insertData = []
      this.copyRowStatusData.map(item => {
        let da = this.deepCopy(item)
        da.guid = null
        da.menuguid = this.curMenuId
        insertData.push(da)
      })
      this.$refs.statusTable.$refs.xGrid.insert(insertData)
      this.$XModal.message({ status: 'success', message: '粘贴成功' })
    }
  },
  delRow() {
    this.$refs.bsTableRef.deleteRowData()
  },
  delRowStatus() {
    this.$refs.statusTable.deleteRowData()
  },
  saveRow() {
    let saveData = this.$refs.bsTableRef.getPureTableData().fullData
    this.handleHttpMethod(this.$http.post(`bisConfig/config/interface/statusBtn/setButton/${this.curMenuId}`, saveData), true, '正在保存中...').then(res => {
      this.$XModal.message({ status: 'success', message: '保存成功' })
      this.getTableData(this.curMenuId)
    })
    // this.$refs.bsT /config/interface/statusBtn/setButton/
  },
  saveRowStatus() {
    let saveData = this.$refs.statusTable.getPureTableData().fullData
    this.handleHttpMethod(this.$http.post(`bisConfig/config/interface/statusBtn/setStatus/${this.curMenuId}`, saveData), true, '正在保存中...').then(res => {
      this.$XModal.message({ status: 'success', message: '保存成功' })
      this.statusDialog = false
      this.getStatusTreeData(this.curMenuId)
    })
  },
  showStatus() {
    if (this.isBlank(this.curMenuId)) {
      this.$XModal.message({ status: 'warning', message: '请先选择菜单' })
    } else {
      this.statusDialog = true
    }
  },
  saveRelation() {
    let selectData = this.$refs.bsTableRef.getSelectionData()
    if (selectData.length !== 1) {
      this.$XModal.message({ status: 'warning', message: '请选择一条数据' })
      return
    }
    this.curSelectBtn = selectData[0]
    this.handleHttpMethod(this.$http.get(`bisConfig/config/interface/statusBtn/button/status?buttonId=${this.curSelectBtn.guid}`)).then(res => {
      if (res) {
        this.defaultCheckedKeys = res.data
        this.relationDialog = true
      } else {
        this.$XModal.message({ status: 'warning', message: '查询关系失败' })
      }
    })
  },
  saveRelationSure() {
    let checkedKey = this.$refs.statusTree.curCheckednodes.map(item => {
      return item.guid
    })
    this.handleHttpMethod(this.$http.post(`bisConfig/config/interface/statusBtn/setButtonStatus/${this.curSelectBtn.guid}`, checkedKey), true, '正在保存中...').then(res => {
      if (res) {
        this.relationDialog = false
        this.$XModal.message({ status: 'success', message: '成功' })
      }
    })
  }
}

/**
 * 数据方法（AJAX）
 */
const dataMethods = {
}

/**
 * 校验方法（表单、表格）
 */
const validateMethods = {
  validateTableData() {
  }
}

const utilMethods = {
}

export const myMethods = {
  ...initMethods,
  ...interfaceMethods,
  ...dataMethods,
  ...validateMethods,
  ...utilMethods
}
