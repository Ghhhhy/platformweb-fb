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
    <div v-show="true" class="main-query">
      <BsQuery
        ref="queryFrom"
        :query-form-item-config="queryConfig"
        :query-form-data="searchDataList"
        @onSearchClick="search"
      />
    </div>
    <BsTable
      ref="mainTableRef"
      :footer-config="tableFooterConfig"
      :table-config="tableConfig"
      :table-columns-config="tableColumnsConfig"
      :table-data="tableData"
      :toolbar-config="tableToolbarConfig"
      :pager-config="pagerConfig"
      :title="title"
      @onToolbarBtnClick="onToolbarBtnClick"
      @ajaxData="ajaxTableData"
    >
      <template v-slot:toolbarSlots>
        <div class="table-toolbar-left">
          <div class="table-toolbar-left-title">
            <span class="fn-inline">{{ title }}</span>
            <i class="fn-inline"></i>
          </div>
        </div>
      </template>
    </BsTable>
  </vxe-modal>
</template>
<script>
import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
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
        showFooter: false
      },
      condition: {},
      tableColumnsConfig: [
      ],
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
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
      // params.bgtMofDepName = this.condition.bgtMofDepName ? this.condition.bgtMofDepName[0] : ''
      params.agencyName = this.condition.agencyName ? this.condition.agencyName[0] : ''
      params.speTypeName = this.condition.speTypeName ? this.condition.speTypeName[0] : ''
      params.xjExpFuncName = this.condition.xjExpFuncName ? this.condition.xjExpFuncName[0] : ''
      params.sSpeTypeName = this.condition.sSpeTypeName ? this.condition.sSpeTypeName[0] : ''
      params.corBgtDocNo = this.condition.corBgtDocNo ? this.condition.corBgtDocNo[0] : ''
      params.budgetLevelCode = this.condition.budgetLevelCode ? this.condition.budgetLevelCode[0] : ''
      // params.xjCorBgtDocNo = this.condition.xjCorBgtDocNo ? this.condition.xjCorBgtDocNo[0] : ''
      this.$parent.tableLoading = true
      HttpModule.detailPageQuery(params).then((res) => {
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.pagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.$parent.tableLoading = false
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
    showInfo() {
      switch (this.sDetailType) {
        // 支出明细
        case 'zjzcmx_fdq':
          this.tableColumnsConfig = proconf.expenditureColumn
          break
        case 'zdzjzcmx_fdq':
        case 'zxjdzcmx_fdq':
        case 'zxjdzcmx_fzj':
          this.tableColumnsConfig = proconf.payColumn
          break
        case 'zjzcmx_fzj':
          this.tableColumnsConfig = proconf.expenditureColumn
          break
        // 指标明细
        case 'zdzjzbmx_fzj':
        case 'zdzjzbmx_fdq':
        case 'czzdzjzbmx_fdq':
        case 'zdzjzbmx_fzjfp':
          this.tableColumnsConfig = proconf.targetColumn
          break
        case 'zxjdzbmx_fzjfp':
          this.tableColumnsConfig = proconf.targetZXColumn
          break
        default:
          break
      }
      this.queryTableDatas()
    }
  },
  mounted() {
    // this.showInfo()
  },
  watch: {
    sDetailType: {
      handler() {
        this.showInfo()
      },
      immediate: true
    }
  },
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
