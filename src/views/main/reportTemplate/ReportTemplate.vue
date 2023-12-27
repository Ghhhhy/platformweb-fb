<!-- 直达资金预算下达_分地区 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @itemChange="itemChange"
            @onSearchClick="(e1, e2) => search(e1, e2, false)"
          />
        </div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          id="1001"
          ref="bsTableRef"
          row-id="id"
          :table-config="tableConfig"
          :table-columns-config="tableColumnsConfig"
          :table-global-config="tableGlobalConfigCop"
          :table-data="tableData"
          :scroll-y="scrollConfig"
          :virtual-scroll="true"
          :calculate-constraint-config="calculateConstraintConfig"
          :tree-config="{
            dblExpandAll: true,
            dblExpand: true,
            accordion: false,
            iconClose: 'el-icon-circle-plus',
            iconOpen: 'el-icon-remove',
          }"
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          :export-modal-config="{
            fileName: menuName,
            addReportTitleColumn: true,
            addUnitColumn: true,
          }"
          :default-money-unit="10000"
          :cell-style="cellStyle"
          :title="menuName"
          :show-zero="showZero"
          @editClosed="onEditClosed"
          @onToolbarBtnClick="onToolbarBtnClick"
          @cellClick="cellClick"
          @switchMoneyUnit="switchMoneyUnit"
        >
          <!--口径说明插槽-->
          <template v-if="caliberDeclareContent" v-slot:caliberDeclare>
            <p v-html="caliberDeclareContent"></p>
          </template>
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
          <template v-slot:toolbar-custom-slot>
            <div class="dfr-report-time-wrapper">
              <el-tooltip
                effect="light"
                :content="`报表最近取数时间：${reportTime}`"
                placement="top"
              >
                <div class="dfr-report-time-content">
                  <i class="ri-history-fill"></i>
                  <span class="dfr-report-time">{{ reportTime }}</span>
                </div>
              </el-tooltip>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <DetailDialog
      v-if="detailVisible"
      :title="detailTitle"
      :detail-table="penetrateTableId"
      :detail-query="penetrateQueryId"
      :detail-query-param="detailQueryParam"
      @close="closeDialog"
    />
  </div>
</template>

