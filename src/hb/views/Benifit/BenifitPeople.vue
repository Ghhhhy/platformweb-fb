<!--支付数据规范性检查-->
<template>
  <div v-loading="pageLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
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
          ref="leftTree"
          open-loading
          :is-checkbox="false"
          :defaultexpandedkeys="['0']"
          style="overflow: hidden"
          :is-server="false"
          :datas="treeData"
          ajax-type="get"
          server-uri="pay-voucher-service/v2/benefit/action/getPro"
          :queryparams="treeQueryparams"
          :global-config="treeGlobalConfig"
          :clickmethod="onClickmethod"
        />
      </template>
      <template v-slot:mainForm>
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
          :loading="tableLoading1"
          :style="tableHeight"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="mainPagerConfig"
          :toolbar-config="tableToolbarConfig"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick('detail')"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>
              <div class="table-toolbar-left-title">
                <span class="fn-inline">惠民支付明细数据</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig1"
            :query-form-data="searchDataList1"
            @onSearchClick="search1"
          />
        </div>
        <BsTable
          ref="mainTableRef1"
          :loading="tableLoading2"
          :style="tableHeight"
          :footer-config="tableFooterConfig1"
          :table-columns-config="tableColumnsConfig1"
          :table-data="tableData1"
          :table-config="tableConfig1"
          :pager-config="mainPagerConfig1"
          :toolbar-config="tableToolbarConfig1"
          @onToolbarBtnClick="onToolbarBtnClick1"
          @ajaxData="ajaxTableData1"
          @cellClick="cellClick('cert')"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>
              <div class="table-toolbar-left-title">
                <span class="fn-inline">支付凭证信息</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <vxe-modal
      v-model="showImportError"
      height="70%"
      title="导入提示"
      resize
      width="80%"
      @close="cancelDialogClose"
    >
      <p style="color: red">以下数据格式错误，请检查后重新导入！</p>
      <div v-if="valiRule.length > 0" style="margin-left:17px;margin-top:10px;font-size:14px">
        <p v-for="(item, index) in valiRule" :key="index" style="margin:5px 0;">
          {{ item }}
          <el-divider style="color:#E7EBF0" />
        </p>
      </div>
    </vxe-modal>

  </div>
</template>

