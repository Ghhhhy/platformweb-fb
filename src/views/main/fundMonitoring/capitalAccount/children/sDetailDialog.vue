<!--监控规则数据源管理新增页面弹框-->
<template v-loading="tableLoading">
  <vxe-modal
    v-model="sDetailVisible"
    :title="title"
    width="80%"
    height="80%"
    :show-footer="true"
    @close="dialogClose"
  >
    <BsTable
      ref="mainTableRef"
      :footer-config="tableFooterConfig"
      :table-config="tableConfig"
      :table-columns-config="tableColumnsConfig"
      :table-data="tableData"
      :toolbar-config="tableToolbarConfig"
      :pager-config="pagerConfig"
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
    }
  },
  data() {
    return {
      tableFooterConfig: {
        showFooter: false
      },
      tableColumnsConfig: [
      ],
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: false, // 导出
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
      pagerConfig: {
        autoHidden: true,
        total: 1,
        currentPage: 1,
        pageSize: 999999
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
    showInfo() {
      this.tableData = this.sDetailData
      switch (this.title) {
        case '支出明细':
          this.tableColumnsConfig = proconf.expenditureColumn
          break
        case '指标明细':
          this.tableColumnsConfig = proconf.targetColumn
          break
        default:
          break
      }
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