<script>
import DetailDialog from './DetailDialog.vue'
import HttpModule from '@/api/frame/main/reportTemplate/index.js'
import utils from './utils.js'
import showFileModal from '@//views/main/reportTemplate/useFileModal.js'
import moment from 'moment'
export default {
  components: {
    DetailDialog
  },
  computed: {
    params5() {
      // 路由菜单配置信息
      return this.transJson3(this.$store.state.curNavModule.param5 || '') || {}
    },
    tableGlobalConfigCop() {
      let dataType = this.params5.exportModalDefaultSelect || 'fullData'
      return {
        customExportConfig: {
          ...this.tableGlobalConfig.customExportConfig,
          dataType,
          fileName: this.menuName
        }
      }
    }
  },
  watch: {
    queryConfig(newVal, oldVal) {
      // 初始化高级搜索
      utils.initHightSearch(newVal)
    }
  },
  data() {
    return {
      settingPageConfig: {},
      cacheParam: {},
      globalConfig: {},
      caliberDeclareContent: '', // 口径说明
      reportTime: '', // 拉取支付报表的最新时间
      leftTreeVisible: false,
      isShowQueryConditions: true,
      scrollConfig: {
        gt: 0,
        enabled: true
      },
      // table 相关配置
      tableGlobalConfig: {
        customExportConfig: {
          addUnitColumn: true,
          addReportTitleColumn: true,
          unit: '万元'
        }
      },
      showZero: false,
      dataSourceAddLoading: false,
      tableLoading: false,
      tableConfig: {
        globalConfig: {
          seq: true,
          useMoneyFilter: true
        }
      },
      tableColumnsConfig: [],
      tableData: [],
      calculateConstraintConfig: {
        enabled: true,
        extendMapInfoField: true, // 是否扩展mapInfo字段
        calcAndConstraintItemCodeField: 'itemCode',
        getDataAxiosConfig: {
          // 跨表提取请求配置
          dataField: 'data', // 数据字段
          successCode: '100000', // 成功code
          statusField: 'rscode',
          method: 'get', // 请求方式
          url: '' // 'queryTreeAssistData', //
        },
        getDataParams: {
          // 提取公共参数
        },
        colConstraintConfig: {},
        rowCodeConstraintConfig: {
          // 表间约束配置
        }
      },
      pagerConfig: {
        // autoHidden: true,
        total: 1,
        currentPage: 1,
        pageSize: 20
      },
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        expandAll: true, // 展开所有
        caliberDeclare: true, //
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 请求 & 角色权限相关配置
      menuName: '',
      userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      tableDataParams: {
        condition: {}
      },
      queryConfig: [],
      searchDataList: {},
      detailVisible: false,
      detailTitle: '',
      detailQueryParam: {},
      penetrateTableId: '',
      penetrateQueryId: ''
    }
  },
  methods: {
    // 载入表头
    async loadConfig(type) {
      let params = {
        tableId: {
          id: this.reportCode + '_' + type,
          fiscalyear: this.userInfo.year,
          mof_div_code: this.userInfo.province,
          menuguid: this.$store.state.curNavModule.guid
        }
      }
      if (type === 'table') {
        let configData = await this.loadBsConfig(params)
        this.tableColumnsConfig = configData.itemsConfig
        this.queryParams = configData.queryParams || {}
        this.globalConfig = configData.globalConfig || {}
        this.settingPageConfig = configData.pageConfig || {}
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
        if (query.itemRender) {
          if (['$vxeSelect', '$select'].includes(query.itemRender.name)) {
            if (query.itemRender.defaultValue) {
              this.$set(this.searchDataList, query.field, query.itemRender.defaultValue)
            }
            if (query.itemRender.getCurrentMonth) {
              let preMonthValue = String(moment().month()).padStart(2, '0')// 获取上月份值
              if (preMonthValue === '00') { // 处理一月份 显示00
                preMonthValue = '01'
              }
              this.$set(this.searchDataList, query.field, preMonthValue)
            }
          }
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
    itemChange(changeEvent) {},
    switchMoneyUnit(level) {
      this.tableGlobalConfig.customExportConfig.unit =
        level === 1 ? '元' : '万元'
    },
    // 切换状态栏
    onStatusTabClick(obj) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.curValue) {
        // 全部
        case '1':
          this.menuName = '直达资金预算下达_分地区(单位:万元)'
          break
      }
      // this.mainPagerConfig.currentPage = 1
      this.queryTableDatas()
      this.queryTableDatasCount()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 搜索
    search(data, obj) {
      console.log(data, obj)
      this.searchDataList = data
      const condition = { ...utils.highSearch(this.queryConfig, data) }
      this.tableDataParams.condition = condition
      this.queryTableDatas()
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.$confirm(
            '重新加载数据可能需要等待较长时间，确认继续？',
            '操作确认提示',
            {
              type: 'warning'
            }
          ).then(() => {
            this.refresh(true)
          })
          break
      }
    },
    handleDetail(mofDivCode, column, row) {
      let configParams = utils.getPenetrateParams(row, column)
      let params = {
        column: column.property,
        reportCode: this.penetrateTableId,
        ...this.tableDataParams.condition,
        ...configParams
      }
      this.detailQueryParam = params
      this.detailVisible = true
    },
    closeDialog() {
      this.detailVisible = false
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      // const rowIndex = obj?.rowIndex
      // if (!rowIndex) return
      // 只有全部增发国债资金项目基本情况汇总表和全部增发国债资金项目月度汇总表才有钻取
      // 且只有项目名称才有钻取
      const isInvalidReportCode = ['zfgzzjxmjbqkhzb', 'zfgzzjxmydhzb'].includes(this.reportCode)
      const isInvalidCellValue = obj.column.property === 'proname'
      // const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      if (!obj.column.own.column_link && !isInvalidReportCode) {
        return
      }
      if (obj.column.own.insertType === 'file') {
        let settingConfig = obj.column.own.fileClickModalConfig || this.globalConfig?.fileClickModalConfig
        let row = JSON.parse(JSON.stringify(obj.row))
        let column = JSON.parse(JSON.stringify(obj.column.own))
        showFileModal({ ...settingConfig, row, column, context: this })
        return
      }
      if (!isInvalidCellValue) return
      this.penetrateTableId = obj.column.own.penetrateTable
      this.penetrateQueryId =
        obj.column.own.penetrateQuery ||
        obj.column.own.penetrateTable + '_query'
      // 无效的cellValue
      this.detailTitle = utils.getPenetrateTitle(
        obj.row,
        obj.column,
        this.globalConfig.penetrateTitle
      )
      this.handleDetail(obj.row.code, obj.column, obj.row)
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh(flush = false) {
      this.queryTableDatas(flush)
    },
    getTrees(val) {
      if (val === undefined) {
        return
      }
      let proCodes = []
      if (val.trim() !== '') {
        val.split(',').forEach((item) => {
          proCodes.push(item.split('##')[0])
        })
      }
      return proCodes
    },
    // 查询 table 数据
    queryTableDatas(flush) {
      const param = {
        // reportCode: this.reportCode,
        ...this.params5,
        ...this.queryParams,
        ...this.searchDataList,
        ...this.tableDataParams.condition
      }
      if (flush) {
        param.isFlush = flush
      }
      console.log(param, '--------------查询参数')
      this.tableLoading = true
      this.cacheParam = param
      let URL = 'getReportTableDatas'
      let dataKey = 'data'
      if (this.settingPageConfig.usePage) {
        URL = 'getDetailTableDatas'
        dataKey = 'results'
        param.pageNo = this.pagerConfig.currentPage
        param.pageSize = this.pagerConfig.pageSize
      }
      HttpModule[URL](param).then((res) => {
        if (res.code === '000000') {
          if (res.data) {
            this.tableData = res.data[dataKey]
            this.reportTime = res.data.reportTime || ''
            this.caliberDeclareContent = res.data.description || ''
            if (this.settingPageConfig.usePage) {
              this.pagerConfig.currentPage = res.data.pageNo
              this.pagerConfig.currentPage = res.data.pageSize
              this.pagerConfig.total = res.data.totalCount
            }
          }
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    onEditClosed(obj, bsTable, xGrid) {
      bsTable.performTableDataCalculate(obj)
    },
    transJson3(str) {
      let strTwo = ''
      str.split(',').reduce((acc, curr) => {
        const [key, value] = curr.split('=')
        acc[key] = value
        strTwo = acc
        return acc
      }, {})
      return strTwo
    },
    cellStyle({ row, rowIndex, column }) {
      if (!rowIndex) return
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
    }
  },
  created() {
    console.log(this.params5, this.$store.state.curMenuObj)
    this.menuId = this.$store.state.curNavModule.guid
    this.menuName = this.$store.state.curNavModule.name
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.reportCode = this.params5.reportCode
    console.log('--reportcode', this.reportCode)
    Promise.all([this.loadConfig('table'), this.loadConfig('query')]).then(res => {
      this.queryTableDatas()
    })
  }
}
</script>
