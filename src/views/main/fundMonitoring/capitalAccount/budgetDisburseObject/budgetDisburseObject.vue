<!-- 直达资金项目库 -->
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
            @itemChange="itemChange"
          />
        </div>
      </template>
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="treeTypeConfig"
          @onChangeInput="changeInput"
          @onAsideChange="asideChange"
        />
        <BsBossTree
          v-if="isSx"
          ref="leftTree"
          :defaultexpandedkeys="['B99903EABA534E01AFB5E4829A5A0054', '1DB3224A3EDC4227BE18604A99D6507D']"
          style="overflow: hidden"
          :is-server="false"
          :ajax-type="treeAjaxType"
          :server-uri="treeServerUri"
          :datas="treeData"
          :footer-config="tableFooterConfig"
          :queryparams="treeQueryparams"
          :global-config="treeGlobalConfig"
          :clickmethod="onClickmethod"
        />
        <BsTree
          v-else
          ref="leftTree"
          open-loading
          :config="leftTreeConfig"
          :tree-data="treeData"
          :filter-text="treeGlobalConfig.inputVal"
          @onNodeClick="onClickmethod"
        />
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          :footer-config="tableFooterConfig"
          :table-global-config="!isSx ? tableGlobalConfigCop : {}"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :default-money-unit="10000"
          :title="menuName"
          :pager-config="mainPagerConfig"
          :cell-style="!isSx ? cellStyle : {}"
          :toolbar-config="tableToolbarConfig"
          :export-modal-config="{ fileName: menuName }"
          :formula-digits="1"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
          @switchMoneyUnit="switchMoneyUnit"
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
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <!-- <AddDialog
      v-if="dialogVisible"
      :title="dialogTitle"
    /> -->
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
    <DetailDialog
      v-if="detailVisible"
      :title="detailTitle"
      :detail-type="detailType"
      :detail-data="detailData"
      :detail-query-param="detailQueryParam"
    />
    <vxe-modal
      v-if="projectVisible"
      v-model="projectVisible"
      width="100%"
      height="90%"
      :title="projectTitle"
      :show-footer="false"
    >
      <iframe :src="frameSrc" style="height:100%; width:100%;margin:0;border:0;"> </iframe>

    </vxe-modal>

  </div>
</template>

