<!-- 国库集中支付（资金支付）申请录入 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          :is-open="isShowQueryConditions"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="advSearchFormConfig"
            :query-form-data="advSearchDataList"
            @onSearchClick="search"
          />
        </div>
      </template>
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="treeTypeConfig"
          @onChangeInput="changeInput"
          @onAsideChange="asideChange"
          @onConfrimData="treeSetConfrimData"
        />
        <BsBossTree
          ref="leftTree"
          open-loading
          :defaultexpandedkeys="['0']"
          style="overflow: hidden"
          :is-server="true"
          :ajax-type="treeAjaxType"
          :server-uri="treeServerUri"
          :datas="treeData"
          :queryparams="treeQueryparams"
          :global-config="treeGlobalConfig"
          :clickmethod="onClickmethod"
        />
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
          :row-class-name="rowClassName"
          :cell-style="cellStyle"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
          @columnDrag="columnDrag"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
            <div v-if="radioShow" class="toolbar-custom-box">
              <div class="fn-inline checkbox radio-right">
                <span class="fn-inline">
                  <label>是否显示零额度</label>
                  <vxe-switch v-model="isHaveZerobak" open-label="开" open-value="1" close-label="关" close-value="0" />
                </span>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <!-- 违规详情 -->
    <!-- <BreakToRuleDialog
      v-if="ruleVisible"
      title="违规详情"
      :mof-div-code="mofDivCode"
      :fiscal-year="fiscalYear"
      :pay-app-id="payAppId"
      :audit-id="auditId"
    /> -->
    <!-- <AddDialog
      v-if="dialogVisible"
      :title="dialogTitle"
      :table-data="addTableData"
      :sum-id="selectSumId"
      :modify-data="modifyData"
      :old-useamt="olduseamt"
      :agency="agency"
      :is-disabled-amt="isDisabledAmt"
    /> -->
    <!-- <SourceDialog
      v-if="showSourceDialog"
      :id="id"
      :title="dialogTitle"
      :sum-id="selectSumId"
      :month="month"
      :fromctrl-id="fromctrlId"
      :planctrl-id="planctrlId"
      :bgt-id="bgtIds"
    /> -->
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
    <!-- <EditDialog v-if="reviewDialogVisible" :table-data="reviewTableData" :plan-data="planData" /> -->
    <!-- <BatchPayDialog v-if="batchVisible" :sum-id="selectSumId" :limit-data="limitData" /> -->
    <!-- <BreakRuleDialog
      ref="breakRuleDialog"
      :visible.sync="breakRuleVisible"
      :table-data="ruleData"
      @check="doAudit"
      @changeVisible="changeVisible"
    /> -->
    <!-- <MonitorDialog v-if="showMonitor" :sum-id="selectSumId" :limit-data="monitorList" /> -->
    <!-- 明细号 -->
    <!-- <DetailDialog
      :pay-apply-id="payApplyId"
      :dialog-visible.sync="showDetailDialog"
    /> -->
    <!-- <DetailInformationDialog
      ref="detailInformation"
      :show-information.sync="showInformation"
      :form-data="details"
      :planid="selectSumId"
      :attachment-id="billguid"
    /> -->
    <!-- <IndicatorDialog
      :sum-id="selectSumId"
      :dialog-visible.sync="showIndicator"
    /> -->
    <!-- <UnitDetailDialog
      :show-unit-detail-info.sync="showUnitDetailInfo"
      :user-info="userInfo"
      :agency-id="agencyDetailId"
    /> -->
    <!-- // 批量录入 -->
    <!-- <BatchAddDialog v-if="batchAddVisible" :sum-id="selectSumId" :budget-info="addTableData" /> -->
    <!-- 打印 -->
    <!-- <PrintPreviewMultiplyBusDept :visible.sync="printViewVisible" :guids="printGuids" :cpt="cptName" :dz-cpt="bankName" /> -->
    <!-- 不可作废数据 -->
    <!-- <DisableDialog
      v-if="showDisableDialog"
      :title="disableDialog"
      :table-data="disableTableData"
      :table-config="disableTableConfig"
    /> -->
    <!-- <AgencyReminder
      v-if="agencyReminderDialog"
      title="以下单位支付凭证回单后超过5天未生成机制凭证"
      :condition-config="reminderConfig"
      :supply-table-data="reminderSupplement"
    /> -->
    <!-- 监控违规 -->
    <!-- <MonitoreDialog
      v-if="monitoreVisible"
      title="违规详情"
      :pay-app-id-list="payAppIdList"
    /> -->
    <!-- 拦截规则数据展示 -->
    <BsDialog
      :visible.sync="showAddPlanDialogView"
      :show-header="true"
      :show-footer="false"
      :show-close="true"
      :close-destory="true"
      title="监控信息"
      width="60%"
    >
      <div slot="context" v-loading="false">
        <div class="topTable" style="height:60vh">
          <BsTable
            ref="operationTableRef"
            v-loading="loadRule"
            :footer-config="{ showFooter: false }"
            :table-columns-config="secondTableColumnsConfig"
            :table-data="tableSecondData"
            :toolbar-config="false"
            :pager-config="false"
          />
        </div>
      </div>
    </BsDialog>
  </div>
</template>

