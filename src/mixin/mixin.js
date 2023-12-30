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
      tableConfig: {
        renderers: {
          $gloableOptionReport: {
            renderDefault: (h, cellRender, params, context) => {
              let { row, column } = params
              return [
                <el-tooltip content="查看附件" placement="top" effect="light">
                  <div class="gloableOptionRow">
                    <div style="width:20px;;height:20px;;text-align:center;" class="gloable-option-row-optionlog fn-inline" onClick={() => this.viewOprationLog({ row, column })}></div>
                  </div>
                </el-tooltip>
              ]
            }
          }
        }
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
    isEmptyObject(o) {
      for (var p in o) {
        if (o.hasOwnProperty(p)) return false
      }
      return true
    },
    formatTargetField(array, columnList) {
      if (!Array.isArray(array) || !Array.isArray(columnList)) return
      const regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
      const replaceKeyReg = (key) => new RegExp('({' + key + '})', 'ig')
      const getKeySet = (formatString, row) => {
        let copyString = formatString
        const keySet = copyString.match(regR).map((key, keyIndex) => {
          return key.replace(/{|}/gi, '')
        })
        keySet.forEach((key, index) => {
          copyString = copyString.replace(replaceKeyReg(key), row[key] || '')
        })
        return copyString
      }
      array.forEach(item => {
        columnList.forEach(col => {
          if (col.format && typeof col.format === 'string') {
            let copyString = col.format
            item[col.field] = getKeySet(copyString, item)
          }
        })
      })
      console.log('formatter处理完毕', array)
    },
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
    },
    // 操作日志
    viewOprationLog(row) {
      // HttpModule.getLogs(row.dealNo).then(res => {
      //   if (res.code === '000000') {
      //     let tempData = res.data?.map(item => {
      //       return {
      //         logid: item['operationTypeCode'],
      //         nodeName: item['operationTypeName'],
      //         actionUser: item['operationUser'],
      //         actionName: item['operationTypeName'],
      //         actionTime: item['createdTime'] == null ? '' : item['createdTime'],
      //         message: item['operationComment']
      //       }
      //     })
      //     this.logData = tempData
      //     console.log(this.logData)
      //     this.showLogView = true
      //   } else {
      //     this.$message.error(res.message)
      //   }
      // })
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
