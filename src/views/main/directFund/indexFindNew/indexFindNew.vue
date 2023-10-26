<template>
  <div class="gov_budget_adjustment_request">
    <BsMainFormListLayout :left-visible.sync="leftVisible">
      <template v-slot:topTabPane>
        <BsTabPanel
          :tab-status-btn-config="tabStatusBtnConfig"
          :is-hide-query="true"
          :is-open="true"
          @onQueryConditionsClick="onQueryConditionsClick"
          @tabClick="onTabPaneltabClick"
          @btnClick="onTabPanelBtnClick"
        />
      </template>
      <template v-slot:query>
        <div v-show="queryFormProps.visible" class="main-query">
          <!-- 高级查询 -->
          <BsQuery
            ref="queryFormRef"
            :query-form-item-config="queryFormProps.queryFormItemConfig"
            :query-form-data="queryFormProps.queryFormData"
            @onSearchClick="onSearchClick"
            @onSearchResetClick="onSearchResetClick"
          />
        </div>
      </template>
      <template v-slot:mainTree></template>
      <template v-slot:mainForm>
        <BsTable
          ref="bsTableRef"
          :table-config="tableProps.tableConfig"
          :table-columns-config="tableProps.tableColumnsConfig"
          :table-data="tableProps.tableData"
          :toolbar-config="tableProps.toolbarConfig"
          :pager-config="tableProps.pagerConfig"
          :loading="tableProps.loading"
          :default-money-unit="tableProps.defaultMoneyUnit"
          :edit-rules="tableProps.editRules"
          :footer-config="tableProps.footerConfig"
          @ajaxData="pageChangeHandle"
          @onToolbarBtnClick="onToolbarBtnClick"
          @cellClick="cellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ tableProps.title }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <SearchModal
      v-if="modalVisiableState"
      :dialog-visible.sync="modalVisiableState"
      :current-value="currentRow"
    />
  </div>
</template>

<script>
import mix from '@//mixin/commonMixin'
import SearchModal from './components/SearchModal.vue'