<script>
import { proconf } from './budgetDisburseObject'
import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
// import AddDialog from './children/addDialog'
// import HttpModule from '@/api/frame/main/Monitoring/WarningDetailsByCompartment.js'
import regionMixin from '../mixins/regionMixin'
import DetailDialog from '../children/xmdetailDialog.vue'
export default {
  mixins: [regionMixin],
  computed: {
    isSx() {
      return this.$store.getters.isSx
    },
    tableGlobalConfigCop() {
      let dataType = this.transJson(this.$store.state.curNavModule.param5 || '').exportModalDefaultSelect || 'fullData'
      return {
        customExportConfig: {
          ...this.tableGlobalConfig.customExportConfig,
          dataType,
          fileName: this.menuName
        }
      }
    }
  },
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
      detailVisible: false,
      detailData: [],
      projectVisible: false,
      projectTitle: '',
      frameSrc: '',
      // BsQuery 查询栏
      caliberDeclareContent: '', // 口径说明
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      radioShow: true,
      codeList: [],
      breakRuleVisible: false,
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
      treeQueryparams: this.isSx ? { elementcode: 'admdiv', province: '610000000', year: '2021', wheresql: 'and code like \'' + 61 + '%\'' } : { elementCode: 'admdiv', province: this.$store.state.userInfo.province, year: this.$store.state.userInfo.year, wheresql: 'and province =' + this.$store.state.userInfo.province },
      // treeServerUri: 'pay-clear-service/v2/lefttree',
      treeServerUri: '',
      treeAjaxType: 'get',
      leftTreeVisible: true,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: [
          {
            type: 'button',
            label: '待下发',
            code: 'unIssue',
            iconName: 'base-daiban.png',
            iconNameActive: 'base-daiban-active.png'
          },
          {
            type: 'button',
            label: '已下发',
            code: 'issued',
            iconName: 'base-zhibaio.png',
            iconNameActive: 'base-zhibaio-active.png'
          }
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
      tableGlobalConfig: {
        customExportConfig: {
          addUnitColumn: true,
          addReportTitleColumn: true,
          unit: '万元'
        }
      },
      tableLoading: false,
      tableColumnsConfig: this.isSx ? proconf.PoliciesTableColumns : proconf[`PoliciesTableColumns${this.transJson(this.$store?.state?.curNavModule?.param5)?.isCity ? 'City' : ''}`],
      // tableData: [],
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
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableConfig: proconf.tableConfig,
      // 表格尾部合计配置
      tableFooterConfig: {
        totalObj: {
          amountYszje: 0,
          amountYszyap: 0,
          amountYssnjap: 0,
          amountYssjap: 0,
          amountYsxjap: 0,
          amountZczje: 0,
          amountZczyap: 0,
          amountZcsnjap: 0,
          amountZcsjap: 0,
          amountZcxjap: 0
        },
        combinedType: ['switchTotal'],
        showFooter: this.isSx
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
      regulationclass: '',
      firulename: '',
      tableData: [],
      mofDivCode: '610000000',
      fiscalYear: '',
      speTypeName: '',
      trackProName: '',
      expFuncCodeName: '',
      proName: '',
      agencyCodeName: '',
      hqlm: '',
      endTime: '',
      leftTreeConfig: { // 左侧单位树配置
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 0, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: this.isSx ? ['code', 'name', 'id'] : ['code', 'name', 'id', 'codeFragment'],
        format: '{code}-{name}',
        placeholder: '请选择',
        codeList: [],
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: this.isSx ? '{label}' : '{code}-{name}', // {code}-{name}
          nodeKey: 'code', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      }
    }
  },
  mounted() {
  },
  methods: {
    cellClick(obj, context, e) {
      if (this.isSx) {
        return
      }
      if (this.$store.state.userInfo.province?.slice(0, 4) === '3502') {
        return
      }
      const rowIndex = obj?.rowIndex
      if (!rowIndex) return
      let key = obj.column.property
      console.info('transJson==' + this.transJson(this.$store?.state?.curNavModule?.param5)?.linkFiscal)
      // 无效的cellValue
      let linkFiscal = (this.transJson(this.$store?.state?.curNavModule?.param5)?.linkFiscal !== null || this.transJson(this.$store?.state?.curNavModule?.param5)?.linkFiscal !== undefined)
        ? this.transJson(this.$store.state.curNavModule.param5).linkFiscal : false
      // 无效的cellValue
      const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      if (obj.column.property !== 'proName' && isInvalidCellValue) return
      if (!linkFiscal && obj.column.property === 'proName') return
      switch (key) {
        case 'amountYszyap':
          this.handleDetail('zdzjxmtz_ysmx', '1', obj.row.mofdivcode, obj.row.proCode, obj.row.proName, obj.row.agencyCode, obj.row.agencyName, obj.row.speTypeCode, obj.row.speTypeName, key)
          this.detailTitle = '预算明细'
          break
        case 'amountZczyap':
          this.handleDetail('zdzjxmtz_zcmx', '1', obj.row.mofdivcode, obj.row.proCode, obj.row.proName, obj.row.agencyCode, obj.row.agencyName, obj.row.speTypeCode, obj.row.speTypeName, key)
          this.detailTitle = '支出明细'
          break
        case 'proName':
          this.projectTitle = '项目明细'
          // this.projectVisible = true
          let url = this.getFiscalServer(obj.row.proCode) + '/#/PersonProject/DirectProjectDetail' +
            '?tokenid=' + this.$store.getters.getLoginAuthentication.tokenid +
            '&appguid=fiscal&guid=' + obj.row.guid + '&mofDivCode=' + obj.row.mofDivCode +
            '&fiscalYear=' + obj.row.fiscalYear + '#/'
          // console.info(url)
          window.open(url, '_blank')
          // this.frameSrc = url
          break
      }
    },
    // 根据项目编码获取分堆地址
    getFiscalServer(proCode) {
      let key = proCode.substring(0, 4)
      switch (key) {
        case '3500':
        case '3503':
        case '3507':
          return '/fiscal1'
        case '3501':
        case '3504':
        case '3508':
          return '/fiscal2'
        case '3505':
        case '3506':
        case '3509':
          return '/fiscal3'
        default:
          return '/fiscal1'
      }
    },
    cellStyle({ row, rowIndex, column }) {
      if (this.isSx) {
        return
      }
      if (!rowIndex) return
      // 有效的cellValue
      console.info('transJson==' + this.transJson(this.$store?.state?.curNavModule?.param5)?.linkFiscal)
      let linkFiscal = (this.transJson(this.$store?.state?.curNavModule?.param5)?.linkFiscal !== null || this.transJson(this.$store?.state?.curNavModule?.param5)?.linkFiscal !== undefined)
      const validCellValue = (row[column.property] * 1)
      if (column.property !== 'proName' && !validCellValue) return
      if (!linkFiscal && column.property === 'proName') return
      // console.log(column.property)
      // if (['amountYszje','amountYszyap', 'amountYssnjap', 'amountYssjap', 'amountYsxjap',
      // 'amountZczje','amountZczyap', 'amountZcsnjap', 'amountZcsjap', 'amountZcxjap' ].includes(column.property)) {
      if (['amountYszyap', 'amountZczyap', 'proName'].includes(column.property)) {
        // if (['proName'].includes(column.property)) {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    },
    handleDetail(reportCode, budgetLevelCode, mofDivCode, proCode, proName, agencyCode, agencyName, speTypeCode, speTypeName, column) {
      let condition = ''

      switch (column) {
        case 'amountSnjxjfp':
          // condition = 'substr(mof_div_code,3,7) = \'0000000\'  '
          break
        case 'amountSxjfp':
        // condition = ' substr(mof_div_code,5,5) <> \'00000\' and substr(mof_div_code,7,3)=\'000\' '
      }
      this.detailQueryParam = {
        condition: condition,
        reportCode: reportCode,
        fiscalYear: this.searchDataList.fiscalYear === '' ? this.$store.state.userInfo.curyear : this.searchDataList.fiscalYear,
        endTime: this.endTime,
        hqlm: this.hqlm,
        iscz: this.transJson(this.params5)?.iscz || false, // 菜单参照直达标识
        mofDivCodes: this.codeList,
        proCodes: this.proCodes === '' ? [] : this.proCodes,
        budgetLevelCode: budgetLevelCode,
        mofDivCode: mofDivCode,
        proCode: proCode,
        // proName: proName,
        agencyCode: agencyCode,
        // agencyName: agencyName,
        speTypeCode: speTypeCode,
        // speTypeName: speTypeName,
        expFuncCodes: this.expFuncCodes === '' ? [] : this.expFuncCodes,
        manageMofDeps: this.manageMofDeps === '' ? [] : this.manageMofDeps
      }
      this.detailType = reportCode
      this.detailVisible = true
    },
    switchMoneyUnit(level) {
      this.tableGlobalConfig.customExportConfig.unit = level === 1 ? '元' : '万元'
    },
    search(obj) {
      if (this.isSx) {
        console.log(obj)
        this.searchDataList = obj
        this.fiscalYear = obj.fiscalYear
        this.trackProName = obj.trackProName
        this.expFuncCodeName = obj.expFuncCodeName
        this.proName = obj.proName
        this.hqlm = obj.hqlm
        this.endTime = obj.endTime
        this.agencyCodeName = obj.agencyCodeName
        this.proCodes = obj.proCodes
        this.queryTableDatas()
      // this.queryTableDatasCount()
      } else {
        console.log(obj)
        this.searchDataList = obj
        this.fiscalYear = obj.fiscalYear ? this.$store.state.userInfo.year : obj.fiscalYear
        this.speTypeName = obj.speTypeName
        this.expFuncName = obj.expFuncName
        this.proName = obj.proName
        this.hqlm = obj.hqlm
        this.endTime = obj.endTime
        this.proCodes = obj.proCodes_code__multiple
        this.expFuncCodes = obj.expFuncCodes_code__multiple
        this.manageMofDeps = obj.manageMofDeps_code__multiple
        this.queryTableDatas()
      // this.queryTableDatasCount()
      }
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
    deleteList() {
      // let datas = this.$refs.mainTableRef.getSelectionData()
      // if (datas.length === 0) {
      //   this.$message.warning('请选择数据')
      //   return
      // }
      // let arr = []
      // datas.forEach(res => {
      //   arr.push(res.regulationCode)
      // })
      // HttpModule.delete(arr).then(res => {
      //   if (res.code === '000000') {
      //     this.$message.warning('删除成功')
      //     this.queryTableDatas()
      //     // this.queryTableDatasCount()
      //   }
      // })
    },
    changeData(val) {
      // HttpModule.getDetailData(val).then(res => {
      //   if (res.code === '000000') {
      //     this.DetailData = res.data
      //     this.dialogVisible = true
      //     this.dialogTitle = '修改'
      //   }
      // })
    },
    getDetail(val) {
      // HttpModule.getDetailData(val).then(res => {
      //   if (res.code === '000000') {
      //     this.DetailData = res.data
      //     this.dialogVisible = true
      //     this.dialogTitle = '查看详情'
      //   }
      // })
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      let datas3 = this.$refs.mainTableRef.getSelectionData()
      let regulationCodes = []

      switch (obj.code) {
        // 新增
        case 'add':
          this.onAddToolbarClickAdd(obj, context, e)
          break
        // 送审
        case 'approval':
          if (datas3.length === 0) {
            this.$message.warning('请选择数据')
            return
          }
          for (let i = 0; i < datas3.length; i++) {
            regulationCodes.push(datas3[i].regulationCode)
          }
          // this.auditByCheck(obj, context, e)// 经过监控的送审
          this.audieData({ operate: 1, regulationCodes: regulationCodes })
          break
        // 撤销
        case 'revoke':
          if (datas3.length === 0) {
            this.$message.warning('请选择数据')
            return
          }
          for (let i = 0; i < datas3.length; i++) {
            regulationCodes.push(datas3[i].regulationCode)
          }
          // this.auditByCheck(obj, context, e)// 经过监控的送审
          this.audieData({ operate: 3, regulationCodes: regulationCodes })
          break
        // 查看
        case 'check':

          if (datas3.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          // this.cancelCheck()
          let datas = this.$refs.mainTableRef.getSelectionData()
          if (datas.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.getDetail(datas[0].regulationCode)
          break
        // 修改
        case 'change':
          let datas2 = this.$refs.mainTableRef.getSelectionData()
          if (datas2.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.changeData(datas2[0].regulationCode)
          break
        // 删除
        case 'del':
          this.deleteList()
          break
        // 全量监控
        case 'monitor':
          // this.doDiscard(obj, context, e)
          break
        // // 刷新
        // case 'add-toolbar-refresh':
        //   this.refresh()
        //   break
        // // 刷新
        // case 'operation-toolbar-refresh':
        //   this.refresh()
        //   break
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
          this.refresh()
          break
      }
    },
    // 左侧树
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
    },
    onClickmethod(node) {
      if (this.isSx) {
        // if (node.children !== null && node.children.length !== 0 && node.id !== '0') {
        //   return
        // }
        let code = node.code
        this.codeList = []
        console.log('node', node)
        // let treeData = node.treeData
        this.getItem(code, this.treeData)
        if (node.id !== '0') {
        // this.mofdivcode = node.code
        } else {
          this.condition = {}
        }
        this.queryTableDatas()
      } else {
        let code = node.node.code
        this.codeList = []
        let treeData = node.treeData
        // 非顶级区划则获取区划code，否则查询表体数据时codeList为空进行查询
        if (code !== node.treeData?.[0].code) {
          this.getItem(code, treeData)
        }
        if (node.id !== '0') {
          this.mofdivcode = node.node.code
        } else {
          this.mofdivcode = {}
        }
        this.queryTableDatas()
      }
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
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.queryTableDatas()
      // this.queryTableDatasCount()
    },
    getManageMofDep() {
      HttpModule.getManageMofDepTreeData().then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getChildrenNewData1(res.data)
          this.queryConfig[1].itemRender.options = treeResdata
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getPro(fiscalYear = this.$store.state.userInfo?.year) {
      if (this.isSx) {
        HttpModule.getProTreeData().then(res => {
          if (res.code === '000000') {
            console.log('data', res.data)
            let treeResdata = this.getChildrenNewData1(res.data)
            this.queryConfig[1].itemRender.options = treeResdata
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        HttpModule.getProTreeData({ fiscalYear }).then(res => {
          if (res.code === '000000') {
            let treeResdata = this.getChildrenNewData1(res.data)
            this.queryConfig[2].itemRender.options = treeResdata
          } else {
            this.$message.error(res.message)
          }
        })
      }
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
    getExcFunc() {
      HttpModule.getExpFuncTreeData().then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getChildrenNewData1(res.data)
          this.queryConfig[3].itemRender.options = treeResdata
        } else {
          this.$message.error(res.message)
        }
      })
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
    getTrees(val) {
      let proCodes = []
      if (val.trim() !== '') {
        val.split(',').forEach((item) => {
          proCodes.push(item.split('##')[0])
        })
      }
      return proCodes
    },
    // 查询 table 数据
    queryTableDatas() {
      if (this.isSx) {
        const param = {
          page: this.mainPagerConfig.currentPage, // 页码
          pageSize: this.mainPagerConfig.pageSize, // 每页条数
          fiscalYear: this.searchDataList.fiscalYear,
          reportCode: this.$store.state.curNavModule.name === '参照直达资金项目台账' ? 'czzdzjxmtz' : 'zdzjxmtz',
          // mofDivCode: this.mofDivCode, // 获取左侧树
          trackProName: this.trackProName,
          expFuncCodeName: this.expFuncCodeName,
          proName: this.proName,
          mofDivCodeList: this.codeList,
          endTime: this.endTime,
          hqlm: this.hqlm,
          agencyCode: this.agencyCodeName === '' ? '' : this.getTrees(this.agencyCodeName)[0],
          iszd: this.$store.state.curNavModule.name === '参照直达资金项目台账' ? 2 : 1, // 菜单参照直达标识
          proCodes: this.searchDataList.proCodes === '' ? [] : this.getTrees(this.searchDataList.proCodes)
        }
        this.tableLoading = true
        HttpModule.querySum(param).then(res => {
          if (res.code === '000000') {
            this.tableFooterConfig.totalObj = res.data[0]
          } else {
            this.$message.error(res.result)
          }
        })
        HttpModule.queryTableDatasPage(param).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.tableData = res.data.results
            this.mainPagerConfig.total = res.data.totalCount
            this.tabStatusNumConfig['1'] = res.data.totalCount
          } else {
            this.$message.error(res.result)
          }
        })
      } else {
        const param = {
          page: this.mainPagerConfig.currentPage, // 页码
          pageSize: this.mainPagerConfig.pageSize, // 每页条数
          fiscalYear: this.searchDataList.fiscalYear === '' ? this.$store.state.userInfo.year : this.searchDataList.fiscalYear,
          mofDivCode: this.mofDivCode, // 获取左侧树
          speTypeName: this.speTypeName,
          expFuncName: this.expFuncName,
          proName: this.proName,
          endTime: this.endTime,
          hqlm: this.hqlm,
          iscz: this.transJson(this.params5)?.iscz || false, // 菜单参照直达标识
          mofDivCodes: this.codeList,
          proCodes: this.proCodes === '' ? [] : this.proCodes,
          expFuncCodes: this.expFuncCodes === '' ? [] : this.expFuncCodes,
          manageMofDeps: this.manageMofDeps === '' ? [] : this.manageMofDeps
        }
        this.tableLoading = true
        HttpModule.xmPageQuery(param).then(res => {
          if (res.code === '000000') {
            if (res.data) {
              this.tableData = res.data.results
              this.mainPagerConfig.total = res.data.totalCount
              this.tabStatusNumConfig['1'] = res.data.totalCount
            }
          } else {
            this.$message.error(res.result)
          }
        }).finally(() => {
          this.tableLoading = false
        })
      }
    },
    queryCaliberDeclareContent(val) {
      const param = {
        reportCode: this.$store.state.curNavModule.name === '参照直达资金项目台账' ? 'czzdzjxmtz' : 'zdzjxmtz'
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
      if (this.isSx) {
        let that = this
        let params = {}
        if (this.userInfo.province.substring(2, 9) === '0000000') {
          params = {
            elementcode: 'admdiv',
            province: this.userInfo.province,
            year: this.userInfo.year,
            wheresql: 'and code like \'' + this.userInfo.province.substring(0, 2) + '%\'' + 'and code not like \'%998\''
          }
        } else if (
          this.userInfo.province.substring(4, 9) === '00000' && this.userInfo.province.substring(2, 9) !== '0000000'
        ) {
          params = {
            elementcode: 'admdiv',
            province: this.userInfo.province,
            year: this.userInfo.year,
            wheresql: 'and code like \'' + this.userInfo.province.substring(0, 4) + '%\'' + 'and code not like \'%998\''
          }
        } else {
          params = {
            elementcode: 'admdiv',
            province: this.userInfo.province,
            year: this.userInfo.year,
            wheresql: 'and code like \'' + this.userInfo.province.substring(0, 6) + '%\'' + 'and code not like \'%998\''
          }
        }
        HttpModule.getTreeData(params).then(res => {
          if (res.rscode === '100000') {
            let treeResdata = that.getChildrenData(res.data)
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
      } else {
        let that = this
        let params = {}
        if (this.userInfo.province === '610000000') {
          params = {
            elementCode: 'admdiv',
            province: '610000000',
            year: this.userInfo.year,
            wheresql: 'and code like \'' + 61 + '%\''
          }
        } else if (
          this.userInfo.province === '610100000' ||
          this.userInfo.province === '610100000' ||
          this.userInfo.province === '610200000' ||
          this.userInfo.province === '610300000' ||
          this.userInfo.province === '610400000' ||
          this.userInfo.province === '610500000' ||
          this.userInfo.province === '610600000' ||
          this.userInfo.province === '610700000' ||
          this.userInfo.province === '610800000' ||
          this.userInfo.province === '610900000' ||
          this.userInfo.province === '611000000' ||
          this.userInfo.province === '611200000'
        ) {
          params = {
            elementCode: 'admdiv',
            province: this.userInfo.province,
            year: this.userInfo.year,
            wheresql: 'and code like \'' + this.userInfo.province.substring(0, 4) + '%\''
          }
        } else {
          params = {
            elementCode: 'admdiv',
            province: this.userInfo.province,
            year: this.userInfo.year,
            wheresql: 'and code like \'' + this.userInfo.province.substring(0, 6) + '%\''
          }
        }
        HttpModule.getTreeData(params).then(res => {
          if (res.data) {
            // let treeResdata = that.getChildrenData(res.data)
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
            that.treeData = res.data
          } else {
            this.$message.error('左侧树加载失败')
          }
        })
      }
    },
    getCzPro() {
      HttpModule.getCzProTreeData().then(res => {
        if (res.code === '000000') {
          console.log('data', res.data)
          let treeResdata = this.getChildrenNewData1(res.data)
          this.queryConfig[1].itemRender.options = treeResdata
        } else {
          this.$message.error(res.message)
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
        this.queryConfig[4].itemRender.options = treeResdata
      })
    },
    isCz() {
      if (this.$store.state.curNavModule.name === '参照直达资金项目台账') {
        this.getCzPro()
      } else {
        this.getPro()
      }
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = this.isSx ? item.text : (item.text || item.name)
        if (item.children) {
          that.getChildrenData(item.children)
        }
      })

      return datas
    }
  },
  created() {
    if (this.isSx) {
      this.searchDataList.endTime = this.$XEUtils.toDateString(
        this.$XEUtils.getWhatDay(new Date(), -1),
        'yyyy-MM-dd'
      )
    }
    console.log('this.$store.state.curNavModule', this.$store.state.curNavModule)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.menuName = this.$store.state.curNavModule.name
    this.params5 = this.$store.state.curNavModule.param5
    if (!this.isSx) {
      this.getPro()
      this.getManageMofDep()
      this.getExcFunc()
    }
    this.getLeftTreeData()
    this.queryTableDatas()
    if (this.isSx) {
      this.getAgency()
      this.isCz()
      this.queryCaliberDeclareContent()
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
