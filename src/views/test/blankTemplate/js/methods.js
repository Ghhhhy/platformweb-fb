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
  },
  initConfigViaService() {
    let self = this
    const dicCode = this.param5.mainDicCode || '25817'
    let tableConf = {}
    this.getDicConfig(dicCode, tableConf).then(config => {
      self.tableColumnsConfig = JSON.parse(config.tableCols)
      self.editRules = JSON.parse(config.validateRules)
      let toolbarConfig = getConfData('tableConf', 'toolbarConfig')
      toolbarConfig = Object.assign(toolbarConfig, tableConf)
      self.toolbarConfig = toolbarConfig
    })
    this.getTabButtons().then(btnConfig => {
      self.tabStatusBtnConfig = {
        ...btnConfig,
        methods: {
          bsToolbarClickEvent: self.bsToolbarClickEvent
        }
      }
    })
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
  }
}

/**
 * 数据方法（AJAX）
 */
const dataMethods = {
  getTableDatas(currentPage, pageSize) {
    // 服务端查询数据
    this.showLoading = true
    let self = this
    this.handleHttpMethod(this.getTableData()).then(data => {
      if (data) {
        self.showLoading = false
        console.log(self)
      }
    })
  },
  doRefresh() {
    this.getTableDatas(1, 20)
  },
  getTableData() {
    return this.$http.get('', '')
  }
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
