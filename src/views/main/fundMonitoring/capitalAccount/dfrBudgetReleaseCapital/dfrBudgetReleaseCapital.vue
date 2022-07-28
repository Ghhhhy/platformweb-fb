<!-- 直达资金预算下达分资金 -->
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
          />
        </div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          id="1001"
          ref="bsTableRef"
          row-id="id"
          :table-config="tableConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :calculate-constraint-config="calculateConstraintConfig"
          :tree-config="{ dblExpandAll: true, dblExpand: true, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' }"
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          :default-money-unit="10000"
          :cell-style="cellStyle"
          @editClosed="onEditClosed"
          @cellDblclick="cellDblclick"
          @cellClick="cellClick"
          @onToolbarBtnClick="onToolbarBtnClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">直达资金预算下达分资金(单位:万元)</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <DetailDialog
      v-if="detailVisible"
      :title="detailTitle"
      :detail-data="detailData"
    />
    <SDetailDialog
      v-if="sDetailVisible"
      :title="sDetailTitle"
      :s-detail-data="sDetailData"
    />
  </div>
</template>

<script>
import getFormData from './dfrBudgetReleaseCapital.js'
import DetailDialog from '../children/detailDialog.vue'
import SDetailDialog from '../children/sDetailDialog.vue'
import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
export default {
  components: {
    DetailDialog,
    SDetailDialog
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
      buttonsInfo: getFormData('statusRightToolBarButtonByBusDept'),
      tabStatusNumConfig: {
        1: 0
      },
      // table 相关配置
      tableLoading: false,
      tableConfig: getFormData('basicInfo', 'tableConfig'),
      tableColumnsConfig: getFormData('basicInfo', 'tableColumnsConfig'),
      tableData: [],
      calculateConstraintConfig: {
        enabled: true,
        extendMapInfoField: true, // 是否扩展mapInfo字段
        // gradedSummaryFields: ['bonus', 'income'],
        calcAndConstraintItemCodeField: 'itemCode',
        // 示例中1001为tableId
        rowCodeFormulaConfig: {
          // 单元格交叉计算
          // rowFormulaMap= { "colField:itemcode":"{tableId:colField:itemcode}[运算符]" }
          '00:jOut': '{00:sbpayAppAmt}+{00:spayAppAmt}+{00:xpayAppAmt}'
          // '10:bonus': '{1001:income:10}+{1001:bonus:10}',
          // '20:bonus': '{1001:income:30}*{1001:age:30}+{1001:bonus:40}'
        },
        cellDataConfig: [// 提取和计算

        ],
        colFormulaConfig: {
          jOut: '{sbpayAppAmt}+{spayAppAmt}+{xpayAppAmt}',
          jLoad: '{jOut}/{sbjAmount}*100',
          sUnassigned: '{sbjAmount}-{sbbjfpAmount}-{sbxjfpAmount}',
          sLoad: '({sbbjfpAmount}+{sbxjfpAmount})/{sbjAmount}*100',
          aUnassigned: '{sbjAmount}-{sbbjfpAmount}-{sbjfpAmount}-{sxjfpAmount}',
          aLoad: '({sbjfpAmount}+{sxjfpAmount})/{sbjAmount}*100',
          xUnassigned: '{sbjAmount}-{sbbjfpAmount}-{sbjfpAmount}-{xbjfpAmount}',
          xLoad: '{xbjfpAmount}/{sbjAmount}*100'
        },
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
      searchDataList: getFormData('highQueryData'),
      detailVisible: false,
      detailType: '',
      detailTitle: '',
      detailData: []
    }
  },
  mounted() {
    this.tableLoading = true
    setTimeout(() => {
      this.tableLoading = false
      this.initTableData()
    }, 2000)
  },
  methods: {
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
      this.refresh()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 搜索
    search(val) {
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
      this.queryTableDatas()
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
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
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
    handleDetail(type, speTypeCode) {
      // type === 'jOut' ? this.detailData = [
      //   {
      //     agencyCodeName: '701005-西北妇女儿童医院',
      //     proCodeName: '610000222900000080743-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 120,
      //     payAppAmt: '120.00',
      //     useDes: '专培师资10月份教学补助',
      //     payAcctName: '西北妇女儿童医院(资金性质:零余额账户)',
      //     payAcctNo: '611301032018160011912',
      //     payeeAcctName: '柯华',
      //     payeeAcctNo: '6222600810015893746',
      //     xpayDate: null
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 3000,
      //     payAppAmt: '3000.00',
      //     useDes: '边志敏医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '陈军',
      //     payeeAcctNo: '6215582605002503274',
      //     xpayDate: 1652058360000
      //   },
      //   {
      //     agencyCodeName: '733001-陕西省医疗保障局',
      //     proCodeName: '610000212000000103337-2021年中央财政医疗服务与保障能力提升',
      //     amount: 22277,
      //     payAppAmt: '22277.00',
      //     useDes: '提升医疗服务能力支出',
      //     payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
      //     payAcctNo: '129910435710803',
      //     payeeAcctName: null,
      //     payeeAcctNo: null,
      //     xpayDate: 1653286560000
      //   },
      //   {
      //     agencyCodeName: '701001-陕西省卫生健康委员会',
      //     proCodeName: '610000222900000080741-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 14910000,
      //     payAppAmt: '14910000.00',
      //     useDes: '陕财办社【2021】259号卫生健康人才培养',
      //     payAcctName: '陕西省卫生健康委员会（资金性质：零余额账户）',
      //     payAcctNo: '102052653886',
      //     payeeAcctName: '中国人民解放军空军军医大学第一附属医院',
      //     payeeAcctNo: '3700025209026720547',
      //     xpayDate: 1653441900000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 9006,
      //     payAppAmt: '9006.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西安工业大学',
      //     payeeAcctNo: '61001781300052502618',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 11000,
      //     payAppAmt: '11000.00',
      //     useDes: '王建成医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '张江红',
      //     payeeAcctNo: '6222032605001373606',
      //     xpayDate: 1652155560000
      //   },
      //   {
      //     agencyCodeName: '701005-西北妇女儿童医院',
      //     proCodeName: '610000222900000080743-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 400,
      //     payAppAmt: '400.00',
      //     useDes: '专培师资9月份教学补助',
      //     payAcctName: '西北妇女儿童医院(资金性质:零余额账户)',
      //     payAcctNo: '611301032018160011912',
      //     payeeAcctName: '郭金珍',
      //     payeeAcctNo: '6222620810008714376',
      //     xpayDate: null
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 10000,
      //     payAppAmt: '10000.00',
      //     useDes: '王育升医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '张明强',
      //     payeeAcctNo: '6222032605000394751',
      //     xpayDate: 1650211200000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 171110,
      //     payAppAmt: '171110.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '延安大学',
      //     payeeAcctNo: '102085448994',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '733001-陕西省医疗保障局',
      //     proCodeName: '610000212000000103337-2021年中央财政医疗服务与保障能力提升',
      //     amount: 7390,
      //     payAppAmt: '7390.00',
      //     useDes: '提升医疗服务能力支出',
      //     payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
      //     payAcctNo: '129910435710803',
      //     payeeAcctName: null,
      //     payeeAcctNo: null,
      //     xpayDate: 1651903140000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 14601,
      //     payAppAmt: '14601.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '宝鸡文理学院',
      //     payeeAcctNo: '102002744693',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 200000,
      //     payAppAmt: '200000.00',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '西安国睿医疗器械有限公司',
      //     payeeAcctNo: '161363073',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 11935.53,
      //     payAppAmt: '11935.53',
      //     useDes: '付医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '聂文祖',
      //     payeeAcctNo: '6217232605001754175',
      //     xpayDate: 1652839560000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224856-2022年义务教育阶段国家课程免费教科书',
      //     amount: 9900000,
      //     payAppAmt: '9900000.00',
      //     useDes: '免费教科书政府采购',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '陕西新华发行集团有限责任公司',
      //     payeeAcctNo: '3700020509006501866',
      //     xpayDate: 1652921940000
      //   },
      //   {
      //     agencyCodeName: '733001-陕西省医疗保障局',
      //     proCodeName: '610000212000000103337-2021年中央财政医疗服务与保障能力提升',
      //     amount: 22487,
      //     payAppAmt: '22487.00',
      //     useDes: '提升医疗服务能力支出',
      //     payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
      //     payAcctNo: '129910435710803',
      //     payeeAcctName: null,
      //     payeeAcctNo: null,
      //     xpayDate: 1651903200000
      //   },
      //   {
      //     agencyCodeName: '701013-陕西省地方病防治研究所',
      //     proCodeName: '610000222900000080687-中央基本公共卫生服务补助资金（第一批）',
      //     amount: 1100,
      //     payAppAmt: '1100.00',
      //     useDes: '购《大医马海德》',
      //     payAcctName: '陕西省地方病防治研究所（资金性质：零余额账户）',
      //     payAcctNo: '61001711100058011229',
      //     payeeAcctName: '人民卫生出版社有限公司',
      //     payeeAcctNo: '11200601040011226',
      //     xpayDate: 1651721520000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 170666.6,
      //     payAppAmt: '170666.60',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '渭南九州通正元医药有限公司',
      //     payeeAcctNo: '102054801652',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 12387,
      //     payAppAmt: '12387.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '长安大学',
      //     payeeAcctNo: '307001954208091001',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 22000,
      //     payAppAmt: '22000.00',
      //     useDes: '张毕林医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '晋长德',
      //     payeeAcctNo: '6217232605000835579',
      //     xpayDate: 1651108800000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 100000,
      //     payAppAmt: '100000.00',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '陕西津华医药有限公司',
      //     payeeAcctNo: '61001743700050000711',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '701001-陕西省卫生健康委员会',
      //     proCodeName: '610000222900000080741-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 18765000,
      //     payAppAmt: '18765000.00',
      //     useDes: '陕财办社【2021】259号卫生健康人才培养',
      //     payAcctName: '陕西省卫生健康委员会（资金性质：零余额账户）',
      //     payAcctNo: '102052653886',
      //     payeeAcctName: '西安交通大学医学院第一附属医院',
      //     payeeAcctNo: '611301051018010041600',
      //     xpayDate: 1653441900000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 20000,
      //     payAppAmt: '20000.00',
      //     useDes: '休养员医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '陈军',
      //     payeeAcctNo: '6215582605002503274',
      //     xpayDate: 1648483200000
      //   },
      //   {
      //     agencyCodeName: '702003-陕西中医药大学附属医院',
      //     proCodeName: '610000222900000080681-中央中医药事业发展部分（第一批7215万元）',
      //     amount: 7095,
      //     payAppAmt: '7095.00',
      //     useDes: '知识产权代理费',
      //     payAcctName: '陕西中医药大学附属医院',
      //     payAcctNo: '61001636208050000335',
      //     payeeAcctName: '安徽思真知识产权代理有限公司',
      //     payeeAcctNo: '8112301011500371629',
      //     xpayDate: 1651807200000
      //   },
      //   {
      //     agencyCodeName: '716001-社会保障基金财政专户',
      //     proCodeName: '610000222900000093575-中央财政对2021年调整企业离休干部基本养老金的补助',
      //     amount: 1240000,
      //     payAppAmt: '1240000.00',
      //     useDes: '陕财办社【2022】20号下达2021年调整企业离休干部基本养老金中央财政补助资金',
      //     payAcctName: '陕西省财政厅（资金性质：财政零余额专用户）',
      //     payAcctNo: '26105101040009649',
      //     payeeAcctName: '陕西省财政厅社会保障基金财政专户',
      //     payeeAcctNo: '26190501040002609',
      //     xpayDate: 1648706700000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 7094.5,
      //     payAppAmt: '7094.50',
      //     useDes: '付检验费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '西安金域医学检验所有限公司',
      //     payeeAcctNo: '103600216906',
      //     xpayDate: 1650297600000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 138772,
      //     payAppAmt: '138772.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '陕西石油普通教育管理移交中心',
      //     payeeAcctNo: '611301096018010000629',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '716001-社会保障基金财政专户',
      //     proCodeName: '610000222000000206665-企业职工基本养老保险中央财政补助资金',
      //     amount: 1546580000,
      //     payAppAmt: '1546580000.00',
      //     useDes: '陕财办社【2021】236号下达中央财政对企业职工基本养老保险基金的补助',
      //     payAcctName: '陕西省财政厅（资金性质：财政零余额专用户）',
      //     payAcctNo: '26105101040009649',
      //     payeeAcctName: '陕西省财政厅社会保障基金财政专户',
      //     payeeAcctNo: '3700023309014439883',
      //     xpayDate: 1646033558000
      //   },
      //   {
      //     agencyCodeName: '702002-陕西省中医医院',
      //     proCodeName: '610000212000000105165-医疗服务与保障能力提升补助项目',
      //     amount: 1000,
      //     payAppAmt: '1000.00',
      //     useDes: '5月18日孙补助',
      //     payAcctName: '陕西省中医医院-零余额账户',
      //     payAcctNo: '3700020509089234012',
      //     payeeAcctName: '张小俊',
      //     payeeAcctNo: '6217004220022153666',
      //     xpayDate: 1652845800000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 106774.4,
      //     payAppAmt: '106774.40',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '陕西医药控股集团派昂医药有限责任公司',
      //     payeeAcctNo: '72010154700005365',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '208005-西安科技大学',
      //     proCodeName: '610000212000000105403-支持地方高校改革发展资金（第二批）（38号）',
      //     amount: 9750,
      //     payAppAmt: '9750.00',
      //     useDes: '3-2662教学管理经费答题纸',
      //     payAcctName: '西安科技大学（资金性质：零余额账户）',
      //     payAcctNo: '61001900041058000003',
      //     payeeAcctName: '西安市碑林区天宇印务部',
      //     payeeAcctNo: '3700023509200138595',
      //     xpayDate: 1648569600000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204483-优抚对象医疗保障-中央',
      //     amount: 9833,
      //     payAppAmt: '9833.00',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '重药控股陕西医药有限公司',
      //     payeeAcctNo: '611301058018000170816',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '701005-西北妇女儿童医院',
      //     proCodeName: '610000222900000080743-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 1580,
      //     payAppAmt: '1580.00',
      //     useDes: '专培师资7月教学补助',
      //     payAcctName: '西北妇女儿童医院(资金性质:零余额账户)',
      //     payAcctNo: '611301032018160011912',
      //     payeeAcctName: null,
      //     payeeAcctNo: null,
      //     xpayDate: null
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 40290,
      //     payAppAmt: '40290.00',
      //     useDes: '付检验费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '西安迪安医学检验实验室有限公司',
      //     payeeAcctNo: '61050174630000000012',
      //     xpayDate: 1648137600000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224856-2022年义务教育阶段国家课程免费教科书',
      //     amount: 19800000,
      //     payAppAmt: '19800000.00',
      //     useDes: '免费教科书政府采购',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '陕西新华发行集团有限责任公司',
      //     payeeAcctNo: '3700020509006501866',
      //     xpayDate: 1652922600000
      //   },
      //   {
      //     agencyCodeName: '177001-中共陕西省委军民融合发展委员会办公室',
      //     proCodeName: '610000222000000226834-老党员生活补助',
      //     amount: 10000,
      //     payAppAmt: '10000.00',
      //     useDes: '拨付张春荣崔彩凤2021年2022年1至4月生活补贴',
      //     payAcctName: '中共陕西省委军民融合发展委员会办公室（资金性质：零余额账户）',
      //     payAcctNo: '61050110427208000001',
      //     payeeAcctName: '中共中核陕西铀浓缩公司委员会组织部',
      //     payeeAcctNo: '2606051809026400190',
      //     xpayDate: 1649260800000
      //   },
      //   {
      //     agencyCodeName: '701001-陕西省卫生健康委员会',
      //     proCodeName: '610000222900000080741-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 9960000,
      //     payAppAmt: '9960000.00',
      //     useDes: '陕财办社【2021】259号卫生健康人才培养',
      //     payAcctName: '陕西省卫生健康委员会（资金性质：零余额账户）',
      //     payAcctNo: '102052653886',
      //     payeeAcctName: '中国人民解放军空军军医大学第二附属医院',
      //     payeeAcctNo: '3700020019201236714',
      //     xpayDate: 1653441900000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204483-优抚对象医疗保障-中央',
      //     amount: 1161,
      //     payAppAmt: '1161.00',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '西安大正医药有限责任公司',
      //     payeeAcctNo: '3700022409200007511',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '702003-陕西中医药大学附属医院',
      //     proCodeName: '610000222900000080681-中央中医药事业发展部分（第一批7215万元）',
      //     amount: 13700,
      //     payAppAmt: '13700.00',
      //     useDes: '专利申请费',
      //     payAcctName: '陕西中医药大学附属医院',
      //     payAcctNo: '61001636208050000335',
      //     payeeAcctName: '上海佐昊知识产权代理事务所',
      //     payeeAcctNo: '1001804909100047469',
      //     xpayDate: 1649952000000
      //   },
      //   {
      //     agencyCodeName: '716001-社会保障基金财政专户',
      //     proCodeName: '610000222000000206665-企业职工基本养老保险中央财政补助资金',
      //     amount: 1546580000,
      //     payAppAmt: '1546580000.00',
      //     useDes: '陕财办社【2021】236号企业职工养老保险中央财政补助资金',
      //     payAcctName: '陕西省财政厅（资金性质：财政零余额专用户）',
      //     payAcctNo: '26105101040009649',
      //     payeeAcctName: '陕西省财政厅社会保障基金财政专户',
      //     payeeAcctNo: '3700023309014439883',
      //     xpayDate: 1648706700000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 1858,
      //     payAppAmt: '1858.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西安科技大学',
      //     payeeAcctNo: '102492014123',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224856-2022年义务教育阶段国家课程免费教科书',
      //     amount: 29700000,
      //     payAppAmt: '29700000.00',
      //     useDes: '免费教科书政府采购',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '陕西新华发行集团有限责任公司',
      //     payeeAcctNo: '3700020509006501866',
      //     xpayDate: 1652921820000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 20000,
      //     payAppAmt: '20000.00',
      //     useDes: '付医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '陈军',
      //     payeeAcctNo: '6215582605002503274',
      //     xpayDate: 1649606400000
      //   },
      //   {
      //     agencyCodeName: '701005-西北妇女儿童医院',
      //     proCodeName: '610000222900000080743-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 240,
      //     payAppAmt: '240.00',
      //     useDes: '专培师资9月份教学补助',
      //     payAcctName: '西北妇女儿童医院(资金性质:零余额账户)',
      //     payAcctNo: '611301032018160011912',
      //     payeeAcctName: '柯华',
      //     payeeAcctNo: '6222600810015893746',
      //     xpayDate: null
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 20000,
      //     payAppAmt: '20000.00',
      //     useDes: '王育升医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '张明强',
      //     payeeAcctNo: '6222032605000394751',
      //     xpayDate: 1650470400000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 8589,
      //     payAppAmt: '8589.00',
      //     useDes: '义齿加工费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '运城市圣冠齿科技术有限公司',
      //     payeeAcctNo: '14001726108050501749',
      //     xpayDate: 1648051200000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 9531.85,
      //     payAppAmt: '9531.85',
      //     useDes: '付检验费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '西安金域医学检验所有限公司',
      //     payeeAcctNo: '103600216906',
      //     xpayDate: 1650769860000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 438942.07,
      //     payAppAmt: '438942.07',
      //     useDes: '3月抚恤金',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '支行代发工资专户',
      //     payeeAcctNo: '2605041611900200068',
      //     xpayDate: 1647273600000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 45745,
      //     payAppAmt: '45745.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西安爱知初级中学',
      //     payeeAcctNo: '61001711100052530171',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '702003-陕西中医药大学附属医院',
      //     proCodeName: '610000222900000080681-中央中医药事业发展部分（第一批7215万元）',
      //     amount: 105,
      //     payAppAmt: '105.00',
      //     useDes: '针灸针费用',
      //     payAcctName: '陕西中医药大学附属医院',
      //     payAcctNo: '61001636208050000335',
      //     payeeAcctName: '马阿妮',
      //     payeeAcctNo: '4162909980130096364',
      //     xpayDate: 1651807200000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204483-优抚对象医疗保障-中央',
      //     amount: 36342,
      //     payAppAmt: '36342.00',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '西安九州通晶明医疗器械有限责任公司',
      //     payeeAcctNo: '78570188000094210',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '716001-社会保障基金财政专户',
      //     proCodeName: '610000222000000206665-企业职工基本养老保险中央财政补助资金',
      //     amount: 1546580000,
      //     payAppAmt: '1546580000.00',
      //     useDes: '陕财办社【2021】236号企业职工养老保险中央财政补助资金',
      //     payAcctName: '陕西省财政厅（资金性质：财政零余额专用户）',
      //     payAcctNo: '26105101040009649',
      //     payeeAcctName: '陕西省财政厅社会保障基金财政专户',
      //     payeeAcctNo: '26190501040002609',
      //     xpayDate: 1648706700000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 200000,
      //     payAppAmt: '200000.00',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '渭南九州通正元医药有限公司',
      //     payeeAcctNo: '102054801652',
      //     xpayDate: 1649606400000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 438820.57,
      //     payAppAmt: '438820.57',
      //     useDes: '4月抚恤金',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '支行代发工资专户',
      //     payeeAcctNo: '2605041611900200068',
      //     xpayDate: 1650470400000
      //   },
      //   {
      //     agencyCodeName: '716001-社会保障基金财政专户',
      //     proCodeName: '610000222000000206666-机关事业单位养老保险中央财政补助资金',
      //     amount: 726410000,
      //     payAppAmt: '726410000.00',
      //     useDes: '陕财办社【2021】235号下达2022年机关事业单位养老保险制度改革中央补助资金',
      //     payAcctName: '陕西省财政厅（资金性质：财政零余额专用户）',
      //     payAcctNo: '26105101040009649',
      //     payeeAcctName: '陕西省财政厅社会保障基金财政专户',
      //     payeeAcctNo: '26190501040002609',
      //     xpayDate: 1643253773000
      //   },
      //   {
      //     agencyCodeName: '208001-省教育厅机关',
      //     proCodeName: '610000222000000226849-老党员生活补助',
      //     amount: 10000,
      //     payAppAmt: '10000.00',
      //     useDes: '老党员生活补助',
      //     payAcctName: '陕西省教育厅（资金性质：零余额专户）',
      //     payAcctNo: '087866120100357000194',
      //     payeeAcctName: '西安电子科技大学',
      //     payeeAcctNo: '611301135018000478803',
      //     xpayDate: 1650858720000
      //   },
      //   {
      //     agencyCodeName: '208015-西安音乐学院',
      //     proCodeName: '610000212000000105413-支持地方高校改革发展资金（第二批）（38号）',
      //     amount: 2865.91,
      //     payAppAmt: '2865.91',
      //     useDes: '购固定资产',
      //     payAcctName: '西安音乐学院(资金性质:零余额)',
      //     payAcctNo: '611301051018010055812',
      //     payeeAcctName: '陕西省公共资源交易服务有限公司',
      //     payeeAcctNo: '8111701011800601975',
      //     xpayDate: 1651026120000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 30000,
      //     payAppAmt: '30000.00',
      //     useDes: '休养员医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '陈军',
      //     payeeAcctNo: '6215582605002503274',
      //     xpayDate: 1649347200000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 27884,
      //     payAppAmt: '27884.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '咸阳师范学院',
      //     payeeAcctNo: '806031201421000750',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '701001-陕西省卫生健康委员会',
      //     proCodeName: '610000222900000080741-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 3480000,
      //     payAppAmt: '3480000.00',
      //     useDes: '陕财办社【2021】259号卫生健康人才培养',
      //     payAcctName: '陕西省卫生健康委员会（资金性质：零余额账户）',
      //     payAcctNo: '102052653886',
      //     payeeAcctName: '中国人民解放军空军军医大学第三附属医院',
      //     payeeAcctNo: '3700025209026720795',
      //     xpayDate: 1653441900000
      //   },
      //   {
      //     agencyCodeName: '702002-陕西省中医医院',
      //     proCodeName: '610000212000000105165-医疗服务与保障能力提升补助项目',
      //     amount: 6300,
      //     payAppAmt: '6300.00',
      //     useDes: '服务支出05-152',
      //     payAcctName: '陕西省中医医院-零余额账户',
      //     payAcctNo: '3700020509089234012',
      //     payeeAcctName: '石泉西北水电商贸有限公司',
      //     payeeAcctNo: '2607061609200113992',
      //     xpayDate: 1653539520000
      //   },
      //   {
      //     agencyCodeName: '701013-陕西省地方病防治研究所',
      //     proCodeName: '610000222900000080687-中央基本公共卫生服务补助资金（第一批）',
      //     amount: 4100,
      //     payAppAmt: '4100.00',
      //     useDes: '地方病防治工作租车费',
      //     payAcctName: '陕西省地方病防治研究所（资金性质：零余额账户）',
      //     payAcctNo: '61001711100058011229',
      //     payeeAcctName: '陕西骏程汽车服务有限公司',
      //     payeeAcctNo: '906011580000087047',
      //     xpayDate: 1652057580000
      //   },
      //   {
      //     agencyCodeName: '701013-陕西省地方病防治研究所',
      //     proCodeName: '610000222900000080687-中央基本公共卫生服务补助资金（第一批）',
      //     amount: 2000,
      //     payAppAmt: '2000.00',
      //     useDes: '疫情防控宝鸡流调租车',
      //     payAcctName: '陕西省地方病防治研究所（资金性质：零余额账户）',
      //     payAcctNo: '61001711100058011229',
      //     payeeAcctName: '陕西骏程汽车服务有限公司',
      //     payeeAcctNo: '906011580000087047',
      //     xpayDate: 1652057640000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 90985.8,
      //     payAppAmt: '90985.80',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '陕西瑞生诊断试剂有限公司',
      //     payeeAcctNo: '3700051309201054505',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 38990,
      //     payAppAmt: '38990.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西北农林科技大学',
      //     payeeAcctNo: '102810820826',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224856-2022年义务教育阶段国家课程免费教科书',
      //     amount: 9900000,
      //     payAppAmt: '9900000.00',
      //     useDes: '免费教科书政府采购',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '陕西新华发行集团有限责任公司',
      //     payeeAcctNo: '3700020509006501866',
      //     xpayDate: 1652921760000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 46905.1,
      //     payAppAmt: '46905.10',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '国药控股渭南有限公司',
      //     payeeAcctNo: '103281549980',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '733001-陕西省医疗保障局',
      //     proCodeName: '610000222000000204175-医疗服务能力提升',
      //     amount: 83000,
      //     payAppAmt: '83000.00',
      //     useDes: '付委托业务费',
      //     payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
      //     payAcctNo: '129910435710803',
      //     payeeAcctName: '西安交通大学',
      //     payeeAcctNo: '3700023509088100314',
      //     xpayDate: 1649819820000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224856-2022年义务教育阶段国家课程免费教科书',
      //     amount: 9900000,
      //     payAppAmt: '9900000.00',
      //     useDes: '免费教科书政府采购',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '陕西新华发行集团有限责任公司',
      //     payeeAcctNo: '3700020509006501866',
      //     xpayDate: 1652921700000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 848,
      //     payAppAmt: '848.00',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '华润陕西医药有限公司',
      //     payeeAcctNo: '61050170526200000080',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224856-2022年义务教育阶段国家课程免费教科书',
      //     amount: 19800000,
      //     payAppAmt: '19800000.00',
      //     useDes: '免费教科书政府采购',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '陕西新华发行集团有限责任公司',
      //     payeeAcctNo: '3700020509006501866',
      //     xpayDate: 1652921640000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 10000,
      //     payAppAmt: '10000.00',
      //     useDes: '王树良医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '陈军',
      //     payeeAcctNo: '6215582605002503274',
      //     xpayDate: 1653013080000
      //   },
      //   {
      //     agencyCodeName: '208015-西安音乐学院',
      //     proCodeName: '610000212000000105413-支持地方高校改革发展资金（第二批）（38号）',
      //     amount: 255.04,
      //     payAppAmt: '255.04',
      //     useDes: '购办公用品',
      //     payAcctName: '西安音乐学院(资金性质:零余额)',
      //     payAcctNo: '611301051018010055812',
      //     payeeAcctName: null,
      //     payeeAcctNo: null,
      //     xpayDate: 1649293260000
      //   },
      //   {
      //     agencyCodeName: '733001-陕西省医疗保障局',
      //     proCodeName: '610000212000000103337-2021年中央财政医疗服务与保障能力提升',
      //     amount: 11800,
      //     payAppAmt: '11800.00',
      //     useDes: '提升医疗服务能力支出',
      //     payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
      //     payAcctNo: '129910435710803',
      //     payeeAcctName: '延安方圆旅游开发有限责任公司',
      //     payeeAcctNo: '61050168411100000182',
      //     xpayDate: 1651903140000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 2777,
      //     payAppAmt: '2777.00',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '西安北辰医药有限公司',
      //     payeeAcctNo: '407011580000097335',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 40000,
      //     payAppAmt: '40000.00',
      //     useDes: '张毕林医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '晋长德',
      //     payeeAcctNo: '6217232605000835579',
      //     xpayDate: 1650470400000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 14434,
      //     payAppAmt: '14434.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西安理工大学',
      //     payeeAcctNo: '102891574567',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '702003-陕西中医药大学附属医院',
      //     proCodeName: '610000222900000080681-中央中医药事业发展部分（第一批7215万元）',
      //     amount: 8800,
      //     payAppAmt: '8800.00',
      //     useDes: '论文版面费',
      //     payAcctName: '陕西中医药大学附属医院',
      //     payAcctNo: '61001636208050000335',
      //     payeeAcctName: '陕西盛唐传媒投资有限公司',
      //     payeeAcctNo: '611301134018010027735',
      //     xpayDate: 1650470400000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204483-优抚对象医疗保障-中央',
      //     amount: 30850.8,
      //     payAppAmt: '30850.80',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '渭南九州通正元医药有限公司',
      //     payeeAcctNo: '102054801652',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 2024,
      //     payAppAmt: '2024.00',
      //     useDes: '付抚恤金',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '张西锋',
      //     payeeAcctNo: '6210814140000306265',
      //     xpayDate: 1649260800000
      //   },
      //   {
      //     agencyCodeName: '733001-陕西省医疗保障局',
      //     proCodeName: '610000212000000103337-2021年中央财政医疗服务与保障能力提升',
      //     amount: 17908,
      //     payAppAmt: '17908.00',
      //     useDes: '提升医保服务能力支出',
      //     payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
      //     payAcctNo: '129910435710803',
      //     payeeAcctName: null,
      //     payeeAcctNo: null,
      //     xpayDate: 1651799580000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 16728,
      //     payAppAmt: '16728.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西北大学',
      //     payeeAcctNo: '61001740015050002234',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '701005-西北妇女儿童医院',
      //     proCodeName: '610000222900000080743-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 2175,
      //     payAppAmt: '2175.00',
      //     useDes: '专科医师规范化培训项目资料费',
      //     payAcctName: '西北妇女儿童医院(资金性质:零余额账户)',
      //     payAcctNo: '611301032018160011912',
      //     payeeAcctName: '陕西医教书城图书发行有限公司',
      //     payeeAcctNo: '501011580000267019',
      //     xpayDate: null
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224856-2022年义务教育阶段国家课程免费教科书',
      //     amount: 9121187.31,
      //     payAppAmt: '9121187.31',
      //     useDes: '免费教科书政府采购',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '陕西新华发行集团有限责任公司',
      //     payeeAcctNo: '3700020509006501866',
      //     xpayDate: 1652921520000
      //   },
      //   {
      //     agencyCodeName: '702002-陕西省中医医院',
      //     proCodeName: '610000212000000105165-医疗服务与保障能力提升补助项目',
      //     amount: 2000,
      //     payAppAmt: '2000.00',
      //     useDes: '05-18培训支出重汇',
      //     payAcctName: '陕西省中医医院-零余额账户',
      //     payAcctNo: '3700020509089234012',
      //     payeeAcctName: '尚向涛',
      //     payeeAcctNo: '6217863600000643525',
      //     xpayDate: 1652755440000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222900000080685-中央基本公共卫生服务补助资金（第一批）',
      //     amount: 400000,
      //     payAppAmt: '400000.00',
      //     useDes: '拨付2022年中央公共基本卫生补助经费',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西安交通大学',
      //     payeeAcctNo: '3700023509088100314',
      //     xpayDate: 1650211200000
      //   },
      //   {
      //     agencyCodeName: '701005-西北妇女儿童医院',
      //     proCodeName: '610000222900000080743-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 15300,
      //     payAppAmt: '15300.00',
      //     useDes: '专培学员9月财政补助',
      //     payAcctName: '西北妇女儿童医院(资金性质:零余额账户)',
      //     payAcctNo: '611301032018160011912',
      //     payeeAcctName: null,
      //     payeeAcctNo: null,
      //     xpayDate: null
      //   },
      //   {
      //     agencyCodeName: '208005-西安科技大学',
      //     proCodeName: '610000212000000105403-支持地方高校改革发展资金（第二批）（38号）',
      //     amount: 168,
      //     payAppAmt: '168.00',
      //     useDes: '5-3600支付材料费',
      //     payAcctName: '西安科技大学（资金性质：零余额账户）',
      //     payAcctNo: '61001900041058000003',
      //     payeeAcctName: '西安市临潼区康复路百盛文具店',
      //     payeeAcctNo: '26175701040004733',
      //     xpayDate: 1653277860000
      //   },
      //   {
      //     agencyCodeName: '701001-陕西省卫生健康委员会',
      //     proCodeName: '610000222900000080741-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 600000,
      //     payAppAmt: '600000.00',
      //     useDes: '陕财办社【2021】259号卫生健康人才培养',
      //     payAcctName: '陕西省卫生健康委员会（资金性质：零余额账户）',
      //     payAcctNo: '102052653886',
      //     payeeAcctName: '延安大学咸阳医院有限公司',
      //     payeeAcctNo: '2604021009200031971',
      //     xpayDate: 1653441900000
      //   },
      //   {
      //     agencyCodeName: '702002-陕西省中医医院',
      //     proCodeName: '610000212000000105165-医疗服务与保障能力提升补助项目',
      //     amount: 3056,
      //     payAppAmt: '3056.00',
      //     useDes: '材料费用04-209',
      //     payAcctName: '陕西省中医医院-零余额账户',
      //     payAcctNo: '3700020509089234012',
      //     payeeAcctName: '陕西健安医疗器械有限责任公司',
      //     payeeAcctNo: '103600213927',
      //     xpayDate: 1650332700000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000212000000105815-高校学生国家奖助学金第二批（42号）',
      //     amount: 34000,
      //     payAppAmt: '34000.00',
      //     useDes: '拨付高校学生国家奖助学金（第二批）结转资金—西安航空职工大学',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西安航空职业技术学院（济困助学专户）',
      //     payeeAcctNo: '61050170515300000117',
      //     xpayDate: 1652845680000
      //   },
      //   {
      //     agencyCodeName: '701013-陕西省地方病防治研究所',
      //     proCodeName: '610000222900000080687-中央基本公共卫生服务补助资金（第一批）',
      //     amount: 3565.38,
      //     payAppAmt: '3565.38',
      //     useDes: '地方病防治工作启动差费',
      //     payAcctName: '陕西省地方病防治研究所（资金性质：零余额账户）',
      //     payAcctNo: '61001711100058011229',
      //     payeeAcctName: null,
      //     payeeAcctNo: null,
      //     xpayDate: 1652057580000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204483-优抚对象医疗保障-中央',
      //     amount: 1813.2,
      //     payAppAmt: '1813.20',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '上药科园信海陕西医药有限公司',
      //     payeeAcctNo: '7252110182600001066',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 20000,
      //     payAppAmt: '20000.00',
      //     useDes: '休养员医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '陈军',
      //     payeeAcctNo: '6215582605002503274',
      //     xpayDate: 1648569600000
      //   },
      //   {
      //     agencyCodeName: '716001-社会保障基金财政专户',
      //     proCodeName: '610000222900000093575-中央财政对2021年调整企业离休干部基本养老金的补助',
      //     amount: 1250000,
      //     payAppAmt: '1250000.00',
      //     useDes: '陕财办社【2022】20号下达2021年调整企业离休干部基本养老金中央财政补助资金',
      //     payAcctName: '陕西省财政厅（资金性质：财政零余额专用户）',
      //     payAcctNo: '26105101040009649',
      //     payeeAcctName: '陕西省财政厅社会保障基金财政专户',
      //     payeeAcctNo: '61001910004050010615-0001',
      //     xpayDate: 1648706700000
      //   },
      //   {
      //     agencyCodeName: '701005-西北妇女儿童医院',
      //     proCodeName: '610000222900000080743-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 15300,
      //     payAppAmt: '15300.00',
      //     useDes: '专培学员8月财政补助',
      //     payAcctName: '西北妇女儿童医院(资金性质:零余额账户)',
      //     payAcctNo: '611301032018160011912',
      //     payeeAcctName: null,
      //     payeeAcctNo: null,
      //     xpayDate: null
      //   },
      //   {
      //     agencyCodeName: '208005-西安科技大学',
      //     proCodeName: '610000212000000105403-支持地方高校改革发展资金（第二批）（38号）',
      //     amount: 12000,
      //     payAppAmt: '12000.00',
      //     useDes: '3-3283转维修费',
      //     payAcctName: '西安科技大学（资金性质：零余额账户）',
      //     payAcctNo: '61001900041058000003',
      //     payeeAcctName: '西安曲江新区楷璇电子产品经销处',
      //     payeeAcctNo: '8888888588777704',
      //     xpayDate: 1648742400000
      //   },
      //   {
      //     agencyCodeName: '701001-陕西省卫生健康委员会',
      //     proCodeName: '610000222900000080741-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 1090000,
      //     payAppAmt: '1090000.00',
      //     useDes: '陕财办社【2021】259号卫生健康人才培养',
      //     payAcctName: '陕西省卫生健康委员会（资金性质：零余额账户）',
      //     payAcctNo: '102052653886',
      //     payeeAcctName: '陕西省医师协会',
      //     payeeAcctNo: '129912259410601',
      //     xpayDate: 1653441900000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 15000,
      //     payAppAmt: '15000.00',
      //     useDes: '王树良医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '陈军',
      //     payeeAcctNo: '6215582605002503274',
      //     xpayDate: null
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 21287,
      //     payAppAmt: '21287.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西安电子科技大学',
      //     payeeAcctNo: '611301135018000478803',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '716001-社会保障基金财政专户',
      //     proCodeName: '610000222000000206665-企业职工基本养老保险中央财政补助资金',
      //     amount: 1546590000,
      //     payAppAmt: '1546590000.00',
      //     useDes: '陕财办社【2021】236号企业职工养老保险中央财政补助资金',
      //     payAcctName: '陕西省财政厅（资金性质：财政零余额专用户）',
      //     payAcctNo: '26105101040009649',
      //     payeeAcctName: '陕西省财政厅社会保障基金财政专户',
      //     payeeAcctNo: '61001910004050010615-0001',
      //     xpayDate: 1648706700000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 10000,
      //     payAppAmt: '10000.00',
      //     useDes: '王育升医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '张明强',
      //     payeeAcctNo: '6222032605000394751',
      //     xpayDate: 1651202460000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 12119.9,
      //     payAppAmt: '12119.90',
      //     useDes: '付检验费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '西安迪安医学检验实验室有限公司',
      //     payeeAcctNo: '61050174630000000012',
      //     xpayDate: 1650297600000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 3000,
      //     payAppAmt: '3000.00',
      //     useDes: '王树良医疗费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '陈军',
      //     payeeAcctNo: '6215582605002503274',
      //     xpayDate: 1652753220000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 74773,
      //     payAppAmt: '74773.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西安外国语大学',
      //     payeeAcctNo: '3700021609088211582',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '702002-陕西省中医医院',
      //     proCodeName: '610000212000000105165-医疗服务与保障能力提升补助项目',
      //     amount: 4275,
      //     payAppAmt: '4275.00',
      //     useDes: '05-18服务支出',
      //     payAcctName: '陕西省中医医院-零余额账户',
      //     payAcctNo: '3700020509089234012',
      //     payeeAcctName: '西安鸿星宇盛餐饮投资管理有限公司',
      //     payeeAcctNo: '61050170000900000561',
      //     xpayDate: 1652681700000
      //   },
      //   {
      //     agencyCodeName: '733001-陕西省医疗保障局',
      //     proCodeName: '610000212000000103337-2021年中央财政医疗服务与保障能力提升',
      //     amount: 34116,
      //     payAppAmt: '34116.00',
      //     useDes: '提升医疗服务能力支出',
      //     payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
      //     payAcctNo: '129910435710803',
      //     payeeAcctName: '陕西太乙马汽车服务有限公司',
      //     payeeAcctNo: '129909731410701',
      //     xpayDate: 1653286620000
      //   },
      //   {
      //     agencyCodeName: '701005-西北妇女儿童医院',
      //     proCodeName: '610000222900000080743-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 240,
      //     payAppAmt: '240.00',
      //     useDes: '专培师资10月份教学补助',
      //     payAcctName: '西北妇女儿童医院(资金性质:零余额账户)',
      //     payAcctNo: '611301032018160011912',
      //     payeeAcctName: '张娟',
      //     payeeAcctNo: '6222600810015893720',
      //     xpayDate: null
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 51464,
      //     payAppAmt: '51464.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西安交通大学',
      //     payeeAcctNo: '3700023509088100314',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '716001-社会保障基金财政专户',
      //     proCodeName: '610000222900000093575-中央财政对2021年调整企业离休干部基本养老金的补助',
      //     amount: 1250000,
      //     payAppAmt: '1250000.00',
      //     useDes: '陕财办社【2022】20号下达2021年调整企业离休干部基本养老金中央财政补助资金',
      //     payAcctName: '陕西省财政厅（资金性质：财政零余额专用户）',
      //     payAcctNo: '26105101040009649',
      //     payeeAcctName: '陕西省财政厅社会保障基金财政专户',
      //     payeeAcctNo: '3700023309014439883',
      //     xpayDate: 1648706700000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 18720.66,
      //     payAppAmt: '18720.66',
      //     useDes: '付检验费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '西安金域医学检验所有限公司',
      //     payeeAcctNo: '103600216906',
      //     xpayDate: 1653440580000
      //   },
      //   {
      //     agencyCodeName: '208005-西安科技大学',
      //     proCodeName: '610000212000000105403-支持地方高校改革发展资金（第二批）（38号）',
      //     amount: 8962,
      //     payAppAmt: '8962.00',
      //     useDes: '3-3080教学管理答题纸费',
      //     payAcctName: '西安科技大学（资金性质：零余额账户）',
      //     payAcctNo: '61001900041058000003',
      //     payeeAcctName: '西安市碑林区天宇印务部',
      //     payeeAcctNo: '3700023509200138595',
      //     xpayDate: 1648742400000
      //   },
      //   {
      //     agencyCodeName: '701001-陕西省卫生健康委员会',
      //     proCodeName: '610000222900000080741-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 12285000,
      //     payAppAmt: '12285000.00',
      //     useDes: '陕财办社【2021】259号卫生健康人才培养',
      //     payAcctName: '陕西省卫生健康委员会（资金性质：零余额账户）',
      //     payAcctNo: '102052653886',
      //     payeeAcctName: '西安交通大学医学院第二附属医院',
      //     payeeAcctNo: '61001862500052514853',
      //     xpayDate: 1653441900000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224856-2022年义务教育阶段国家课程免费教科书',
      //     amount: 9900000,
      //     payAppAmt: '9900000.00',
      //     useDes: '免费教科书政府采购',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '陕西新华发行集团有限责任公司',
      //     payeeAcctNo: '3700020509006501866',
      //     xpayDate: 1652921880000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 14356,
      //     payAppAmt: '14356.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西安建筑科技大学',
      //     payeeAcctNo: '3700023009026400639',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 14515.9,
      //     payAppAmt: '14515.90',
      //     useDes: '付检验费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '西安金域医学检验所有限公司',
      //     payeeAcctNo: '103600216906',
      //     xpayDate: 1648137600000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 38406,
      //     payAppAmt: '38406.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西北工业大学',
      //     payeeAcctNo: '3700117319200004172',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 23041,
      //     payAppAmt: '23041.00',
      //     useDes: '付检验费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '西安艾迪康医学检验实验室有限公司',
      //     payeeAcctNo: '3700033519100017423',
      //     xpayDate: 1650297600000
      //   },
      //   {
      //     agencyCodeName: '701001-陕西省卫生健康委员会',
      //     proCodeName: '610000222900000080741-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 90000,
      //     payAppAmt: '90000.00',
      //     useDes: '陕财办社【2021】259号卫生健康人才培养',
      //     payAcctName: '陕西省卫生健康委员会（资金性质：零余额账户）',
      //     payAcctNo: '102052653886',
      //     payeeAcctName: '西安中医脑病医院有限公司',
      //     payeeAcctNo: '158367396',
      //     xpayDate: 1653441900000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 19376,
      //     payAppAmt: '19376.00',
      //     useDes: '付检验费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '西安艾迪康医学检验实验室有限公司',
      //     payeeAcctNo: '3700033519100017423',
      //     xpayDate: 1653440520000
      //   },
      //   {
      //     agencyCodeName: '702002-陕西省中医医院',
      //     proCodeName: '610000212000000105165-医疗服务与保障能力提升补助项目',
      //     amount: 28627.8,
      //     payAppAmt: '28627.80',
      //     useDes: '服务支出05-152',
      //     payAcctName: '陕西省中医医院-零余额账户',
      //     payAcctNo: '3700020509089234012',
      //     payeeAcctName: '西安博水商务有限公司',
      //     payeeAcctNo: '611301060018010015909',
      //     xpayDate: null
      //   },
      //   {
      //     agencyCodeName: '701005-西北妇女儿童医院',
      //     proCodeName: '610000222900000080743-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 600,
      //     payAppAmt: '600.00',
      //     useDes: '专培师资8月份教学补助',
      //     payAcctName: '西北妇女儿童医院(资金性质:零余额账户)',
      //     payAcctNo: '611301032018160011912',
      //     payeeAcctName: '张莉',
      //     payeeAcctNo: '6222600810015894660',
      //     xpayDate: null
      //   },
      //   {
      //     agencyCodeName: '733001-陕西省医疗保障局',
      //     proCodeName: '610000222000000204175-医疗服务能力提升',
      //     amount: 118401,
      //     payAppAmt: '118401.00',
      //     useDes: '付委托业务费',
      //     payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
      //     payAcctNo: '129910435710803',
      //     payeeAcctName: '陕西松狮影视文化传媒有限公司',
      //     payeeAcctNo: '6232581200112858',
      //     xpayDate: 1649819820000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 43662,
      //     payAppAmt: '43662.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '陕西师范大学',
      //     payeeAcctNo: '61001925200050001702',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '701013-陕西省地方病防治研究所',
      //     proCodeName: '610000222900000080687-中央基本公共卫生服务补助资金（第一批）',
      //     amount: 9900,
      //     payAppAmt: '9900.00',
      //     useDes: '机场专班',
      //     payAcctName: '陕西省地方病防治研究所（资金性质：零余额账户）',
      //     payAcctNo: '61001711100058011229',
      //     payeeAcctName: null,
      //     payeeAcctNo: null,
      //     xpayDate: 1650943320000
      //   },
      //   {
      //     agencyCodeName: '702002-陕西省中医医院',
      //     proCodeName: '610000212000000105165-医疗服务与保障能力提升补助项目',
      //     amount: 5000,
      //     payAppAmt: '5000.00',
      //     useDes: '05-18服务支出',
      //     payAcctName: '陕西省中医医院-零余额账户',
      //     payAcctNo: '3700020509089234012',
      //     payeeAcctName: null,
      //     payeeAcctNo: null,
      //     xpayDate: 1652679780000
      //   },
      //   {
      //     agencyCodeName: '733001-陕西省医疗保障局',
      //     proCodeName: '610000222000000204175-医疗服务能力提升',
      //     amount: 75000,
      //     payAppAmt: '75000.00',
      //     useDes: '课题研究',
      //     payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
      //     payAcctNo: '129910435710803',
      //     payeeAcctName: '西安交通大学',
      //     payeeAcctNo: '3700023509088100314',
      //     xpayDate: 1649726040000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224856-2022年义务教育阶段国家课程免费教科书',
      //     amount: 9900000,
      //     payAppAmt: '9900000.00',
      //     useDes: '免费教科书政府采购',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '陕西新华发行集团有限责任公司',
      //     payeeAcctNo: '3700020509006501866',
      //     xpayDate: 1652922300000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 60000,
      //     payAppAmt: '60000.00',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '陕西华实诊断试剂有限公司',
      //     payeeAcctNo: '61001865400052506155',
      //     xpayDate: 1646668800000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 439292.07,
      //     payAppAmt: '439292.07',
      //     useDes: '5月抚恤金',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '支行代发工资专户',
      //     payeeAcctNo: '2605041611900200068',
      //     xpayDate: 1652409420000
      //   },
      //   {
      //     agencyCodeName: '716001-社会保障基金财政专户',
      //     proCodeName: '610000222000000206665-企业职工基本养老保险中央财政补助资金',
      //     amount: 1546580000,
      //     payAppAmt: '1546580000.00',
      //     useDes: '陕财办社【2021】236号下达中央财政对企业职工基本养老保险基金的补助',
      //     payAcctName: '陕西省财政厅（资金性质：财政零余额专用户）',
      //     payAcctNo: '26105101040009649',
      //     payeeAcctName: '陕西省财政厅社会保障基金财政专户',
      //     payeeAcctNo: '26190501040002609',
      //     xpayDate: 1646033558000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224856-2022年义务教育阶段国家课程免费教科书',
      //     amount: 9900000,
      //     payAppAmt: '9900000.00',
      //     useDes: '免费教科书政府采购',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '陕西新华发行集团有限责任公司',
      //     payeeAcctNo: '3700020509006501866',
      //     xpayDate: 1652922360000
      //   },
      //   {
      //     agencyCodeName: '733001-陕西省医疗保障局',
      //     proCodeName: '610000212000000103337-2021年中央财政医疗服务与保障能力提升',
      //     amount: 22120,
      //     payAppAmt: '22120.00',
      //     useDes: '提升医保服务能力支出',
      //     payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
      //     payAcctNo: '129910435710803',
      //     payeeAcctName: '陕西太乙马汽车服务有限公司',
      //     payeeAcctNo: '129909731410701',
      //     xpayDate: 1651799460000
      //   },
      //   {
      //     agencyCodeName: '716001-社会保障基金财政专户',
      //     proCodeName: '610000222000000206665-企业职工基本养老保险中央财政补助资金',
      //     amount: 1546590000,
      //     payAppAmt: '1546590000.00',
      //     useDes: '陕财办社【2021】236号下达中央财政对企业职工基本养老保险基金的补助',
      //     payAcctName: '陕西省财政厅（资金性质：财政零余额专用户）',
      //     payAcctNo: '26105101040009649',
      //     payeeAcctName: '陕西省财政厅社会保障基金财政专户',
      //     payeeAcctNo: '61001910004050010615-0001',
      //     xpayDate: 1646033558000
      //   },
      //   {
      //     agencyCodeName: '701005-西北妇女儿童医院',
      //     proCodeName: '610000222900000080743-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 400,
      //     payAppAmt: '400.00',
      //     useDes: '专培师资8月份教学补助',
      //     payAcctName: '西北妇女儿童医院(资金性质:零余额账户)',
      //     payAcctNo: '611301032018160011912',
      //     payeeAcctName: '郭金珍',
      //     payeeAcctNo: '6222620810008714376',
      //     xpayDate: null
      //   },
      //   {
      //     agencyCodeName: '701001-陕西省卫生健康委员会',
      //     proCodeName: '610000222900000080741-中央卫生健康人才培养（第一批20803万元）',
      //     amount: 3360000,
      //     payAppAmt: '3360000.00',
      //     useDes: '陕财办社【2021】259号卫生健康人才培养',
      //     payAcctName: '陕西省卫生健康委员会（资金性质：零余额账户）',
      //     payAcctNo: '102052653886',
      //     payeeAcctName: '西安交通大学口腔医院',
      //     payeeAcctNo: '296880713210001',
      //     xpayDate: 1653441900000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 9841,
      //     payAppAmt: '9841.00',
      //     useDes: '付消毒费',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '华阴市人民医院',
      //     payeeAcctNo: '961000010003418940',
      //     xpayDate: 1648483200000
      //   },
      //   {
      //     agencyCodeName: '208047-省教育厅财务处',
      //     proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     amount: 19926,
      //     payAppAmt: '19926.00',
      //     useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
      //     payAcctName: '陕西省教育厅（资金性质：零余额账户）',
      //     payAcctNo: '61001910004058006888',
      //     payeeAcctName: '西藏民族大学',
      //     payeeAcctNo: '61001636108052500284',
      //     xpayDate: 1647964800000
      //   },
      //   {
      //     agencyCodeName: '733001-陕西省医疗保障局',
      //     proCodeName: '610000212000000103337-2021年中央财政医疗服务与保障能力提升',
      //     amount: 10920,
      //     payAppAmt: '10920.00',
      //     useDes: '提升医疗服务能力支出',
      //     payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
      //     payAcctNo: '129910435710803',
      //     payeeAcctName: '陕西太乙马汽车服务有限公司',
      //     payeeAcctNo: '129909731410701',
      //     xpayDate: 1651903140000
      //   },
      //   {
      //     agencyCodeName: '702001-陕西省中医药管理局机关',
      //     proCodeName: '610000222900000080679-中央中医药事业发展部分（第一批7215万元）',
      //     amount: 200000,
      //     payAppAmt: '200000.00',
      //     useDes: '潘玥宏拨付岐黄学者支持项目2022年度经费',
      //     payAcctName: '陕西省中医药管理局（资金性质：零余额专户）',
      //     payAcctNo: '087866120100357000947',
      //     payeeAcctName: '陕西中医药大学',
      //     payeeAcctNo: '102803326631',
      //     xpayDate: 1649643420000
      //   },
      //   {
      //     agencyCodeName: '732002-陕西省荣誉军人康复医院',
      //     proCodeName: '610000222000000204445-优抚对象抚恤-中央',
      //     amount: 113749.2,
      //     payAppAmt: '113749.20',
      //     useDes: '付药品款',
      //     payAcctName: '陕西省荣誉军人康复医院零余额户',
      //     payAcctNo: '61001647508050000319',
      //     payeeAcctName: '陕西华氏医药有限公司',
      //     payeeAcctNo: '407011580000096159',
      //     xpayDate: 1646668800000
      //   }
      // ] : this.detailData = [
      //   {
      //     speTypeCode: '1001',
      //     speTypeName: '城乡义务教育补助经费',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省西安小学',
      //     proName: '提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     xjExpFuncName: '其他普通教育支出',
      //     fpAmount: 14611,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1001',
      //     speTypeName: '城乡义务教育补助经费',
      //     mofDivCode: '610000000',
      //     agencyName: '省教育厅财务处',
      //     proName: '提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
      //     xjExpFuncName: '其他普通教育支出',
      //     fpAmount: 755389,
      //     payAppAmt: 755389
      //   },
      //   {
      //     speTypeCode: '1001',
      //     speTypeName: '城乡义务教育补助经费',
      //     mofDivCode: '610000000',
      //     agencyName: '省教育厅财务处',
      //     proName: '2022年义务教育阶段国家课程免费教科书',
      //     xjExpFuncName: '其他普通教育支出',
      //     fpAmount: 447510000,
      //     payAppAmt: 137821187.31
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '延安大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 80670000,
      //     payAppAmt: 8149382.99
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安外国语大学',
      //     proName: '2022年支持地方高校改革发展资金（西安外国语大学政府采购）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 5610000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安邮电大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 58350000,
      //     payAppAmt: 7325612.24
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西理工大学',
      //     proName: '2022年支持地方高校改革发展资金（陕西理工大学智慧校园-公共服务平台建设采购）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 10020000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '渭南师范学院',
      //     proName: '2022年支持地方高校改革发展资金（渭南师范学院朝阳校区消防设施改造项目采购）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 980000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '安康学院',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 39670000,
      //     payAppAmt: 6817305.97
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西理工大学',
      //     proName: '2022年支持地方高校改革发展资金（陕西理工大学图书馆文献资源建设采购）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 7000000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西理工大学',
      //     proName: '2022年支持地方高校改革发展资金（陕西理工大学秦巴生物资源与生态环境省部共建国家重点实验室建设（二期）采购）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 10000000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安外国语大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 34310000,
      //     payAppAmt: 3639849.06
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安航空学院',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 21730000,
      //     payAppAmt: 2231540.03
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安科技大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 86320000,
      //     payAppAmt: 3172690.83
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '商洛学院',
      //     proName: '2022年支持地方高校改革发展资金（商洛学院师范生教学技能培训中心建设采购）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 5000000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '渭南师范学院',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 38240000,
      //     payAppAmt: 6640599.6
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安建筑科技大学',
      //     proName: '2022年支持地方高校改革发展资金（西安建筑科技大学专项采购）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 35100000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西科技大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 61760000,
      //     payAppAmt: 18568433.9
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西理工大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 13500000,
      //     payAppAmt: 6177969.56
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安航空学院',
      //     proName: '2022年支持地方高校改革发展资金（西安航空学院专项采购）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 5000000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安工程大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 69820000,
      //     payAppAmt: 16620941.38
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安理工大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 87950000,
      //     payAppAmt: 27431069.82
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西学前师范学院',
      //     proName: '2022年支持地方高校改革发展资金（陕西学前师范学院政府采购））',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 17330000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安音乐学院',
      //     proName: '2022年支持地方高校改革发展资金-西安音乐学院政府采购',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 6649999.99,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西理工大学',
      //     proName: '2022年支持地方高校改革发展资金（陕西理工大学教师教育实训平台建设采购）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 10000000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西中医药大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 58830000,
      //     payAppAmt: 7975067.75
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安医学院',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 54610000,
      //     payAppAmt: 4302559.72
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安美术学院',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 57830000,
      //     payAppAmt: 6088897.41
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安音乐学院',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 4550000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '咸阳师范学院',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 30590000,
      //     payAppAmt: 614714.25
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安体育学院本级',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 22150000,
      //     payAppAmt: 2225869.18
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '宝鸡文理学院',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 50430000,
      //     payAppAmt: 17789050.16
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西理工大学',
      //     proName: '2022年支持地方高校改革发展资金（陕西理工大学“一流学科”高水平创新平台建设采购）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 2130000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安财经大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 46340000,
      //     payAppAmt: 11221881.32
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西北政法大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 39230000,
      //     payAppAmt: 4165370.95
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西北大学本级',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 128890000,
      //     payAppAmt: 30096731.13
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安工业大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 64730000,
      //     payAppAmt: 2700372.4
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '榆林学院',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 34790000,
      //     payAppAmt: 19859208.87
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安石油大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 67450000,
      //     payAppAmt: 9063274.49
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西学前师范学院',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 24000000,
      //     payAppAmt: 2239858.12
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西理工大学',
      //     proName: '2022年支持地方高校改革发展资金（陕西理工大学“立德树人”三维虚拟仿真思政实践教育中心采购）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 2400000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1007',
      //     speTypeName: '支出地方高校改革发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安建筑科技大学',
      //     proName: '提前下达2022年支持地方高校改革发展资金',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 43510000,
      //     payAppAmt: 25186547.49
      //   },
      //   {
      //     speTypeCode: '101101',
      //     speTypeName: '机关事业单位基本养老保险（人社厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '社会保障基金财政专户',
      //     proName: '机关事业单位养老保险中央财政补助资金',
      //     xjExpFuncName: '对机关事业单位基本养老保险基金的补助',
      //     fpAmount: 726410000,
      //     payAppAmt: 726410000
      //   },
      //   {
      //     speTypeCode: '101102',
      //     speTypeName: '企业职工基本养老保险（人社厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '社会保障基金财政专户',
      //     proName: '企业职工基本养老保险中央财政补助资金',
      //     xjExpFuncName: '财政对企业职工基本养老保险基金的补助',
      //     fpAmount: 18559000000,
      //     payAppAmt: 9279500000
      //   },
      //   {
      //     speTypeCode: '101102',
      //     speTypeName: '企业职工基本养老保险（人社厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '社会保障基金财政专户',
      //     proName: '中央财政对2021年调整企业离休干部基本养老金的补助',
      //     xjExpFuncName: '财政对企业职工基本养老保险基金的补助',
      //     fpAmount: 3740000,
      //     payAppAmt: 3740000
      //   },
      //   {
      //     speTypeCode: '1018',
      //     speTypeName: '基本公共卫生服务补助资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省地方病防治研究所',
      //     proName: '中央基本公共卫生服务补助资金（第一批）',
      //     xjExpFuncName: '基本公共卫生服务',
      //     fpAmount: 10734000,
      //     payAppAmt: 20665.38
      //   },
      //   {
      //     speTypeCode: '1018',
      //     speTypeName: '基本公共卫生服务补助资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省疾病预防控制中心',
      //     proName: '中央基本公共卫生服务补助资金（第一批）',
      //     xjExpFuncName: '基本公共卫生服务',
      //     fpAmount: 3428000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1018',
      //     speTypeName: '基本公共卫生服务补助资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省计划生育药具管理服务中心',
      //     proName: '中央基本公共卫生服务补助资金（第一批）',
      //     xjExpFuncName: '基本公共卫生服务',
      //     fpAmount: 5650000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1023',
      //     speTypeName: '林业草原生态保护恢复资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省楼观台国有生态实验林场',
      //     proName: '陕西省楼观台国有生态实验林场2022年天保工程社会保险项目',
      //     xjExpFuncName: '社会保险补助',
      //     fpAmount: 2235200,
      //     payAppAmt: 1721941.1
      //   },
      //   {
      //     speTypeCode: '1023',
      //     speTypeName: '林业草原生态保护恢复资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省森林资源管理局',
      //     proName: '陕西省森林资源管理局天保工程政社支出补助项目',
      //     xjExpFuncName: '政策性社会性支出补助',
      //     fpAmount: 30776000,
      //     payAppAmt: 30776000
      //   },
      //   {
      //     speTypeCode: '1023',
      //     speTypeName: '林业草原生态保护恢复资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省森林资源管理局',
      //     proName: '陕西省森林资源管理局2022年天保工程社会保险补助项目',
      //     xjExpFuncName: '社会保险补助',
      //     fpAmount: 24244300,
      //     payAppAmt: 24244300
      //   },
      //   {
      //     speTypeCode: '1026',
      //     speTypeName: '动物防疫等补助经费',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省动物卫生与屠宰管理站',
      //     proName: '强制免疫疫苗经费',
      //     xjExpFuncName: '病虫害控制',
      //     fpAmount: 200000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1027',
      //     speTypeName: '农田建设补助资金',
      //     mofDivCode: '610000000',
      //     agencyName: '省农垦集团有限责任公司',
      //     proName: '陕西农垦沙苑农场2022年2万亩高标准农田建设中央财政资金项目',
      //     xjExpFuncName: '农田建设',
      //     fpAmount: 3947000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1027',
      //     speTypeName: '农田建设补助资金',
      //     mofDivCode: '610000000',
      //     agencyName: '省农垦集团有限责任公司',
      //     proName: '沙苑农场2022年2万亩高标准农田建设项目',
      //     xjExpFuncName: '农田建设',
      //     fpAmount: 15590000,
      //     payAppAmt: 15590000
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西机电职业技术学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 7789800,
      //     payAppAmt: 7789800
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西财经职业技术学院',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 115200,
      //     payAppAmt: 115200
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安美术学院',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 197800,
      //     payAppAmt: 197800
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省城市经济学校',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 407600,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安理工大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 57369600,
      //     payAppAmt: 57369600
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西工业职业技术学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 28828100,
      //     payAppAmt: 28828100
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '安康学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 12969300,
      //     payAppAmt: 12969300
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安音乐学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 7474800,
      //     payAppAmt: 7474800
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '咸阳师范学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 16243600,
      //     payAppAmt: 16243600
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西能源职业技术学院',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 695400,
      //     payAppAmt: 695400
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安邮电大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 24450000,
      //     payAppAmt: 24450000
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安体育学院本级',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 13085200,
      //     payAppAmt: 13085200
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西学前师范学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 11893500,
      //     payAppAmt: 11893500
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '榆林学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 15367000,
      //     payAppAmt: 15367000
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '省教育厅财务处',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 28772400,
      //     payAppAmt: 28772400
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安体育学院本级',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 257900,
      //     payAppAmt: 257900
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西广播电视大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 31165760,
      //     payAppAmt: 31165760
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省商业学校',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 2637700,
      //     payAppAmt: 2637700
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西北政法大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 25997700,
      //     payAppAmt: 25997700
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西能源职业技术学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 15144600,
      //     payAppAmt: 15144600
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安医学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 15511400,
      //     payAppAmt: 15511400
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '榆林学院',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 46400,
      //     payAppAmt: 46400
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西财经职业技术学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 15035200,
      //     payAppAmt: 15035200
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '渭南师范学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 15771600,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省技工学校指导中心',
      //     proName: '提前下达2022年全省技工院校学生资助补助经费直达资金（中央财政免学费补助）',
      //     xjExpFuncName: '技校教育',
      //     fpAmount: 135145040,
      //     payAppAmt: 65453900
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安外国语大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 24834500,
      //     payAppAmt: 49669000
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省建材工业学校',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 3081600,
      //     payAppAmt: 887700
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省技工学校指导中心',
      //     proName: '提前下达2022年全省技工院校学生资助补助经费直达资金（中央财政奖助学金补助）',
      //     xjExpFuncName: '技校教育',
      //     fpAmount: 39532560,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西青年职业学院',
      //     proName: '2022年学生资助补助经费（高校国家奖助学金—中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 9898100,
      //     payAppAmt: 9898100
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西青年职业学院',
      //     proName: '2022年学生资助补助经费（中等职业教育学生资助中央直达—中央）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 616700,
      //     payAppAmt: 616700
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安美术学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 9727200,
      //     payAppAmt: 9727200
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安石油大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 28812900,
      //     payAppAmt: 28812900
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西科技大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 33545000,
      //     payAppAmt: 33545000
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西广播电视大学',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 3831600,
      //     payAppAmt: 3831600
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省电子信息学校',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 6468400,
      //     payAppAmt: 3498927.11
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '商洛学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 12923200,
      //     payAppAmt: 12923200
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西邮电职业技术学院本级',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 9502300,
      //     payAppAmt: 9502300
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安工业大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 28688300,
      //     payAppAmt: 28688300
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西机电职业技术学院',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 1924700,
      //     payAppAmt: 1924700
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '省教育厅财务处',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 142454400,
      //     payAppAmt: 142454400
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西艺术职业学院',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 854600,
      //     payAppAmt: 854600
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省第二商贸学校',
      //     proName: '2022年学生资助补助经费（中等职业教育学生资助中央直达资金—中央资金）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 1228600,
      //     payAppAmt: 1228600
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省青少年体育运动学校',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 851000,
      //     payAppAmt: 5000
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西艺术职业学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 3037800,
      //     payAppAmt: 3037800
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安航空学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 10906500,
      //     payAppAmt: 10906500
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安财经大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 19516600,
      //     payAppAmt: 19516600
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西北大学本级',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 68381640,
      //     payAppAmt: 136763280
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安建筑科技大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 59547200,
      //     payAppAmt: 59547200
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西交通职业技术学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 11604500,
      //     payAppAmt: 11604500
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安电力高等专科学校本级',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 2387800,
      //     payAppAmt: 2387800
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安航空职业技术学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 18699400,
      //     payAppAmt: 18699400
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安音乐学院',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 178100,
      //     payAppAmt: 178100
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西职业技术学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 12740700,
      //     payAppAmt: 12740700
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西国防工业职业技术学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 20329000,
      //     payAppAmt: 20329000
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省自强中专学校',
      //     proName: '中等职业教育学生资助中央直达（中央-210号）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 1493700,
      //     payAppAmt: 871566.09
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西理工大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 24018400,
      //     payAppAmt: 24018400
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '省教育厅财务处',
      //     proName: '2022年高校国家奖助学金（206号）-本科',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 209079800,
      //     payAppAmt: 209079800
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安工程大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 26249900,
      //     payAppAmt: 26249900
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省商贸学校',
      //     proName: '2022年学生资助补助经费（中等职业教育学生资助中央直达资金—中央资金）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 1910900,
      //     payAppAmt: 1910900
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安科技大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 38734700,
      //     payAppAmt: 38734700
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '延安大学',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 27474500,
      //     payAppAmt: 27474500
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西铁路工程职业技术学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 17771100,
      //     payAppAmt: 17771100
      //   },
      //   {
      //     speTypeCode: '1080',
      //     speTypeName: '学生资助补助经费（陕西省教育厅）',
      //     mofDivCode: '610000000',
      //     agencyName: '宝鸡文理学院',
      //     proName: '高校国家奖助学金（206-中央）',
      //     xjExpFuncName: '高等教育',
      //     fpAmount: 21202600,
      //     payAppAmt: 21202600
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安音乐学院',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 700000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省石油化工学校',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 9000000,
      //     payAppAmt: 4353169.52
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省城市经济学校',
      //     proName: '2022年现代职业教育质量提升资金（中职学校改善办学条件奖补中央参照直达资金））',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 1500000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西能源技工学校',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '技校教育',
      //     fpAmount: 2000000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西艺术职业学院',
      //     proName: '2022年现代职业教育质量提升计划（高职院校生均拨款奖补）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 15000000,
      //     payAppAmt: 1439640.31
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西工业职业技术学院',
      //     proName: '2022年现代职业教育质量提升计划（高职院校生均拨款奖补）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 65000000,
      //     payAppAmt: 27246188.54
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西铁路工程职业技术学院',
      //     proName: '2022年现代职业教育质量提升计划（高职院校生均拨款奖补）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 41000000,
      //     payAppAmt: 17318506.05
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西北工业学校',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 5000000,
      //     payAppAmt: 97272.79
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西能源职业技术学院',
      //     proName: '2022年现代职业教育质量提升计划资金（陕西能源职业技术学院专业群实验室建设及信息化建设采购）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 21000000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西青年职业学院',
      //     proName: '2022年现代职业教育质量提升计划（高职院校生均拨款奖补）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 11560000,
      //     payAppAmt: 4281501.26
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省商贸学校',
      //     proName: '2022年现代职业教育质量提升资金（中职学校改善办学条件奖补中央参照直达资金））',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 4100000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省电子信息学校',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 9850000,
      //     payAppAmt: 3787845
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '杨凌职业技术学院',
      //     proName: '2022年现代职业教育质量提升计划（高职院校生均拨款奖补）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 49000000,
      //     payAppAmt: 22133500.59
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西交通职业技术学院',
      //     proName: '2022年现代职业教育质量提升计划（高职院校生均拨款奖补）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 18500000,
      //     payAppAmt: 1554164.5
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西机电职业技术学院',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 6000000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西职业技术学院',
      //     proName: '2022年现代职业教育质量提升计划资金（陕西职业技术学院双高项目建设采购）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 1000000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安美术学院',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 1700000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西财经职业技术学院',
      //     proName: '2022年现代职业教育质量提升计划（高职院校生均拨款奖补）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 21000000,
      //     payAppAmt: 5662350.48
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省青少年体育运动学校',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 2000000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省建材技工学校',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '技校教育',
      //     fpAmount: 3000000,
      //     payAppAmt: 1015369.38
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省水利技工学校',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 4000000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省第二商贸学校',
      //     proName: '2022年现代职业教育质量提升资金（中职学校改善办学条件奖补中央参照直达资金））',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 2000000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '西安航空职业技术学院',
      //     proName: '2022年现代职业教育质量提升计划（高职院校生均拨款奖补）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 32000000,
      //     payAppAmt: 310143.87
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西警官职业学院',
      //     proName: '2022年现代职业教育质量提升计划（高职院校生均拨款奖补）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 5000000,
      //     payAppAmt: 1589002.03
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省自强中专学校',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 2065000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '省教育厅财务处',
      //     proName: '2022年现代职业教育质量提升资金（中职改善办学条件奖补中央参照直达资金）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 5500000,
      //     payAppAmt: 5500000
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西国防工业职业技术学院',
      //     proName: '2022年现代职业教育质量提升计划（高职院校生均拨款奖补）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 27000000,
      //     payAppAmt: 2261878.14
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省机械高级技工学校',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '技校教育',
      //     fpAmount: 6000000,
      //     payAppAmt: 205109.5
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西职业技术学院',
      //     proName: '2022年现代职业教育质量提升计划（高职院校生均拨款奖补-非采购-陕职）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 16050000,
      //     payAppAmt: 2903000.18
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省建材工业学校',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 6990400,
      //     payAppAmt: 388559.3
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '省教育厅财务处',
      //     proName: '2022年现代职业教育质量提升计划资金职业院校教师素质提高计划奖补',
      //     xjExpFuncName: '其他职业教育支出',
      //     fpAmount: 14400000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西广播电视大学',
      //     proName: '2022年现代职业教育质量提升计划（高职院校生均拨款奖补）',
      //     xjExpFuncName: '高等职业教育',
      //     fpAmount: 22000000,
      //     payAppAmt: 1612768
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西交通技师学院',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '技校教育',
      //     fpAmount: 6000000,
      //     payAppAmt: 264854.8
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省商业学校',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '中等职业教育',
      //     fpAmount: 5000000,
      //     payAppAmt: 657579
      //   },
      //   {
      //     speTypeCode: '1081',
      //     speTypeName: '现代职业教育质量提升计划资金',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西铜川工业技师学院',
      //     proName: '2022年现代职业教育质量提升（中职学校改善办学条件）',
      //     xjExpFuncName: '技校教育',
      //     fpAmount: 7000000,
      //     payAppAmt: 3965154.6
      //   },
      //   {
      //     speTypeCode: '1086',
      //     speTypeName: '医疗服务与保障能力提升补助资金（陕西省医疗保障局）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省医疗保险基金中心',
      //     proName: '2022年中央财政医疗服务与保障能力提升补助',
      //     xjExpFuncName: '其他医疗保障管理事务支出',
      //     fpAmount: 200000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1086',
      //     speTypeName: '医疗服务与保障能力提升补助资金（陕西省医疗保障局）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省医疗保障局',
      //     proName: '医疗服务能力提升',
      //     xjExpFuncName: '其他医疗保障管理事务支出',
      //     fpAmount: 65280000,
      //     payAppAmt: 276401
      //   },
      //   {
      //     speTypeCode: '1086',
      //     speTypeName: '医疗服务与保障能力提升补助资金（陕西省医疗保障局）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省医疗保障经办服务中心',
      //     proName: '2022年中央财政医疗服务与保障能力提升补助',
      //     xjExpFuncName: '其他医疗保障管理事务支出',
      //     fpAmount: 200000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108701',
      //     speTypeName: '公立医院综合改革（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省肿瘤医院',
      //     proName: '中央公立医院综合改革（第一批120万元）',
      //     xjExpFuncName: '综合医院',
      //     fpAmount: 300000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108701',
      //     speTypeName: '公立医院综合改革（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '省第二人民医院',
      //     proName: '中央公立医院综合改革（第一批120万元）',
      //     xjExpFuncName: '综合医院',
      //     fpAmount: 300000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108701',
      //     speTypeName: '公立医院综合改革（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '西北妇女儿童医院',
      //     proName: '中央公立医院综合改革（第一批120万元）',
      //     xjExpFuncName: '综合医院',
      //     fpAmount: 300000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108702',
      //     speTypeName: '卫生健康人才（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省中医医院',
      //     proName: '中央卫生健康人才培养（第一批20803万元）',
      //     xjExpFuncName: '其他公立医院支出',
      //     fpAmount: 6120000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108702',
      //     speTypeName: '卫生健康人才（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '西北妇女儿童医院',
      //     proName: '中央卫生健康人才培养（第一批20803万元）',
      //     xjExpFuncName: '其他公立医院支出',
      //     fpAmount: 5055000,
      //     payAppAmt: 36355
      //   },
      //   {
      //     speTypeCode: '108702',
      //     speTypeName: '卫生健康人才（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西中医药大学第二附属医院',
      //     proName: '中央卫生健康人才培养（第一批20803万元）',
      //     xjExpFuncName: '其他公立医院支出',
      //     fpAmount: 1350000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108702',
      //     speTypeName: '卫生健康人才（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省卫生健康委员会',
      //     proName: '中央卫生健康人才培养（第一批20803万元）',
      //     xjExpFuncName: '其他公立医院支出',
      //     fpAmount: 74705600,
      //     payAppAmt: 64540000
      //   },
      //   {
      //     speTypeCode: '108702',
      //     speTypeName: '卫生健康人才（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '延安大学附属医院',
      //     proName: '中央卫生健康人才培养（第一批20803万元）',
      //     xjExpFuncName: '其他公立医院支出',
      //     fpAmount: 4680000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108702',
      //     speTypeName: '卫生健康人才（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '省第二人民医院',
      //     proName: '中央卫生健康人才培养（第一批20803万元）',
      //     xjExpFuncName: '其他公立医院支出',
      //     fpAmount: 292000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108702',
      //     speTypeName: '卫生健康人才（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '省教育厅财务处',
      //     proName: '中央卫生健康人才培养（第一批20803万元）',
      //     xjExpFuncName: '其他公立医院支出',
      //     fpAmount: 1200000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108702',
      //     speTypeName: '卫生健康人才（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安医学院',
      //     proName: '中央卫生健康人才培养（第一批20803万元）',
      //     xjExpFuncName: '其他公立医院支出',
      //     fpAmount: 7500000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108702',
      //     speTypeName: '卫生健康人才（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '延安大学',
      //     proName: '中央卫生健康人才培养（第一批20803万元）',
      //     xjExpFuncName: '其他公立医院支出',
      //     fpAmount: 4360000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108702',
      //     speTypeName: '卫生健康人才（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西中医药大学附属医院',
      //     proName: '中央卫生健康人才培养（第一批20803万元）',
      //     xjExpFuncName: '其他公立医院支出',
      //     fpAmount: 4200000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108702',
      //     speTypeName: '卫生健康人才（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '西安医学院第二附属医院',
      //     proName: '中央卫生健康人才培养（第一批20803万元）',
      //     xjExpFuncName: '其他公立医院支出',
      //     fpAmount: 1100000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108702',
      //     speTypeName: '卫生健康人才（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省人民医院',
      //     proName: '中央卫生健康人才培养（第一批20803万元）',
      //     xjExpFuncName: '其他公立医院支出',
      //     fpAmount: 8067000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '108703',
      //     speTypeName: '医疗卫生机构能力建设（卫健委）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省卫生健康委员会',
      //     proName: '中央医疗卫生机构能力建设（第一批4021万元）',
      //     xjExpFuncName: '其他基层医疗卫生机构支出',
      //     fpAmount: 40210000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1088',
      //     speTypeName: '农业生产发展资金',
      //     mofDivCode: '610000000',
      //     agencyName: '渭南垦区管理处机关',
      //     proName: '农垦农机购置补贴项目',
      //     xjExpFuncName: '农业生产发展',
      //     fpAmount: 400000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1169',
      //     speTypeName: '医疗服务与保障能力提升补助资金（陕西省中医药管理局）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省中医药研究院',
      //     proName: '中央中医药事业发展部分（第一批7215万元）',
      //     xjExpFuncName: '其他中医药支出',
      //     fpAmount: 700000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1169',
      //     speTypeName: '医疗服务与保障能力提升补助资金（陕西省中医药管理局）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省健康教育中心',
      //     proName: '中央中医药事业发展部分（第一批7215万元）',
      //     xjExpFuncName: '其他中医药支出',
      //     fpAmount: 450000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1169',
      //     speTypeName: '医疗服务与保障能力提升补助资金（陕西省中医药管理局）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西中医药大学',
      //     proName: '中央中医药事业发展部分（第一批7215万元）',
      //     xjExpFuncName: '其他中医药支出',
      //     fpAmount: 2150000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1169',
      //     speTypeName: '医疗服务与保障能力提升补助资金（陕西省中医药管理局）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西中医药大学附属医院',
      //     proName: '中央中医药事业发展部分（第一批7215万元）',
      //     xjExpFuncName: '其他中医药支出',
      //     fpAmount: 3000000,
      //     payAppAmt: 29700
      //   },
      //   {
      //     speTypeCode: '1169',
      //     speTypeName: '医疗服务与保障能力提升补助资金（陕西省中医药管理局）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西中医药大学第二附属医院',
      //     proName: '中央中医药事业发展部分（第一批7215万元）',
      //     xjExpFuncName: '其他中医药支出',
      //     fpAmount: 50000,
      //     payAppAmt: null
      //   },
      //   {
      //     speTypeCode: '1169',
      //     speTypeName: '医疗服务与保障能力提升补助资金（陕西省中医药管理局）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省中医药管理局机关',
      //     proName: '中央中医药事业发展部分（第一批7215万元）',
      //     xjExpFuncName: '其他中医药支出',
      //     fpAmount: 26175000,
      //     payAppAmt: 200000
      //   },
      //   {
      //     speTypeCode: '1169',
      //     speTypeName: '医疗服务与保障能力提升补助资金（陕西省中医药管理局）',
      //     mofDivCode: '610000000',
      //     agencyName: '陕西省中医医院',
      //     proName: '中央中医药事业发展部分（第一批7215万元）',
      //     xjExpFuncName: '其他中医药支出',
      //     fpAmount: 9100000,
      //     payAppAmt: null
      //   }
      // ]
      // this.detailVisible = true
      // this.detailType = type
      let params = {
        reportCode: type === 'jOut' ? 'zjzcmx_fzj' : 'zdzjxmmx_fzj',
        speTypeCode: speTypeCode,
        mofDivCode: '',
        fiscalYear: this.condition.fiscalYear ? this.condition.fiscalYear[0] : ''
      }
      this.detailVisible = true
      this.tableLoading = true
      HttpModule.queryTableDatas(params).then((res) => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.detailData = res.data
          this.detailType = type
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      switch (key) {
        case 'jOut':
          this.handleDetail('jOut', obj.row.speTypeCode)
          this.detailTitle = '支出明细'
          break
        case 'sbbjfpAmount':
        case 'xbjfpAmount':
        case 'sbjfpAmount':
          this.handleDetail('sbbjfpAmount', obj.row.speTypeCode)
          this.detailTitle = '直达资金项目明细'
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.queryTableDatas()
      // this.queryTableDatasCount()
    },
    // 查询 table 数据
    queryTableDatas(val) {
      // const param = {
      //   reportCode: 'zyzdzjyszxqkfzj',
      //   fiscalYear: this.condition.fiscalYear ? this.condition.fiscalYear[0] : ''
      // }
      // this.tableLoading = true
      // HttpModule.queryTableDatas(param).then((res) => {
      //   if (res.code === '000000') {
      //     this.tableData = res.data
      //     this.tableLoading = false
      //   } else {
      //     this.$message.error(res.message)
      //   }
      // })
    },
    initTableData() {
      let tableDataTest = getFormData('basicInfo', 'tableData')
      this.tableData = tableDataTest
    },
    cellDblclick(obj) {
      // console.log('双击', obj)
    },
    onEditClosed(obj, bsTable, xGrid) {
      bsTable.performTableDataCalculate(obj)
    },
    cellStyle({ row, rowIndex, column }) {
      if (['sbjfpAmount', 'jOut', 'sbbjfpAmount', 'xbjfpAmount'].includes(column.property)) {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    }
  },
  created() {
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.queryTableDatas()
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