export default {
  name: 'IndexFindNew',
  components: { SearchModal },
  mixins: [mix],
  data() {
    return {
      currentRow: {},
      modalVisiableState: false,
      tabStatusBtnConfig: {
        buttons: [
          {
            code: '0',
            label: '指标列表',
            type: 'button',
            iconName: 'base-zhibaio.png',
            iconNameActive: 'base-zhibaio-active.png'
          }
        ],
        buttonsInfo: {
          '0': [
            { code: 'toolbar-search',
              label: '查看来源去向',
              status: 'primary' }
          ]
        },
        curButton: {
          code: '0',
          label: '指标列表',
          type: 'button',
          iconName: 'base-zhibaio.png',
          iconNameActive: 'base-zhibaio-active.png'
        }
      },
      queryFormProps: { // 高级查询表单配置参数
        visible: false,
        queryFormItemConfig: [],
        queryFormData: {}
      },
      leftVisible: false,
      tableProps: {
        tableConfig: {
          globalConfig: { // 全局配置
            checkType: 'checkbox', // 'checkbox'复选框
            seq: true // 序号列
          }
        },
        tableColumnsConfig: [], // 表格列配置
        tableData: [], // 表格数据
        toolbarConfig: { // 工具栏配置
          calculator: false,
          disabledMoneyConversion: false,
          moneyConversion: true,
          refresh: true,
          buttons: [
            // { code: 'test', name: 'test', callback: () => {} }
          ],
          slots: {
            tools: 'toolbarTools', // tools使用toolbarTools插槽
            buttons: 'toolbarSlots' // buttons使用toolbarSlots插槽 // 一定要有这个， v-slot:toolbarSlots才能自定义否则会被原有的buttons覆盖
          }
        },
        pagerConfig: { // 分页配置
          total: 0,
          pageSize: 20,
          currentPage: 1
        },
        loading: false, // 加载
        defaultMoneyUnit: 10000, // 金额单位
        editRules: {}, // 校验规则
        footerConfig: { // 表尾配置
          combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
          showFooter: true
        },
        title: '中央来源资金分配情况表'
      }
    }
  },
  computed: {
  },
  created() {
    this.initPageConfig()
  },
  methods: {
    onSaveBack() {
      this.closeDialog()
      this.doRefresh()
    },
    onQueryConditionsClick() {
      console.log('onQueryConditionsClick')
    },
    onTabPaneltabClick(tab) {
    },
    // 页签右侧按钮点击事件
    onTabPanelBtnClick(obj) {
      switch (obj.code) {
        case 'toolbar-search': // 查看来源去向
          this.doSearch()
          break
      }
    },
    cellClick(obj, context, from) {
      this.canEdit = false
      if (obj.column.property === 'adjBatchNo') {
        if (Number(obj.row.busiTypeCode) >= 20) {
          this.getDetailReduce(obj.row, 'detail')
        } else if (Number(obj.row.busiTypeCode) >= 17) {
          this.getDetailAdd(obj.row, 'detail')
        }
      }
    },
    doSearch() {
      const datas = this.$refs.bsTableRef.getSelectionData()
      if (datas.length !== 1) {
        this.$XModal.message({ status: 'warning', message: '请勾选一条数据进行操作!' })
        return
      }
      this.currentRow = datas[0]
      this.modalVisiableState = true
    },
    async getDetailReduce(data, type = 'edit') {
      const param = {
        adjBatchNo: data.adjBatchNo,
        busiTypeCode: data.busiTypeCode
      }
      await this.handleHttpMethod(this.$http.post('fbAdjustComponent/bgt/adjust/gov/queryReduceDetail', param), true, '查询中...请稍后').then(res => {
        if (res) {
          this.editData = res.data
          this.editData.isArrangeRegulatoryFund = data.isArrangeRegulatoryFund
          this.modalConfigInfo.title = type === 'detail' ? '追减详情' : '修改追减'
          this.modalConfigInfo.currentComponent = 'ReduceCom'
          this.modalConfigInfo.visible = true
        }
      })
    },

    onSearchClick() {
      console.log('onSearchClick')
    },
    onSearchResetClick() {
      console.log('onSearchResetClick')
    },
    closeDialog() {

    },
    pageChangeHandle({ currentPage, pageSize }) { // 表格分页点击
      this.tableProps.pagerConfig.currentPage = currentPage
      this.tableProps.pagerConfig.pageSize = pageSize
      this.doRefresh()
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.doRefresh()
          break
      }
    },
    // 刷新表格
    doRefresh() { // 这个方法有被ModifyDialog组件通过$parent.doRefresh()来调用
      this.getTableData()
    },
    async initPageConfig() {
      this.setTableColumns()
      this.getTableData()
    },
    setTableColumns() {
      this.tableProps.tableColumnsConfig = [
        {
          field: 'cznsjg',
          sortable: true,
          title: '财政内设机构'
        },
        // {
        //   field: 'bm',
        //   sortable: true,
        //   title: '部门'
        // },
        {
          field: 'trackProName',
          sortable: true,
          title: '专项资金'
        },
        {
          field: 'zcgnfl',
          sortable: true,
          title: '支出功能分类科目'
        },
        {
          field: 'ysly',
          title: '预算来源',
          sortable: true,
          visible: false
        },
        {
          field: 'zjxz',
          sortable: true,
          title: '资金性质'
        },
        {
          field: 'zwbs',
          title: '债务标识',
          sortable: true,
          visible: false
        },
        {
          field: 'sjwh',
          sortable: true,
          title: '上级文号'
        },
        // {
        //   field: 'sjzx',
        //   sortable: true,
        //   title: '上级专项'
        // },
        {
          field: 'amount',
          title: '下达金额',
          align: 'right',
          sortable: true,
          cellRender: {
            name: '$vxeMoney'
          },
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          sort: true
        },
        {
          field: 'fpAmount',
          title: '分配下级金额',
          align: 'right',
          sortable: true,
          cellRender: {
            name: '$vxeMoney'
          },
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          sort: true
        },
        {
          field: 'fpRate',
          title: '分配下级进度',
          align: 'right',
          sortable: true,
          formula: '({amount}-0==0)?0:(({fpAmount})/{amount}*100)',
          cellRender: {
            name: '$vxeRatio'
          }
        },
        {
          field: 'sfzd',
          sortable: true,
          title: '是否直达资金'
        },
        {
          field: 'toctrlId',
          sortable: true,
          visible: false
        }
      ]
    },
    // 获取表格数据
    async getTableData() {
      this.tableProps.loading = true // 加载显示
      const { currentPage, pageSize } = this.tableProps.pagerConfig
      const params = {
        current: currentPage, // 分页-当前页号
        size: pageSize, // 分页-规模
        fiscalYear: this.$store.state.userInfo.year,
        reportCode: this.transJson(this.$store.getters.getCurNavModule.param5 || '')?.reportCode
      }
      await this.$http.post('dfr-monitor-service/dfr/bgtInfoQuery/queryHomePage', params).then((res) => {
        if (res.code === '000000' && res.data) {
          this.tableProps.tableData = res.data.results
          this.tableProps.pagerConfig.total = res.data.totalCount
        }
        this.tableProps.loading = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.gov_budget_adjustment_request {
  width: 100%;
  height: 100%;
}

</style>
