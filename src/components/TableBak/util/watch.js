// watch   Author:Titans@2396757591@qq.com
export default {
  id: {
    handler(newvalue, oldValue) {
    },
    immediate: true
  },
  tableGlobalConfig: { // 全局配置
    handler(newvalue, oldValue) {
      this.initTableGlobalConfig()
    },
    deep: true,
    immediate: true
  },
  tableColumnsConfigIn: { // 监听表头渲染数据
    handler(newvalue, oldValue) {
    },
    deep: true,
    immediate: true
  },
  tableConfig: { // 表格配置监听
    handler(newvalue, oldValue) {
      this.initTable()
    },
    deep: true,
    immediate: true
  },
  toolbarConfig: { // 工具栏配置监听
    handler(newvalue, oldValue) {
    //   console.log(newvalue, oldValue)
      this.initToolbar()
    },
    deep: true,
    immediate: true
  },
  pagerConfig: { // 分页配置监听
    handler(newvalue, oldValue) {
      this.setPagerConfig()
    },
    deep: true,
    immediate: true
  },
  tableData: { // 表格数据
    handler(newvalue, oldValue) {
      this.initTableData()
    },
    immediate: true
  },
  tableColumnsConfig: { // 表头配置监听
    handler(newvalue, oldValue) {
      this.initTable()
    },
    deep: true,
    immediate: true
  },
  tableFormConfig: { // table Form配置监听
    handler(newvalue, oldValue) {
      this.initTableFormConfig()
    },
    deep: true,
    immediate: true
  },
  editConfig: { // table edit配置监听
    handler(newvalue, oldValue) {
      this.initEditConfig()
    },
    deep: true,
    immediate: true
  },
  editRules: { // 校验
    handler(newvalue, oldValue) {
      this.initEditRules()
    },
    deep: true,
    immediate: true
  },
  expandConfig: { // table 展开行配置监听
    handler(newvalue, oldValue) {
      this.initExpandConfig()
    },
    deep: true,
    immediate: true
  },
  footerConfig: { // 表尾配置
    handler(newvalue, oldValue) {
      this.initFooterConfig()
    },
    deep: true,
    immediate: true
  },
  treeConfig: { // table 展开行配置监听
    handler(newvalue, oldValue) {
      this.initTreeConfig()
    },
    deep: true,
    immediate: true
  },
  moneyUnit: { // 金额单位变换
    handler(newvalue, oldValue) {
      this.setMoneyUnit(newvalue, oldValue)
    },
    immediate: true
  },
  contextMenuConfig: { // 右键菜单
    handler(newvalue, oldValue) {
      this.initContextMenuConfig()
    },
    deep: true,
    immediate: true
  },
  checkboxConfig: { // 复选框
    handler(newvalue, oldValue) {
    },
    deep: true,
    immediate: true
  },
  rowStyle: { // rowStyle回调
    handler(newvalue, oldValue) {
    },
    immediate: true
  },
  cellStyle: { // cellStyle回调
    handler(newvalue, oldValue) {},
    immediate: true
  },
  defaultMoneyUnit: {
    handler(newvalue, oldValue) {
      this.moneyUnit = this.defaultMoneyUnit
    },
    immediate: true
  },
  importBillguid: {
    handler(newvalue, oldValue) {
      this.importBillGuid = newvalue
    },
    immediate: true
  }

}
