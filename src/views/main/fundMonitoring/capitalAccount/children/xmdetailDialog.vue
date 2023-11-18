<!--监控规则数据源管理新增页面弹框-->
<template v-loading="tableLoading">
  <vxe-modal
    v-model="detailVisible"
    :title="title"
    width="96%"
    height="90%"
    :show-footer="false"
    @close="dialogClose"
  >
    <div style="height: calc(100% - 80px)">
      <div v-show="isShowQueryConditions" class="main-query">
        <BsQuery
          ref="queryFrom"
          :query-form-item-config="queryConfig"
          :query-form-data="searchDataList"
          @onSearchClick="search"
        >
          <template v-slot:action-button-before>
            <vxe-button
              v-if="$store.getters.isFuJian"
              content="导出全部"
              status="primary"
              size="medium"
              :loading="requestLoading"
              @click="serverExport"
            />
          </template>
        </BsQuery>
      </div>
      <BsTable
        ref="mainTableRef"
        :footer-config="tableFooterConfig"
        :table-config="tableConfig"
        :table-columns-config="tableColumnsConfig"
        :table-data="tableData"
        :toolbar-config="tableToolbarConfig"
        :cell-style="cellStyle"
        :pager-config="pagerConfig"
        :export-modal-config="{ fileName: title }"
        :default-money-unit="10000"
        @register="register"
        @cellClick="cellClick"
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
    </div>
  </vxe-modal>
</template>
<script>
import HttpModule from '@/api/frame/main/fundMonitoring/specialSupervisionRegion.js'
import proconf from './column.js'
import useExportAll from '@/hooks/useExportAll/useExportAllMixin.js'
export default {
  mixins: [useExportAll(
    {
      ref: 'bsTableRef',
      beforeRequest: (config, ctx) => {
        config.fileName = ctx.title
        config.params.pageSize = 9999
      }
    }
  )
  ],
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
    // detailType: {
    //   type: String,
    //   default: ''
    // },
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
    // detailQueryParam: {
    //   type: Object,
    //   default() {
    //     return {}
    //   }
    // },
    detailQueryParam: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isShowQueryConditions: true,
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      detailVisible: true,
      tableFooterConfig: {
        showFooter: false
      },
      tableColumnsConfig: [
      ],
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
          seq: true, // 序号列
          useMoneyFilter: true
        }
      },
      params: {},
      sDetailTitle: '',
      sDetailVisible: false,
      sDetailData: [],
      budgetLevelCode: ''
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
      this.queryTableDatas()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    queryTableDatas() {
      let params = this.detailQueryParam
      params.page = this.pagerConfig.currentPage // 页码
      params.pageSize = this.pagerConfig.pageSize // 每页条数
      // params.proName = this.condition.proName ? this.condition.proName[0] : ''
      // params.manageMofDepName = this.condition.manageMofDepName ? this.condition.manageMofDepName[0] : ''
      // params.corBgtDocNo = this.condition.corBgtDocNo ? this.condition.corBgtDocNo[0] : ''
      // params.agencyName = this.condition.agencyName ? this.condition.agencyName[0] : ''
      // params.useDes = this.condition.useDes ? this.condition.useDes[0] : ''
      // params.payAcctNo = this.co ? this.condition.payAcctNo[0] : ''
      // params.payAcctName = this.condition.payAcctName ? this.condition.payAcctName[0] : ''
      // params.payeeAcctName = this.condition.payeeAcctName ? this.condition.payeeAcctName[0] : ''
      // params.payeeAcctNo = tndition.payAcctNohis.condition.payeeAcctNo ? this.condition.payeeAcctNo[0] : ''
      // params.xpayDate = this.condition.xpayDate ? this.condition.xpayDate[0] : ''
      // params.budgetLevelCode = this.budgetLevelCode
      this.$parent.tableLoading = true
      this.defaultConfig.params = { ...this.defaultConfig.params, ...params }
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
    showInfo() {
      switch (this.detailType) {
        // 专项监督项目台账支出明细
        case 'zdzjxmtz_zcmx':
        case 'zxjdxmtz_zcmx':
          this.tableColumnsConfig = proconf.payColumn
          break
        case 'zdzjxmtz_ysmx':
        case 'zxjdxmtz_ysmx':
          this.tableColumnsConfig = proconf.projectZxZcmxColumn
          break
        default:
          break
      }
      this.queryTableDatas()
    }
  },
  mounted() {
    this.showInfo()
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
