<!--惠企利民明细-->
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
      <BsQuery
        ref="queryFrom"
        :query-form-item-config="queryConfig"
        :query-form-data="searchDataList"
        @onSearchClick="search"
      />
      <BsTable
        ref="mainTableRef"
        :footer-config="tableFooterConfig"
        :table-config="tableConfig"
        :table-columns-config="tableColumnsConfig"
        :table-data="tableData"
        :toolbar-config="tableToolbarConfig"
        :pager-config="pagerConfig"
        :default-money-unit="10000"
        @ajaxData="ajaxTableData"
        @onToolbarBtnClick="onToolbarBtnClick"
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
import HttpModule from '@/api/frame/main/fundMonitoring/warnRegionSummary.js'
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
    detailData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isShowQueryConditions: true,
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      detailVisible: true,
      condition: {},
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
          seq: true // 序号列
        }
      },
      code: '',
      params: {},
      detailType: '',
      sDetailTitle: '',
      sDetailVisible: false,
      sDetailData: [],
      fiscalYear: ''
    }
  },
  methods: {
    getMofDiv(fiscalYear = this.$store.state.userInfo?.year) {
      HttpModule.getMofTreeData({ fiscalYear }).then(res => {
        if (res.code === '000000') {
          this.queryConfig[0].itemRender.options = res.data || []
        }
      })
    },
    getPro(fiscalYear = this.$store.state.userInfo?.year) {
      HttpModule.getProSpeTreeData({ fiscalYear }).then(res => {
        if (res.code === '000000') {
          this.queryConfig[2].itemRender.options = res.data || []
        }
      })
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.queryTableDatas(this.detailType, this.code)
    },
    refresh() {
      this.queryTableDatas(this.detailType, this.code)
      // this.queryTableDatasCount()
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
      this.queryTableDatas(this.detailType, this.code)
    },
    queryTableDatas(type, mofDivCode) {
      let params = {
        field: type,
        mofDivCode: mofDivCode,
        page: this.pagerConfig.currentPage, // 页码
        pageSize: this.pagerConfig.pageSize, // 每页条数
        businessOffice: this.condition.businessOffice ? this.condition.businessOffice[0] : '',
        projectName: this.condition.projectName ? this.condition.projectName[0] : '',
        speTypeCodes: this.searchDataList.speTypeName_code__multiple || [],
        mofDivCodes: this.searchDataList.mofDivName_code__multiple || [],
        levels: this.condition.levels ? this.condition.levels[0] : '',
        fiscalYear: this.fiscalYear,
        regulationClass: this.transJson(this.$store.state.curNavModule?.param5).regulationClass
      }
      this.tableLoading = true
      HttpModule.queryDetailDatas(params).then((res) => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.pagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
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
    showInfo() {
      // this.tableData = this.detailData
      this.detailType = this.detailData[0]
      this.code = this.detailData[1]
      this.fiscalYear = this.detailData[2]
      console.log(proconf)
      switch (this.title) {
        case '指标预警-未处理明细':
          this.tableColumnsConfig = proconf.redUndoNum
          break
        case '指标预警-已整改明细':
          this.tableColumnsConfig = proconf.redDoneNum
          break
        case '支出预警-未处理明细':
          this.tableColumnsConfig = proconf.notpayColumn
          break
        case '支出预警-已认定明细':
          this.tableColumnsConfig = proconf.payokColumn
          break
        case '未导入惠企利民明细-未处理明细':
          this.tableColumnsConfig = proconf.notgetColumn
          break
        case '未导入惠企利民明细-已整改明细':
          this.tableColumnsConfig = proconf.getColumn
          break
        default:
          break
      }
      this.queryTableDatas(this.detailType, this.code)
    }
  },
  mounted() {
    this.showInfo()
    Promise.all([this.getMofDiv(), this.getPro()])
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
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
