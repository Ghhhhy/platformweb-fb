<!-- 预警明细查询（按规则） -->
<template>
  <div v-loading="tableLoading" style="height: 100%" class="createProcessing">
    <BsMainFormListLayout :default-split-pane-left-width="14">
      <template v-slot:topTap>
      </template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="(open) => isShowQueryConditions = open"
          @btnClick="onTabPanelBtnClick"
        />
      </template>
      <template v-slot:query>
        <BsQuery
          ref="queryFrom"
          :query-form-item-config="queryConfig"
          :query-form-data="searchDataList"
          @onSearchClick="search"
          @onSearchResetClick="resetQuery"
        />
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableToJson"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="mainPagerConfig"
          :toolbar-config="tableToolbarConfig"
          :cell-style="cellStyle"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-contro-leftvisible"></div>
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <TestModal ref="TestModal" />
  </div>
</template>

<script>
import { proconf } from './createProcessing'
import HttpModule from '@/api/frame/main/Monitoring/WarningDetailsByCompartment.js'
import api from '@/api/frame/main/fundMonitoring/createProcessing.js'
import TestModal from './testSettingModal.vue'
import loadBsConfig from './config'

export default {
  mixins: [loadBsConfig],
  components: {
    TestModal
  },
  computed: {

  },
  watch: {

  },
  data() {
    return {
      // BsQuery 查询栏
      queryConfig: [
        {
          title: '财政区划',
          field: 'mofDivCodes',
          width: '8',
          align: 'left',
          name: '$vxeTree',
          itemRender: {
            name: '$vxeTree',
            options: [],
            props: {
              config: {
                valueKeys: ['code', 'name', 'id', 'codeFragment'],
                format: '{name}',
                treeProps: {
                  labelFormat: '{codeFragment}-{name}', // {code}-{name}
                  nodeKey: 'id',
                  label: 'label',
                  children: 'children'
                },
                treeData: [{
                  children: [],
                  code: 0,
                  id: 0,
                  label: '0-全部分类',
                  name: '全部分类',
                  parentId: null,
                  parentRuleName: null,
                  ruleLevel: 0,
                  ruleName: '全部分类'
                }],
                placeholder: '财政区划',
                multiple: true,
                readonly: false,
                isleaf: true
              }
            }
          }
        }
      ],
      searchDataList: proconf.highQueryData,
      treeData: [],
      tabStatusNumConfig: { 'dcl': 1, 'dzg': 9, 'yxf': 10, 'yth': 10 },
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        },
        changeBtns: true,
        buttons: [
          {
            type: 'button',
            label: '待核实',
            code: 'dcl',
            curValue: '1',
            iconUrl: '',
            iconName: 'base-all.png',
            iconNameActive: 'base-all-active.png'
          },
          {
            type: 'button',
            label: '待整改',
            code: 'dzg',
            iconName: 'base-all.png',
            iconNameActive: 'base-all-active.png'
          },
          {
            type: 'button',
            label: '已退回',
            code: 'yxf',
            iconName: 'base-all.png',
            iconNameActive: 'base-all-active.png'
          },
          {
            type: 'button',
            label: '已整改',
            code: 'yth',
            iconName: 'base-all.png',
            iconNameActive: 'base-all-active.png'
          }
        ],
        curButton: {
          label: '待处理',
          code: 'dcl',
          type: 'button'
        },
        buttonsInfo: {
          'dcl': [
            {
              label: '核实反馈',
              code: 'dcl-hsfk',
              status: 'primary'
            }
          ],
          'dzg': [
            {
              label: '核实反馈',
              code: 'dzg-hsfk',
              status: 'primary'
            }
          ]
        }
      },
      isShowQueryConditions: false,
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
      // tableColumnsConfig: [],
      tableColumnsConfig: [],
      tableToJson: [
        {
          title: '区划',
          width: 180,
          field: 'mofDivName',
          sortable: false,
          filters: false,
          align: 'center',
          cellRender: {
            name: '$vxeInput',
            options: [],
            defaultValue: '',
            props: {
              format: '{mofDivCode}-{mofDivName}'
            }
          },
          props: {
            format: '{mofDivCode}-{mofDivName}'
          }
        },
        {
          title: '预算单位',
          width: 180,
          field: 'agencyName',
          sortable: false,
          filters: false,
          align: 'center',
          cellRender: {
            name: '$vxeInput',
            options: [],
            defaultValue: '',
            props: {
              format: '{agencyCode}-{agencyName}'
            }
          },
          props: {
            format: '{agencyCode}-{agencyName}'
          }
        },
        {
          title: '业务数据单号',
          width: 180,
          field: 'businessNo',
          sortable: false,
          filters: false,
          align: 'center'
        },
        {
          title: '主题',
          width: 180,
          field: 'regulationClassName',
          sortable: false,
          filters: false,
          align: 'center'
        },
        {
          title: '违规时间',
          width: 180,
          field: 'warnTime',
          sortable: false,
          filters: false,
          align: 'center'
        },
        {
          title: '监控类型',
          field: 'triggerClass',
          align: 'center',
          width: 180,
          cellRender: {
            name: '$vxeSelect',
            options: [
              {
                value: 1,
                label: '事中触发'
              },
              {
                value: 2,
                label: '定时触发'
              }
            ],
            defaultValue: '',
            props: {}
          },
          name: '$vxeSelect'
        },
        {
          title: '监控规则',
          width: 180,
          field: 'fiRuleName',
          sortable: false,
          filters: false,
          align: 'center'
        },
        {
          'title': '预警级别',
          'field': 'warnLevel',
          'fixed': '',
          'width': '100',
          'type': 'html',
          'align': 'center',
          'formula': '',
          'constraint': '',
          'combinedType': '',
          'sortable': '1',
          'associatedQuery': {
            'queryMethods': '',
            'queryUrl': '',
            'params': {}
          },
          'dragSort': null,
          'className': '',
          'combinedType_select_sort': '',
          'filters': '',
          formatter: ({ row }) => {
            if (row.warnLevel === 3) {
              return '黄色预警'
            } else if (row.warnLevel === 2) {
              return '橙色预警'
            } else if (row.warnLevel === 1) {
              return '红色预警'
            } else if (row.warnLevel === 4) {
              return '蓝色预警'
            } else if (row.warnLevel === 5) {
              return '灰色预警'
            }
          }
        },
        {
          title: '处理方式',
          field: 'handleType',
          align: 'center',
          width: 180,
          cellRender: {
            name: '$vxeSelect',
            options: [
              {
                value: 1,
                label: '拦截'
              },
              {
                value: 2,
                label: '预警，需上传附件'
              },
              {
                value: 3,
                label: '预警，无需上传附件'
              },
              {
                value: 4,
                label: '提醒'
              },
              {
                value: 5,
                label: '记录'
              }
            ],
            defaultValue: '',
            props: {}
          },
          name: '$vxeSelect'
        },
        {
          title: '支付金额',
          field: 'paymentAmount',
          sortable: false,
          filters: false,
          align: 'right',
          width: 180,
          combinedType: [
            'average',
            'subTotal',
            'total',
            'totalAll'
          ],
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '操作',
          field: 'opration',
          sortable: false,
          filters: false,
          align: 'center',
          fixed: 'right',
          width: 230,
          cellRender: { name: '$customerRender' }
          // slots: {
          //   default: ({ row, rowIndex }, h) => {
          //     return [
          //       <div>
          //         {rowIndex !== 0 ? <el-button type="primary" size="mini" onClick={() => { this.handleRowClick(row, rowIndex) }}>查看详情{rowIndex}</el-button> : ''}
          //         {rowIndex === 1 ? <el-button type="primary" size="mini">删除</el-button> : ''}
          //         <el-button type="primary" size="mini">勾选</el-button>
          //       </div>
          //     ]
          //   }
          // }
        }
      ],
      tableData: [{}],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
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
        pageSize: 20
      },
      tableConfig: {
        renderers: {
          // 修改 配置 下发 删除
          $customerRender: {
            renderDefault: (h, cellRender, { row, rowIndex }, context) => {
              return [
                <el-button type="primary" size="mini" onClick={() => this.handleRowClick(row)}>查看详情</el-button>
              ]
            }
          }
        }
      },
      tableFooterConfig: {
        showFooter: false
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 请求 & 角色权限相关配置
      menuName: '违规处理单反馈（单位）',
      userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      // 文件
      showAttachmentDialog: false,
      showGlAttachmentDialog: false,
      detailData: [],
      codeList: []
    }
  },
  activated() {
    this.updateRegulationClassNameFormConfig()
  },
  methods: {
    handleRowClick(row) {
      console.log('点击每行的方法', row)
    },
    showLogModel(row) {
      this.showLogView = true
      this.queryActionLog(row)
    },
    // 操作日志
    queryActionLog(row) {
      api.getLogs(row.dealNo).then(res => {
        if (res.code === '000000') {
          let tempData = res.data.map(item => {
            return {
              logid: item['operationTypeCode'],
              nodeName: item['operationTypeName'],
              actionUser: item['operationUser'],
              actionName: item['operationTypeName'],
              actionTime: item['createdTime'] == null ? '' : item['createdTime'],
              message: item['operationComment']
            }
          })
          this.logData = tempData
          console.log(this.logData)
          this.showLogView = true
        } else {
          this.$message.error(res.message)
        }
      })
    },
    updateRegulationClassNameFormConfig () {
      // 如果菜单参数有主题 当前模块就使用该主题查询
      if (this.transJson(this.$store.state.curNavModule.param5)?.regulationClass) {
        const index = this.queryConfig.findIndex(item => item.field === 'regulationClassName')
        index > -1 && this.queryConfig?.splice(index, 1)
      }
    },
    search(obj) {
      console.log(77, obj)
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
    changeVisible(val) {
      console.log(val, '输出')
      this.breakRuleVisible = val
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    /**
     * 重置查询条件
     */
    resetQuery() {
      console.log('触发了重置')
      this.$refs.queryFrom.reset()
      // this.dealNo = ''
      // this.regulationClassName = ''
      // this.warnTime = ''
      // this.triggerClass = ''
      // this.warningLevel = ''
      // this.agencyName = ''
      // this.issueTime = ''
      // this.fiRuleName = ''
      // this.violateType = ''
      // this.trackProName = ''
    },
    // 查看附件
    showAttachment(row) {
      console.log('查看附件', row)
      if (row.attachmentid1 === null && row.attachmentid3 === null) {
        this.$message.warning('该数据无附件')
        return
      }
      this.billguid = row.attachmentid1 === null ? row.attachmentid3 : row.attachmentid1
      // this.showAttachmentDialog = true
      this.showGlAttachmentDialog = true
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      console.log(key, obj.row)
      switch (key) {
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      console.log('触发了刷新')
      // if (this.menuName === '监控问询单列表' && this.status === 0) {
      //   this.queryTableDatas()
      // } else if (this.menuName === '监控问询单列表' && this.status !== 0) {
      //   this.getdata()
      // } else {
      //   this.getWarnData()
      // }
    },
    closeAttachment() {
      this.showGlAttachmentDialog = false
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      if (this.menuName === '监控问询单列表' && this.status === 0) {
        this.queryTableDatas()
      } else if (this.menuName === '监控问询单列表' && this.status !== 0) {
        this.getdata()
      } else {
        this.getWarnData()
      }
    },
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        // agencyName: this.agencyName,
        agencyCodeList: this.agencyCodeList,
        issueTime: this.issueTime,
        fiRuleName: this.fiRuleName,
        violateType: this.violateType,
        status: this.status,
        mofDivCodeList: this.codeList,
        mofDivCode: this.mofDivCode || '',
        trackProName: this.trackProName || '',
        roleguid: this.roleguid
      }
      if (this.$store.state.curNavModule.f_FullName.substring(0, 4) === '直达资金') {
        param.regulationClass = '0201'
      }

      const regulationClass = this.transJson(this.$store.state.curNavModule.param5)?.regulationClass
      if (regulationClass) {
        param.regulationClass = regulationClass
      }

      this.tableLoading = true
      api.getMarkData(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          console.log(res.data.results)
          // this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['unIssue'] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getdata() {

    },
    // 生成
    handleCreate() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
      }
      // this.isCreate = true
      // this.detailData = selection
      // this.dialogVisible = true
      // this.dialogTitle = '监控问询单信息'
    },
    onTabPanelBtnClick(obj) { // 按钮点击
      console.log('按钮点击', obj)
      console.log('this.$refs.TestModal.tabCode', this.$refs.TestModal.tabCode)
      this.$refs.TestModal.dialogVisible = true
      console.log('this.$refs.TestModal.tabCode', this.$refs.TestModal.tabCode)
    },
    transJson(str) {
      if (!str) return
      var params = str.split(',')
      var result = {}
      if (params && params.length > 0) {
        for (var i = 0; i < params.length; i++) {
          var map = params[i].split('=')
          result[map[0]] = map[1]
        }
      }
      return result
    },
    // 切换状态栏
    onStatusTabClick(obj) {
      console.log('切换状态栏', obj)
      this.$refs.TestModal.tabCode = obj.code
      this.getdata()
      this.loadConfig()
    },
    getViolationType() {
      let params = {
        page: 1,
        size: 99999
      }
      api.queryViolationType(params).then(res => {
        if (res.code === '000000') {
          res.data.results.map(v => {
            v.value = v.code
            v.label = v.name
          })
          this.queryConfig[2].itemRender.options = res.data.results
        }
      })
    },
    getCount() {
      let param = {
        // isUnit: this.transJson(this.$store.state.curNavModule.param5).retroact,
        roleId: this.$store.state.curNavModule.roleguid
      }
      // if (this.$store.state.curNavModule.f_FullName.substring(0, 4) === '直达资金') {
      //   param.regulationClass = '0201'
      // }

      const regulationClass = this.transJson(this.$store.state.curNavModule.param5)?.regulationClass
      if (regulationClass) {
        param.regulationClass = regulationClass
      }

      api.getCount(param).then(res => {
        if (res.code === '000000') {
          // 主管处室
          // this.tabStatusNumConfig['dcl'] = res.data.dcl
          // this.tabStatusNumConfig['yxf'] = res.data.yxf
          // this.tabStatusNumConfig['dsh'] = res.data.dsh
          // this.tabStatusNumConfig['yth'] = res.data.yth
          // this.tabStatusNumConfig['rdzc'] = res.data.rdzc
          // this.tabStatusNumConfig['yzg'] = res.data.yzg
          // // 单位
          // this.tabStatusNumConfig['dhs'] = res.data.dhs
          // this.tabStatusNumConfig['dcszg'] = res.data.dcszg
          // this.tabStatusNumConfig['csysh'] = res.data.csysh
          // this.tabStatusNumConfig['bth'] = res.data.bth
        }
      })
    },
    check() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length === 0) {
        this.$message.warning('请选择数据')
        return
      }
      this.tableLoading = true
      HttpModule.check(selection[0].dealNo).then(res => {
        this.tableLoading = false
        if (res.code === '66020026') {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 打印
    print() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      const params = {
        dealNo: selection[0].dealNo
      }
      this.tableLoading = true
      HttpModule.getReport(params).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.fileGuid = res.data
          this.filePreviewDialogVisible = true
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cellStyle({ row, rowIndex, column }) {
      if (['warnLevel'].includes(column.property)) {
        switch (row.warnLevel) {
          case 3:
            return {
              color: '#BBBB00'
            }
          case 2:
            return {
              color: 'orange'
            }
          case 1:
            return {
              color: 'red'
            }
          case 4:
            return {
              color: 'blue'
            }
          case 5:
            return {
              color: 'gray'
            }
          default:
            break
        }
      }
    },
    async loadConfig() {
      let params = {
        tableId: {
          id: '266A441A752222ECA9A7B8F0F910FFFC',
          fiscalyear: this.userInfo.year,
          mof_div_code: this.userInfo.province,
          // menuguid: this.$store.state.curNavModule.guid,
          menuguid: '266A441A752222ECA9A7B8F0F910FFFC',
          userguid: ''
        }
      }
      let configQueryData = await this.loadBsConfig(params)
      this.tableColumnsConfig = configQueryData.itemsConfig
    }
  },
  mounted() {

  },
  created() {
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.roleId = this.$store.state.curNavModule.roleguid
    console.log(77, this.$store.state.curNavModule)
    this.param5 = this.transJson(this.$store.state.curNavModule.param5)
    // 动态控制是否展示树
    // this.setShowBusinesTree()
    // this.queryTableDatas()
    // this.initButtons(this.param5)
    // this.getViolationType()
    // this.getAgency()
    // this.getCount()
  }
}
</script>
<style >
/* .createProcessing .radio-right{
float: right;
}
.createProcessing .Titans-table ::v-deep  .vxe-body--row.row-yellow {
  background-color: yellow;
  color: #fff;
}
.createProcessing .Titans-table ::v-deep  .vxe-body--row.row-blue {
  background-color: blue;
  color: #fff;
}
.createProcessing .Titans-table ::v-deep  .vxe-body--row.row-red {
  background-color: red;
  color: #fff;
}
 .createProcessing .unit-tree-main .el-tree-node__content .custom-node-bg{
  background-color: transparent !important;
} */

</style>
