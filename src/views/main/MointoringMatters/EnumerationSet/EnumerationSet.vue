<!-- 枚举值设置 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          :buttons-info="buttonsInfo"
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
        <template v-if="formVisible">
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
                <!-- <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div> -->
                <div class="table-toolbar-left-title">
                  <span class="fn-inline">{{ menuName }}</span>
                  <i class="fn-inline"></i>
                </div>
              </div>
            </template>
          </BsTable>
        </template>
        <template v-else>
          <BsTable
            ref="mainTableRef1"
            :footer-config="tableFooterConfig"
            :table-columns-config="tableColumnsConfig1"
            :table-data="tableData1"
            :table-config="tableConfig"
            :pager-config="mainPagerConfig1"
            :toolbar-config="tableToolbarConfig"
            @onToolbarBtnClick="onToolbarBtnClick"
            @ajaxData="ajaxTableData1"
            @cellClick="cellClick"
          >
            <template v-slot:toolbarSlots>
              <div class="table-toolbar-left">
                <!-- <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div> -->
                <div class="table-toolbar-left-title">
                  <span class="fn-inline">{{ menuName }}</span>
                  <i class="fn-inline"></i>
                </div>
              </div>
            </template>
          </BsTable>
        </template>
      </template>
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <AddDialog
      v-if="dialogVisible"
      :update-data="updateData"
      :title="dialogTitle"
    />
    <updateDialog
      v-if="updateVisible"
      :update-data="updateData1"
      :dict-type="type"
      :title="updateTitle"
    />
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
  </div>
</template>

<script>
import { proconf } from './EnumerationSet'
import AddDialog from './children/addDialog'
import updateDialog from './children/addDialog1'
import HttpModule from '@/api/frame/main/baseConfigManage/EnumerationSet.js'
export default {
  components: {
    AddDialog, updateDialog
  },
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
        buttonsInfo: null,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      buttonsInfo: proconf.statusRightToolBarButton,
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
      tableColumnsConfig1: proconf.PoliciesTableColumns1,
      tableData: [],
      tableData1: [],
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
      mainPagerConfig1: {
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
      updateVisible: false,
      dialogTitle: '新增',
      updateTitle: '新增',
      addTableData: [],
      modifyData: {},
      // 请求 & 角色权限相关配置
      menuName: '枚举值设置',
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
      dataSourceCode: '',
      updateData: '',
      formVisible: true,
      type: ''
    }
  },
  mounted() {
  },
  methods: {
    getEnum() {
      const param = {
        dictType: 'status'
      }
      let that = this
      that.tableLoading = true
      HttpModule.dictList(param).then(res => {
        that.tableLoading = false
        if (res.code === '000000') {
          let data = []
          res.data.forEach(u => {
            let param = {}
            param.label = u.dictInfoName
            param.value = u.dictInfoCode
            data.push(param)
          })
          that.queryConfig[1].itemRender.options = data
        } else {
          that.$message.error(res.message)
        }
      })
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
          this.menuName = '枚举值设置'
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
      if (this.searchDataList.dataSourceName && this.searchDataList.dataSourceName.trim() !== '') {
        condition.dataSourceName = this.searchDataList.dataSourceName
      }
      if (this.searchDataList.businessModuleName && this.searchDataList.businessModuleName.trim() !== '') {
        condition.businessModuleName = this.searchDataList.businessModuleName
      }
      this.condition = condition
      console.log(this.condition)
      if (this.formVisible) {
        this.queryTableDatas()
      } else {
        this.queryTableDatas1()
      }
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      switch (obj.code) {
        // 新增
        case 'add':
          this.onAddToolbarClickAdd(obj, context, e)
          break
        // 修改
        case 'change':
          this.changePolices()
          break
        // 删除
        case 'del':
          if (this.formVisible) {
            this.delPolicies(obj, context, e)
          } else {
            this.delPolicies1(obj, context, e)
          }
          break
        // 详情
        case 'detail':
          let selection = this.$refs.mainTableRef.getSelectionData()
          if (selection.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.formVisible = false
          this.type = selection[0].dictType
          this.buttonsInfo = proconf.statusRightToolBarButton1
          this.queryTableDatas1()
          break
        case 'close':
          this.formVisible = true
          this.buttonsInfo = proconf.statusRightToolBarButton
          this.queryTableDatas()
          break
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
    // 删除
    delPolicies() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length === 0) {
        this.$message.warning('请选择数据')
        return
      }
      let ids = []
      selection.forEach(item => {
        ids.push(item.id)
      })
      const param = {
        ids: ids
      }
      this.$confirm('是否确定删除 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        HttpModule.delPolicies(param).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.$message.success('删除成功')
            this.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 删除
    delPolicies1() {
      let selection = this.$refs.mainTableRef1.getSelectionData()
      if (selection.length === 0) {
        this.$message.warning('请选择数据')
        return
      }
      let ids = []
      selection.forEach(item => {
        ids.push(item.id)
      })
      const param = {
        ids: ids,
        dictType: this.type
      }
      this.$confirm('是否确定删除 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        HttpModule.delPolicies1(param).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.$message.success('删除成功')
            this.queryTableDatas1()
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 修改
    changePolices() {
      if (this.formVisible) {
        let selection = this.$refs.mainTableRef.getSelectionData()
        if (selection.length !== 1) {
          this.$message.warning('请选择一条数据')
          return
        }
        this.updateData = selection[0]
        this.dialogVisible = true
        this.dialogTitle = '修改'
      } else {
        let selection = this.$refs.mainTableRef1.getSelectionData()
        if (selection.length !== 1) {
          this.$message.warning('请选择一条数据')
          return
        }
        this.updateData1 = selection[0]
        this.updateVisible = true
        this.updateTitle = '修改'
      }
    },
    // 新增
    onAddToolbarClickAdd() {
      if (this.formVisible === true) {
        this.dialogVisible = true
        this.dialogTitle = '新增'
      } else {
        this.updateVisible = true
        this.updateTitle = '新增'
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
    // 左侧树
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
    },
    onClickmethod(node) {
      if (node.children !== null && node.children.length !== 0 && node.id !== '0') {
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
      let key = obj.column.property
      console.log(key, obj.row)
      switch (key) {
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      if (this.formVisible) {
        this.queryTableDatas()
      } else {
        this.queryTableDatas1()
      }
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
        dictName: this.condition.dictName ? this.condition.dictName.toString() : '',
        status: this.condition.status ? this.condition.status.toString() : ''
      }
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 查询 table 数据
    queryTableDatas1() {
      const param = {
        dictType: this.type,
        page: this.mainPagerConfig1.currentPage, // 页码
        pageSize: this.mainPagerConfig1.pageSize, // 每页条数
        dictInfoName: this.condition.dictName ? this.condition.dictName.toString() : '',
        status: this.condition.status ? this.condition.status.toString() : ''
      }
      this.tableLoading = true
      HttpModule.queryTableDatas1(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData1 = res.data.results
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
      HttpModule.queryActionLog(data).then(res => {
        this.logData = res.data
        console.log(this.logData)
        this.showLogView = true
      })
    }
  },
  created() {
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getEnum()
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
