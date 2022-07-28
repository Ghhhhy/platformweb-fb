<!--惠企利民明细-->
<template v-loading="tableLoading">
  <vxe-modal
    v-model="detailVisible"
    :title="title"
    width="96%"
    height="90%"
    :show-footer="true"
    @close="dialogClose"
  >
    <BsTabPanel
      is-open
      is-hide-query
      :tab-status-btn-config="tabStatusBtnConfig"
      :tab-status-num-config="tabStatusNumConfig"
      @onQueryConditionsClick="onQueryConditionsClick1"
    />
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
      :cell-style="cellStyle"
      :pager-config="pagerConfig"
      @cellClick="cellClick"
      @onToolbarBtnClick="onToolbarBtnClick"
    >
      <template v-slot:toolbarSlots>
        <div class="table-toolbar-left">
          <div class="table-toolbar-left-title">
            <span class="fn-inline">{{ title }}(单位:万元)</span>
            <i class="fn-inline"></i>
          </div>
        </div>
      </template>
    </BsTable>
  </vxe-modal>
</template>
<script>
import HttpModule from '@/api/frame/main/fundMonitoring/warnRegion.js'
import proconf, {
  buttons1,
  curStatusButton,
  statusButtons,
  curStatusButton3,
  curStatusButton4,
  curStatusButton5,
  curStatusButton6,
  curStatusButton1,
  statusButtons1,
  curStatusButton7,
  statusButtons2
} from './column.js'

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
      tabStatusBtnConfig: {
        // changeBtns: true,
        buttons: statusButtons,
        curButton: curStatusButton,
        buttonsInfo: buttons1,
        methods: {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
      },
      tabStatusNumConfig: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0
      },
      onQueryConditionsClick1(isOpen) {
        this.isShowQueryConditions = isOpen
      },
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
        autoHidden: true,
        total: 1,
        currentPage: 1,
        pageSize: 999999
      },
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
          seq: true // 序号列
        }
      },
      params: {},
      sDetailTitle: '',
      sDetailVisible: false,
      sDetailData: []
    }
  },
  methods: {
    bsToolbarClickEvent(obj, $this) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.tabSelect = obj.curValue
      if (this.tabSelect === '1') {
        this.title = '红灯系统整改-待整改'
        this.tableData = []
      } else if (this.tabSelect === '2') {
        this.title = '红灯系统整改-已整改'
        this.tableData = []
      } else if (this.tabSelect === '3') {
        this.title = '黄灯-待认定'
        this.tableData = []
      } else if (this.tabSelect === '4') {
        this.title = '黄灯-已认定'
        this.tableData = []
      } else if (this.tabSelect === '5') {
        this.title = '黄灯-待整改'
        this.tableData = []
      } else if (this.tabSelect === '6') {
        this.title = '黄灯-已整改'
        this.tableData = []
      } else if (this.tabSelect === '7') {
        this.title = '黄灯警铃-未处理'
        this.tableData = []
      } else {
        this.tableColumnsConfig1 = this.tableColumnsConfig
        this.params.status = '1'
      }
      // this.params.status = this.tabSelect === '1' ? '0' : '1'
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
      this.tableData = this.detailData
      console.log(proconf)
      switch (this.title) {
        case '红灯系统整改-待整改':
          this.tableColumnsConfig = proconf.redUndoNum
          this.tabStatusBtnConfig.curButton = curStatusButton
          break
        case '红灯系统整改-已整改':
          this.tableColumnsConfig = proconf.redUndoNum
          this.tabStatusBtnConfig.curButton = curStatusButton1
          break
        case '黄灯-待认定':
          this.tableColumnsConfig = proconf.yellowConfig
          this.tabStatusBtnConfig.buttons = statusButtons1
          this.tabStatusBtnConfig.curButton = curStatusButton3
          break
        case '黄灯-已认定':
          this.tableColumnsConfig = proconf.yellowConfig
          this.tabStatusBtnConfig.buttons = statusButtons1
          this.tabStatusBtnConfig.curButton = curStatusButton4
          break
        case '黄灯-待整改':
          this.tableColumnsConfig = proconf.yellowConfig
          this.tabStatusBtnConfig.buttons = statusButtons1
          this.tabStatusBtnConfig.curButton = curStatusButton5
          break
        case '黄灯-已整改':
          this.tableColumnsConfig = proconf.yellowConfig
          this.tabStatusBtnConfig.buttons = statusButtons1
          this.tabStatusBtnConfig.curButton = curStatusButton6
          break
        case '黄灯警铃-未处理':
          this.tableColumnsConfig = proconf.blueUndoNumConfig
          this.tabStatusBtnConfig.curButton = curStatusButton7
          this.tabStatusBtnConfig.buttons = statusButtons2
          break
        default:
          break
      }
    },
    handleDetail(type, speTypeCode, mofDivCode) {
      let params = {
        reportCode: type === 'fpAmount' ? 'zdzjzbmx_fdq' : 'zjzcmx_fdq',
        speTypeCode: speTypeCode,
        mofDivCode: mofDivCode,
        fiscalYear: this.$parent.condition.fiscalYear ? this.$parent.condition.fiscalYear[0] : ''
      }
      // this.$parent.sDetailVisible = true
      // this.$parent.sDetailType = type
      this.tableLoading = true
      // setTimeout(() => {
      //   this.tableLoading = false
      // }, 2000)
      // this.$parent.sDetailData = [
      //   {
      //     bgtMofDepName: '事业股',
      //     agencyName: '城固县水磨中心学校',
      //     speTypeName: '城乡义务教育补助经费',
      //     xjExpFuncName: '初中教育',
      //     corBgtDocNo: '陕财办教〔2021〕202号',
      //     xjCorBgtDocNo: '城财事〔2022〕6号',
      //     fpAmount: 44937.5,
      //     payAppAmt: 44937.5,
      //     sspeTypeName: '城乡义务教育补助经费_教育体育局',
      //     sSpeTypeName: '城乡义务教育补助经费_教育体育局'
      //   },
      //   {
      //     bgtMofDepName: '事业股',
      //     agencyName: '城固县原公镇中心学校',
      //     speTypeName: '城乡义务教育补助经费',
      //     xjExpFuncName: '小学教育',
      //     corBgtDocNo: '陕财办教〔2021〕202号',
      //     xjCorBgtDocNo: '城财事〔2022〕8号',
      //     fpAmount: 317790,
      //     payAppAmt: null,
      //     sspeTypeName: '城乡义务教育补助经费_教育体育局',
      //     sSpeTypeName: '城乡义务教育补助经费_教育体育局'
      //   },
      //   {
      //     bgtMofDepName: '教科文股',
      //     agencyName: '扶风县天度镇天度初级中学',
      //     speTypeName: '城乡义务教育补助经费',
      //     xjExpFuncName: '其他普通教育支出',
      //     corBgtDocNo: '陕财办教〔2021〕202号',
      //     xjCorBgtDocNo: '扶财办教〔2022〕003号',
      //     fpAmount: 240000,
      //     payAppAmt: null,
      //     sspeTypeName: '城乡义务教育补助经费',
      //     sSpeTypeName: '城乡义务教育补助经费'
      //   },
      //   {
      //     bgtMofDepName: '文教政法股',
      //     agencyName: '洛川县交口河镇京兆社区中心小学',
      //     speTypeName: '城乡义务教育补助经费',
      //     xjExpFuncName: '小学教育',
      //     corBgtDocNo: '陕财办教〔2021〕202号',
      //     xjCorBgtDocNo: '洛财办教〔2022〕12号',
      //     fpAmount: 1250,
      //     payAppAmt: 1250,
      //     sspeTypeName: '城乡义务教育补助经费',
      //     sSpeTypeName: '城乡义务教育补助经费'
      //   }]
      HttpModule.queryTableDatas(params).then((res) => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.$parent.sDetailData = res.data
          this.$parent.sDetailVisible = true
          this.$parent.sDetailType = type
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cellStyle({ row, rowIndex, column }) {
      if (['fpAmount', 'payAppAmt'].includes(column.property) && column.title === '总金额') {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      if (this.title === '直达资金项目明细') {
        switch (key) {
          case 'fpAmount':
            this.handleDetail('fpAmount', obj.row.speTypeCode, obj.row.mofDivCode)
            this.$parent.sDetailTitle = '指标明细'
            break
          case 'payAppAmt':
            this.handleDetail('payAppAmt', obj.row.speTypeCode, obj.row.mofDivCode)
            this.$parent.sDetailTitle = '支出明细'
        }
      }
    }
  },
  mounted() {
    this.showInfo()
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
