<template>
  <div v-loading="showLoading" style="height: 100%">
    <BsMainFormListLayout>
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
          />
        </div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="mainPagerConfig"
          :toolbar-config="tableToolbarConfig"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <vxe-modal
      v-model="showViolations"
      :title="dialogTitle"
      width="80%"
      height="60%"
    >
      <BsTable
        ref="functionTableRef"
        :table-columns-config="mountTableColumnsConfig"
        :table-data="functionTableData"
        :default-money-unit="defaultMoneyUnit"
        :toolbar-config="false"
        :cell-style="cellStyle"
        :pager-config="false"
      />
    </vxe-modal>
  </div>
</template>

<script>
import { proconf } from './TreasuryGuaranteeDaySummary'
import HttpModule from '@/api/frame/main/Monitoring/TreasuryGuaranteeDaySummary.js'

export default {
  components: {
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    mofDivCode: {
      type: String,
      default: ''
    },
    year: {
      type: String,
      default: ''
    }
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      isShowQueryConditions: true,
      radioShow: true,
      breakRuleVisible: false,
      defaultMoneyUnit: 10000,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: proconf.toolBarStatusButtons,
        curButton: {
          type: 'button',
          iconName: 'base-all.png',
          iconNameActive: 'base-all-active.png',
          iconUrl: '',
          label: '全部',
          code: '1',
          curValue: '1'
        },
        buttonsInfo: proconf.statusRightToolBarButton,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      tabStatusNumConfig: {
        '1': 0
      },
      // BsQuery 查询栏
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      toolBarStatusSelect: {
        type: 'button',
        iconName: 'base-all.png',
        iconNameActive: 'base-all-active.png',
        iconUrl: '',
        label: '全部',
        code: '1',
        curValue: '1'
      },
      // table 相关配置
      showLoading: false,
      showViolations: false,
      tableColumnsConfig: proconf.PoliciesTableColumns,
      mountTableColumnsConfig: proconf.PoliciesTableColumns1,
      tableData: [],
      functionTableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
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
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRow
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      tableFooterConfig: {
        showFooter: false
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '预警明细查看',
      addTableData: [],
      modifyData: {},
      // 请求 & 角色权限相关配置
      menuName: '库款保障天数监测预警表',
      params5: '',
      menuId: '',
      tokenid: '',
      userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      appId: 'pay_voucher',
      isHaveZero: '0',
      // 文件
      showAttachmentDialog: false,
      billguid: '',
      condition: {},
      showDetailDialog: true,
      fiscalYear: '',
      businessTime: '',
      endTime: '',
      agencyCodeList: [],
      flag: '',
      treeQueryparams: { elementcode: 'admdiv', province: '610000000', year: '2021', wheresql: 'and code like \'' + 61 + '%\'' },
      mofDivCodeList: []
    }
  },
  mounted() {
  },
  methods: {
    dialogClose() {
      this.$parent.showDetailDialog = false
      // this.$parent.queryTableDatas()
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    // cellStyle({ row, rowIndex, column }) {
    //   console.log(row)
    //   console.log(column.field)
    //   if (column.property === '1') {
    //     return 'backgroundColor:red!important;'
    //   }
    //   if (column.property === '2') {
    //     return 'backgroundColor:yellow!important;'
    //   }
    //   if (column.property === '4') {
    //     return 'backgroundColor:green!important;'
    //   }
    // },
    // 初始化高级查询data
    getSearchDataList() {
      // 下拉树
      let searchDataObj = {}
      this.queryConfig.forEach(item => {
        if (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree') {
          if (item.field) {
            searchDataObj[item.field + 'code'] = ''
          }
        } else {
          if (item.field) {
            searchDataObj[item.field] = ''
          }
        }
      })
      this.searchDataList = searchDataObj
    },
    // 初始化高级查询参数condition
    getConditionList() {
      let condition = {}
      this.queryConfig.forEach(item => {
        if (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree') {
          if (item.field) {
            if (item.field === 'cor_bgt_doc_no_') {
              condition[item.field + 'name'] = []
            } else {
              condition[item.field + 'code'] = []
            }
          }
        } else {
          if (item.field) {
            condition[item.field] = []
          }
        }
      })
      return condition
    },
    // 切换状态栏
    onStatusTabClick(obj) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.curValue) {
        // 全部
        case '1':
          this.radioShow = true
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.refresh()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 搜索
    search(val) {
      console.log(val)
      this.fiscalYear = val.fiscalYear
      this.mofDivCodeList = val.mofDivCodeList_code__multiple
      this.flag = val.flag
      this.queryTableDatas()
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      switch (obj.code) {
        // 刷新
        case 'add-toolbar-refresh':
          this.refresh()
          break
        // 刷新
        case 'operation-toolbar-refresh':
          this.refresh()
          break
        default:
          break
      }
    },
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      // console.log(context.$parent.$parent.$parent)
      console.log(row.attachment_id)
      switch (optionType) {
        // 新增
        case 'add':
          this.clickAddBtn(row)
          break
        // 操作日志
        case 'report':
          this.queryActionLog(row)
          break
        // 附件
        case 'attachment':
          this.showAttachment(row)
          break
        default:
      }
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    // 查看附件
    showAttachment(row) {
      this.billguid = row.attachment_id
      this.showAttachmentDialog = true
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.queryTableDatas()
      // this.queryTableDatasCount()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        flag: this.flag,
        mofDivCodeList: this.mofDivCodeList,
        fiscalYear: this.fiscalYear
      }
      this.showLoading = true
      HttpModule.queryTableDatas(param).then(res => {
        this.showLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.tableData.forEach(item => {
            if (item.threshold === 1) {
              item.threshold = '<div style="background:red;margin: 5px 5px 5px 5px;">红色</span>'
            }
            if (item.threshold === 2) {
              item.threshold = '<div style="background:yellow;margin: 5px 5px 5px 5px;">黄色</span>'
            }
            if (item.threshold === 4) {
              item.threshold = '<div style="background:greenYellow;margin: 5px 5px 5px 5px;">绿色</span>'
            }
          })
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 单元格点击事件
    cellClick(obj, context, e) {
      console.log(obj)
      let key = obj.column.property
      console.log(key, obj.row, obj.row[key])
      if (
        key !== 'mofDivName' &&
        key !== 'mofDivCode' &&
        key !== 'threshold'
      ) {
        if (obj.row[key] !== undefined && obj.row[key] !== null && (key.split('_')[0] === 'red' || key.split('_')[0] === 'yellow' || key.split('_')[0] === 'green')) {
          this.showViolations = true
          if (key.split('_')[0] === 'red') {
            this.status = 1
          } else if (key.split('_')[0] === 'green') {
            this.status = 4
          } else if (key.split('_')[0] === 'yellow') {
            this.status = 2
          } else {
            this.status = ''
          }
          this.month = key.split('_')[1]
          this.mofDivCode = obj.row['mofDivCode']
          this.queryInfoData()
        } else {
          this.showViolations = true
          this.month = key.split('month')[1]
          this.mofDivCode = obj.row['mofDivCode']
        }
      }
    },
    queryInfoData() {
      const param = {
        fiscalYear: this.fiscalYear,
        mofDivCode: this.mofDivCode,
        status: this.status,
        acctPeriod: this.month
      }
      this.tableLoading = true
      HttpModule.queryTableDatasTotal(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.functionTableData = res.data
          this.functionTableData.forEach(item => {
            if (item.threshold === 2) {
              item.threshold = '<div style="background:yellow;margin: 5px 5px 5px 5px;">黄色</span>'
            }
            if (item.status === 1) {
              item.status = '<div style="background:red;margin: 5px 5px 5px 5px;">红色</span>'
            } else if (item.status === 2) {
              item.status = '<div style="background:yellow;margin: 5px 5px 5px 5px;">黄色</div>'
            } else if (item.status === 4) {
              item.status = '<div style="background:greenyellow;margin: 5px 5px 5px 5px;">绿色</div>'
            }
          })
        }
      })
    },
    // 操作日志
    queryActionLog(row) {
      let data = {
        roleguid: this.$store.state.curNavModule.roleguid,
        data: {
          statusCode: this.toolBarStatusSelect.code,
          id: row.id,
          appId: 'pay_voucher'
        }
      }
      HttpModule.queryActionLog(data).then(res => {
        this.logData = res.data
        console.log(this.logData)
        this.showLogView = true
      })
    },
    getLeftTreeData() {
      let that = this
      let params = { ...that.treeQueryparams, ...this.$store.getters.treeQueryparamsCom }
      HttpModule.getLeftTree(params).then(res => {
        if (res.rscode === '100000') {
          console.log(this.queryConfig)
          let treeResdata = that.getRegulationChildrenData(res.data)
          this.queryConfig[1].itemRender.options = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getRegulationChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        if (item.children && item.children.length > 0) {
          that.getRegulationChildrenData(item.children)
          item.leaf = false
        } else {
          item.leaf = true
        }
      })

      return datas
    }
    // getAgency() {
    //   const param = {
    //     wheresql: 'and province =' + this.$store.state.userInfo.province,
    //     elementCode: 'AGENCY',
    //     // elementCode: 'AGENCY',
    //     year: this.$store.state.userInfo.year,
    //     province: this.$store.state.userInfo.province
    //   }
    //   HttpModule.getTreewhere(param).then(res => {
    //     let treeResdata = this.getChildrenNewData1(res.data)
    //     this.queryConfig[0].itemRender.options = treeResdata
    //   })
    // },
    // getChildrenNewData1(datas) {
    //   let that = this
    //   datas.forEach(item => {
    //     item.label = item.text
    //     if (item.children) {
    //       that.getChildrenNewData1(item.children)
    //     }
    //   })

    //   return datas
    // }
  },
  created() {
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.params5 = this.$store.state.curNavModule.param5
    this.getLeftTreeData()
  }
}
</script>
<style scoped>
.radio-right{
float: right;
}
.Titans-table ::v-deep  .vxe-body--row.row-yellow {
  background-color: yellow;
  color: #fff;
}
.Titans-table ::v-deep  .vxe-body--row.row-blue {
  background-color: blue;
  color: #fff;
}
.Titans-table ::v-deep .add-red {
  background-color: red !important;
}
.Titans-table ::v-deep .add-yellow {
  background-color: yellow !important;
}
.Titans-table ::v-deep .add-green {
  background-color: greenyellow !important;
}
.Titans-table ::v-deep  .vxe-body--row.row-red {
  background-color: red;
  color: #fff;
}
</style>
