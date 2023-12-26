export default {
  data() {
    return {
      showLoading: false,
      menuName: '',
      pagerConfig: {
        total: 0,
        pageSize: 20,
        currentPage: 0
      },
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tableData: [],
      treeTypeConfig: {
        curRadio: 'AGENCY',
        radioGroup: [
          {
            code: 'AGENCY',
            label: '预算单位'
          },
          {
            code: 'EXP_FUNC',
            label: '功能分类'
          },
          {
            code: 'dep_bgt_eco',
            label: '预算支出分类科目'
          }
        ]
      },
      leftTreeVisible: true,
      highQueryConfig: [],
      searchDataList: {},
      isShowQueryConditions: true,
      tabStatusNumConfig: {},
      toolBarStatusSelect: {
        type: 'button',
        iconName: 'base-daiban.png',
        iconNameActive: 'base-daiban-active.png',
        label: '未送审',
        code: '1',
        curValue: '1'
      },
      treeGlobalConfig: {
        treeInputVal: ''
      },
      treeQueryparams: { elementCode: 'AGENCY' },
      treeAjaxType: 'get',
      treeData: [],
      treeServerUri: 'pay-clear-service/v2/lefttree',
      condition: {},
      tableFooterConfig: {
        totalObj: {
          pay_app_amt: ''
        },
        combinedType: ['switchTotal'],
        showFooter: true
      },
      tableColumnsConfig: [],
      tableConfigId: '',
      queryConfigId: ''
    }
  },
  methods: {
    ajaxTableData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.getTableData()
    },
    handleNodeClick(node) {
      if (node.children !== null && node.children.length !== 0 && node.id !== '0') {
        return
      }
      let key = this.$refs.treeSet.treeConfigIn.curRadio.toLowerCase() + '_code'
      if (node.id !== '0') {
        this.condition[key] = node.code
      } else {
        this.condition[key] = ''
      }
      this.getTableData()
    },
    treeSetConfrimData(curTree) {
      this.treeQueryparams.elementCode = curTree.code
      this.$refs.leftTree.refreshTree()
    },
    asideChange() {
      this.leftTreeVisible = false
    },
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
      this.$refs.leftTree.filterText = val
    },
    search() {
      this.condition = this.$ToolFn.getConditionFn(this.highQueryConfig, this.searchDataList)
      this.getTableData()
    },
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    }
  },
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    },
    userInfo() {
      return this.$store.state.userInfo
    },
    menuId() {
      return this.curNavModule.guid
    },
    params5() {
      return this.$ToolFn.transJson(this.curNavModule.param5)
    },
    appId() {
      return this.params5?.appId ? this.params5.appId : ''
    },
    roleguid() {
      return this.curNavModule.roleguid
    }
  },
  watch: {
    highQueryConfig(val) {
      this.searchDataList = this.$ToolFn.getSearchDataListFn(val)
    }
  }
}
