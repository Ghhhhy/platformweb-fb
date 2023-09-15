<!-- 中央和地方预算下达分资金直达 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <!-- <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template> -->
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
            @itemChange="itemChange"
          >
            <template v-if="isSx" v-slot:action-button-before>
              <vxe-button
                content="人工读取"
                status="primary"
                size="medium"
                @click="onToolbarBtnClick({ code: 'refresh' })"
              />
            </template>
          </BsQuery>
        </div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          id="1001"
          ref="bsTableRef"
          row-id="id"
          :table-config="tableConfig"
          :table-global-config="!isSx ? tableGlobalConfigCop : {}"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :calculate-constraint-config="calculateConstraintConfig"
          :tree-config="{ dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' }"
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          :default-money-unit="10000"
          :title="menuName"
          :scroll-y="scrollConfig"
          :cell-style="cellStyle"
          :export-modal-config="{ fileName: menuName }"
          :formula-digits="1"
          :show-zero="false"
          @editClosed="onEditClosed"
          @cellDblclick="cellDblclick"
          @cellClick="cellClick"
          @onToolbarBtnClick="onToolbarBtnClick"
          @switchMoneyUnit="switchMoneyUnit"
        >
          <!--口径说明插槽-->
          <template v-if="caliberDeclareContent" v-slot:caliberDeclare>
            <p v-html="caliberDeclareContent"></p>
          </template>
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
            <div v-if="isSx" class="timeRefreshTip">
              <div>系统自动更新时间点：1.早上8：00前更新完成。</div>
            </div>
          </template>
          <template v-slot:toolbar-custom-slot>
            <div class="dfr-report-time-wrapper">
              <el-tooltip effect="light" :content="`报表最近取数时间：${reportTime}`" placement="top">
                <div class="dfr-report-time-content">
                  <i class="ri-history-fill"></i>
                  <span class="dfr-report-time">{{ reportTime }}</span>
                </div>
              </el-tooltip>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <DetailDialog
      v-if="detailVisible"
      :title="detailTitle"
      :detail-type="detailType"
      :detail-data="detailData"
      :detail-query-param="detailQueryParam"
    />
    <SDetailDialog
      v-if="sDetailVisible"
      :title="sDetailTitle"
      :s-detail-data="sDetailData"
      :s-detail-query-param="sDetailQueryParam"
      :s-detail-type="sDetailType"
    />
  </div>
</template>

