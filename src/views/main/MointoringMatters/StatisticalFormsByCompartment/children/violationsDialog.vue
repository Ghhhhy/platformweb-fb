<template>
  <div>
    <vxe-modal
      v-model="violationsView"
      :title="title"
      width="96%"
      height="90%"
      :show-footer="true"
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
              :cell-style="cellStyle"
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
      v-if="showViolations"
      :title="dialogTitle"
      :fi-rule-code="fiRuleCode"
      :cur-status-lable="curStatusLable"
    />
  </div>
</template>

<script>
import { proconf } from './violationsDialog'
import HttpModule from '@/api/frame/main/Monitoring/StatisticalFormsByCompartment.js'
import DetailDialog from './detailDialog.vue'
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
      tableFooterConfig: {
        showFooter: false
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '违规明细查看',
      addTableData: [],
      modifyData: {},
      // 请求 & 角色权限相关配置
      menuName: '',
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
      violationsView: true,
      showViolations: false,
      fiRuleCode: '',
      // 当前点击单元格对应列的title  查看明细过滤使用
      curStatusLable: ''
    }
  },
  mounted() {
  },
  methods: {
    cellStyle ({ row, rowIndex, column }) {
      if (
        column.property !== undefined &&
        column.property !== 'mofDivName' &&
        column.property !== 'wholeCount' &&
        column.property !== 'wholeHandleCount' &&
        column.property !== 'wholeNoHandleCount') {
        return {
          fontWeight: '700'
        }
      }
    },
    dialogClose() {
      this.$parent.violationsView = false
      this.$parent.queryTableDatas()
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
      console.log(this.condition)
      let fiscalYear = this.condition.fiscalYear[0]
      this.queryTableDatas(fiscalYear)
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
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      if (
        key !== 'mofDivName' &&
        key !== 'wholeCount' &&
        key !== 'wholeHandleCount' &&
        key !== 'wholeNoHandleCount'
      ) {
        this.curStatusLable = obj.column.title || ''
        this.showViolations = true
        this.fiRuleCode = key.split('-')[0]
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
    queryTableDatas(fiscalYear) {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        fiscalYear: fiscalYear || '2022',
        warnLevel: this.warnLevel,
        // status: this.status,
        regulationType: this.regulationType,
        mofDivCode: this.mofDivCode,
        regulationClass: this.params5
      }
      this.tableLoading = true
      HttpModule.getViolationsDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          if (res.data.titleList.length !== 0) {
            this.tableColumnsConfig = [...proconf.PoliciesTableColumns]
            res.data.titleList.forEach(item => {
              this.tableColumnsConfig.push({
                title: item.fiRuleName,
                field: 'pay',
                sortable: false,
                align: 'left',
                children: [
                  {
                    title: '累计违规',
                    field: item.warnCount,
                    align: 'center',
                    width: 150
                  },
                  {
                    title: '已处理',
                    field: item.warnHandleCount,
                    align: 'center',
                    width: 150
                  },
                  {
                    title: '未处理',
                    field: item.warnNoHandleCount,
                    align: 'center',
                    width: 150
                  }
                ]
              })
            })
          }
          this.tableData = res.data.dataList
          this.mainPagerConfig.total = res.data.dataList.length
          this.tabStatusNumConfig['1'] = res.data.dataList.length
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
    }
  },
  created() {
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.params5 = this.$store.state.curNavModule.param5
    if (this.warnLevel === '1') {
      this.menuName = '预算执行监控统计(黄色预警)_按区划'
      this.tableColumnsConfig[1].title = '黄色预警整体违规情况'
    }
    if (this.warnLevel === '2') {
      this.menuName = '预算执行监控统计(橙色预警)_按区划'
      this.tableColumnsConfig[1].title = '橙色预警整体违规情况'
    }
    if (this.warnLevel === '3') {
      this.menuName = '预算执行监控统计(红色预警)_按区划'
      this.tableColumnsConfig[1].title = '红色预警整体违规情况'
    }
    if (this.warnLevel === '4') {
      this.menuName = '预算执行监控统计(蓝色预警)_按区划'
      this.tableColumnsConfig[1].title = '蓝色预警整体违规情况'
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
</style>
