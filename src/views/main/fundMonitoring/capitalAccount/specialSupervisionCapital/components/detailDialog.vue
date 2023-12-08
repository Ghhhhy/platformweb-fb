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
    detailQueryParam: {
      type: Object,
      default() {
        return {}
      }
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
      showViolations: true,
      voidOrNot: '2'
    }
  },
  mounted() {
  },
  methods: {
    dialogClose() {
      this.$parent.sxDetailVisible = false
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
      if (val.endTime) {
        val.endTime = val.endTime + ' 23:59:59'
      }
      if (val.businessTime) {
        val.businessTime = val.businessTime + ' 00:00:00'
      }
      this.searchDataList = val
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
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        warn_level: this.warningLevel, // 预警级别
        jurisdiction: true,
        regulationClass: '0207',
        ...this.searchDataList,
        voidOrNot: this.searchDataList.voidOrNot ? this.searchDataList.voidOrNot : null,
        ...this.detailQueryParam
      }
      this.tableLoading = true
      let axiosUrl = BSURL.lmp_executeWarnWarnInfos
      this.$http.post(axiosUrl, param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.tabStatusNumConfig['1'] = res.data.totalCount
          this.tableData.forEach(item => {
            if (item.handleTime === null) {
              item.handleTime = '-'
            }
          })
          this.mainPagerConfig.total = res.data.totalCount
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
    if (this.$store.getters.isSx) {
      this.searchDataList.businessTime = this.detailQueryParam && this.detailQueryParam.startTime ? this.detailQueryParam.startTime : ''
      this.searchDataList.endTime = this.detailQueryParam && this.detailQueryParam.endTime ? this.detailQueryParam.endTime : ''
    }
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