<script>
import getFormData from './budgetReleaseCapital.js'
import DetailDialog from '../children/detailDialog.vue'
import SDetailDialog from '../children/sDetailDialog.vue'
import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
import capitalMixin from '../mixins/capitalMixin'
export default {
  mixins: [capitalMixin],
  components: {
    DetailDialog,
    SDetailDialog
  },
  computed: {
    isSx() {
      return this.$store.getters.isSx
    },
    tableGlobalConfigCop() {
      let dataType = this.transJson(this.$store.state.curNavModule.param5 || '').exportModalDefaultSelect || 'fullData'
      return {
        customExportConfig: {
          ...this.tableGlobalConfig.customExportConfig,
          dataType,
          fileName: this.menuName
        }
      }
    }
  },
  watch: {
    $refs: {
      handler(newval) {
      },
      deep: true,
      immediate: true
    },
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      isFlush: false,
      caliberDeclareContent: '', // 口径说明
      reportTime: '', // 上次取数时间
      leftTreeVisible: false,
      sDetailVisible: false,
      sDetailTitle: '',
      sDetailData: [],
      isShowQueryConditions: true,
      radioShow: true,
      breakRuleVisible: false,
      // // 头部工具栏 BsTabPanel config
      // toolBarStatusBtnConfig: {
      //   changeBtns: true,
      //   // buttons: getFormData('toolBarStatusButtons'),
      //   curButton: {
      //     type: 'button',
      //     iconName: 'base-all.png',
      //     iconNameActive: 'base-all-active.png',
      //     iconUrl: '',
      //     label: '全部',
      //     code: '1',
      //     curValue: '1'
      //   },
      //   buttonsInfo: getFormData('statusRightToolBarButton'),
      //   methods: {
      //     bsToolbarClickEvent: this.onStatusTabClick
      //   }
      // },
      scrollConfig: {
        gt: 20
      },
      buttonsInfo: getFormData('statusRightToolBarButtonByBusDept'),
      tabStatusNumConfig: {
        1: 0
      },
      tableGlobalConfig: {
        customExportConfig: {
          addUnitColumn: true,
          addReportTitleColumn: true,
          unit: '万元'
        }
      },
      // table 相关配置
      tableLoading: false,
      tableConfig: getFormData('basicInfo', 'tableConfig'),
      tableColumnsConfig: this.isSx ? getFormData('basicInfo', 'tableColumnsConfig') : getFormData('basicInfo', `tableColumnsConfig${this.transJson(this.$store?.state?.curNavModule?.param5)?.isCity ? 'City' : ''}`),
      tableData: [],
      calculateConstraintConfig: {
        enabled: true,
        extendMapInfoField: true, // 是否扩展mapInfo字段
        // gradedSummaryFields: ['bonus', 'income'],
        calcAndConstraintItemCodeField: 'itemCode',
        getDataAxiosConfig: { // 跨表提取请求配置
          dataField: 'data', // 数据字段
          successCode: '100000', // 成功code
          statusField: 'rscode',
          method: 'get', // 请求方式
          url: '' // 'queryTreeAssistData', //
          //  [{ itemCode: "002", colField: "f005", value: "1500.0" }, { itemCode: "002001", colField: "f005", value: "500.0" }]
        },
        getDataParams: { // 提取公共参数

        },
        colConstraintConfig: {
          // 'age': 'income::value::{age}>=18?Math.pow({age},4)/2:0--&&--name::style::{age}>18&&{age}<=60--??--color=#F00&fontSize=20px--+--{age}>60--??--color=#ff0&fontSize=20px'
        },
        rowCodeConstraintConfig: { // 表间约束配置
          // '20:age': '10:income::value::{1001:age:20}>=18?Math.pow({1001:age:20},4)/2:0--&&--10:bonus::editable::{1001:age:20}>=18?true:false--&&--30:bonus::clear::{1001:age:20}<=18?true:false--&&--10:name::style::{1001:age:20}>18&&{1001:age:20}<=60--??--color=#F00&fontSize=20px--+--{1001:age:1001}>60--??--color=#ff0&fontSize=20px'
        }
      },
      toolbarConfig: {
        disabledMoneyConversion: false,
        ...getFormData('basicInfo', 'toolbarConfig')
      },
      // editRules: getFormData('basicInfo', 'editRules'),
      ifRenderExpandContentTable: true,
      pagerConfig: {
        autoHidden: true,
        total: 1,
        currentPage: 1,
        pageSize: 999999
      },
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        caliberDeclare: this.isSx, //
        expandAll: this.isSx, // 展开所有
        print: false, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      // mainPagerConfig: {
      //   total: 0,
      //   currentPage: 1,
      //   pageSize: 20
      // },
      tableFooterConfig: {
        showFooter: false
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
      menuName: '',
      params5: '',
      menuId: '',
      tokenid: '',
      userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      appId: 'pay_voucher',
      isHaveZero: '0',
      billguid: '',
      condition: {},
      selectData: '',
      queryConfig: getFormData('highQueryConfig'),
      searchDataList: {
        fiscalYear: this.$store.state?.userInfo?.year,
        mofDivCodes: [this.$store.state?.userInfo?.province],
        mofDivCodes_code__multiple: [this.$store.state?.userInfo?.province],
        mofDivCodes_code: this.$store.state?.userInfo?.province,
        mofDivCodes_name: this.$store.state?.userInfo?.admdivname,
        endTime: ''
      },
      detailVisible: false,
      detailType: '',
      detailTitle: '',
      detailData: [],
      detailQueryParam: {},
      sDetailQueryParam: {}
    }
  },
  mounted() {
    // this.tableLoading = true
    // setTimeout(() => {
    //   this.tableLoading = false
    //   this.initTableData()
    // }, 2000)
  },
  methods: {
    switchMoneyUnit(level) {
      this.tableGlobalConfig.customExportConfig.unit = level === 1 ? '元' : '万元'
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    // 初始化高级查询data
    getSearchDataList() {
      // 下拉树
      let searchDataObj = {}
      this.queryConfig.forEach((item) => {
        if (
          item.itemRender.name === '$formTreeInput' ||
          item.itemRender.name === '$vxeTree'
        ) {
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
      this.queryConfig.forEach((item) => {
        if (
          item.itemRender.name === '$formTreeInput' ||
          item.itemRender.name === '$vxeTree'
        ) {
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
          this.menuName = '直达资金预算下达_分资金(单位:万元)'
          this.radioShow = true
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      if (this.isSx) {
        this.refresh()
      } else {
        this.queryTableDatas()
      }
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 搜索
    search(val, multipleValue = {}, isFlush = false) {
      let bool = true
      if (bool) return
      this.searchDataList = val
      console.log(val)
      let condition = this.getConditionList()
      for (let key in condition) {
        if (
          (this.searchDataList[key] !== undefined) &
          (this.searchDataList[key] !== null)
        ) {
          if (Array.isArray(this.searchDataList[key])) {
            condition[key] = this.searchDataList[key]
          } else if (typeof this.searchDataList[key] === 'string') {
            if (this.searchDataList[key].trim() !== '') {
              this.searchDataList[key].split(',').forEach((item) => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      this.condition = condition
      if (this.isSx) {
        condition.mofDivCodes = val.mofDivCodes_code__multiple
        this.queryTableDatas()
      } else {
        condition.mofDivCodes = condition.mofDivCodes?.split('##')[0]
        this.queryTableDatas(isFlush)
      }
    },
    // 切换操作按钮
    // operationToolbarButtonClickEvent(obj, context, e) {
    //   switch (obj.code) {
    //     // 导出
    //     case 'export':
    //       this.exportPolicies(obj, context, e)
    //       break
    //     default:
    //       break
    //   }
    // },
    onToolbarBtnClick({ context, table, code }) {
      let refreshTips = '重新加载数据可能需要等待较长时间，确认继续？'
      if (this.isSx) refreshTips = '此操作会读取最新业务数据情况，报表分析最新业务数据进行展示，等待时间较长，请确认读取'
      switch (code) {
        // 刷新
        case 'refresh':
          this.$confirm(refreshTips, '操作确认提示', {
            type: 'warning'
          }).then(() => {
            this.refresh(true)
          })
          break
      }
    },
    changeVisible(val) {
      this.breakRuleVisible = val
    },
    onClickmethod(node) {
      if (node.id !== '0') {
        let key =
          this.$refs.treeSet.treeConfigIn.curRadio.toLowerCase() + '_code'
        this.condition[key] = node.id
      } else {
        this.condition = {}
      }

      this.queryTableDatas(node.guid)
    },
    handleDetail(reportCode, proCode, column) {
      if (this.isSx) {
        let condition = ''
        switch (column) {
          case 'amountSnjysZyap':
          case 'saAmount':
          case 'shzyapAmount':
          case 'shaAmount':
          case 'amountSnjfpbjZyap':
          case 'amountSnjfpxjZyap':
          case 'amountSnjwfpZyap':
          case 'sbjfpaAmount':
          case 'ssxfpaAmount':
          case 'swfpaAmount':
            condition = 'substr(mof_div_code,3,7) = \'0000000\'  '
            break
          case 'amountSjysZyap':
          case 'amountSjfpbjZyap':
          case 'amountSjfpxjZyap':
          case 'amountSjwfpZyap':
          case 'shbjfpaAmount':
          case 'shxjfpaAmount':
          case 'shwfpaAmount':
          case 'shhzyapAmount':
          case 'shhaAmount':
          case 'shiaAmount':
            condition = ' substr(mof_div_code,3,7) <> \'0000000\' and substr(mof_div_code,5,5)=\'00000\' '
            break
          case 'amountXjysZyap':
          case 'xaAmount':
          case 'xhzyapAmount':
          case 'xhaAmount':
          case 'amountXjfpZyap':
          case 'amountXjwfpZyap':
          case 'xyfpaAmount':
          case 'xwfpaAmount':
          case 'xyfpbjaAmount':
          case 'xyfpxjaAmount':
          case 'amountXjfpbjZyap':
          case 'amountXjfpxjZyap':
            condition = ' substr(mof_div_code,5,5) <> \'00000\' and substr(mof_div_code,7,3)=\'000\' '
            break
          case 'amountZjwfpZyap':
          case 'zwfpaAmount':
          case 'amountZjysZyap':
          case 'zaAmount':
          case 'zhzyapAmount':
          case 'zhaAmount':
          case 'amountZjfpZyap':
          case 'zyfpaAmount':
            condition = ' substr(mof_div_code,7,3) <> \'000\' '
            break
        }
        let isBj = ''
        switch (column) {
          case 'amountSnjfpbjZyap':
          case 'amountSjfpbjZyap':
          case 'sbjfpaAmount':
          case 'shbjfpaAmount':
          case 'amountXjfpbjZyap':
          case 'xyfpbjaAmount':
            isBj = '1'
            break
          case 'amountSnjfpxjZyap':
          case 'amountSjfpxjZyap':
          case 'ssxfpaAmount':
          case 'shxjfpaAmount':
          case 'amountXjfpxjZyap':
          case 'xyfpxjaAmount':
            isBj = '2'
            break
          case 'amountXjfpZyap':
          case 'xyfpaAmount':
          case 'amountZjfpZyap':
          case 'zyfpaAmount':
            isBj = '3'
            break
        }
        let params = {
          condition: condition,
          reportCode: reportCode,
          // proCodes: [proCode],
          proCode: proCode,
          speTypeCode: '',
          isBj: isBj,
          endTime: this.condition.endTime ? this.condition.endTime[0] : '',
          fiscalYear: this.searchDataList.fiscalYear,
          mofDivCodes: this.searchDataList?.mofDivCodes_code__multiple || []
        }
        this.detailQueryParam = params
        this.detailType = reportCode
        this.detailVisible = true
      } else {
        let condition = ''
        if (this.transJson(this.$store?.state?.curNavModule?.param5)?.isCity) {
          switch (column) {
            case 'amountSnjfpAll':
              condition = 'substr(mof_div_code,3,7) = \'0000000\'  '
              break
            case 'amountSjfpbjAll':
              condition = ' substr(mof_div_code,5,5) <> \'00000\' and substr(mof_div_code,7,3)=\'000\' '
              break
            case 'amountXjfpAll':
              condition = ' substr(mof_div_code,7,3) <> \'000\' '
              break
          }
        } else if (this.$store.state.userInfo.province?.slice(0, 4) === '3502') {
          switch (column) {
            case 'amountSnjfpAll':
              condition = ' substr(mof_div_code,5,5) = \'00000\' and mof_div_code not like \'%35\''
              break
            case 'amountSjfpbjAll':
              condition = ' substr(mof_div_code,5,5) = \'00000\' and mof_div_code  like \'%35\' '
              break
            case 'amountXjfpAll':
              condition = ' substr(mof_div_code,5,5) <> \'00000\' and substr(mof_div_code,7,3)=\'000\' '
              break
          }
        } else {
          switch (column) {
            case 'amountSnjfpAll':
              condition = 'substr(mof_div_code,3,7) = \'0000000\'  '
              break
            case 'amountSjfpbjAll':
              condition = ' substr(mof_div_code,3,7) <> \'0000000\' and substr(mof_div_code,5,5)=\'00000\' '
              break
            case 'amountXjfpAll':
              condition = ' substr(mof_div_code,5,5) <> \'00000\' and substr(mof_div_code,7,3)=\'000\' '
              break
          }
        }
        let isCz = ''
        if (this.transJson(this.params5 || '')?.reportCode !== '' && this.transJson(this.params5 || '')?.reportCode.includes('cz')) {
          isCz = '2'
        } else {
          isCz = '1'
        }
        let params = {
          condition: condition,
          isCz: isCz,
          reportCode: reportCode,
          proCode: proCode,
          fiscalYear: this.searchDataList.fiscalYear,
          mofDivCodes: this.searchDataList.mofDivCodes === '' ? [] : this.getTrees(this.searchDataList.mofDivCodes)
        }
        this.detailType = reportCode
        this.detailQueryParam = params
        this.detailVisible = true
      // HttpModule.queryTableDatas(params).then((res) => {
      //   this.tableLoading = false
      //   if (res.code === '000000') {
      //     this.detailData = res.data
      //     // this.reportTime = res.data.reportTime || ''
      //     this.detailVisible = true
      //     this.detailType = type
      //   } else {
      //     this.$message.error(res.message)
      //   }
      // })
      }
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      if (this.isSx) {
        let key = obj.column.property
        switch (key) {
          case 'amountSnjysZyap':
          case 'saAmount':
          case 'shzyapAmount':
          case 'shaAmount':
          case 'amountSjysZyap':
          case 'shhzyapAmount':
          case 'shhaAmount':
          case 'shiaAmount':
          case 'amountXjysZyap':
          case 'xaAmount':
          case 'xhzyapAmount':
          case 'xhaAmount':
            this.handleDetail('zdzjxmmx_fzj_zyxd', obj.row.code, key)
            this.detailTitle = '直达资金项目明细'
            break
          case 'amountZjysZyap':
          case 'zaAmount':
          case 'zhzyapAmount':
          case 'zhaAmount':
            this.handleDetail('zdzjxmmx_fzj_zyxdx', obj.row.code, key)
            this.detailTitle = '直达资金项目明细'
            break
          case 'amountSnjfpbjZyap':
          case 'amountSnjfpxjZyap':
          case 'amountSjfpbjZyap':
          case 'amountSjfpxjZyap':
          case 'amountXjfpbjZyap':
          case 'amountXjfpxjZyap':
          case 'amountXjfpZyap':
          case 'amountZjfpZyap':
          case 'sbjfpaAmount':
          case 'ssxfpaAmount':
          case 'xyfpbjaAmount':
          case 'xyfpxjaAmount':
          case 'zyfpaAmount':
          case 'shbjfpaAmount':
          case 'shxjfpaAmount':
          case 'xyfpaAmount':
            this.handleDetail('zdzjzbmx_fzjfp', obj.row.code, key)
            this.detailTitle = '直达资金指标明细'
            break
          case 'amountSnjwfpZyap':
          case 'amountSjwfpZyap':
          case 'amountXjwfpZyap':
          case 'swfpaAmount':
          case 'xwfpaAmount':
          case 'shwfpaAmount':
            this.handleDetail('zdzjxmmx_fzj_wfp', obj.row.code, key)
            this.detailTitle = '直达资金项目明细'
            break
          case 'amountZjwfpZyap':
          case 'zwfpaAmount':
            this.handleDetail('zdzjxmmx_fzj_wfpx', obj.row.code, key)
            this.detailTitle = '直达资金项目明细'
            break
          case 'amountQszyap1':
          case 'aAmount':
            this.handleDetail('qszjzl', obj.row.code, key)
            this.detailTitle = '直达资金项目明细'
            break
        }
      } else {
        const rowIndex = obj?.rowIndex
        if (!rowIndex) return
        let key = obj.column.property

        // 无效的cellValue
        const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
        if (isInvalidCellValue) return

        switch (key) {
          case 'amountSnjfpbjDfap':
            this.handleDetail('zdzjxmmx', obj.row.code, key)
            this.detailTitle = '地方安排明细'
            break
          case 'amountSnjfpAll':
          case 'amountSjfpbjAll':
          case 'amountXjfpAll':
            this.handleDetail('zdzjxmmx_dfap', obj.row.code, key)
            this.detailTitle = '直达资金项目明细'
            break
        }
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh(isFlush = true) {
      this.isFlush = true
      if (this.isSx) {
        this.queryTableDatas()
      } else {
        this.search(this.$refs.queryFrom.getFormData(), null, isFlush)
      }
      // this.queryTableDatasCount()
    },
    getMofDiv(fiscalYear = this.$store.state.userInfo?.year) {
      if (this.isSx) {
        HttpModule.getMofTreeData().then(res => {
          if (res.code === '000000') {
            console.log('data', res.data)
            let treeResdata = this.getChildrenNewData1(res.data)
            this.queryConfig[1].itemRender.options = treeResdata
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        HttpModule.getMofTreeData({ fiscalYear }).then(res => {
          if (res.code === '000000') {
            console.log('data', res.data)
            let treeResdata = this.getChildrenNewData1(res.data)
            this.queryConfig[1].itemRender.options = treeResdata
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    getChildrenNewData1(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.name
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })
      return datas
    },
    getTrees(val) {
      let mofDivCodes = []
      if (val.trim() !== '') {
        val.split(',').forEach((item) => {
          mofDivCodes.push(item.split('##')[0])
        })
      }
      return mofDivCodes
    },
    // 查询 table 数据
    queryTableDatas(isFlush = false) {
      if (this.isSx) {
        const param = {
          reportCode: 'zyhdfysxd_fzjzd',
          fiscalYear: this.searchDataList.fiscalYear ? this.searchDataList.fiscalYear : '',
          endTime: this.condition.endTime ? this.condition.endTime[0] : '',
          mofDivCodes: this.searchDataList?.mofDivCodes_code__multiple || []
        }
        this.isFlush && (param.isFlush = true)
        this.tableLoading = true
        HttpModule.queryTableDatas(param).then((res) => {
          if (res.code === '000000') {
            this.tableData = res.data.data
            this.tableLoading = false
          } else {
            this.$message.error(res.message)
          }
        }).finally(() => {
          this.isFlush = false
        })
      } else {
        const param = {
          // isFlush,
          // reportCode: 'zyhdfysxd_fzjzd',
          reportCode: this.transJson(this.params5 || '')?.reportCode,
          fiscalYear: this.searchDataList.fiscalYear,
          endTime: this.condition.endTime ? this.condition.endTime[0] : '',
          mofDivCodes: this.searchDataList.mofDivCodes === '' ? [] : this.getTrees(this.searchDataList.mofDivCodes)
        }
        this.isFlush && (param.isFlush = true)
        this.tableLoading = true
        HttpModule.queryTableDatas(param).then((res) => {
          if (res.code === '000000') {
            if (res.data) {
              this.tableData = res.data.data
              this.reportTime = res.data.reportTime || ''
              this.caliberDeclareContent = res.data.description || ''
            }
          } else {
            this.$message.error(res.message)
          }
        }).finally(() => {
          this.isFlush = false
          this.tableLoading = false
        })
      }
    },
    queryCaliberDeclareContent(val) {
      const param = {
        reportCode: 'zyhdfysxd_fzjzd'
      }
      this.tableLoading = true
      HttpModule.queryCaliberDeclareContent(param).then((res) => {
        if (res.code === '000000') {
          this.caliberDeclareContent = res.data || ''
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cellDblclick(obj) {
      // console.log('双击', obj)
    },
    onEditClosed(obj, bsTable, xGrid) {
      bsTable.performTableDataCalculate(obj)
    },
    cellStyle({ row, rowIndex, column }) {
      if (this.isSx) {
        if (['zaAmount', 'xyfpbjaAmount', 'xyfpxjaAmount', 'amountZjfpbjZyap', 'amountZjfpxjZyap', 'zyfpaAmount', 'zhzyapAmount', 'zhaAmount', 'zwfpaAmount', 'amountQszyap1', 'aAmount', 'amountSnjysZyap', 'amountSjysZyap', 'amountXjysZyap', 'amountZjysZyap', 'amountSnjfpbjZyap', 'amountSnjfpxjZyap', 'amountSjfpbjZyap', 'amountXjfpbjZyap', 'amountSjfpxjZyap', 'amountXjfpxjZyap', 'amountXjfpZyap', 'amountZjfpZyap', 'amountSnjwfpZyap', 'amountSjwfpZyap', 'amountXjwfpZyap', 'amountZjwfpZyap', 'saAmount', 'shzyapAmount', 'shaAmount', 'sbjfpaAmount', 'ssxfpaAmount', 'swfpaAmount', 'shbjfpaAmount', 'shxjfpaAmount', 'shwfpaAmount', 'xyfpaAmount', 'xwfpaAmount', 'shhzyapAmount', 'shhaAmount', 'shiaAmount', 'xaAmount', 'xhzyapAmount', 'xhaAmount'].includes(column.property)) {
          return {
            color: '#4293F4',
            textDecoration: 'underline'
          }
        }
      } else {
        if (!rowIndex) return
        // 有效的cellValue
        const validCellValue = (row[column.property] * 1)
        if (validCellValue && ['amountSnjfpbjDfap', 'amountSnjfpAll', 'amountSjfpbjAll', 'amountXjfpAll'].includes(column.property)) {
          return {
            color: '#4293F4',
            textDecoration: 'underline'
          }
        }
      }
    }
  },
  created() {
    this.params5 = this.$store.state.curNavModule.param5
    if (this.isSx) {
      this.searchDataList.endTime = this.$XEUtils.toDateString(
        this.$XEUtils.getWhatDay(new Date(), -1),
        'yyyy-MM-dd'
      )
    }

    this.menuId = this.$store.state.curNavModule.guid
    this.menuName = this.$store.state.curNavModule.name
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getMofDiv()
    this.queryTableDatas()
    if (this.isSx) {
      this.queryCaliberDeclareContent()
    }
  }
}
</script>
<style scoped>
.radio-right {
  float: right;
}
.Titans-table ::v-deep .vxe-body--row.row-yellow {
  background-color: yellow;
  color: #fff;
}
.Titans-table ::v-deep .vxe-body--row.row-blue {
  background-color: blue;
  color: #fff;
}
.Titans-table ::v-deep .vxe-body--row.row-red {
  background-color: red;
  color: #fff;
}
</style>
