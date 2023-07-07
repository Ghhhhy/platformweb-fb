<!-- 全量数据监控页面 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
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
          :pager-config="mainPagerConfig"
          :toolbar-config="tableToolbarConfig"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <!-- <div
                v-if="leftTreeVisible === false"
                class="table-toolbar-contro-leftvisible"
                @click="leftTreeVisible = true"
              ></div> -->
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
    <AddDialog
      v-if="addDialogVisible"
      :title="dialogTitle"
      :function-code="functionCode"
      :user-info="userInfo"
    />
    <ErrorDialog
      v-if="errorDialogVisible"
      :title="errorTitle"
      :error-msg="errorMsg"
    />
    <checkDialog v-if="dialogVisible" :title="dialogTitle" />
    <WarningDetails
      v-if="warningDetailsByRuleView"
      :id="warnLogId"
      :regulation-class="regulationClass"
      :business-module-code="businessModuleCode"
    />
    <!-- 附件弹框 -->
    <!-- <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" /> -->
  </div>
</template>

<script>
import { proconf } from './monitor'
import AddDialog from './children/addDialog'
import checkDialog from '@/views/main/MointoringMatters/SystemLevelRules/children/addDialog.vue'
import HttpModule from '@/api/frame/main/Monitoring/Monitoring.js'
import WarningDetails from '@/views/main/monitor/children/WarningDetails.vue'
import ErrorDialog from './children/errorDialog'
export default {
  components: {
    AddDialog,
    checkDialog,
    WarningDetails,
    ErrorDialog
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      addDialogVisible: false,
      DetailData: {},
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
      buttonsInfo: proconf.statusRightToolBarButtonByBusDept,
      tabStatusNumConfig: {
        1: 0
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
        pageSize: 20
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
      dialogTitle: '新增',
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
      functionCode: '',
      warnLogId: '',
      regulationClass: '',
      businessModuleCode: '',
      warningDetailsByRuleView: false,
      leftTreeVisible: false,
      errorTitle: '错误信息',
      errorDialogVisible: false,
      errorMsg: '',
      treeQueryparams: { elementCode: 'admdiv', province: this.$store.state.userInfo.province, year: this.$store.state.userInfo.year, wheresql: 'and code like \'' + 61 + '%\'' },
      fiscalYear: '',
      mofDivCodeList: []
    }
  },
  methods: {
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
          this.menuName = '全量监控执行记录表'
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
      console.log(val)
      this.searchDataList = val
      this.regulationClass = val.regulationClass_code
      let condition = this.getConditionList()
      for (let key in condition) {
        if (
          (this.searchDataList[key] !== undefined) &
          (this.searchDataList[key] !== null)
        ) {
          if (Array.isArray(this.searchDataList[key])) {
            condition[key] = this.searchDataList[key]
          } else if (typeof this.searchDataList[key] === 'string') {
            if (this.searchDataList[key].trim() !== '') {
              this.searchDataList[key].split(',').forEach((item) => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      this.mofDivCodeList = val.mofDivCodeList_code__multiple
      this.condition = condition
      this.queryTableDatas()
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      switch (obj.code) {
        // 新增
        case 'add':
          this.changePolicess()
          break
        // 修改
        case 'change':
          this.changePolices()
          break
        case 'delete':
          this.deleteData()
          break
        default:
          break
      }
    },
    changePolices() {
      // 增量查询
      this.addDialogVisible = true
      this.dialogTitle = '增量查询'
    },
    changePolicess() {
      // 增量查询
      this.addDialogVisible = true
      this.dialogTitle = '全量查询'
    },
    deleteData() {
      // 删除预警数据
      /* this.addDialogVisible = true
      this.dialogTitle = '删除预警数据' */
      let selectData = this.$refs.mainTableRef.getSelectionData()
      if (selectData.length > 0) {
        this.$confirm('确定要删除预警数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let flag = 0
          let params = selectData.map((item) => {
            if (item.exStatus === '0') {
              flag++
            }
            let param = {}
            param.warnLogId = item.id
            param.regulationClass = item.regulationClass
            param.firulecode = item.fiRuleCode
            param.exStatus = item.exStatus
            return param
          })
          if (flag > 0) {
            this.$message.warning('正在执行中的数据不能删除！')
            return
          }
          HttpModule.deleteWarnByLogId(params).then((res) => {
            if (res.code === '000000') {
              this.$message.success('删除成功')
              this.queryTableDatas()
            } else {
              this.$message.error(res.message)
            }
          })
        })
      } else {
        this.$message.warning('请选择要删除的记录！')
      }
    },
    changeVisible(val) {
      console.log(val, '输出')
      this.breakRuleVisible = val
    },
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      // console.log(context.$parent.$parent.$parent)
      console.log(row.attachment_id)
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
    onClickmethod(node) {
      if (
        node.children !== null &&
        node.children.length !== 0 &&
        node.id !== '0'
      ) {
        return
      }
      if (node.id !== '0') {
        let key =
          this.$refs.treeSet.treeConfigIn.curRadio.toLowerCase() + '_code'
        this.condition[key] = node.code
      } else {
        this.condition = {}
      }
      this.queryTableDatas()
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
      console.log(obj)
      let key = obj.column.property
      switch (key) {
        case 'fiRuleName':
          HttpModule.getDetailData(obj.row.fiRuleCode).then((res) => {
            if (res.code === '000000') {
              this.DetailData = res.data
              this.dialogTitle = '查看详情'
              this.dialogVisible = true
            }
          })
          break
        case 'warnTotal':
          console.log('click:', obj.row)
          this.warnLogId = obj.row.id
          this.regulationClass = obj.row.regulationClass
          this.businessModuleCode = obj.row.businessModuleCode
          this.warningDetailsByRuleView = true
          break
        case 'errorMsg':
          if (obj.row.errorMsg === '') {
            return
          }
          this.errorDialogVisible = true
          this.errorMsg = obj.row.errorMsg
          break
        default:
          break
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
    queryTableDatasCount() {
      // const params = {
      //   statusCodeArr: ['1'],
      //   menuId: this.menuId,
      //   isHaveZero: this.isHaveZero,
      //   appId: 'pay_voucher',
      //   roleId: this.$store.state.curNavModule.roleguid,
      //   params: this.params5,
      //   isInput: '9',
      //   condition: this.differConditon
      // }
      // HttpModule.queryTableDatasCount(params).then(res => {
      //   if (res.rscode === '200') {
      //     this.tabStatusNumConfig = res.data
      //     this.tabStatusNumConfig = Object.assign(res.data)
      //   }
      // })
    },
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        fiRuleName: this.condition.fiRuleName
          ? this.condition.fiRuleName.toString()
          : '',
        triggerClass: this.condition.triggerClass
          ? this.condition.triggerClass.toString()
          : '', // 触发类型 1：实时触发  2：定时触发
        triggerMode: this.condition.triggerMode
          ? this.condition.triggerMode.toString()
          : '', // 触发方式 1 手动  2 自动
        exMode: this.condition.exMode ? this.condition.exMode.toString() : '', // 执行方式 1 全量  2增量
        exStatus: this.condition.exStatus
          ? this.condition.exStatus.toString()
          : '', // 执行状态  0 执行中  1 异常停止 2 执行结束
        regulationClass: this.regulationClass
          ? this.regulationClass.toString()
          : '', // 监控主题名称
        exStartTime: this.condition.exStartTime
          ? this.condition.exStartTime.toString()
          : '',
        exEndTime: this.condition.exEndTime
          ? this.condition.exEndTime.toString()
          : '',
        fiscalYear: this.condition.fiscalYear
          ? this.condition.fiscalYear.toString()
          : '',
        mofDivCodeList: this.mofDivCodeList
      }
      this.tableLoading = true
      HttpModule.queryTableDatass(param).then((res) => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          console.log(this.tableData)
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
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
      HttpModule.queryActionLog(data).then((res) => {
        this.logData = res.data
        console.log(this.logData)
        this.showLogView = true
      })
    },
    getLeftTreeData() {
      let that = this
      HttpModule.getLeftTree(that.treeQueryparams).then(res => {
        if (res.data && Array.isArray(res.data)) {
          console.log(this.queryConfig)
          let treeResdata = that.getRegulationChildrenData(res.data)
          proconf.highQueryConfig[7].itemRender.options = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getRegulationChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.name = item.ruleName ? item.ruleName : item.name
        item.label = item.text || `${item.code}-${item.name}`
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
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getLeftTreeData()
  },
  mounted() {
    HttpModule.monitorTheme(0).then((res) => {
      if (res.code === '000000') {
        let resData = this.getRegulationChildrenData(res.data)
        proconf.highQueryConfig[2].itemRender.options = resData
      } else {
        this.$message.error(res.message)
      }
    })
  }
}
</script>
<style scoped>
.radio-right {
  float: right;
}
.Titans-table ::v-deep .vxe-body--row.row-yellow {
  background-color: yellow;
  color: #fff;
}
.Titans-table ::v-deep .vxe-body--row.row-blue {
  background-color: blue;
  color: #fff;
}
.Titans-table ::v-deep .vxe-body--row.row-red {
  background-color: red;
  color: #fff;
}
</style>
