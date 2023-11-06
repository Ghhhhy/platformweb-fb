<template>
  <div style="height: 100%">
    <vxe-modal
      v-model="showViolations"
      :title="title"
      width="96%"
      height="90%"
      :show-footer="false"
      @close="dialogClose"
    >
      <div v-loading="tableLoading" style="height: 100%">
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
              @btnClick="onTabPanelBtnClick"
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
      </div>
    </vxe-modal>
    <DetailDialog
      v-if="dialogVisible"
      :title="dialogTitle"
      :warning-code="warningCode"
      :fi-rule-code="fiRuleCode"
    />
  </div>
</template>

<script>
import { proconf } from './detailDialog.js'
import DetailDialog from '@/views/main/MointoringMatters/BudgetAccountingWarningDataMager/children/handleDialog.vue'
import HttpModule from '@/api/frame/main/Monitoring/StatisticalFormsByRule.js'
export default {
  components: {
    DetailDialog
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    warnLevel: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    regulationType: {
      type: String,
      default: ''
    },
    mofDivCode: {
      type: String,
      default: ''
    },
    fiRuleCode: {
      type: String,
      default: ''
    },
    fiscalYear: {
      type: String,
      default: ''
    },
    agencyCodeList: {
      type: Array,
      default: null
    }
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      showInfo: false,
      warningCode: '',
      isShowQueryConditions: true,
      radioShow: true,
      breakRuleVisible: false,
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
      tableLoading: false,
      tableColumnsConfig: proconf.PoliciesTableColumns,
      tableData: [],
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
      // 表格尾部合计配置
      tableFooterConfig: {
        totalObj: {
          paymentAmount: 0
        },
        combinedType: ['switchTotal'],
        showFooter: true
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '新增',
      addTableData: [],
      modifyData: {},
      // 请求 & 角色权限相关配置
      menuName: '违规情况查看',
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
      showViolations: true
    }
  },
  mounted() {
  },
  methods: {
    dialogClose() {
      this.$emit('showViolations', false)
      this.$parent.showViolations = false
      // console.log(this.$parent)
      // this.$parent.queryTableDatas()
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
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
    onTabPanelBtnClick(obj) { // 按钮点击
      let temp = this.$refs.bsTableRef.getSelectionData()
      let warnids = []
      let param = {
        warnids
      }
      switch (obj.code) {
        case 'sign': // 生成
          if (temp.length >= 1) {
            temp.forEach(v => {
              warnids.push(v.warnid)
            })
            HttpModule.doMark(param).then(res => {
              this.tableLoading = false
              if (res.code === '000000') {
                this.$message.success('标记成功！请前往监控问询单生成界面查看')
                this.refresh()
              } else {
                this.$message.error(res.message)
              }
            })
          } else {
            this.$message.warning('请至少选择一条数据')
          }
          break
        default:
          console.log('default fallback')
      }
    },
    // 搜索
    search(val) {
      console.log(val)
      this.searchDataList = val
      let condition = this.getConditionList()
      for (let key in condition) {
        if (
          (this.searchDataList[key] !== undefined) &
          (this.searchDataList[key] !== null)
        ) {
          if (Array.isArray(this.searchDataList[key])) {
            condition[key] = this.searchDataList[key]
          } else if (typeof (this.searchDataList[key]) === 'string') {
            if (this.searchDataList[key].trim() !== '') {
              this.searchDataList[key].split(',').forEach(item => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      if (this.searchDataList.dataSourceName && this.searchDataList.dataSourceName.trim() !== '') {
        condition.dataSourceName = this.searchDataList.dataSourceName
      }
      if (this.searchDataList.businessModuleCode && this.searchDataList.businessModuleCode.trim() !== '') {
        condition.businessModuleCode = this.searchDataList.businessModuleCode
      }
      this.condition = condition
      let fiscalYear = this.condition.fiscalYear[0]
      this.fiscalYear = fiscalYear
      this.agencyCodeList = val.agencyCodeList_code__multiple
      this.payApplyNumber = val.payApplyNumber
      this.fiRuleName = val.fiRuleName
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
        case 'detail':
          let selection = this.$refs.mainTableRef.getSelectionData()
          if (selection.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.selectData = selection[0]
          this.dialogVisible = true
          this.dialogTitle = '详细信息'
          this.warningCode = this.selectData.warningCode
          this.fiRuleCode = this.selectData.fiRuleCode
          break
        case 'sign': // 生成
          let temp = this.$refs.mainTableRef.getSelectionData()
          let warnids = []
          let param = {
            warnids
          }
          if (temp.length >= 1) {
            temp.forEach(v => {
              warnids.push(v.warnid)
            })
            this.tableLoading = true
            HttpModule.doMark(param).then(res => {
              this.tableLoading = false
              if (res.code === '000000') {
                this.$message.success('标记成功！请前往监控问询单生成界面查看')
                this.refresh()
              } else {
                this.$message.error(res.message)
              }
            })
          } else {
            this.$message.warning('请至少选择一条数据')
          }
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
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      // console.log(key, obj.row)
      if (key.substring(0, 3) === 'red' || key.substring(0, 6) === 'yellow' || key.substring(0, 6) === 'orange') {
        if (key.substring(0, 3) === 'red') {
          this.warnLevel = '3'
        }
        if (key.substring(0, 6) === 'yellow') {
          this.warnLevel = '1'
        }
        if (key.substring(0, 3) === 'orange') {
          this.warnLevel = '2'
        }
        this.violationsView = true
      }
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
      console.log(this.fiRuleCode)
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        fiscalYear: this.fiscalYear || this.$store.state.userInfo.year,
        fiRuleCode: this.fiRuleCode,
        warnLevel: this.warnLevel,
        status: this.status,
        regulationType: this.regulationType,
        mofDivCode: this.mofDivCode,
        agencyCodeList: this.agencyCodeList,
        regulationClass: this.$store.getters.getRegulationClass,
        fiRuleName: this.fiRuleName,
        businessNo: this.payApplyNumber,
        jurisdiction: this.$store.getters.getIsJurisdiction,
        startTime: this.searchDataList.startTime,
        endTime: this.searchDataList.endTime
      }
      this.tableLoading = true
      HttpModule.getViolationsDetailDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.tableData.forEach(item => {
            if (item.agencyCode && item.agencyName) {
              item.agency = item.agencyCode + '-' + item.agencyName
            }
            if (item.warnLevel === 3) {
              item.warnLevel = '<span style="color:#BBBB00">黄色预警</span>'
            } else if (item.warnLevel === 2) {
              item.warnLevel = '<span style="color:orange">橙色预警</span>'
            } else if (item.warnLevel === 1) {
              item.warnLevel = '<span style="color:red">红色预警</span>'
            } else if (item.warnLevel === 4) {
              item.warnLevel = '<span style="color:blue">蓝色预警</span>'
            } else if (item.warnLevel === 5) {
              item.warnLevel = '<span style="color:gray">灰色预警</span>'
            }
          })
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
          this.tableFooterConfig.totalObj.paymentAmount = res.data.amountSum
        } else {
          this.$message.error(res.message)
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
    getAgency() {
      const param = {
        wheresql: 'and province =' + this.$store.state.userInfo.province,
        elementCode: 'AGENCY',
        // elementCode: 'AGENCY',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province
      }
      HttpModule.getTreewhere(param).then(res => {
        let treeResdata = this.getChildrenNewData1(res.data)
        this.queryConfig[3].itemRender.options = treeResdata
      })
    },
    getChildrenNewData1(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })

      return datas
    }
  },
  created() {
    this.params5 = this.$store.state.curNavModule.param5
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.$store.getters.isSx && this.getAgency()
    this.queryConfig[4].value = this.$parent.searchDataList.startTime
    this.queryConfig[5].value = this.$parent.searchDataList.endTime
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
.Titans-table ::v-deep  .vxe-body--row.row-red {
  background-color: red;
  color: #fff;
}
.T-mainFormListLayout-modulebox {
  padding: 0 !important
}
</style>