<script>
import { proconf } from './payVoucherInput'
import loadBsConfig from './config'
// import AddDialog from './addDialog'
// import BreakToRuleDialog from './breakRuleDialog'
// import MonitoreDialog from './monitoreDialog'
// import { commonFn } from '../../payCommon/payCommon.js'
import { commonFn } from '@/components/InvoiceTable/common.js'
// import HttpModule from '@/api/frame/main/pay/payVoucherApi.js'
import HttpModule from '@/api/frame/main/Monitoring/Monitoring.js'
// import EditDialog from '../common/editDialog'
// import BatchPayDialog from '../common/batchPayDialog.vue'
// import BatchAddDialog from './batchAddDialog.vue'
// import MonitorDialog from '../common/monitorDialog'
// import SourceDialog from './SourceDialog.vue'
// import DetailDialog from '@/views/main/pay/children/DetailDialog.vue'
// import DetailInformationDialog from '@/views/main/DetailInformation/DetailInformation'
// import IndicatorDialog from '@/views/main/children/indicator.vue'
// import UnitDetailDialog from '@/views/main/unitDetail/UnitDetailDialog'
// import DisableDialog from './disableDialog'
// import AgencyReminder from '../common/agencyReminder/agencyReminder.vue'
export default {
  mixin: [loadBsConfig],
  components: {
    // AddDialog,
    // EditDialog,
    // BatchPayDialog,
    // BatchAddDialog,
    // MonitorDialog,
    // DetailDialog,
    // DetailInformationDialog,
    // IndicatorDialog,
    // UnitDetailDialog
    // SourceDialog,
    // DisableDialog,
    // BreakToRuleDialog
    // AgencyReminder,
    // MonitoreDialog
  },
  watch: {
    isHaveZerobak(newVal, oldVal) {
      this.isHaveZero = Number(this.isHaveZerobak).toString()
      this.refresh()
    },
    advSearchFormConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      isDisabledAmt: false,
      bgtIds: '',
      agency: {
        agency_id: '',
        agency_code: '',
        agency_name: ''
      },
      mofDivCode: '',
      fiscalYear: '',
      payAppId: '',
      auditId: '',
      ruleVisible: false,
      loadRule: false,
      showAddPlanDialogView: false,
      tableSecondData: [],
      printGuids: [],
      bankName: '',
      printViewVisible: false,
      batchAddVisible: false,
      showUnitDetailInfo: false,
      showInformation: false,
      showIndicator: false,
      agencyDetailId: '',
      details: {},
      selectSumId: '',
      showDetailDialog: false,
      payApplyId: '',
      // 来源去向配置--------start
      showSourceDialog: false,
      detailInformation: [],
      // 来源去向配置--------end
      radioShow: true,
      isHaveZerobak: false,
      breakRuleVisible: false,
      ruleData: [],
      // 树配置
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
            label: '部门支出经济分类'
          }
        ]
      },
      treeGlobalConfig: {
        inputVal: ''
      },
      treeQueryparams: { elementCode: 'AGENCY' },
      treeServerUri: 'pay-clear-service/v2/lefttree',
      treeAjaxType: 'get',
      treeData: [],
      leftTreeVisible: true,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {

        changeBtns: true,
        buttons: proconf.toolBarStatusButtons,
        curButton: {
          type: 'button', // or
          iconName: 'base-zhibaio.png', // type: 'select',
          iconUrl: '',
          label: '指标额度', // label: '代办事项',
          code: '9', // code: '14',
          curValue: '9' // curValue: '1'
        },
        buttonsInfo: proconf.statusRightToolBarButton,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      buttonsInfo: proconf.statusRightToolBarButtonByBusDept,
      buttonsInfozsc: proconf.statusRightToolBarButtonzsc,
      buttonsInfosc: proconf.statusRightToolBarButton,
      cptName: '',
      tabStatusNumConfig: {
        '1,4': 0,
        '2,5': 0,
        '1,4,2,5': 0,
        1: 0,
        2: 0,
        4: 0,
        5: 0,
        0: '-'
      },
      isShowQueryConditions: true,
      toolBarStatusSelect: {
        type: 'button',
        iconName: 'base-zhibaio.png',
        iconUrl: '',
        label: '指标额度',
        code: '9',
        curValue: '9'
      },
      // 查询栏相关配置
      // table 相关配置
      tableLoading: false,
      // tableColumnsConfig: proconf.palnLimitTableColumns,
      tableColumnsConfig: [],
      elseColumns: [],
      allColumns: [],
      noplanColumns: [],
      limitColumns: [],
      tableData: [],
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
        totalObj: {
          aviamt: 0,
          useamt: 0,
          canuseamt: 0,
          planAviamt: 0,
          planUseamt: 0,
          pay_app_amt: 0,
          useableamt: 0,
          planCanuseamt: 0
        },
        combinedType: ['switchTotal'],
        showFooter: true
      },
      // 操作日志
      logData: [],
      // advSearchFormConfig: proconf.limitSearch,
      advSearchFormConfig: [],
      advSearchFormConfig1: [],
      highQueryConfig: [],
      // advSearchDataList: proconf.advSearchDataList,
      advSearchDataList: {},
      showLogView: false,
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '新增',
      addTableData: [],
      modifyData: {},
      // 送审弹窗
      reviewTableData: [],
      reviewDialogVisible: false,
      planData: [],
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
      olduseamt: null,
      batchVisible: false,
      limitData: {},
      // 监控弹窗
      showMonitor: false,
      // 监控数据
      monitorList: [],
      // 自动审核通过的数量
      isChecked: 0,
      // 自动审核未通过的
      notChecked: 0,
      // 预警级别为2的数量
      notCheckedTwo: 0,
      // 级别为冻结的数据
      frozenData: [],
      fromctrlId: '',
      planctrlId: '',
      condition: {},
      showDisableDialog: false,
      disableDialog: '不可作废数据',
      disableTableData: null,
      disableTableConfig: null,
      // 区分单位还是财政
      differConditon: {
        acc_type_code: ''
      },
      configData1: {},
      userConfigData1: {},
      configData2: {},
      userConfigData2: {},
      configData3: {},
      configData4: {},
      userConfigData3: {},
      rowColor: '',
      secondTableColumnsConfig: [
        {
          title: '预警级别',
          field: 'warn_level',
          sortable: true,
          align: 'center',
          width: '200px'
        },
        {
          title: '监控状态',
          field: 'checkStatus',
          sortable: true,
          align: 'center',
          width: '200px'
        },
        {
          title: '规则名称',
          field: 'fi_source_desc',
          sortable: true,
          align: 'center',
          width: '200px'
        },
        {
          title: '触发提示信息',
          field: 'trigger_cond',
          sortable: true,
          align: 'center',
          width: '500px'
        },
        {
          title: '规则提示信息',
          field: 'rule_remark',
          sortable: true,
          align: 'center',
          width: '500px'
        },
        {
          title: '处理意见',
          field: 'deal_result',
          sortable: true,
          align: 'center',
          width: '500px'
        }
      ],
      // 指标额度高级查询id
      advancedQueryId: 'A839B4E70D4B44A59B6AA60AD8854F26',
      // 支付申请列表高级查询
      payQueryId: 'C791C41845B34860AD9BE78583224C4B',
      // 指标额度表头id
      quotaId: '4822C2DABD5F46C48437BE6270E1FC0F',
      // 已办表头id
      planId: '007576EE211243B2B76ADEB89BBD8793',
      // 全部单据表头id
      documentsId: '845F2628441B4A1586EBD38D039118E5',
      // 不可作废数据弹框表头
      popoutId: '7A4FDEBEBAF9440692C4B795EBD0880E',
      // 待办表头
      noplanId: '8F2319C8DCB64AD398C82EF718999AE0',
      todayDate: '',
      formatwdate: '',
      agencyReminderDialog: false,
      reminderConfig: {},
      reminderSupplement: {},
      monitoreVisible: false,
      payAppIdList: []
    }
  },
  mounted() {
    this.getTodayDate()
  },
  methods: {
    // 单元格样式
    rowClassName ({ row, rowIndex }) {
      if (this.toolBarStatusSelect.curValue === '1' && this.tableData) {
        if (row.control_type === '1') {
          return 'row-blue'
        } else if (row.control_type === '2') {
          return 'row-yellow'
        } else if (row.control_type === '3') {
          return 'row-red'
        }
      }
    },
    // 初始化高级查询data
    getSearchDataList() {
      // 下拉树
      let searchDataObj = {}
      this.advSearchFormConfig.forEach(item => {
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
      this.advSearchDataList = searchDataObj
      if (this.toolBarStatusSelect.curValue === '0') {
        if (this.condition.create_time1 === undefined && this.condition.create_time2 === undefined) {
          this.advSearchDataList.create_time1 = this.formatwdate
          this.advSearchDataList.create_time2 = this.todayDate
        } else {
          this.advSearchDataList.create_time1 = this.condition.create_time1
          this.advSearchDataList.create_time2 = this.condition.create_time2
        }
      }
    },
    // 获取近一月日期
    getTodayDate() {
      var nowdate = new Date()
      var y = nowdate.getFullYear()
      var m = nowdate.getMonth() + 1
      var d = nowdate.getDate()
      this.todayDate = y + '-' + m + '-' + d

      nowdate.setMonth(nowdate.getMonth() - 1)
      var year = nowdate.getFullYear()
      var month = nowdate.getMonth() + 1
      var day = nowdate.getDate()
      this.formatwdate = year + '-' + month + '-' + day
    },
    // 初始化高级查询参数condition
    getConditionList() {
      let condition = {}
      this.advSearchFormConfig.forEach(item => {
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
    // 子组件调用方法
    // 新增成功后切换状态按钮
    onAddSuccess() {
      this.toolBarStatusBtnConfig.curButton = {
        type: 'select',
        iconName: 'base-daiban.png',
        iconNameActive: 'base-daiban-active.png',
        iconUrlActive: '',
        iconUrl: '',
        label: '待办事项',
        code: '1,4',
        curValue: '1,4'
      }
      this.toolBarStatusSelect = {
        type: 'select',
        iconName: 'base-daiban.png',
        iconNameActive: 'base-daiban-active.png',
        iconUrlActive: '',
        iconUrl: '',
        label: '待办事项',
        code: '1,4',
        curValue: '1,4'
      }
      this.$refs.tabPanel.initTabStatusBtnConfig()
      this.tableColumnsConfig = this.elseColumns
      this.refresh()
    },
    cellStyle ({ row, rowIndex, column }) {
      if (column.property === 'fi_cur_task') {
        return {
          color: '#6e7fe7'
        }
      }
    },
    // 切换状态栏
    onStatusTabClick(obj) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.curValue) {
        // 指标额度
        case '9':
          this.tableColumnsConfig = this.limitColumns
          this.menuName = '指标额度列表'
          // 额度表单配置
          this.advSearchFormConfig = this.advSearchFormConfig1
          // this.getSearchDataList()
          this.radioShow = true
          break
        case '1':
        case '4':
        case '1,4':
          this.tableColumnsConfig = this.noplanColumns
          this.menuName = '国库集中支付申请列表'
          this.radioShow = false
          // 非额度表单配置
          this.advSearchFormConfig = this.highQueryConfig
          break
        case '2': // 已送审
        case '5': // 已作废
        case '2,5': // 已办事项
          this.tableColumnsConfig = this.elseColumns
          this.menuName = '国库集中支付申请列表'
          this.radioShow = false
          // 非额度表单配置
          this.advSearchFormConfig = this.highQueryConfig
          break
        case '1,2,4,5': // 全部单据
        case '0': // 全部单据
          this.tableColumnsConfig = this.allColumns
          this.menuName = '国库集中支付申请列表'
          this.radioShow = false
          this.advSearchFormConfig = this.highQueryConfig
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.refresh()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      switch (obj.code) {
        // 新增
        case 'add-toolbar-add':
          this.onAddToolbarClickAdd(obj, context, e)
          break
        // 送审
        case 'operation-toolbar-review':
          // let controlType = this.$refs.mainTableRef.getSelectionData()[0].control_type
          // let dirCode = this.$refs.mainTableRef.getSelectionData()[0].is_dir_code
          // if (controlType === '<i class="el-icon-message-solid" style="color:yellow;font-size:25px;border:1px solid yellow;"></i>' && (dirCode !== '09' && dirCode !== '09001')) {
          //   this.accessory = true
          // } else {
          //   this.accessory = false
          // }
          // this.doAuditByCheck(obj, context, e)
          this.auditByCheck(obj, context, e)// 经过监控的送审
          break
        // 违规详情
        case 'operation-toolbar-breakrule':
          this.breakrule(obj, context, e)
          break
        // 送审并生成
        case 'toolbar-review-do':
          this.doReview(obj, context, e)
          break
        // 撤销送审
        case 'operation-toolbar-cancel-review':
          this.cancelCheck()
          break
        // 作废
        case 'operation-toolbar-abort':
          this.doDiscard(obj, context, e)
          break
        // 刷新
        case 'add-toolbar-refresh':
          this.refresh()
          break
        // 刷新
        case 'operation-toolbar-refresh':
          this.refresh()
          break
        // 监控弹窗
        case 'operation-toolbar-monitor':
          this.monitor()
          break
        // 批量支付
        case 'add-toolbar-batch-pay':
          this.onbatchPay()
          break
        // 批量录入
        case 'add-toolbar-batch-add':
          this.onbatchAdd()
          break
        // 来源明细
        case 'operation-toolbar-detail':
          this.onAddToolbarClickDetail(obj, context, e)
          break
        case 'operation-toolbar-print':
          this.doPrint(obj, context, e)
          break
        default:
          break
      }
    },
    // 违规详情
    breakrule() {
      if (this.$refs.mainTableRef.getSelectionData().length !== 1) {
        this.$message.error('请选择一条数据')
        return
      }
      this.mofDivCode = this.$refs.mainTableRef.getSelectionData()[0].mof_div_code
      this.fiscalYear = this.$refs.mainTableRef.getSelectionData()[0].fiscal_year
      this.payAppId = this.$refs.mainTableRef.getSelectionData()[0].pay_app_id
      this.auditId = this.$refs.mainTableRef.getSelectionData()[0].id
      this.ruleVisible = true
    },
    // 打印
    doPrint() {
      // 选择数据
      let checkItems = this.$refs.mainTableRef.getSelectionData()
      if (checkItems.length <= 0) {
        this.$message.warning('请选择数据')
        return
      }
      this.printGuids = []
      checkItems.forEach(element => {
        this.printGuids.push(element.id)
      })
      this.printViewVisible = true
    },
    // 点击查看来源去向
    onAddToolbarClickDetail(obj, context, e) {
      if (this.$refs.mainTableRef.getSelectionData().length !== 1) {
        this.$message.error('请选择一条数据')
        return
      }
      this.detailInformation = []
      this.id = this.$refs.mainTableRef.getSelectionData()[0].id
      this.month = this.$refs.mainTableRef.getSelectionData()[0].month
      this.showSourceDialog = true
      this.selectSumId = this.$refs.mainTableRef.getSelectionData()[0].sumguid
      this.bgtIds = this.$refs.mainTableRef.getSelectionData()[0].bgt_id
      this.fromctrlId = this.$refs.mainTableRef.getSelectionData()[0].fromctrl_id
      this.planctrlId = this.$refs.mainTableRef.getSelectionData()[0].caliber_id
      this.detailInformation.push(this.$refs.mainTableRef.getSelectionData()[0])
      this.dialogTitle = '来源去向'
    },
    doAudit(ids, ruleRemarks) {
      var params = {
        actionName: '送审',
        appId: 'pay_voucher',
        roleguid: this.$store.state.curNavModule.roleguid,
        menuId: this.$store.state.curNavModule.guid,
        actionType: '2',
        glType: '0',
        ids: ids
      }
      this.tableLoading = true
      HttpModule.doAudit(params).then(res => {
        this.tableLoading = false
        if (res.rscode === '200') {
          this.$message.success('送审成功')
          this.refresh()
          for (let i = 0; i < ids.length; i++) {
            this.ruleData.forEach((item, index) => {
              if (ruleRemarks[i] === item.rule_remark) {
                this.ruleData.splice(index, 1)
              }
            })
          }
          if (this.ruleData.length === 0) {
            this.breakRuleVisible = false
          }
        } else {
          this.$message.error('送审失败')
        }
      })
    },
    changeVisible(val) {
      this.breakRuleVisible = val
    },
    // 监控弹窗
    monitor() {
      if (this.$refs.mainTableRef.getSelectionData().length < 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.monitorList = this.$refs.mainTableRef.getSelectionData()[0]
      this.showMonitor = true
    },
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      switch (optionType) {
        // 编辑
        case 'edit':
          this.clickUpdateBtn(row)
          break
        // 操作日志
        case 'report':
          this.queryActionLog(row)
          break
        // 附件
        case 'attachment':
          this.showAttachment(row)
          break
        case 'add':
          this.clickAddBtn(row)
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
    // 左侧树
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
    },
    onClickmethod(node) {
      if (node.children !== null && node.children.length !== 0 && node.id !== '0') {
        return
      }
      if (node.id !== '0') {
        let key =
          this.$refs.treeSet.treeConfigIn.curRadio.toLowerCase() + '_code'
        this.condition[key] = node.code
      } else {
        this.condition = {}
      }
      this.queryTableDatas()
    },
    treeSetConfrimData(curTree) {
      this.treeQueryparams.elementCode = curTree.code
      this.$refs.leftTree.refreshTree()
    },
    asideChange() {
      this.leftTreeVisible = false
    },
    // 查看附件
    showAttachment(row) {
      this.billguid = row.attachment_id
      this.showAttachmentDialog = true
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      switch (key) {
        // 申请编号
        case 'pay_app_no':
          this.viewDetail(obj.row)
          break
        // 项目
        case 'pro_name':
          this.details = obj.row
          this.showInformation = true
          break
        // 预算单位
        case 'agency':
          this.viewUnitDetail(obj.row)
          break
        // 指标文号
        case 'cor_bgt_doc_no':
          this.viewIndicator(obj.row)
          break
        // 状态
        case 'workflow_status_code':
          if (this.toolBarStatusSelect.curValue === '2' || this.toolBarStatusSelect.curValue === '1') {
            if (obj.row.control_type) {
              this.showAddPlanDialogView = true
              this.loadRule = true
              HttpModule.getInterceptList({ 'pay_app_no': obj.row.pay_app_no }).then(res => {
                if (res.rscode === '200') {
                  this.loadRule = false
                  this.tableSecondData = res.data.rows
                } else {
                  this.loadRule = false
                  this.$message.warning(res.result)
                }
              })
            } else {
              this.$message.warning('此数据没有触发监控规则！')
            }
          }
          break
        case 'control_type':
          if (this.toolBarStatusSelect.curValue === '2' || this.toolBarStatusSelect.curValue === '1') {
            if (obj.row.control_type) {
              this.showAddPlanDialogView = true
              this.loadRule = true
              HttpModule.getInterceptList({ 'pay_app_no': obj.row.pay_app_no }).then(res => {
                if (res.rscode === '200') {
                  this.loadRule = false
                  this.tableSecondData = res.data.rows
                } else {
                  this.loadRule = false
                  this.$message.warning(res.result)
                }
              })
            } else {
              this.$message.warning('此数据没有触发监控规则！')
            }
          }
          break
        case 'fi_cur_task':
          if (this.toolBarStatusSelect.curValue === '2' || this.toolBarStatusSelect.curValue === '1') {
            if (obj.row.control_type) {
              this.showAddPlanDialogView = true
              this.loadRule = true
              HttpModule.getInterceptList({ 'pay_app_no': obj.row.pay_app_no }).then(res => {
                if (res.rscode === '200') {
                  this.loadRule = false
                  this.tableSecondData = res.data.rows
                } else {
                  this.loadRule = false
                  this.$message.warning(res.result)
                }
              })
            } else {
              this.$message.warning('此数据没有触发监控规则！')
            }
          }
          break
      }
    },
    // 查看单位详情
    viewUnitDetail(row) {
      this.agencyDetailId = row.agency_id
      this.showUnitDetailInfo = true
    },
    // 查看指标文号详情
    viewIndicator(row) {
      // 待办已办获取
      if ('9'.indexOf(this.toolBarStatusSelect.curValue) === -1) {
        this.selectSumId = row.bgt_id
        this.showIndicator = true
        return
      }
      // 计划额度获取
      this.selectSumId = row.sumguid
      this.showIndicator = true
    },
    viewDetail(row) {
      this.payApplyId = row.pay_app_id
      if (row.pay_bus_type_code === '2' || row.pay_bus_type_code === '3' || row.pay_bus_type_code === '4') {
        this.showDetailDialog = true
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      // onSearchResetClick resetData(this.advSearchDataList)
      this.$refs.queryFrom.onSearchResetClick()
      if (this.toolBarStatusSelect.curValue === '0') {
        if (this.condition.create_time1 === undefined && this.condition.create_time2 === undefined) {
          this.advSearchDataList.create_time1 = this.formatwdate
          this.advSearchDataList.create_time2 = this.todayDate
        } else {
          this.advSearchDataList.create_time1 = this.condition.create_time1
          this.advSearchDataList.create_time2 = this.condition.create_time2
        }
      }
      this.queryTableDatas()
      this.queryTableDatasCount()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    // 经过监控的送审
    auditByCheck(obj, context, e) {
      if (this.$refs.mainTableRef.getSelectionData().length < 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      let self = this
      let ids = []
      this.planData = this.$refs.mainTableRef.getSelectionData()
      this.$refs.mainTableRef.getSelectionData().forEach(item => {
        ids.push(item.pay_app_id)
      })
      this.payAppIdList = ids
      var paramss = {
        actionName: '送审',
        appId: 'pay_voucher',
        roleguid: this.$store.state.curNavModule.roleguid,
        menuId: self.$store.state.curNavModule.guid,
        actionType: '2',
        glType: '0',
        ids: ids
      }
      self.tableLoading = true
      // alert(this.$refs.break.tipInfo)
      HttpModule.doAuditByCheck(paramss).then(res => {
        self.tableLoading = false
        if (res && res.rscode === '200') {
          if (res.data.isHaveMonitore) {
            this.monitoreVisible = true
          } else {
            if (res.data.isOpen === false) {
              this.$message.success(res.data.message)
              self.refresh()
              return
            }
            var va = res.data.autoAuditResult
            var max1 = 0
            for (var j = 0; j < va.length; j++) {
              if (va[j].control_type === '3') {
                max1 = 3
              // 1 是冻结，2是预警，3 是拦截
              } else if (va[j].control_type === '2' && max1 === 0) {
                max1 = 2
              } else if (va[j].control_type === '1') {
                max1 = 1
                break
              }
            }
            if (max1 === 2) {
              this.$refs.breakRuleDialog.tipInfo = ''
            } else {
              this.$refs.breakRuleDialog.tipInfo = '注意：拦截状态的数据请填写单位联系人，联系电话信息并上传有效附件，便于监控管理员进行处理和沟通，否则监控管理员无放行依据！'
            }
            if (max1 === 2 || max1 === 3 || max1 === 1) {
              this.doAfterAutocheck(res.data.autoAuditResult)
              let controlLevel = ''
              switch (max1) {
                case 1:
                  controlLevel = '冻结'
                  break
                case 2:
                  controlLevel = '预警'
                  break
                case 3:
                  controlLevel = '拦截'
                  break
              }
              self.$confirm('送审失败' +
                '</br>数据疑似违规：触发监控规则[' + this.notChecked + ']条，留在当前岗。</br>此数据涉及监控状态为拦截、预警，故需要先行处理“拦截”数据，然后根据提示，由单位自行判断“预警”状态数据是否需要继续，如需继续可继续提交支付申请。', '信息', {
                dangerouslyUseHTMLString: true,
                showCancelButton: false,
                confirmButtonText: '确定',
                type: controlLevel === '2' ? 'warning' : 'error'
              }).then(() => {
                self.refresh()
              }).catch(e => {
                self.refresh()
              })
              setTimeout(function () {
                self.tableLoading = false
              }, 1000)
            } else {
              this.doAfterAutocheck(res.data.autoAuditResult)
              self.$confirm('送审成功！', '信息', {
                dangerouslyUseHTMLString: true,
                showCancelButton: false,
                confirmButtonText: '确定',
                type: 'success'
              }).then(() => {
                self.refresh()
              }).catch(e => {
                self.refresh()
              })
              setTimeout(function () {
                self.tableLoading = false
              }, 1000)
            }
          }
        } else {
          self.$message.warning('审核失败:' + res.result)
          self.tableLoading = false
        }
      })
    },
    doAfterAutocheck(data) {
      this.ruleData = []
      this.notChecked = 0
      this.isChecked = 0
      this.notChecked = 0
      data.forEach(item => {
        if (item.control_type === '2') {
          this.ruleData.push(item)
          this.notCheckedTwo++
        }
        if (item.control_type === '3') {
          this.ruleData.push(item)
        }
        if (item.control_type === '1') {
          this.ruleData.push(item)
        }
        if (item.control_type === null) {
          this.isChecked++
        } else {
          this.notChecked++
        }
      })
      if (this.ruleData.length > 0) {
        this.breakRuleVisible = true
      }
    },

    cancelCheck(obj, context, e) {
      if (this.$refs.mainTableRef.getSelectionData().length < 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      let ids = []
      this.planData = this.$refs.mainTableRef.getSelectionData()
      this.$refs.mainTableRef.getSelectionData().forEach(item => {
        ids.push(item.id)
      })
      let data = {
        actionName: '送审',
        appId: 'pay_voucher',
        roleguid: this.$store.state.curNavModule.roleguid,
        menuId: this.$store.state.curNavModule.guid,
        actionType: '3',
        glType: '0',
        ids: ids
      }
      this.tableLoading = true
      HttpModule.doRecallAudit(data).then(res => {
        this.tableLoading = false
        if (res && res.rscode === '200') {
          this.$message.success('撤销送审成功')
          this.refresh()
        } else {
          this.$message.warning('撤销送审送审状态失败:' + res.result)
        }
      })
    },
    // 新增或修改弹框
    clickAddBtn(row) {
      if (this.addTableData.length > 0) {
        this.addTableData = []
      }
      this.dialogTitle = '新增'
      this.addTableData.push(row)
      this.olduseamt = row.useamt
      this.selectSumId = row.sumguid
      this.agency.agency_id = row.agency_id
      this.agency.agency_code = row.agency_code
      this.agency.agency_name = row.agency_name

      this.reminderSupplement.agency = row.agency_code + '-' + row.agency_name
      this.reminderSupplement.agency_id = row.agency_id
      this.reminderSupplement.agency_code = row.agency_code
      this.reminderSupplement.agency_name = row.agency_name

      this.reminderConfig.agency_code = row.agency_code
      this.reminderConfig.fund_type_code = row.fund_type_code
      // this.reminderConfig.acc_type_code = row.acc_type_code

      this.doGetAgencyReminderCount(this.reminderConfig)

      this.dialogVisible = true
    },
    // 点击新增
    onAddToolbarClickAdd(obj, context, e) {
      let row = []
      row = this.$refs.mainTableRef.getSelectionData()[0]
      if (this.$refs.mainTableRef.getSelectionData().length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.addTableData = this.$refs.mainTableRef.getSelectionData()
      this.agency.agency_id = row.agency_id
      this.agency.agency_code = row.agency_code
      this.agency.agency_name = row.agency_name

      this.reminderSupplement.agency = row.agency_code + '-' + row.agency_name
      this.reminderSupplement.agency_id = row.agency_id
      this.reminderSupplement.agency_code = row.agency_code
      this.reminderSupplement.agency_name = row.agency_name

      this.reminderConfig.agency_code = row.agency_code
      this.reminderConfig.fund_type_code = row.fund_type_code
      // this.reminderConfig.acc_type_code = row.acc_type_code
      this.doGetAgencyReminderCount(this.reminderConfig)

      this.dialogVisible = true
      this.selectSumId = this.$refs.mainTableRef.getSelectionData()[0].sumguid
      this.dialogTitle = '新增'
    },
    async doGetAgencyReminderCount(obj) {
      let condition = {}
      Object.assign(condition, obj)
      if (condition.fund_type_code && condition.fund_type_code !== undefined && condition.fund_type_code !== '') {
        condition.fund_type_code = {
          right: condition.fund_type_code.substr(0, 1)
        }
      }
      let param = {
        appId: this.$store.state.curNavModule.appid,
        roleId: this.$store.state.curNavModule.roleguid,
        menuId: this.$store.state.curNavModule.guid,
        condition: condition
      }
      if (this.reminderConfig.fund_type_code.indexOf('1') === 0) {
        await HttpModule.getReceiptedVoucher(param).then(res => {
          if (res.rscode === '200') {
            if (res.data.notAccount !== 0) {
              this.agencyReminderDialog = true
            }
          } else {
            // this.$message.warning(res.result)
          }
        }).catch(() => {
        })
      } else if (this.reminderConfig.fund_type_code.indexOf('3') === 0) {
        await HttpModule.getReceiptedInc(param).then(res => {
          if (res.rscode === '200') {
            if (res.data.notAccount !== 0) {
              this.agencyReminderDialog = true
            }
          } else {
          }
        }).catch(() => {
        })
      }
    },
    // 批量支付
    onbatchPay() {
      if (this.$refs.mainTableRef.getSelectionData().length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      if (this.$refs.mainTableRef.getSelectionData()[0].is_gov_pur_code === '1') {
        this.$message.warning('政府采购指标，不允许使用批量业务支付')
        return
      }
      this.limitData = this.$refs.mainTableRef.getSelectionData()[0]
      this.selectSumId = this.$refs.mainTableRef.getSelectionData()[0].sumguid
      this.batchVisible = true
    },
    // 批量录入
    onbatchAdd() {
      if (this.$refs.mainTableRef.getSelectionData().length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.addTableData = []
      this.addTableData = this.$refs.mainTableRef.getSelectionData()
      this.selectSumId = this.$refs.mainTableRef.getSelectionData()[0].sumguid
      this.batchAddVisible = true
    },
    // 修改
    clickUpdateBtn(context) {
      if (context.check_type === '1') {
        this.$message.error('因数据违规而留在当前岗的数据,不允许修改')
        return
      }
      if (window.gloableToolFn.largeMonitor) {
        let isGo = true
        const params = {
          guid: context.pay_app_id,
          mofDivCode: context.mof_div_code,
          fiscalYear: context.fiscal_year
        }
        HttpModule.getWarnDataDetail(params).then(res => {
          if (res.code === '000000') {
            if (res.data.ruleInfos) {
              res.data.ruleInfos.forEach(item => {
                if (item.handleResult === 1 || item.handleResult === 3) {
                  isGo = false
                }
              })
              if (!isGo) {
                this.$message.error('【已形成违规数据在监控平台且已进入处理流程，不可编辑业务数据】')
                return
              }
              this.dialogTitle = '修改'
              // this.addTableData.push(context)
              this.addTableData = []
              this.addTableData[0] = context
              this.modifyData = context
              this.selectSumId = context.balance_id
              this.dialogVisible = true
            } else {
              this.dialogTitle = '修改'
              // this.addTableData.push(context)
              this.addTableData = []
              this.addTableData[0] = context
              this.modifyData = context
              this.selectSumId = context.balance_id
              this.dialogVisible = true
            }
          }
        })
      } else {
        if (context.pay_bus_type_code === '2' || context.pay_bus_type_code === '3' || context.pay_bus_type_code === '4') {
          this.isDisabledAmt = true
        } else {
          this.isDisabledAmt = false
        }
        this.dialogTitle = '修改'
        this.addTableData = []
        this.addTableData[0] = context
        this.modifyData = context
        this.selectSumId = context.balance_id
        this.dialogVisible = true
      }
    },
    queryTableDatasCount() {
      const params = {
        statusCodeArr: ['9', '1', '2', '4', '5', '1,2,4,5'],
        // statusCodeArr: ['9', '1', '2', '4', '5', '1,2,4,5'],
        menuId: this.menuId,
        isHaveZero: this.isHaveZero,
        appId: 'pay_voucher',
        roleId: this.$store.state.curNavModule.roleguid,
        params: this.params5,
        isInput: '9',
        condition: this.differConditon
      }
      HttpModule.queryTableDatasCount(params).then(res => {
        if (res.rscode === '200') {
          this.tabStatusNumConfig = res.data
          this.tabStatusNumConfig = Object.assign(res.data)
          this.tabStatusNumConfig['1,4'] = res.data['1'] + res.data['4']
          this.tabStatusNumConfig['2,5'] = res.data['2'] + res.data['5']
          this.tabStatusNumConfig['1,2,4,5'] = res.data['1,2,4,5']
          // this.tabStatusNumConfig['0'] = res.data['0']
          // this.tabStatusNumConfig['1,4'] + this.tabStatusNumConfig['2,5']
        }
      })
    },
    // 查询 table 数据
    queryTableDatas() {
      let sumFieldArr = null
      if (this.toolBarStatusSelect.curValue === '9') {
        sumFieldArr = ['aviamt', 'canuseamt', 'planaviamt', 'plancanuseamt', 'planuseamt', 'useamt', 'create_time']
      } else {
        sumFieldArr = ['pay_app_amt']
      }
      const param = {
        statusCode: this.toolBarStatusSelect.curValue,
        menuId: this.menuId,
        leftTreeCode: '',
        isHaveZero: this.isHaveZero,
        appId: this.appId,
        roleguid: this.$store.state.curNavModule.roleguid,
        roleId: this.$store.state.curNavModule.roleguid,
        params: this.params5,
        pageNum: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        sumFieldArr: sumFieldArr,
        sort: 'create_time desc',
        isInput: '9',
        condition: this.condition,
        scopeColumnArr: sumFieldArr
      }
      if (this.toolBarStatusSelect.curValue === '0') {
        param.scopeColumnArr = ['create_time']
      }
      if (this.toolBarStatusSelect.curValue === '0' && this.condition.create_time1 === undefined && this.condition.create_time2 === undefined) {
        this.condition.create_time1 = this.formatwdate
        this.condition.create_time2 = this.todayDate
      }
      // 区分单位和财政
      Object.assign(param.condition, this.differConditon)
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.rscode === '200') {
          this.tableData = res.data.rows || []
          this.tableData.forEach(item => {
            if (item.control_type === 1) {
              item.control_type = '<i class="el-icon-message-solid" style="color:blue;font-size:25px;border:1px solid blue;"></i>'
            } else if (item.control_type === 2) {
              item.control_type = '<i class="el-icon-message-solid" style="color:yellow;font-size:25px;border:1px solid yellow;"></i>'
            } else if (item.control_type === 3) {
              item.control_type = '<i class="el-icon-message-solid" style="color:red;font-size:25px;border:1px solid red;"></i>'
            }
            if (item.payee_acct_name && item.payee_acct_name.indexOf('') !== -1) {
              item.payee_acct_name = item.payee_acct_name.replace('', '龚')
            }
          })
          this.mainPagerConfig.total = res.data.total
          const { plancanuseamt, canuseamt } = res.data.sums
          this.tableFooterConfig.totalObj = res.data.sums
          this.tableFooterConfig.totalObj.useableamt = plancanuseamt > canuseamt ? canuseamt : plancanuseamt
        } else {
          this.$message.warning('获取计划信息失败:' + res.result)
        }
      })
    },
    // 查询和高级查询
    search() {
      let condition = this.getConditionList()
      for (let key in condition) {
        if (
          (this.advSearchDataList[key] !== undefined) &
          (this.advSearchDataList[key] !== null)
        ) {
          if (Array.isArray(this.advSearchDataList[key])) {
            condition[key] = this.advSearchDataList[key]
          } else if (typeof (this.advSearchDataList[key]) === 'string') {
            if (this.advSearchDataList[key].trim() !== '') {
              this.advSearchDataList[key].split(',').forEach(item => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      if (this.advSearchDataList.payee_acct_name && this.advSearchDataList.payee_acct_name.trim() !== '') {
        condition.payee_acct_name = this.advSearchDataList.payee_acct_name
      }
      // if (this.advSearchDataList.create_time && this.advSearchDataList.create_time.trim() !== '') {
      //   condition.create_time = this.advSearchDataList.create_time.replace(/-/g, '')
      // }
      // 时间
      if (this.advSearchDataList.create_time1 && this.advSearchDataList.create_time1.trim() !== '' && this.advSearchDataList.create_time1.length > 8) {
        condition.create_time1 = this.advSearchDataList.create_time1.replace(/-/g, '').toString().substring(0, 8)
      }
      if (this.advSearchDataList.create_time2 && this.advSearchDataList.create_time2.trim() !== '' && this.advSearchDataList.create_time2.length > 8) {
        condition.create_time2 = this.advSearchDataList.create_time2.replace(/-/g, '').toString().substring(0, 8)
      }
      this.advSearchFormConfig.forEach(item => {
        if (item.islike === true && this.advSearchDataList[item.field]) {
          condition[item.field] = {}
          condition[item.field][item.liketype] = this.advSearchDataList[item.field]
        }
      })
      this.condition = condition
      if (this.toolBarStatusSelect.curValue === '9') {
        if (this.condition.aviamt1 && this.condition.aviamt1.length !== 0) {
          this.condition.planaviamt1 = this.condition.aviamt1
        }
        if (this.condition.aviamt2 && this.condition.aviamt2.length !== 0) {
          this.condition.planaviamt2 = this.condition.aviamt2
        }
        this.condition.aviamt1 = []
        this.condition.aviamt2 = []
      }
      this.queryTableDatas()
    },
    // 撤销送审
    doRecallAudit() {
      if (this.$refs.mainTableRef.getSelectionData().length !== 1) {
        this.$message.warning('请选择数据撤销生成')
        return
      }
      let ids = []
      this.$refs.mainTableRef.getSelectionData().forEach(item => {
        ids.push(item.id)
      })
      let data = {
        actionName: '撤销审核',
        appId: 'pay_voucher',
        menuId: this.$store.state.curNavModule.guid,
        actionType: '3',
        glType: '0',
        ids: ids
      }
      this.tableLoading = true
      HttpModule.doRecallAudit(data).then(res => {
        this.tableLoading = false
        if (res && res.rscode === '200') {
          this.$message.success('撤销送审成功')
          this.refresh()
        }
      })
    },
    // 作废
    doDiscard(obj, context, e) {
      if (this.$refs.mainTableRef.getSelectionData().length < 1) {
        this.$message.warning('请选择一条数据作废')
        return
      }
      let ids = []
      this.$refs.mainTableRef.getSelectionData().forEach(item => {
        ids.push(item.pay_app_id)
      })
      let data = {
        actionName: '作废',
        appId: 'pay_voucher',
        roleguid: this.$store.state.curNavModule.roleguid,
        menuId: this.$store.state.curNavModule.guid,
        actionType: '5',
        glType: '5',
        ids: ids
      }
      // 被退回数据不走监控接口
      if (this.toolBarStatusSelect.curValue === '4') {
        data.params = {}
        data.params['is_monitor'] = '0'
      }
      this.$confirm('是否确定作废 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        HttpModule.doDiscard(data).then(res => {
          this.tableLoading = false
          if (res && res.rscode === '200') {
            this.$message.success(res.result)
            this.refresh()
          } else {
            this.$message.error(res.result)
          }
          if (res.data && res.data !== null && res.data.rows.length > 0) {
            this.showDisableDialog = true
            this.disableTableData = res.data.rows
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    getFormTable() {
      // this.loadConfig(this.userInfo.guid + '1')
      // this.loadConfig(this.userInfo.guid + '2')
      // this.loadConfig(this.userInfo.guid + '3')
      this.loadConfig(this.quotaId) // 指标额度表头
      // this.loadConfig(this.planId) // 已办表头
      this.loadConfig(this.advancedQueryId) // 指标额度高级查询
      // this.loadConfig(this.payQueryId) // 支付申请列表高级查询
      // this.loadConfig(this.documentsId) // 全部单据表头
      // this.loadConfig(this.popoutId) // 不可作废数据弹框表头
      // this.loadConfig(this.noplanId) // 待办
    },
    // 动态表头
    async loadConfig(id) {
      let params = {
        tableId: {
          id: '',
          fiscalyear: this.userInfo.year,
          mof_div_code: this.userInfo.province,
          menuguid: this.$store.state.curNavModule.guid,
          userguid: ''
        }
      }
      // 指标额度高级查询
      if (id === this.advancedQueryId) {
        params.tableId.id = id
        let configQueryData = await this.loadBsConfig(params)
        this.advSearchFormConfig = configQueryData.itemsConfig
        this.advSearchFormConfig1 = configQueryData.itemsConfig
      }
      // 支付申请列表高级查询
      if (id === this.payQueryId) {
        params.tableId.id = id
        let configQueryData = await this.loadBsConfig(params)
        this.highQueryConfig = configQueryData.itemsConfig
      }
      // 不可作废数据弹框表头
      if (id === this.popoutId) {
        params.tableId.id = id
        let configQueryData = await this.loadBsConfig(params)
        this.disableTableConfig = configQueryData.itemsConfig
      }

      // 指标额度表头
      if (id === this.quotaId) {
        params.tableId.id = id
        params.tableId.userguid = this.userInfo.guid
        let configData = await this.loadBsConfig(params)
        this.configData1 = configData
        this.limitColumns = this.configData1.itemsConfig
        this.tableColumnsConfig = this.configData1.itemsConfig
      }
      // 已办表头
      if (id === this.planId) {
        params.tableId.id = id
        params.tableId.userguid = this.userInfo.guid
        let configData = await this.loadBsConfig(params)
        this.configData2 = configData
        this.elseColumns = this.configData2.itemsConfig
      }

      // 全部单据表头
      if (id === this.documentsId) {
        params.tableId.id = id
        params.tableId.userguid = this.userInfo.guid
        let configData = await this.loadBsConfig(params)
        this.configData3 = configData
        this.allColumns = this.configData3.itemsConfig
      }

      // 待办表头
      if (id === this.noplanId) {
        params.tableId.id = id
        params.tableId.userguid = this.userInfo.guid
        let configData = await this.loadBsConfig(params)
        this.configData4 = configData
        this.noplanColumns = this.configData4.itemsConfig
      }
    },
    saveConfig(id, configure) {
      // id fiscalyear mof_div_code menuguid userguid
      let saveName = JSON.stringify({
        id: id,
        fiscalyear: this.userInfo.year,
        mof_div_code: this.userInfo.province,
        menuguid: this.$store.state.curNavModule.guid,
        userguid: this.userInfo.guid
      })
      window.localStorage.setItem(saveName, JSON.stringify(configure))
    },
    columnDrag(columns) {
      let itemsConfigTemp = []
      columns.forEach(item => {
        if (item.type !== 'checkbox' && item.type !== 'seq') {
          itemsConfigTemp.push(item.own)
        }
      })
      switch (this.toolBarStatusSelect.curValue) {
        // 指标额度表头
        case '9':
          this.saveConfig(this.quotaId, itemsConfigTemp)
          break
        // 全部单据表头
        case '1,2,4,5':
          this.saveConfig(this.documentsId, itemsConfigTemp)
          break
        // 曾经办表头
        case '0':
          this.saveConfig(this.documentsId, itemsConfigTemp)
          break
        // 待办-未送审表头
        case '1':
          this.saveConfig(this.planId, itemsConfigTemp)
          break
        // 待办-被退回表头
        case '4':
          this.saveConfig(this.planId, itemsConfigTemp)
          break
        // 待办-全部表头
        case '1,4':
          this.saveConfig(this.planId, itemsConfigTemp)
          break
        // 已办-已送审表头
        case '2':
          this.saveConfig(this.planId, itemsConfigTemp)
          break
        // 已办-已作废表头
        case '5':
          this.saveConfig(this.planId, itemsConfigTemp)
          break
        // 已办-全部表头
        case '2,5':
          this.saveConfig(this.planId, itemsConfigTemp)
          break
        default:
      }
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
        this.showLogView = true
      })
    }
  },
  created() {
    this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getFormTable()
    this.cptName = 'payVoucherInputByBusDept'
    if (this.menuId === '01192C92AC1D486498F846947528C4A9') { // 单位打印
      if (window.gloableToolFn.currentProvince !== window.gloableToolFn.NeiMengGu) {
        this.toolBarStatusBtnConfig.buttonsInfo = this.buttonsInfo
        this.differConditon.acc_type_code = '22' // 财政
      }
    } else {
      this.differConditon.acc_type_code = '21' // 单位
    }
    if (this.menuId !== '01192C92AC1D486498F846947528C4A9' && window.gloableToolFn.env && window.gloableToolFn.env !== undefined && window.gloableToolFn.env !== 'SC') {
      this.toolBarStatusBtnConfig.buttonsInfo = this.buttonsInfozsc
    }
    // this.advSearchDataList.create_time1 = '20211017080000'
    // this.advSearchDataList.create_time2 = '20211117080000'
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
