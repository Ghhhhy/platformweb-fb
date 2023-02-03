<template v-loading="tableLoading">
  <vxe-modal
    v-model="detailVisible"
    :title="title"
    width="96%"
    height="90%"
    :show-footer="false"
    @close="dialogClose"
  >
    <!--    <div v-show="isShowQueryConditions" class="main-query">
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
      :table-columns-config="detailtableColumnsConfig"
      :table-data="tableData"
      :toolbar-config="tableToolbarConfig"
      :cell-style="cellStyle"
      :tree-config="{ dblExpandAll: true, dblExpand: true, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' }"
      :pager-config="pagerConfig"
      :default-money-unit="unit"
      :export-modal-config="{ fileName: title + '(' + amountUnit + ')' }"
      @cellClick="cellClick"
      @onToolbarBtnClick="onToolbarBtnClick"
      @ajaxData="ajaxTableData"
    >
      <template v-slot:toolbarSlots>
        <div class="table-toolbar-left">
          <div class="table-toolbar-left-title">
            <span class="fn-inline">{{ title }}({{ amountUnit }})</span>
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
  name: 'DetailDialog',
  components: {
  },
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
    detailType: {
      type: String,
      default: ''
    },
    detailData: {
      type: Array,
      default() {
        return []
      }
    },
    detailQueryParam: {
      type: Object,
      default() {
        return {}
      }
    },
    amountUnit: {
      type: String,
      default: ''
    },
    unit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      detailtableColumnsConfig: proconf.fdqColumn,
      tableLoading: false,
      isShowQueryConditions: true,
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      detailVisible: true,
      // 表格尾部合计配置
      tableFooterConfig: {
        totalObj: {
          je1: 0,
          je2: 0,
          je3: 0,
          je4: 0,
          je5: 0,
          je6: 0,
          je7: 0,
          je8: 0,
          je9: 0,
          je10: 0,
          je11: 0,
          je12: 0,
          je13: 0,
          je14: 0,
          je15: 0,
          je16: 0,
          je17: 0,
          je18: 0,
          je19: 0,
          je20: 0,
          je21: 0,
          je22: 0,
          je23: 0,
          je24: 0,
          je25: 0,
          je26: 0,
          je27: 0,
          je28: 0,
          je29: 0,
          je30: 0,
          je31: 0,
          je32: 0,
          je33: 0,
          je34: 0,
          je35: 0,
          je36: 0,
          je37: 0,
          je38: 0,
          je39: 0,
          je41: 0,
          je42: 0,
          je43: 0,
          je44: 0,
          je45: 0,
          je46: 0,
          je47: 0,
          je48: 0,
          je49: 0,
          je40: 0,
          je51: 0,
          je52: 0,
          je53: 0,
          je54: 0,
          je55: 0,
          je56: 0,
          je57: 0,
          je58: 0,
          je59: 0,
          je50: 0,
          je60: 0,
          je61: 0,
          je62: 0,
          je63: 0,
          je64: 0,
          je65: 0,
          je66: 0,
          je67: 0,
          je68: 0,
          je69: 0,
          je70: 0,
          je71: 0,
          je72: 0,
          je73: 0,
          je74: 0,
          je75: 0,
          je76: 0,
          je77: 0,
          je78: 0,
          je79: 0,
          je80: 0,
          je81: 0,
          je82: 0,
          je83: 0,
          je84: 0,
          je85: 0,
          je86: 0,
          je87: 0,
          je88: 0,
          je89: 0,
          je90: 0,
          je91: 0,
          je92: 0,
          je93: 0,
          je94: 0,
          je95: 0,
          je96: 0,
          je97: 0,
          je98: 0,
          je99: 0,
          je100: 0
        },
        combinedType: ['switchTotal'],
        showFooter: true
      },
      pagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableData: [],
      condition: {},
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        expandAll: true, // 展开所有
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
          seq: false, // 序号列
          useMoneyFilter: true
        }
      },
      params: {},
      sDetailTitle: '',
      sDetailVisible: false,
      sDetailData: []
    }
  },
  methods: {
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
    dialogClose() {
      this.$parent.detailVisible = false
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
      this.showInfo()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    queryTableDatas() {
      let params = this.detailQueryParam
      this.tableLoading = true
      HttpModule.queryDetail(params).then((res) => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data
          this.pagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    querySumDetail() {
      let params = this.detailQueryParam
      HttpModule.querySumDetail(params).then((res) => {
        if (res.code === '000000') {
          this.tableFooterConfig.totalObj = res.data[0]
        } else {
          this.$message.error(res.message)
        }
      })
    },
    showInfo() {
      // this.tableData = this.detailData
      console.log(proconf)
      switch (this.detailType) {
        case 'zyzdzjyszxqkfdq':
          // this.detailtableColumnsConfig = proconf.fdqColumn
          // this.queryConfig = proconf.highQueryConfigFdq
          // this.searchDataList = proconf.highQueryDataFdq
          break
        // default:
        //   break
      }
      this.queryTableDatas()
      this.querySumDetail()
    },
    handleDetail(reportCode, row, column) {
      let params = {}
      let condition = ''
      switch (column) {
        // 支出明细
        case 'je4':// 省级分配本级
          condition = 'substr(mof_div_code,3,7) = \'0000000\'  '
          break
        case 'je9':// 市级分配本级
          condition = ' substr(mof_div_code,3,7) <> \'0000000\' and substr(mof_div_code,5,5)=\'00000\' '
          break
        case 'je14':// 县级分配
          condition = ' substr(mof_div_code,5,5) <> \'00000\' and substr(mof_div_code,7,3)=\'000\' '
          break
      }
      if (this.detailType === 'zyzdzjyszxqkfdq') {
        params = {
          condition: condition,
          reportCode: reportCode,
          mofDivCode: row.code,
          escalationStatus: this.detailQueryParam.escalationStatus,
          version: this.detailQueryParam.version
        }
      } else if (this.detailType === 'zyzdzjyszxqkfzj') {
        params = {
          condition: condition,
          reportCode: reportCode,
          cenTraProCode: row.code,
          escalationStatus: this.detailQueryParam.escalationStatus,
          version: this.detailQueryParam.version
        }
      }
      this.$parent.sDetailQueryParam = params
      this.$parent.sDetailTitle = row.name + this.$parent.sDetailTitle
      this.queryUnit()
      this.$parent.sDetailVisible = true
      this.$parent.sDetailType = reportCode
    },
    queryUnit() {
      let params = this.$parent.sDetailQueryParam
      this.tableLoading = true
      HttpModule.queryUnit(params).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.$parent.amtUnit = res.data?.amtUnit
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getPro() {
      HttpModule.getProTreeData().then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getChildrenNewData1(res.data)
          this.queryConfig[1].itemRender.options = treeResdata
        } else {
          this.$message.error(res.message)
        }
      })
    },
    queryHeader() {
      let params = this.detailQueryParam
      this.tableLoading = true
      HttpModule.queryHeader(params).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.detailtableColumnsConfig = res.data
          this.showInfo()
        } else {
          this.$message.error(res.message)
        }
      })
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
    cellStyle({ row, rowIndex, column }) {
      if (this.detailType === 'zyzdzjyszxqkfdq' || this.detailType === 'zyzdzjyszxqkfzj') {
        // 有效的cellValue
        const validCellValue = (row[column.property] * 1)
        if (validCellValue && ['je2', 'je4', 'je9', 'je14'].includes(column.property)) {
          return {
            color: '#4293F4',
            textDecoration: 'underline'
          }
        }
      }
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property

      // 无效的cellValue
      const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      if (isInvalidCellValue) return

      if (this.detailType === 'zyzdzjyszxqkfdq') {
        switch (key) {
          case 'je4':// 省级分配本级
          case 'je9':// 市级分配本级
          case 'je14':// 县级分配
            this.handleDetail('fdqzdzjxmmx', obj.row, key)
            this.$parent.sDetailTitle = '直达资金项目明细'
            break
          case 'je2':// 支出
            this.handleDetail('fdqzcmx', obj.row, key)
            this.$parent.sDetailTitle = '支出明细'
            break
        }
      } else if (this.detailType === 'zyzdzjyszxqkfzj') {
        switch (key) {
          case 'je4':// 省级分配本级
          case 'je9':// 市级分配本级
          case 'je14':// 县级分配
            this.handleDetail('fzjzdzjxmmx', obj.row, key)
            this.$parent.sDetailTitle = '直达资金项目明细'
            break
          case 'je2':// 支出
            this.handleDetail('fzjzcmx', obj.row, key)
            this.$parent.sDetailTitle = '支出明细'
            break
        }
      }
    }
  },
  mounted() {
    // this.getPro()
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
