<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout>
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
          />
        </div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="false"
          :toolbar-config="tableToolbarConfig"
          :cell-style="cellStyle"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <vxe-modal
      v-model="showViolations"
      :title="dialogTitle"
      width="80%"
      height="20%"
    >
      <BsTable
        ref="functionTableRef"
        :table-columns-config="mountTableColumnsConfig"
        :table-data="functionTableData"
        :toolbar-config="false"
        :pager-config="false"
      />
    </vxe-modal>
  </div>
</template>

<script>
import { proconf } from './TreasuryGuaranteeLevWarn'
import HttpModule from '@/api/frame/main/Monitoring/TreasuryGuaranteeLevWarn.js'

export default {
  components: {},
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      isShowQueryConditions: true,
      radioShow: true,
      breakRuleVisible: false,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: proconf.toolBarStatusButtons,
        curButton: {
          type: 'button',
          iconName: 'base-all.png',
          iconNameActive: 'base-all-active.png',
          iconUrl: '',
          label: '全部',
          code: '1',
          curValue: '1'
        },
        buttonsInfo: proconf.statusRightToolBarButton,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      tabStatusNumConfig: {
        '1': 0
      },
      // BsQuery 查询栏
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      toolBarStatusSelect: {
        type: 'button',
        iconName: 'base-all.png',
        iconNameActive: 'base-all-active.png',
        iconUrl: '',
        label: '全部',
        code: '1',
        curValue: '1'
      },
      // table 相关配置
      tableLoading: false,
      tableColumnsConfig: proconf.PoliciesTableColumns,
      tableColumnsConfig1: proconf.PoliciesTableColumns,
      mountTableColumnsConfig: proconf.PoliciesTableColumns2,
      functionTableData: [],
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 200
      },
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRow
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      tableFooterConfig: {
        showFooter: false
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '明细查看',
      addTableData: [],
      modifyData: {},
      // 请求 & 角色权限相关配置
      menuName: '',
      params5: '',
      menuId: '',
      tokenid: '',
      userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      appId: 'pay_voucher',
      isHaveZero: '0',
      // 文件
      showAttachmentDialog: false,
      billguid: '',
      condition: {},
      showViolations: false,
      mofDivName: '',
      mofDivCode: '',
      regulationType: '',
      status: '',
      treeQueryparams: { elementcode: 'admdiv', province: '610000000', year: '2021', wheresql: 'and code like \'' + 61 + '%\'' },
      fiscalYear: '',
      mofDivCodeList: [],
      agencyCodeList: []
    }
  },
  mounted() {
  },
  methods: {
    cellStyle ({ row, rowIndex, column }) {
      if (
        column.property !== undefined &&
        column.property !== 'mofDivName' &&
        column.property !== 'mofDivCode'
      ) {
        return {
          fontWeight: '700'
        }
      }
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    // 初始化高级查询data
    getSearchDataList() {
      // 下拉树
      let searchDataObj = {}
      this.queryConfig.forEach(item => {
        if (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree') {
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
      this.queryConfig.forEach(item => {
        if (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree') {
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
          this.menuName = '库款保障水平预警表（按月）'
          this.radioShow = true
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.refresh()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 搜索
    search(val) {
      this.searchDataList = val
      let condition = this.getConditionList()
      for (let key in condition) {
        if (
          (this.searchDataList[key] !== undefined) &
          (this.searchDataList[key] !== null)
        ) {
          if (Array.isArray(this.searchDataList[key])) {
            condition[key] = this.searchDataList[key]
          } else if (typeof (this.searchDataList[key]) === 'string') {
            if (this.searchDataList[key].trim() !== '') {
              this.searchDataList[key].split(',').forEach(item => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      if (this.searchDataList.mofDivName && this.searchDataList.mofDivName.trim() !== '') {
        this.mofDivName = this.searchDataList.mofDivName
      }
      this.condition = condition
      let fiscalYear = this.condition.fiscalYear[0]

      this.fiscalYear = fiscalYear
      this.mofDivCodeList = val.mofDivCodeList_code__multiple

      this.queryTableDatas(fiscalYear)
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      switch (obj.code) {
        // 刷新
        case 'add-toolbar-refresh':
          this.refresh()
          break
        // 刷新
        case 'operation-toolbar-refresh':
          this.refresh()
          break
        default:
          break
      }
    },
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      switch (optionType) {
        // 新增
        case 'add':
          this.clickAddBtn(row)
          break
        // 操作日志
        case 'report':
          this.queryActionLog(row)
          break
        // 附件
        case 'attachment':
          this.showAttachment(row)
          break
        default:
      }
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    // 查看附件
    showAttachment(row) {
      this.billguid = row.attachment_id
      this.showAttachmentDialog = true
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      if (
        key !== 'mofDivName' &&
        key !== 'mofDivCode'
      ) {
        if (key.indexOf('treasuryGuaranteeLevel') !== -1 || key.indexOf('status') !== -1) {
          this.month = key.split('-')[0]
        }
        if (obj.row[key] !== undefined && obj.row[key] !== null && obj.row[key] !== '' && obj.row[key] !== '-') {
          this.showViolations = true
          this.mofDivCode = obj.row['mofDivCode']
          this.queryInfoData()
        }
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.queryTableDatas()
      // this.queryTableDatasCount()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    queryInfoData() {
      const param = {
        fiscalYear: this.fiscalYear,
        mofDivCode: this.mofDivCode,
        acctPeriod: this.month
      }
      this.tableLoading = true
      HttpModule.getInfoByMonth(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.functionTableData = res.data
          this.functionTableData.forEach(item => {
            if (item.status === 2) {
              item.status = '<div style="background:#fdfd01;margin: 5px 5px 5px 5px;">库款偏低</span>'
            } else if (item.status === 3) {
              item.status = '<span>库款正常</span>'
            } else if (item.status === 1) {
              item.status = '<div style="background:#fd0001;margin: 5px 5px 5px 5px;">库款警示</span>'
            } else if (item.status === 4) {
              item.status = '<div style="background:#00af50;margin: 5px 5px 5px 5px;">库款闲置</div>'
            }
          })
        }
      })
    },
    // 查询 table 数据
    queryTableDatas(fiscalYear) {
      const param = {
        fiscalYear: fiscalYear || this.$store.state.userInfo.year,
        mofDivName: this.searchDataList.mofDivName,
        mofDivCodeList: this.mofDivCodeList
      }
      this.tableColumnsConfig = [
        {
          title: '区划编码',
          field: 'mofDivCode',
          width: '150',
          sortable: false,
          align: 'left'
        },
        {
          title: '区划名称',
          field: 'mofDivName',
          width: '150',
          sortable: false,
          align: 'left'
        }
      ]
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          if (res.data.titleList.length) {
            res.data.titleList.forEach((item, index) => {
              this.tableColumnsConfig.splice(2 + index, 0, {
                title: item.monthName,
                field: item.month,
                sortable: false,
                align: 'left',
                children: [
                  {
                    title: '库款保障水平',
                    field: item.treasuryGuaranteeLevel,
                    width: '150',
                    align: 'center'
                  },
                  {
                    title: '状态',
                    field: item.status,
                    width: '150',
                    type: 'html',
                    align: 'center',
                    'cellRender': {
                      'name': '$vxeSelect',
                      'options': [
                        {
                          'value': '1',
                          'label': '库款预警'
                        },
                        {
                          'value': '2',
                          'label': '库款偏低'
                        },
                        {
                          'value': '3',
                          'label': '库款正常'
                        },
                        {
                          'value': '4',
                          'label': '库款闲置'
                        },
                        {
                          'value': '-',
                          'label': '-'
                        }
                      ],
                      'defaultValue': '',
                      'props': {}
                    }
                  }
                ]
              })
            })
          }
          this.tableData = res.data.dataList
          this.mainPagerConfig.total = res.data.dataList.length
          this.tabStatusNumConfig['1'] = res.data.dataList.length
          let monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          this.tableData.forEach(item => {
            monthList.forEach(u => {
              if (item[u + '-status'] === '2') {
                item[u + '-status'] = '<div style="background:#fdfd01;margin: 5px 5px 5px 5px;">库款偏低</span>'
              } else if (item[u + '-status'] === '3') {
                item[u + '-status'] = '<span>库款正常</span>'
              } else if (item[u + '-status'] === '1') {
                item[u + '-status'] = '<div style="background:#fd0001;margin: 5px 5px 5px 5px;">库款警示</span>'
              } else if (item[u + '-status'] === '4') {
                item[u + '-status'] = '<div style="background:#00af50;margin: 5px 5px 5px 5px;">库款闲置</div>'
              }
            })
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 操作日志
    queryActionLog(row) {
      let data = {
        roleguid: this.$store.state.curNavModule.roleguid,
        data: {
          statusCode: this.toolBarStatusSelect.code,
          id: row.id,
          appId: 'pay_voucher'
        }
      }
      HttpModule.queryActionLog(data).then(res => {
        this.logData = res.data
        this.showLogView = true
      })
    },
    getLeftTreeData() {
      let that = this
      HttpModule.getLeftTree(that.treeQueryparams).then(res => {
        if (res.rscode === '100000') {
          let treeResdata = that.getRegulationChildrenData(res.data)
          this.queryConfig[2].itemRender.options = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getRegulationChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        if (item.children && item.children.length > 0) {
          that.getRegulationChildrenData(item.children)
          item.leaf = false
        } else {
          item.leaf = true
        }
      })

      return datas
    }
  },
  created() {
    // let date = new Date()
    // let year = date.toLocaleDateString().split('/')[0]
    this.searchDataList.fiscalYear = this.$store.state.userInfo.year
    this.fiscalYear = this.$store.state.userInfo.year
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.params5 = this.$store.state.curNavModule.param5
    this.getLeftTreeData()
  }
}
</script>
<style scoped>
.radio-right{
float: right;
}
.Titans-table ::v-deep  .vxe-body--row.row-yellow {
  background-color: yellow;
  color: #fff;
}
.Titans-table ::v-deep  .vxe-body--row.row-blue {
  background-color: blue;
  color: #fff;
}
.Titans-table ::v-deep  .vxe-body--row.row-red {
  background-color: red;
  color: #fff;
}
</style>
