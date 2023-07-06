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
          :tab-status-btn-config="queryConfigInfo"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="(open) => isShowQueryConditions = open"
          @btnClick="onTabPanelBtnClick"
        />
      </template>
      <template v-slot:query>
        <BsQuery
          ref="queryFrom"
          :query-form-item-config="queryConfig"
          :query-form-data="queryData"
          @onSearchClick="search"
          @onSearchResetClick="resetQuery"
        />
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
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
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <MonitProcFeedbackModal v-if="showModal" ref="MonitProcFeedbackModal" @close="showModal = false" />
    <AddDialog
      v-if="dialogVisible"
      :title="dialogTitle"
      :param5="menuSettingConfig"
      :warning-code="warningCode"
      :fi-rule-code="fiRuleCode"
    />
  </div>
</template>

<script>
// import { proconf } from './createProcessing'
import HttpModule from '@/api/frame/main/Monitoring/WarningDetailsByCompartment.js'
import api from '@/api/frame/main/fundMonitoring/createProcessing.js'
import MonitProcFeedbackModal from './monitProcFeedbackModal.vue'
import loadBsConfig from '@/views/main/dynamicTableSetting/config'
import AddDialog from '@/views/main/fundMonitoring/violationHandle/createProcessing/children/addDialog.vue'
export default {
  mixins: [loadBsConfig],
  components: {
    MonitProcFeedbackModal,
    AddDialog
  },
  computed: {
    menuSettingConfig() {
      return this.transJson(this.$store.state.curNavModule.param5)
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  watch: {

  },
  data() {
    return {
      // BsQuery 查询栏
      showModal: false,
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
      queryData: {
        roleId: this.$store.state.curNavModule.roleguid,
        regulationClass: this.transJson(this.$store.state.curNavModule.param5).regulationClass,
        regulationClassName: this.transJson(this.$store.state.curNavModule.param5).regulationClassName,
        menuId: this.$store.state.curNavModule.guid,
        isNormalDone: false,
        flowStatus: '1-4', // 待审批
        isProcessed: false,
        isAgencyDone: false
      },
      treeData: [],
      createDataList: {},
      tabStatusNumConfig: {},
      queryConfigInfo: {},
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        },
        changeBtns: true
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
      tableColumnsConfig: [],
      tableData: [],
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
              let vnode = (
                <div>
                  <el-button type="primary" size="mini" onClick={() => this.handleRowClick(row)}>查看详情</el-button>
                  {this.queryData.flowStatus === '2' ? <el-button type="primary" size="mini" onClick={() => this.withdraw(row)}>撤回</el-button> : ''}
                  {this.queryData.flowStatus === '0' ? <el-button type="primary" size="mini" onClick={() => this.showLogModel(row)}>查看日志</el-button> : ''}
                </div>
              )
              return [
                vnode
              ]
            }
          },
          $customerWarnLevel: {
            renderDefault: (h, cellRender, { row, rowIndex }, context) => {
              if (row.warnLevel) {
                return [
                  <div class={'warningLevel' + row.warnLevel} size="mini" >{this.$store.state.warnInfo.warnLevelOptions.find(item => item.warnLevel === row.warnLevel)?.label}</div>
                ]
              }
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
      // userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      // 文件
      showAttachmentDialog: false,
      showGlAttachmentDialog: false,
      detailData: [],
      codeList: [],
      // 查看详情传参
      warningCode: '',
      dialogVisible: false,
      dialogTitle: '',
      fiRuleCode: ''
      // -----
    }
  },
  activated() {
    this.updateRegulationClassNameFormConfig()
  },
  methods: {
    handleRowClick(row) {
      console.log('点击每行的方法', row)
      this.fiRuleCode = row.fiRuleCode || ''
      this.warningCode = row.warningCode || ''
      this.dialogVisible = true
      this.dialogTitle = '查看详情信息'
    },
    showLogModel(row) {
      this.showLogView = true
      this.queryActionLog(row)
    },
    // 操作日志
    queryActionLog(row) {
      let params = { warningCode: row.warningCode }
      api.workFlowGetLogs(params).then(res => {
        if (res.code === '000000') {
          // let tempData = res.data.map(item => {
          //   return {
          //     logid: item['logid'],
          //     nodeName: item['nodeName'],
          //     actionUser: item['operationUser'],
          //     actionName: item['operationTypeName'],
          //     actionTime: item['createdTime'] == null ? '' : item['createdTime'],
          //     message: item['operationComment']
          //   }
          // })
          this.logData = res.data
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
      console.log('search', obj)
      this.queryData.regulationClassName = obj.regulationClassName
      this.queryTableDatas()
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
      this.queryData = searchDataObj
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
      this.queryTableDatas()
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
      this.queryTableDatas()
      // if (this.menuName === '监控问询单列表' && this.status === 0) {
      //   this.queryTableDatas()
      // } else if (this.menuName === '监控问询单列表' && this.status !== 0) {
      //   this.getdata()
      // } else {
      //   this.getWarnData()
      // }
    },
    // 查询 table 数据
    queryTableDatas() {
      // console.log('this.menuSettingConfig', this.menuSettingConfig)
      let param = {
        ...this.queryData,
        isUnit: this.menuSettingConfig.retroact,
        isNormalDone: this.queryData.isNormalDone,
        isProcessed: this.queryData.isProcessed,
        isAgencyDone: this.queryData.isAgencyDone
      }
      if (this.$store.state.curNavModule.f_FullName.substring(0, 4) === '直达资金') {
        param.regulationClass = '0201'
      }
      const regulationClass = this.transJson(this.$store.state.curNavModule.param5)?.regulationClass
      if (regulationClass) {
        param.regulationClass = regulationClass
      }
      this.tableLoading = true
      api.getWorkFlowDetail(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getdata() {

    },
    getTableConfByMenuguid(menuguid) {
      // 根据菜单menuguid获取其下所有表配置
      let self = this
      return new Promise((resolve, reject) => {
        self.$http
          .get('mp-b-perm-service/v1/tableconf/menuguid', {
            menuguid: menuguid,
            mof_div_code: self.userInfo.province, // 区划
            fiscalyear: self.userInfo.year // 年份
          })
          .then((res) => {
            if (res.rscode === '100000') {
              resolve(res.data)
              // resolve(self.generateCurTableConfDataMap(res.data))
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 生成
    handleCreate() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
      }
      this.$set(this.$refs.mainTableRef, 'createDataList', selection[0])
    },
    async onTabPanelBtnClick(obj) { // 按钮点击
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.showModal = true
      await this.$nextTick()
      let serverTime = await HttpModule.getCurrentTime()
      let formItemText = selection[0].mflowBizInfoList || []// 拿到上一个节点表单结构
      let preNodeFormObj = {}// 上一个节点表单填得值
      if (formItemText && formItemText.length) {
        formItemText.forEach(item => {
          preNodeFormObj[item.key] = item.value
        })
      }
      let ortherData = {
        serverTime: serverTime.data,
        createdAttachmentid: this.$ToolFn.utilFn.getUuid(),
        userName: this.userInfo.name
      }
      this.$set(this.$refs.MonitProcFeedbackModal, 'createDataList', { ...selection[0], ...preNodeFormObj, ...ortherData })
      this.$refs.MonitProcFeedbackModal.tabCode = obj.code
      this.$refs.MonitProcFeedbackModal.dialogVisible = true
      this.$refs.MonitProcFeedbackModal.initModal()
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
      if (obj.code === 'dcl-hsfk') return// 点击按钮时也触发了切换状态栏
      this.queryData.flowStatus = obj.code
      this.queryTableDatas()
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
    withdraw(row) {
      let params = [{
        menuId: this.$store.state.curNavModule.guid,
        warningCode: row.warningCode,
        commentDept: '5', // 5  撤回
        dealNo: row.dealNo
      }]
      api.workFlowRevoke(params).then(res => {
        if (res.code === '000000') {
          this.$message.success('撤回成功')
          this.queryTableDatas()
        }
      })
    },
    async loadConfig(id) {
      let params = {
        tableId: {
          id: id,
          fiscalyear: this.userInfo.year,
          mof_div_code: this.userInfo.province,
          menuguid: this.$store.state.curNavModule.guid
        }
      }
      let configQueryData = await this.loadBsConfig(params)
      this.tableColumnsConfig = configQueryData.itemsConfig
    },
    async loadTabConfig(id) {
      let params = {
        tableId: {
          id: id,
          fiscalyear: this.userInfo.year,
          mof_div_code: this.userInfo.province,
          menuguid: this.$store.state.curNavModule.guid
        }
      }
      let configQueryData = await this.loadBsConfig(params)
      this.$set(this, 'queryConfigInfo', { ...this.toolBarStatusBtnConfig, ...configQueryData.itemsConfig[0] })
    }
  },
  mounted() {

  },
  created() {
    this.getTableConfByMenuguid(this.$store.state.curNavModule.guid).then(res => {
      res.forEach(item => {
        if (item.type === 'table') {
          this.loadConfig(item.id)// 加载表格
        } else if (item.type === 'tabPanel') {
          this.loadTabConfig(item.id)
        }
      })
    })
    // this.$set(this, 'queryConfigInfo', this.toolBarStatusBtnConfig)
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

.warningLevel2{
  color: red;
}
.warningLevel2{
  color:#FF6F20
}
.warningLevel3{
  color: #FFD43C;
}
.warningLevel4{
  color: blue;
}
.warningLevel5{
  color: #F1F1F1;
}
</style>
