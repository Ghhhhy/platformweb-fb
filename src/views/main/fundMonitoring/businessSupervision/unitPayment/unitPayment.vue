<!--单位支付情况-->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <!--      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>-->
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
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="treeTypeConfig"
          @onChangeInput="(val) => { leftTreeFilterText = val }"
          @onAsideChange="asideChange"
          @onConfrimData="treeSetConfrimData"
        />
        <BsTree
          ref="leftTree"
          open-loading
          :filter-text="leftTreeFilterText"
          :config="leftTreeConfig"
          :tree-data="treeData"
          :default-expanded-keys="['619900000', '619800000']"
          @onNodeClick="onClickmethod"
        />
      </template>
      <template v-slot:mainForm>
        <BsTreeTable
          v-if="!$store.getters.isSx"
          id="1001"
          ref="bsTableRef"
          row-id="id"
          show-zero
          :table-config="tableConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :tree-config="{ dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove', isTreeSeqToFlat: true }"
          :toolbar-config="tableToolbarConfig"
          :pager-config="mainPagerConfig"
          :default-money-unit="10000"
          :cell-style="cellStyle"
          @cellClick="cellClick"
          @onToolbarBtnClick="onToolbarBtnClick"
        >
          <!--口径说明插槽-->
          <template v-if="caliberDeclareContent" v-slot:caliberDeclare>
            <p v-html="caliberDeclareContent"></p>
          </template>
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">单位支付情况(单位:万元)</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTreeTable>
        <BsTable
          v-if="$store.getters.isSx"
          ref="mainTableRef"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="mainPagerConfig"
          :export-modal-config="{ fileName: menuName }"
          :toolbar-config="tableToolbarConfig"
          :default-money-unit="10000"
          @ajaxData="ajaxTableData"
          @onToolbarBtnClick="onToolbarBtnClick"
        >
          <!--口径说明插槽-->
          <template v-if="caliberDeclareContent" v-slot:caliberDeclare>
            <p v-html="caliberDeclareContent"></p>
          </template>
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
      <template v-slot:toolbar-custom-slot>
        <div class="dfr-report-time-wrapper">
          <el-tooltip effect="light" :content="`报表最近取数时间：${reportTime}`" placement="top">
            <div class="dfr-report-time-content">
              <i class="ri-history-fill"></i>
              <span class="dfr-report-time">{{ reportTime }}</span>
            </div>
          </el-tooltip>
        </div>
      </template>
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <!-- <AddDialog
      v-if="dialogVisible"
      :title="dialogTitle"
    /> -->
    <!-- 附件弹框 -->
    <DetailDialog
      v-if="detailVisible"
      :title="detailTitle"
      :detail-type="detailType"
      :detail-data="detailData"
      :detail-query-param="detailQueryParam"
    />
  </div>
</template>

<script>
import { proconf } from './unitPayment'
import HttpModule from '@/api/frame/main/fundMonitoring/unitPayment.js'
import DetailDialog from './children/detailDialog.vue'

// import AddDialog from './children/addDialog'
// import HttpModule from '@/api/frame/main/Monitoring/WarningDetailsByCompartment.js'
export default {
  components: {
    DetailDialog
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      reportTime: '', // 拉取支付报表的最新时间
      // BsQuery 查询栏
      caliberDeclareContent: '', // 口径说明
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      radioShow: true,
      breakRuleVisible: false,
      codeList: [],
      leftTreeFilterText: '',
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
      treeTypeConfig: {
        curRadio: 'AGENCY'
      },
      treeGlobalConfig: {
        inputVal: ''
      },
      detailVisible: false,
      treeQueryparams: this.$store.getters.treeQueryparamsCom,
      // treeServerUri: 'pay-clear-service/v2/lefttree',
      treeServerUri: '',
      treeAjaxType: 'get',
      leftTreeVisible: true,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: [
        ],
        curButton: {
          label: '待下发',
          code: 'unIssue',
          type: 'button'
        },
        buttonsInfo: {
          'unIssue': [
            {
              label: '生成',
              code: 'create',
              status: 'primary'
            }
          ],
          'issued': [
          ]
        }
      },
      buttonsInfo: proconf.statusRightToolBarButtonByBusDept,
      tabStatusNumConfig: {
        '1': 2,
        '2': 0,
        '3': 0
      },
      isShowQueryConditions: true,
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
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
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
      leftNode: {},
      regulationStatus: '1',
      mainPagerConfig: {
        autoHidden: true,
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableConfig: {
      },
      tableFooterConfig: {
        totalObj: {
          amount: 0,
          payAppAmt: 0
        },
        combinedType: ['switchTotal'],
        showFooter: this.$store.getters.isSx
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '新增',
      addTableData: [],
      // 请求 & 角色权限相关配置
      menuName: '系统级监控规则',
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
      handleType: '',
      isEnable: '',
      regulationType: '',
      warningLevel: '',
      DetailData: {},
      fiscalYear: this.$store.state.userInfo.year,
      mofDivCode: '',
      leftTreeConfig: { // 左侧单位树配置
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 0, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'],
        format: '{code}-{name}',
        placeholder: '请选择',
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '{label}', // {code}-{name}
          nodeKey: 'code', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true,
        detailTitle: '',
        detailType: '',
        detailData: '',
        detailQueryParam: []
      },
      agencyIdList: [],
      bgtMofDepIdList: [],
      agencyCodeName: '',
      manageMofDepCodeName: ''
    }
  },
  mounted() {
  },
  methods: {
    search(obj) {
      console.log(obj)
      this.agencyIdList = obj.agencyCodeList_id__multiple
      this.bgtMofDepIdList = obj.manageMofDepCodeList_id__multiple
      this.searchDataList = obj
      this.fiscalYear = obj.fiscalYear
      this.agencyCodeName = obj.agencyCodeName
      this.manageMofDepCodeName = obj.manageMofDepCodeName
      this.queryTableDatas()
      // this.queryTableDatasCount()
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
      console.log(obj)
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.code) {
        // 全部
        case 'check':

          break
      }
      this.regulationStatus = obj.curValue
      this.queryTableDatas()
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)

      switch (obj.code) {
        case 'del':
          break
        // 全量监控
        case 'monitor':
          break
        default:
          break
      }
    },
    changeVisible(val) {
      console.log(val, '输出')
      this.breakRuleVisible = val
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.$confirm('重新加载数据可能需要等待较长时间，确认继续？', '操作确认提示', {
            type: 'warning'
          }).then(() => {
            this.refresh(true)
          })
          break
      }
    },
    // 左侧树
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
    },
    onClickmethod(node) {
      let code = node.node.code
      this.codeList = []
      let treeData = node.treeData
      this.getItem(code, treeData)
      if (node.id !== '0') {
        this.mofdivcode = node.node.code
      } else {
        this.condition = {}
      }
      this.queryTableDatas()
    },
    getItem(code, data) {
      data.forEach(item => {
        if (code === item.code) {
          let data = []
          data.push(item)
          this.getCodeList(data)
        } else if (item.children) {
          this.getItem(code, item.children)
        }
      })
    },
    getCodeList(data) {
      data.forEach(item => {
        this.codeList.push(item.code)
        if (item.children) {
          this.getCodeList(item.children)
        }
      })
    },
    treeSetConfrimData(curTree) {
      this.treeQueryparams.elementCode = curTree.code
      this.$refs.leftTree.refreshTree()
    },
    asideChange() {
      this.leftTreeVisible = false
    },
    // 查看附件
    showAttachment(row) {
      this.billguid = row.attachment_id
      this.showAttachmentDialog = true
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      if (this.$store.getters.isSx) return
      if (obj.row.hasChild) return
      switch (key) {
        case 'agencyCodeName':
          this.handleDetail('dwzfmx', obj)
          this.detailTitle = '单位支付明细（单位：万元）'
          break
      }
    },
    cellStyle({ row, column }) {
      if (!row.hasChild && ['agencyCodeName'].includes(column.property)) {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh(isFlush = true) {
      this.queryTableDatas(isFlush)
      // this.queryTableDatasCount()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    // 新增或修改弹框
    clickAddBtn(row) {
      // if (this.addTableData.length > 0) {
      //   this.addTableData = []
      // }
      this.dialogTitle = '新增'
      // this.addTableData.push(row)
      this.dialogVisible = true
    },
    // 点击新增
    onAddToolbarClickAdd(obj, context, e) {
      // let row = []
      // row = this.$refs.mainTableRef.getSelectionData()[0]
      // if (this.$refs.mainTableRef.getSelectionData().length !== 1) {
      //   this.$message.warning('请选择一条数据')
      //   return
      // }
      // this.addTableData = this.$refs.mainTableRef.getSelectionData()
      this.dialogVisible = true
      // this.selectSumId = this.$refs.mainTableRef.getSelectionData()[0].sum_id
      this.dialogTitle = '新增'
    },
    eachTree(treeData, parentId, level) {
      treeData.forEach(item => {
        item.id = item.id || this.$XEUtils.uniqueId('tree_row_')
        item.agencyCodeName = item.agencyCodeName !== null ? item.agencyCodeName : `${item.agencyCode}-${item.agencyName}`
        item.level = level
        item['parentId'] = parentId
        if (item?.children) this.eachTree(item.children, item.id, item.level + 1)
      })
    },
    handleDetail(reportCode, obj) {
      let params = {
        reportCode: reportCode,
        mofDivCode: this.codeList ? this.codeList[0] : '', // 单位区划没传入
        // mofDivCodeList: obj.row.code,
        fiscalYear: this.searchDataList.fiscalYear,
        agencyCode: obj.row.agencyCode,
        endTime: this.condition.endTime ? this.condition.endTime[0] : '',
        pageSize: this.pagerConfig.pageSize,
        page: this.pagerConfig.currentPage
      }
      this.detailQueryParam = params
      this.detailType = reportCode
      this.detailVisible = true

      // this.tableLoading = true
      // HttpModule.queryTableDatas(params).then((res) => {
      //   this.tableLoading = false
      //   if (res.code === '000000') {
      //     this.detailData = res.data
      //     this.detailType = type
      //   } else {
      //     this.$message.error(res.message)
      //   }
      // })
    },
    // 查询 table 数据
    queryTableDatas(isFlush = true) {
      const param = {
        isFlush,
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        reportCode: 'dwzfqk',
        fiscalYear: this.fiscalYear,
        mofDivCodeList: this.codeList,
        agencyCode: '',
        agencyName: ''
      }
      let queryUrl = 'queryTableDatas'
      if (this.$store.getters.isSx) {
        delete param.agencyCode
        delete param.agencyName
        param.agencyCodeName = this.agencyCodeName
        param.agencyIdList = this.agencyIdList
        param.bgtMofDepIdList = this.bgtMofDepIdList
        param.manageMofDepCodeName = this.manageMofDepCodeName
        queryUrl = 'queryTableDatasPage'
        HttpModule.querySum(param).then(res => {
          if (res.code === '000000') {
            this.tableFooterConfig.totalObj = res.data?.data[0]
          } else {
            this.$message.error(res.message)
          }
        })
      }
      HttpModule[queryUrl](param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          if (this.$store.getters.isSx) {
            this.tableData = res.data.results
          } else {
            const rows = res.data?.data || []
            if (Array.isArray(rows)) {
              // 给数据添加属性： treeTable需要的数据需要有特殊属性parentId、level
              this.eachTree(rows, '', 1)
              // 将树形结构转数组
              this.tableData = this.$XEUtils.toTreeArray(rows)
            }
            this.reportTime = res.data.reportTime || ''
            this.caliberDeclareContent = res.data.description || ''
          }
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    queryCaliberDeclareContent(val) {
      const param = {
        reportCode: 'dwzfqk'
      }
      this.tableLoading = true
      HttpModule.queryCaliberDeclareContent(param).then((res) => {
        if (res.code === '000000') {
          this.caliberDeclareContent = res.data || ''
        } else {
          this.$message.error(res.message)
        }
      })
    },
    loadChildrenMethod ({ row }) {
      // 异步加载子节点
      return new Promise(resolve => {
        setTimeout(() => {
          const param = {
            page: this.mainPagerConfig.currentPage, // 页码
            pageSize: this.mainPagerConfig.pageSize, // 每页条数
            reportCode: 'dwzfqk',
            fiscalYear: this.fiscalYear,
            mofDivCodeList: this.codeList,
            agencyCode: row.agencyCode,
            agencyName: row.agencyName
          }
          if (this.$store.getters.isSx) {
            delete param.agencyCode
            delete param.agencyName
            param.reportCode = 'dwzfqk_dw'
            param.manageMofDepCode = row.manageMofDepCode
            param.manageMofDepName = row.manageMofDepName
          }
          HttpModule.queryTableDatas(param).then(res => {
            if (res.code === '000000') {
              let childs = res.data.data
              if (this.$store.getters.isSx) {
                childs = res.data
              }
              resolve(childs)
            } else {
              this.$message.error(res.result)
            }
          })
        }, 500)
      })
    },
    // 操作日志
    queryActionLog(row) {
      // let data = {
      //   roleguid: this.$store.state.curNavModule.roleguid,
      //   data: {
      //     statusCode: this.toolBarStatusSelect.code,
      //     id: row.id,
      //     appId: 'pay_voucher'
      //   }
      // }
      // HttpModule.queryActionLog(data).then(res => {
      //   this.logData = res.data
      //   console.log(this.logData)
      //   this.showLogView = true
      // })
    },
    // 送审
    audieData(param) {
      // HttpModule.audieData(param).then(res => {
      //   if (res.code === '000000') {
      //     this.$message.warning('操作成功')
      //     this.queryTableDatas()
      //   }
      // })
    },
    getLeftTreeData() {
      this.treeQueryparams.elementCode = this.treeQueryparams.elementCode ? this.treeQueryparams.elementCode : this.treeQueryparams.elementcode
      console.log('this.treeQueryparams.elementCode:', this.treeQueryparams.elementCode)
      HttpModule.getTreeData(this.treeQueryparams).then(res => {
        if (res.data) {
          let treeResdata = this.getChildrenData(res.data)
          // treeResdata.forEach(item => {
          //   item.label = item.id + '-' + item.businessName
          // })
          // const result = [
          //   {
          //     id: 'root',
          //     label: '全部',
          //     code: 'root',
          //     isleaf: '0',
          //     children: treeResdata
          //   }
          // ]
          this.treeData = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getAgency() {
      const param = {
        wheresql: 'and province =' + this.$store.state.userInfo.province,
        elementCode: 'AGENCY',
        // elementCode: 'AGENCY',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province
      }
      HttpModule.getTreewhere(param).then(res => {
        let treeResdata = this.getChildrenNewData1(res.data)
        this.queryConfig[1].itemRender.options = treeResdata
      })
    },
    getDep() {
      const param = {
        elementCode: 'hold6',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province,
        wheresql: 'and code != \'00\''
      }
      HttpModule.getTreewhere(param).then(res => {
        let treeResdata = this.getChildrenNewData1(res.data)
        this.queryConfig[2].itemRender.options = treeResdata
      })
    },
    getChildrenNewData1(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })
      return datas
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text || item.name
        if (item.children) {
          that.getChildrenData(item.children)
        }
      })

      return datas
    }
  },
  created() {
    console.log('this.$store.state.curNavModule', this.$store.state.curNavModule)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.menuName = this.$store.state.curNavModule.name
    this.getLeftTreeData()
    this.queryTableDatas()
    if (this.$store.getters.isSx) {
      this.queryCaliberDeclareContent()
      this.getAgency()
      this.getDep()
      this.tableColumnsConfig = this.tableColumnsConfig.filter(item => {
        return item.key !== 'project'
      })
    } else {
      this.tableColumnsConfig = this.tableColumnsConfig.filter(item => {
        return item.key !== 'sx'
      })
      this.queryConfig = this.queryConfig.filter(item => {
        let notShowField = ['agencyCodeList', 'manageMofDepCodeList']
        return !notShowField.includes(item.field)
      })
    }
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
