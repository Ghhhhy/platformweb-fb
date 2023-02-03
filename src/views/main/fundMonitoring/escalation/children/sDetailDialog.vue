<!--监控规则数据源管理新增页面弹框-->
<template v-loading="tableLoading">
  <vxe-modal
    v-model="sDetailVisible"
    :title="title"
    width="80%"
    height="80%"
    :show-footer="false"
    @close="dialogClose"
  >
    <!--    <div v-show="true" class="main-query">
      <BsQuery
        ref="queryFrom"
        :query-form-item-config="queryConfig"
        :query-form-data="searchDataList"
        @onSearchClick="search"
      />
    </div>-->
    <BsTable
      ref="mainTableRef"
      :footer-config="tableFooterConfig"
      :table-config="tableConfig"
      :table-columns-config="tableColumnsConfig"
      :table-data="tableData"
      :toolbar-config="tableToolbarConfig"
      :pager-config="pagerConfig"
      :export-modal-config="{ fileName: title + '(' + amtUnit + ')' }"
      :cell-style="cellStyle"
      @cellClick="cellClick"
      @onToolbarBtnClick="onToolbarBtnClick"
      @ajaxData="ajaxTableData"
    >
      <template v-slot:toolbarSlots>
        <div class="table-toolbar-left">
          <div class="table-toolbar-left-title">
            <span class="fn-inline">{{ title }}({{ amtUnit }})</span>
            <i class="fn-inline"></i>
          </div>
        </div>
      </template>
    </BsTable>
  </vxe-modal>
</template>
<script>
import HttpModule from '@/api/frame/main/fundMonitoring/escalation.js'
import proconf from './column.js'
export default {
  name: 'SDetailDialog',
  components: {},
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    sDetailData: {
      type: Array,
      default() {
        return []
      }
    },
    sDetailType: {
      type: String,
      default: ''
    },
    amtUnit: {
      type: String,
      default: ''
    },
    sDetailQueryParam: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      queryConfig: proconf.highQueryConfig1,
      searchDataList: proconf.highQueryData1,
      tableFooterConfig: {
        totalObj: {
          payAppAmt: 0,
          payAppAmtZd: 0,
          fpAmount: 0,
          amount: 0
        },
        combinedType: ['switchTotal'],
        showFooter: true
      },
      condition: {},
      tableColumnsConfig: [
      ],
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: false, // 缩放
        custom: false, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tableConfig: {
        globalConfig: {
          // 全局配置
          checkType: 'checkbox',
          seq: true, // 序号列
          useMoneyFilter: true
        }
      },
      pagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      params: {},
      sDetailTitle: '',
      sDetailVisible: true
    }
  },
  methods: {
    dialogClose() {
      this.$parent.sDetailVisible = false
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    refresh() {
      this.queryTableDatas()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    queryTableDatas() {
      let params = this.sDetailQueryParam
      params.page = this.pagerConfig.currentPage // 页码
      params.pageSize = this.pagerConfig.pageSize // 每页条数
      this.$parent.tableLoading = true
      HttpModule.detailPageQuery(params).then((res) => {
        this.$parent.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.pagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
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
    queryHeader() {
      let params = this.sDetailQueryParam
      this.tableLoading = true
      HttpModule.queryHeader(params).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableColumnsConfig = res.data
          this.showInfo()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    querySumDetail() {
      let params = this.sDetailQueryParam
      params.page = this.pagerConfig.currentPage // 页码
      params.pageSize = this.pagerConfig.pageSize // 每页条数
      HttpModule.querySumDetail(params).then((res) => {
        if (res.code === '000000') {
          this.tableFooterConfig.totalObj = res.data[0]
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cellStyle({ row, rowIndex, column }) {
      if (this.sDetailType === 'fdqzdzjxmmx' || this.sDetailType === 'fzjzdzjxmmx') {
        // 有效的cellValue
        const validCellValue = (row[column.property] * 1)
        if (validCellValue && ['je1', 'je3'].includes(column.property)) {
          return {
            color: '#4293F4',
            textDecoration: 'underline'
          }
        }
      }
    },
    handleDetail(reportCode, row, column) {
      let params = {
        reportCode: reportCode,
        cenTraProCode: row.cenTraProCode,
        agencyCode: row.agencyCode,
        expFuncCode: row.expFuncCode,
        proCode: row.proCode,
        escalationStatus: this.sDetailQueryParam.escalationStatus,
        version: this.sDetailQueryParam.version
      }
      this.$parent.zbDetailQueryParam = params
      this.$parent.zbDetailTitle = row.name + this.$parent.sDetailTitle
      this.queryUnit()
      this.$parent.zbDetailVisible = true
      this.$parent.zbDetailType = reportCode
    },
    queryUnit() {
      let params = this.$parent.zbDetailQueryParam
      this.tableLoading = true
      HttpModule.queryUnit(params).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.$parent.zbAmtUnit = res.data?.amtUnit
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property

      // 无效的cellValue
      const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      if (isInvalidCellValue) return

      if (this.sDetailType === 'fdqzdzjxmmx') {
        switch (key) {
          case 'je1':// 预算金额-总金额
            this.handleDetail('fdqzbmx', obj.row, key)
            this.$parent.zbDetailTitle = '直达资金项目明细'
            break
          case 'je3':// 支付金额-总金额
            this.handleDetail('fdqzcmx', obj.row, key)
            this.$parent.zbDetailTitle = '支出明细'
            break
        }
      } else if (this.sDetailType === 'fzjzdzjxmmx') {
        switch (key) {
          case 'je1':// 预算金额-总金额
            this.handleDetail('fzjzbmx', obj.row, key)
            this.$parent.zbDetailTitle = '直达资金项目明细'
            break
          case 'je3':// 支付金额-总金额
            this.handleDetail('fzjzcmx', obj.row, key)
            this.$parent.zbDetailTitle = '支出明细'
            break
        }
      }
    },
    showInfo() {
      switch (this.sDetailType) {
        case 'fdqzcmx':
          break
        default:
          break
      }
      this.queryTableDatas()
      this.querySumDetail()
    }
  },
  mounted() {
    this.queryHeader()
  },
  watch: {},
  created() {
  }
}
</script>
<style lang="scss">
.payVoucherInput {
  margin: 15px;
  .el-card {
    margin-top: 0;
  }
}
.vxe-modal--wrapper .vxe-modal--box {
  z-index: 0;
}
#bigbox {
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
}
.el-row-item .font-set-small .hline {
  width: 72px;
}
</style>
