<!-- 下表格点击-指标明细表 -->
<template>
  <vxe-modal
    v-model="dialogVisible"
    title="指标明细"
    width="96%"
    height="96%"
    :show-footer="false"
    @close="dialogClose"
  >
    <div v-show="isShowQueryConditions" class="main-query">
      <BsQuery
        ref="queryFrom"
        :query-form-item-config="queryConfig"
        :query-form-data="searchDataList"
        @onSearchClick="search"
      />
    </div>
    <BsTable
      ref="mainTableRef"
      :loading="tableLoading"
      :footer-config="tableFooterConfig"
      :table-config="tableConfig"
      :table-columns-config="tableColumnsConfig"
      :table-data="tableData"
      :toolbar-config="tableToolbarConfig"
      :pager-config="pagerConfig"
      :default-money-unit="1"
      @onToolbarBtnClick="onToolbarBtnClick"
      @ajaxData="ajaxTableData"
    >
      <template v-slot:toolbarSlots>
        <div class="table-toolbar-left">
          <div class="table-toolbar-left-title">
            <span class="fn-inline">指标明细</span>
            <i class="fn-inline"></i>
          </div>
        </div>
      </template>
    </BsTable>
  </vxe-modal>
</template>
<script>
import proconf from './column.js'
import commonMixin from '@//mixin/commonMixin'
export default {
  name: 'BottomTargetDialog',
  mixins: [commonMixin],
  components: {
  },
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    },
    detailRow: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      isShowQueryConditions: true,
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      // 表格尾部合计配置
      tableFooterConfig: { // 表尾配置
        combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
        showFooter: true
      },
      tableColumnsConfig: [],
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
          checkType: 'checkbox',
          seq: true, // 序号列
          useMoneyFilter: true
        }
      },
      params: {}
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
      this.dialogVisible = false
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
    async queryTableDatas() {
      let params = this.detailRow// 外面传入的row，作为参数
      params.current = this.pagerConfig.currentPage // 页码
      params.size = this.pagerConfig.pageSize // 每页条数
      params.reportCode = 'quertBgtDetail'
      this.tableLoading = true
      await this.$http.post('dfr-monitor-service/dfr/bgtInfoQuery/queryDetailXjPage', params).then((res) => {
        if (res.code === '000000' && res.data) {
          this.tableData = res.data.results
          this.pagerConfig.total = res.data.totalCount
        }
        this.tableLoading = false
      })
    },
    initConfig() {
      this.tableColumnsConfig = proconf.targetColumn
      this.tableColumnsConfig.forEach((v) => {
        v.width = '220'
      })
      this.queryConfig = proconf.highQueryConfig
      this.searchDataList = proconf.highQueryData
      this.queryTableDatas()
    }
  },
  mounted() {
    this.initConfig()
  },
  watch: {
    dialogVisible: {
      handler(newval) {
        this.$emit('update:dialogVisible', newval)
        if (newval) {

        }
      },
      deep: true,
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
