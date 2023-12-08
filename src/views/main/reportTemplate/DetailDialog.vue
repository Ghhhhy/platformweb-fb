<!--监控规则数据源管理新增页面弹框-->
<template v-loading="tableLoading">
  <vxe-modal
    :id="detailQueryParam.column + '1_1' + detailTable"
    v-model="showDetail"
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
        />
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
        @cellClick="cellClick"
        @register="register"
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
    <ReportDetailComp
      v-if="detailVisible"
      ref="reportDetailComp"
      :title="detailTitle"
      :detail-table="penetrateTableId"
      :detail-query="penetrateQueryId"
      :detail-query-param="detailQueryParam1"
      @close="closeDialog1"
    />
  </vxe-modal>
</template>
<script>
import HttpModule from '@/api/frame/main/reportTemplate/index.js'
import useExportAll from '@/hooks/useExportAll/useExportAllMixin.js'
import utils from './utils.js'

export default {
  name: 'ReportDetailComp',
  mixins: [
    useExportAll({
      ref: 'bsTableRef',
      beforeRequest: (config, ctx) => {
        config.fileName = ctx.title
        config.params.pageSize = 999999
      }
    })
  ],
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
    detailTable: {
      type: String,
      default: ''
    },
    detailQueryParam: {
      type: Object,
      default() {
        return {}
      }
    },
    detailQuery: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      cacheParam: {},
      globalConfig: {},
      isShowQueryConditions: true,
      queryConfig: [],
      searchDataList: {},
      showDetail: true,
      tableColumnsConfig: [],
      // foot合计配置
      tableFooterConfig: {
        totalObj: {
          amountAllfp: 0,
          payAppAmt: 0
        },
        combinedType: ['switchTotal'],
        showFooter: false
      },
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
          seq: true, // 序号列
          useMoneyFilter: true
        }
      },
      fiscalYear: '',
      detailVisible: false,
      detailTitle: '',
      reportCode: '',
      tableDataParams: {
        condition: {}
      },
      penetrateTableId: '',
      penetrateQueryId: '',
      detailQueryParam1: {}
    }
  },
  methods: {
    // 载入表头
    async loadConfig(type) {
      let params = {
        tableId: {
          id: type === 'query' ? this.detailQuery : this.reportCode,
          fiscalyear: this.userInfo.year,
          mof_div_code: this.userInfo.province,
          menuguid: this.$store.state.curNavModule.guid
        }
      }
      if (type === 'table') {
        let configData = await this.loadBsConfig(params)
        this.globalConfig = configData.globalConfig || {}
        this.tableColumnsConfig = configData.itemsConfig
      }
      if (type === 'query') {
        let configData = await this.loadBsConfig(params)
        this.queryConfig = configData.itemsConfig || []
        this.initQueryConfig()
      }
    },
    // 初始化高级搜索下拉框数据
    initQueryConfig() {
      console.log(this.queryConfig)
      // 如果选择器是vxeTree,需要调用后台的接口选择数据
      this.queryConfig.forEach((query) => {
        if (
          query.itemRender &&
          (query.itemRender.name === '$vxeTree' ||
            query.itemRender.name === '$formTreeInput')
        ) {
          this.getHighConfigData(query).then((res) => {
            query.itemRender.options = res
          })
        }
      })
    },
    // 获取高级搜索要素值
    getHighConfigData(query) {
      return new Promise((resolve, reject) => {
        let params = {
          elementCode: query.queryField || query.field, // 获取要素类型,不区分大小写
          fiscalYear: this.userInfo.year
        }
        HttpModule.getHighConfigElement(params).then((res) => {
          if (res.code === '000000') {
            resolve(res.data)
          } else {
            resolve([])
          }
        })
      })
    },
    // 搜索
    search(data) {
      console.log(data)
      const condition = { ...utils.highSearch(this.queryConfig, data) }
      this.tableDataParams.condition = condition
      this.queryTableDatas()
    },
    closeDialog1() {
      this.detailVisible = false
    },
    dialogClose() {
      this.$emit('close')
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
      this.tableDataParams.condition = Object.assign(
        {},
        this.$parent?.tableDataParams?.condition || {},
        this.tableDataParams.condition || {}
      )
      let params = {
        ...(this.$parent?.cacheParam || {}),
        page: this.pagerConfig.currentPage, // 页码
        pageSize: this.pagerConfig.pageSize, // 每页条数
        ...this.detailQueryParam,
        ...this.tableDataParams.condition
      }
      this.$parent.tableLoading = true
      console.log(params)
      this.cacheParam = params
      HttpModule.getDetailTableDatas(params)
        .then((res) => {
          if (res.code === '000000') {
            this.tableData = res.data.results
            this.pagerConfig.total = res.data.totalCount
          } else {
            this.$message.error(res.message)
          }
        })
        .finally(() => {
          this.$parent.tableLoading = false
        })
    },
    handleDetail(row, column) {
      this.tableDataParams.condition = Object.assign(
        {},
        this.$parent?.cacheParam,
        this.cacheParam || {},
        this.$parent?.tableDataParams?.condition || {},
        this.tableDataParams.condition || {}
      )
      let configParams = utils.getPenetrateParams(row, column)
      this.detailQueryParam1 = {
        ...this.tableDataParams.condition,
        ...configParams,
        column: column.property,
        reportCode: this.penetrateTableId
      }
      let ignoreParams = column.own.ignoreParams
      if (ignoreParams && ignoreParams.length > 0) {
        for (let i of ignoreParams) {
          delete this.detailQueryParam1[i]
        }
      }
      console.log(this.detailQueryParam1)
      this.detailTitle = utils.getPenetrateTitle(
        row,
        column,
        this.globalConfig.penetrateTitle
      )
      this.detailVisible = true
    },
    cellStyle({ row, rowIndex, column }) {
      let field = this.tableColumnsConfig[0].field
      // 第一行为合计则不可钻取
      if ((row[field] || '').replace(/\s*/g, '') === '合计') return
      // 有效的cellValue
      const validCellValue = row[column.property] * 1
      if (!validCellValue) return
      // 拿到那些可以进行超链接的表格行
      if (column.own.column_link) {
        return {
          color: '#4293F4',
          textDecoration: 'underline',
          cursor: 'pointer'
        }
      }
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let field = this.tableColumnsConfig[0].field
      // 第一行为合计则不可钻取
      if (obj.row[field].replace(/\s*/g, '') === '合计') return
      // 无效的cellValue
      const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      if (isInvalidCellValue) return
      this.penetrateTableId = obj.column.own.penetrateTable
      this.penetrateQueryId =
        obj.column.own.penetrateQuery ||
        obj.column.own.penetrateTable + '_query'
      this.handleDetail(obj.row, obj.column)
    },
    isConfigTable() {
      this.loadConfig('table')
      this.loadConfig('query')
    }
  },
  mounted() {
    console.log(this.detailTable, 'munid')
    this.isConfigTable()
    this.queryTableDatas()
  },
  watch: {},
  created() {
    console.log(this.detailQueryParam)
    this.reportCode = this.detailTable
    this.userInfo = this.$store.state.userInfo
  }
}
</script>