<script>
import { proconf } from './benifitPeople'
import HttpModule from '@/hb/api/BenifitPeople/index.js'
import utils from './util.js'
import { Export } from '@/components/Table/export/export/export.js'
export default {
  components: {},
  computed: {
    tableHeight() {
      return this.isShowQueryConditions ? { height: '40%' } : { height: '48%' }
    }
  },
  watch: {
    queryConfig(newVal, oldVal) {
      if (newVal && newVal.length > 0) {
        this.searchDataList = utils.initHightSearch(this.queryConfig)
      }
    },
    queryConfig1(newVal, oldVal) {
      if (newVal && newVal.length > 0) {
        this.searchDataList1 = utils.initHightSearch(this.queryConfig1)
      }
    }
  },
  data() {
    return {
      // 左侧树过滤值
      treeFilterText: '',
      importModalVisible: false, // 导入弹框
      // BsQuery 查询栏
      queryConfig: [],
      queryConfig1: [],
      searchDataList: {},
      searchDataList1: {},
      breakRuleVisible: false,
      treeData: [],
      treeTypeConfig: {
        curRadio: 'pro'
      },
      treeGlobalConfig: {
        inputVal: ''
      },
      treeQueryparams: {
        elementcode: 'pro'
      },
      leftTreeVisible: true,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        buttons: proconf.statusButtons,
        curButton: proconf.curStatusButton,
        buttonsInfo: proconf.buttons,
        methods: {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
      },
      tabStatusNumConfig: {
        '1': 0,
        '2': 0
      },
      isShowQueryConditions: true,
      toolBarStatusSelect: {
        type: 'button',
        code: '1',
        curValue: '1'
      },
      // table 相关配置
      pageLoading: true,
      tableLoading1: false,
      tableLoading2: false,
      tableColumnsConfig: [],
      tableColumnsConfig1: proconf.PoliciesTableColumns1,
      tableData: [],
      tableData1: [],
      tableToolbarConfig: {
        disabledMoneyConversion: true,
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
      tableToolbarConfig1: {
        // table工具栏配置
        disabledMoneyConversion: true,
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
      mainPagerConfig1: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableDataParams: {
        condition: {}
      },
      tableConfig: {
      },
      tableConfig1: {
        globalConfig: { // // 新增当前配置 注 当前配置将覆盖默认配置  不会取并集
          cellClickCheck: true,
          seq: true,
          checkType: 'radio'
        }
      },
      tableFooterConfig: {
        showFooter: false
      },
      tableFooterConfig1: {
        showFooter: false
      },
      isHook: '0',
      payCertNo: '',
      proName: '',
      proName1: '',
      agencyName: '',
      corBgtDocNoName: '',
      useDes: '',
      dtos: [],
      amount: '',
      mofdivName: '',
      condition: {},
      // 操作日志
      logData: [],
      showLogView: false,
      // 请求 & 角色权限相关配置
      menuId: '',
      templateUrl: '',
      templateName: '',
      valiRule: [],
      showImportError: false,
      // 导入模板校验：
      importPeopleReg: proconf.importPeopleEnterReg
    }
  },
  methods: {
    // 下载导入模版
    downLoadImportTemplates(type) {
      if (type === '01') {
        this.templateUrl = require('@/hb/assets/importTemplate/benifitPersonTemp.xls')
        this.templateName = '补贴到人模板' + utils.DateFn.getCurrentDate()
      } else {
        this.templateUrl = require('@/hb/assets/importTemplate/benifitEnterpriseTemp.xls')
        this.templateName = '补贴到企业模板' + utils.DateFn.getCurrentDate()
      }
      let a = document.createElement('a')
      a.setAttribute('href', this.templateUrl)
      a.setAttribute('download', this.templateName)
      a.click()
    },
    bsToolbarClickEvent(obj, $this) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.code) {
        case '1':
          this.tableColumnsConfig = [...(this.unHookTableColumns || [])]
          this.isHook = '0'
          break
        case '2':
          this.tableColumnsConfig = [...(this.hookedTableColumns || [])]
          this.isHook = '1'
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.mainPagerConfig1.currentPage = 1
      this.refresh()
      this.refresh1()
    },
    search(obj) {
      this.searchDataList = obj
      this.mergeCondition(() => {
        this.queryTableDatas()
      }, 'detail')
    },
    search1(obj) {
      this.searchDataList1 = obj
      this.mergeCondition(() => {
        this.queryTableDatas1()
      }, 'cert')
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      let datas1 = this.$refs.mainTableRef.getSelectionData()
      let datas2 = this.$refs.mainTableRef1.getSelectionData()
      switch (obj.code) {
        // 挂接
        case 'hook_set':
          if (datas1.length === 0) {
            this.$message.warning('请选择需要挂架的惠民支付明细数据')
            return
          }
          if (datas2.length !== 1) {
            this.$message.warning('请选择一条支付凭证信息数据')
            return
          }
          this.hook(datas1, datas2[0])
          break
        // 取消挂接
        case 'hook_not':
          if (datas1.length === 0) {
            this.$message.warning('请选择数据')
            return
          }
          this.notHook(datas1)
          break
        // 导入
        case 'importPerson':
          // 补贴到人
          this.importFile('01')
          break
        case 'importEnterprise':
          this.importFile('02')
          break
        case 'delete':
          this.deleteDetailData()
          break
        default:
          break
      }
    },
    composeParamsWithTempType(datas, type) {
      datas.forEach(data => {
        data.to_peop_enterp = type
        data.to_peop_family = String(type * 1)
      })
      return datas
    },
    deleteDetailData() {
      let selectionData = this.$refs.mainTableRef.getSelectionData()
      let params = {
        datas: selectionData
      }
      HttpModule.deleteDetail(params).then(res => {
        if (res && res.rscode === '200') {
          this.$message.success('删除成功')
          this.refresh()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    importFile(type) {
      let self = this
      self.$refs.mainTableRef.triggerImportOption({
        downloadTemplateCallback() {
          self.downLoadImportTemplates(type) // 下载模板
        },
        importSuccessCallback(res) {
          let templateColumns
          if (type === '01') {
            templateColumns = self.templateColumnsPerson
          } else {
            templateColumns = self.templateColumnsEnterprise
          }
          let transViewData = self.$refs.mainTableRef.deaImportViewData({
            conlums: templateColumns,
            viewData: res,
            valiRules: self.importPeopleReg
          })
          // 将Excel数据解析后的数据
          self.onImportSuccess(transViewData, type)
        }
      })
    },
    cancelDialogClose() {
      this.showImportError = false
    },
    onImportSuccess(res, type) {
      let self = this
      console.log('res:', res)
      this.valiRule = []
      if (res.result === false) {
        let valiResult = res.valiRule
        Object.values(valiResult).forEach(vali => {
          let temp = []
          vali.forEach(v => {
            temp.push(v.msg)
          })
          self.valiRule.push(temp.join(';   '))
        })
        this.showImportError = true
        return
      }
      let datas = this.composeParamsWithTempType(res, type)
      // 添加默认区划
      let province = self.$store.state.userInfo.province
      datas.forEach(item => {
        item.mof_div_code = province
        let toPeopFamilyVal = item.to_peop_family
        let toPeopFamily = toPeopFamilyVal.split('-')
        item.to_peop_family = toPeopFamily[0]
      })
      this.pageLoading = true
      HttpModule.importBenefit({ datas: datas }).then(res => {
        self.pageLoading = false
        if (res.rscode === '200') {
          self.refresh()
          self.$message.success('导入成功')
        } else {
          self.$message.error(res.result)
          let failedData = res.data || []
          if (failedData.length > 0) {
            self.downloadFailedData(failedData, type)
          }
        }
      })
    },
    downloadFailedData(failedData, type) {
      let self = this
      let templateColumns
      if (type === '01') {
        templateColumns = [...self.templateColumnsPerson]
      } else {
        templateColumns = [...self.templateColumnsEnterprise]
      }
      templateColumns.push({
        title: '失败原因',
        field: 'msg'
      })
      this.$Export.exportExcel({
        columns: templateColumns,
        fullData: failedData,
        fileName: '导入失败数据列表',
        isExportOriginalData: false
      })
    },
    hook(datas1, datas2) {
      let self = this
      const param = {
        data: {
          pay_cert_no: datas2.pay_cert_no
        },
        datas: datas1
      }
      this.pageLoading = true
      HttpModule.hook(param).then(res => {
        self.pageLoading = false
        if (res.rscode === '200') {
          self.$message.success('挂接成功')
          self.queryTableDatas()
          self.queryTableDatas1()
        } else {
          self.$message.error(res.result)
        }
      })
    },
    notHook(datas1) {
      let self = this
      this.pageLoading = true
      HttpModule.notHook({ datas: datas1 }).then(res => {
        self.pageLoading = false
        if (res.rscode === '200') {
          self.$message.success('取消成功')
          self.queryTableDatas()
          self.queryTableDatas1()
        } else {
          self.$message.error(res.result)
        }
      })
    },
    changeVisible(val) {
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
    onToolbarBtnClick1({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh1()
          break
      }
    },
    // 左侧树
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
    },
    onClickmethod(node) {
      let proCode = ''
      if (node.id !== '0') {
        proCode = node.code
      } else {
        proCode = ''
      }
      this.condition = { 'pro_code': proCode ? [proCode] : [] }
      this.mainPagerConfig.currentPage = 1
      this.search()
      this.search1()
    },
    // agencyCode取左侧树和toorbal并集
    mergeCondition(cb, type) {
      let searchDataList, searchConfig
      if (type === 'cert') {
        searchConfig = this.queryConfig1
        searchDataList = this.searchDataList1
      } else {
        searchConfig = this.queryConfig
        searchDataList = this.searchDataList
      }
      const keyCode = this.$refs.treeSet.treeConfigIn.curRadio.toLowerCase() + '_code'
      const isEmptyCondition = () => !Object.keys(utils.highSearch(searchConfig, searchDataList)).length
      let code
      if (!isEmptyCondition()) {
        const [toolbarCode = [], treeCode = []] = [utils.highSearch(searchConfig, searchDataList)[keyCode], this.condition[keyCode]]
        code = Array.from(new Set([...toolbarCode, ...treeCode]))
      } else {
        code = this.condition[keyCode]
      }
      const condition = { ...utils.highSearch(searchConfig, searchDataList), [keyCode]: code }
      this.tableDataParams.condition = condition
      cb && cb()
      return condition
    },
    asideChange() {
      this.leftTreeVisible = false
    },
    // 表格单元行单击
    // 已挂接页签---点击明细---联动查询凭证列表，点击凭证---联动查询明细列表
    cellClick(type) {
      if (this.toolBarStatusSelect.curValue === '1') {
        return
      }
      let selectionData
      let vos = []
      if (type === 'detail') {
        selectionData = this.$refs.mainTableRef.getSelectionData()
        selectionData.forEach(item => {
          vos.push(item.pay_cert_no)
        })
        this.refresh1(vos.join(','))
      } else {
        selectionData = this.$refs.mainTableRef1.getSelectionData()
        selectionData.forEach(item => {
          vos.push(item.pay_cert_no)
        })
        this.refresh(vos.join(','))
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh(vos) {
      this.mainPagerConfig.currentPage = 1
      this.queryTableDatas(vos)
      // this.queryTableDatasCount()
    },
    refresh1(vos) {
      this.queryTableDatas1(vos)
      // this.queryTableDatasCount()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    ajaxTableData1({ params, currentPage, pageSize }) {
      this.mainPagerConfig1.currentPage = currentPage
      this.mainPagerConfig1.pageSize = pageSize
      this.queryTableDatas1()
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    // 查询 table 数据--明细
    queryTableDatas(vos) {
      let self = this
      const param = {
        statusCode: self.toolBarStatusSelect.curValue,
        menuId: this.menuId,
        appId: this.appId,
        roleguid: this.roleguid,
        roleId: this.roleId,
        pageNum: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        params: {
          is_hook: this.isHook
        },
        condition: { ...this.tableDataParams.condition },
        sort: 'create_time desc'
      }
      if (vos) {
        param.condition.pay_cert_no = vos
      }
      this.tableLoading1 = true
      let url = 'getTableDetailDataUnhook'
      if (this.isHook === '1') {
        // 未挂接
        url = 'getTableDetailDataHooked'
      }
      HttpModule[url](param).then(res => {
        self.tableLoading1 = false
        self.pageLoading = false
        if (res.rscode === '200') {
          if (self.toolBarStatusSelect.curValue === param.statusCode) {
            self.tableData = res.data.rows
            self.mainPagerConfig.total = res.data.total
          }
        } else {
          self.tableData = []
          self.$message.error(res.result || '')
        }
      })
    },
    // 查询 table1 数据---凭证
    queryTableDatas1(vos) {
      let self = this
      const param = {
        statusCode: self.toolBarStatusSelect.curValue,
        menuId: this.menuId,
        appId: this.appId,
        roleguid: this.roleguid,
        roleId: this.roleId,
        pageNum: this.mainPagerConfig1.currentPage, // 页码
        pageSize: this.mainPagerConfig1.pageSize, // 每页条数
        params: {
          is_hook: this.isHook
        },
        sort: 'create_time desc',
        condition: { ...this.tableDataParams.condition }
      }
      if (vos) {
        param.condition.pay_cert_no = vos
      }
      this.tableLoading2 = true
      HttpModule.getTableCertData(param).then(res => {
        self.pageLoading = false
        self.tableLoading2 = false
        if (res.rscode === '200') {
          if (self.toolBarStatusSelect.curValue === param.statusCode) {
            self.tableData1 = res.data.rows
            self.mainPagerConfig1.total = res.data.total
          }
        } else {
          self.tableData1 = []
          self.$message.error(res.result)
        }
      })
    },
    getFormTable() {
      this.loadConfig('77B97E5A7E6749F081D1DC7C6A68D0D2')
      this.loadConfig('283CA170CBDE4EF0BC6CB7122008F578')
      this.loadConfig('8C2A250640014ECABDC03B946105DB30')
      this.loadConfig('CF88F0D6A24B425080CC7C96E2B6217D')
      this.loadConfig('C836A67978E946129DCB1DF5E36A7DDA')
      this.loadConfig('225BC2CC55D54F5D834C4BFC06EC4096')
      this.loadConfig('C23DA2958E48494AA35963BB322B4412')
    },
    // 动态表头
    async loadConfig(id) {
      let self = this
      let configData = await self.loadBsConfig({
        tableId: {
          id: id,
          fiscalyear: self.userInfo.year,
          mof_div_code: self.userInfo.province,
          menuguid: self.menuId
        }
      })
      // 惠民支付明细表头---已挂接
      if (id === '77B97E5A7E6749F081D1DC7C6A68D0D2') {
        self.hookedTableColumns = configData.itemsConfig || proconf.hookedTableColumns
      }
      // 惠民支付明细表头---未挂接
      if (id === '283CA170CBDE4EF0BC6CB7122008F578') {
        self.unHookTableColumns = configData.itemsConfig || proconf.hookedTableColumns
      }
      // 支付凭证信息表头
      if (id === '8C2A250640014ECABDC03B946105DB30') {
        self.tableColumnsConfig1 = configData.itemsConfig || proconf.PoliciesTableColumns1
      }
      // 导入模板对应字段---个人
      if (id === 'CF88F0D6A24B425080CC7C96E2B6217D') {
        self.templateColumnsPerson = configData.itemsConfig || []
      }
      // 导入模板对应字段---企业
      if (id === 'C836A67978E946129DCB1DF5E36A7DDA') {
        self.templateColumnsEnterprise = configData.itemsConfig || []
      }
      // 惠民支付明细表头---高级搜索
      if (id === '225BC2CC55D54F5D834C4BFC06EC4096') {
        this.queryConfig = configData.itemsConfig || []
      }
      // 支付凭证信息---高级搜索
      if (id === 'C23DA2958E48494AA35963BB322B4412') {
        this.queryConfig1 = configData.itemsConfig || []
      }
      if (self.toolBarStatusSelect.curValue === '1') {
        self.tableColumnsConfig = self.unHookTableColumns || []
      }
    },
    getLeftTreeData() {
      let that = this
      HttpModule.getTreeData().then(res => {
        if (res.code === '000000') {
          that.treeData = res.data
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    }
  },
  created() {
    console.log('this.$store.state.curNavModule', this.$store.state.curNavModule)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.userInfo = this.$store.state.userInfo
    this.roleId = this.$store.state.curNavModule.roleguid
    this.$Export = new Export()
    this.getFormTable()
    this.getLeftTreeData()
    // this.queryTableDatasCount()
  }
}
</script>
<style scoped lang="scss">
.T-mainFormListLayout-modulebox .table-toolbar-left {
  font-size: 14px;
}
.Titans-table .table-toolbar-left .table-toolbar-left-title.left-title-clear-float {
  float: none;
  margin-bottom: 4px;
}
</style>
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
