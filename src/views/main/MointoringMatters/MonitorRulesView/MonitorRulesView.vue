<!-- 监控规则查看 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
          :show-num="true"
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
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="treeTypeConfig"
          @onChangeInput="changeInput"
          @onAsideChange="asideChange"
          @onConfrimData="treeSetConfrimData"
        />
        <BsTree
          ref="leftTree"
          open-loading
          :filter-text="leftTreeFilterText"
          :config="leftTreeConfig"
          :tree-data="treeData"
          :default-expanded-keys="defaultExpandedKeysIn"
          @onNodeClick="onClickmethod"
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
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
        >
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
    <AddDialog
      v-if="dialogVisible"
      :title="dialogTitle"
    />
    <DescDialog
      v-if="descVisible"
      :title="descTitle"
      :id-list="idList"
    />
    <RulesAddModal
      v-if="dialogVisibleRules"
      :title="dialogTitle"
    />
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
  </div>
</template>

<script>
import { proconf } from './MonitorRulesView'
import AddDialog from './children/addDialog'
import RulesAddModal from '../SystemLevelRules/children/addDialog.vue'
import HttpModule from '@/api/frame/main/Monitoring/levelRules.js'
import DescDialog from './children/descDialog'
import store from '@/store/index'
import { mapState } from 'vuex'
// import globalGatewayAgentConf from '../../../../../public/static/js/config/serverGatewayMap.js'
export default {
  components: {
    AddDialog, DescDialog, RulesAddModal
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    },
    isPermission: {
      handler(newData) {
        if (newData) return

        const index = this.toolBarStatusBtnConfig.buttonsInfo['1'].findIndex(item => item.code === 'set_rule')
        if (index === -1) return
        this.toolBarStatusBtnConfig.buttonsInfo['1'].splice(index, 1)
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(['userRolesData']),
    // 是否有直达资金以下dfrRoles权限
    isPermission() {
      const dfrRoles = ['直达资金经办岗', '直达资金审核岗', '直达资金系统管理员']
      const roleSet = new Set([
        ...(this.userRolesData.map(item => item.name) || []),
        ...dfrRoles
      ])
      // 利用Set结构去重，并取并集后根据长度比较判断是否有包含关系
      return roleSet.size < (this.userRolesData.length + dfrRoles.length)
    }
  },
  data() {
    return {
      leftTreeFilterText: '',
      // BsQuery 查询栏
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      radioShow: true,
      breakRuleVisible: false,
      treeTypeConfig: {},
      // 树配置
      treeTypeConfig1: {
        curRadio: '2',
        radioGroup: [
          {
            code: '1',
            label: '区划树'
          },
          {
            code: '2',
            label: '主题树'
          }
        ]
      },
      treeTypeConfig2: {
        curRadio: '2',
        radioGroup: [
          {
            code: '1',
            label: '区划树'
          },
          {
            code: '2',
            label: '预警级别'
          }
        ]
      },
      treeGlobalConfig: {
        inputVal: ''
      },
      // treeServerUri: 'pay-clear-service/v2/lefttree',
      treeQueryparams: { elementcode: 'admdiv', province: '610000000', year: '2021', wheresql: 'and code like \'' + 61 + '%\'' },
      treeServerUri: 'http://10.77.18.172:32303/v2/basedata/simpletree/where',
      treeAjaxType: 'get',
      treeData: [],
      leftTreeVisible: true,
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
        buttonsInfo: this.$store.state.curNavModule.param5 === 'dfr' ? proconf.dfrStatusRightToolBarButton : proconf.statusRightToolBarButton,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      buttonsInfo: proconf.statusRightToolBarButtonByBusDept,
      tabStatusNumConfig: {
        '1': 0
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
      leftNode: {},
      children: {},
      regulationStatus: '1',
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $gloableOptionRow: proconf.gloableOptionRow
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
      dialogVisibleRules: false, // 直达资金新增规则弹窗
      dialogTitle: '新增',
      addTableData: [],
      // 请求 & 角色权限相关配置
      menuName: '监控规则列表',
      params5: '',
      menuId: '',
      tokenid: '',
      userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      appId: 'pay_voucher',
      isHaveZero: '0',
      regulationClass: '',
      // 文件
      showAttachmentDialog: false,
      billguid: '',
      condition: {},
      handleType: '',
      isEnable: '',
      regulationType: '',
      warningLevel: '',
      regulationModelName: '',
      DetailData: {},
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
        clearable: true
      },
      treeType: '2',
      codeList: [],
      descVisible: false,
      descTitle: '',
      idList: [],
      provinceList: [],
      formDatas: {},
      defaultExpandedKeysIn: ['0'] // 默认展开预警级别
    }
  },
  mounted() {
  },

  methods: {
    itemChange(obj, form) {
      if (obj.data.warningLevel === '1') {
        this.warningLevel = '1'
        this.handleType = '1'
        obj.data.handleType = '1'
      } else if (obj.data.warningLevel === '2') {
        this.warningLevel = '2'
        this.handleType = '2'
        obj.data.handleType = '2'
      } else if (obj.data.warningLevel === '3') {
        this.warningLevel = '3'
        this.handleType = '3'
        obj.data.handleType = '3'
      }
      if (obj.data.regulationType === '1') {
        this.regulationType = '1'
      } else if (obj.data.regulationType === '2') {
        this.regulationType = '2'
      } else if (obj.data.regulationType === '3') {
        this.regulationType = '3'
      }
      // if (obj.data.handleType === '3') {
      //   this.handleType = '3'
      //   this.warningLevel = '1'
      //   obj.data.warningLevel = '1'
      // } else if (obj.data.handleType === '1') {
      //   this.handleType = '1'
      //   this.warningLevel = '2'
      //   obj.data.warningLevel = '2'
      // } else if (obj.data.handleType === '1') {
      //   this.handleType = '1'
      //   this.warningLevel = '2'
      //   obj.data.warningLevel = '2'
      // }
    },
    search(obj) {
      console.log(obj)
      this.warningLevel = obj.warningLevel
      this.handleType = obj.handleType
      this.regulationName = obj.regulationName
      this.regulationType = obj.regulationType
      this.regulationModelName = obj.regulationModelName
      this.isEnable = obj.isEnable
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
      switch (obj.code) {
        // 全部
        case 'check':
          break
      }
      this.regulationStatus = obj.curValue
      this.queryTableDatas()
    },
    getDetail(val) {
      HttpModule.getDetailData(val).then(res => {
        if (res.code === '000000') {
          this.DetailData = res.data
          this.dialogVisible = true
          this.dialogTitle = '查看详情'
        }
      })
    },
    update(val) {
      HttpModule.getDetailData(val).then(res => {
        if (res.code === '000000') {
          this.DetailData = res.data
          this.dialogVisible = true
          this.dialogTitle = '修改'
        }
      })
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      switch (obj.code) {
        // 查看
        case 'check':
          // this.cancelCheck()
          let datas = this.$refs.mainTableRef.getSelectionData()
          if (datas.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.formDatas = datas[0].ruleElement
          this.provinceList = datas[0].codeList
          this.getDetail(datas[0].regulationCode)
          break
        // 修改
        case 'update':
          let selection = this.$refs.mainTableRef.getSelectionData()
          if (selection.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.formDatas = selection[0].ruleElement
          this.provinceList = selection[0].codeList
          this.update(selection[0].regulationCode)
          break
        case 'open':
          // this.cancelCheck()
          datas = this.$refs.mainTableRef.getSelectionData()
          if (datas.length === 0) {
            this.$message.warning('请选择数据')
            return
          }
          // if (datas[0].isEnable === '1') {
          //   this.$message.warning('当前规则已启用')
          //   return
          // }
          this.open(datas)
          break
        case 'stop':
          // this.cancelCheck()
          datas = this.$refs.mainTableRef.getSelectionData()
          if (datas.length === 0) {
            this.$message.warning('请选择数据')
            return
          }
          // if (datas[0].isEnable === '0') {
          //   this.$message.warning('当前规则已停用')
          //   return
          // }
          this.stop(datas)
          break
        // 设置规则
        case 'set_rule':
          this.setRule()
          break
        // 刷新
        // case 'operation-toolbar-refresh':
        //   this.refresh()
        //   break
        default:
          break
      }
    },
    setRule() {
      // 直达资金规则弹窗
      this.dialogVisibleRules = true
      this.dialogTitle = '新增'
    },
    isRole(val) {
      let isPermission = false
      val.forEach((item) => {
        if (item.name === '直达资金经办岗' || item.name === '直达资金审核岗' || item.name === '直达资金系统管理员') {
          isPermission = true
        }
      })
      console.log('isPermission', isPermission)
      if (isPermission) {
        const route = {
          url: '/SystemLevelRules',
          code: '882004001',
          name: '系统级规则设置',
          f_FullName: '系统级规则设置'
        }
        store.commit('setCurMenuObj', route)
      } else {
        this.$message.warning('请检查菜单权限！')
      }
    },
    open(datas) {
      this.idList = []
      let isGo = true
      datas.forEach(item => {
        this.idList.push(item.regulationCode)
        if (item.isEnable === '1') {
          isGo = false
        }
      })
      if (!isGo) {
        this.$message.warning('选中数据中有规则已启用')
        return
      }
      this.descVisible = true
      this.descTitle = '启用事由'
    },
    stop(datas) {
      this.idList = []
      let isGo = true
      datas.forEach(item => {
        this.idList.push(item.regulationCode)
        if (item.isEnable === '0') {
          isGo = false
        }
      })
      if (!isGo) {
        this.$message.warning('选中数据中有规则已停用')
        return
      }
      this.descVisible = true
      this.descTitle = '停用事由'
    },
    changeVisible(val) {
      console.log(val, '输出')
      this.breakRuleVisible = val
    },
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      // console.log(context.$parent.$parent.$parent)
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
    onClickmethod(node) {
      if (this.params5 === 'dfr') { // 如果是直达资金监控规则库
        this.regulationClass = '09'
        this.warningLevel = node.node.code === '0' ? '' : node.node.code
      }
      if (this.treeType === '1') {
        // if (node.node.code === '') {
        //   return
        // }
        let code = node.node.code
        this.codeList = []
        let treeData = node.treeData
        this.getItem(code, treeData)
        console.log(this.codeList)
        const param = {
          page: this.mainPagerConfig.currentPage, // 页码
          pageSize: this.mainPagerConfig.pageSize, // 每页条数
          'regulationType': this.regulationType, // 规则类型：1.系统级  2.财政级  3.部门级
          'warningLevel': this.warningLevel, // 预警级别
          'handleType': this.handleType, // 处理方式
          'businessModelCode': '', // 业务模块
          'businessFeaturesCode': '', // 业务功能
          'regulationStatus': this.regulationStatus, // 规则状态：1.新增  2.送审  3.审核
          'isEnable': this.isEnable,
          'regulationClass': this.regulationClass,
          'regulationName': this.regulationName,
          'regulationModelName': this.regulationModelName,
          id: this.condition.agency_code,
          menuType: 1,
          province: '',
          mofDivCodeList: this.codeList
        }
        if (this.leftNode.businessType === 2) {
          param.businessModelCode = this.leftNode.code
        } else if (this.leftNode.businessType === 3) {
          param.businessFeaturesCode = this.leftNode.code
        }
        this.tableLoading = true
        HttpModule.queryMonitorTableDatas(param).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.tableData = res.data.results
            this.mainPagerConfig.total = res.data.totalCount
          } else {
            this.$message.error(res.result)
          }
        })
      } else {
        // if (node.node.code === '') {
        //   return
        // }
        if (this.params5 === 'dfr') { // 如果是直达资金监控规则库
          this.queryTableDatas()
          return
        }
        let code = node.node.code
        let regulationClass = ''
        let regulationType = ''
        let regulationCode = ''
        if (code.length === 2) {
          regulationClass = node.node.code
        } else if (node.node.code.length === 4) {
          regulationClass = node.node.superguid
          regulationType = node.node.code.substr(-1, 1)
        } else {
          regulationClass = node.node.superguid
          regulationType = node.node.bsTreePid.substr(-1, 1)
          regulationCode = node.node.code
        }
        const param = {
          page: this.mainPagerConfig.currentPage, // 页码
          pageSize: this.mainPagerConfig.pageSize, // 每页条数
          'regulationType': this.regulationType, // 规则类型：1.系统级  2.财政级  3.部门级
          'warningLevel': this.warningLevel, // 预警级别
          'handleType': this.handleType, // 处理方式
          'businessModelCode': '', // 业务模块
          'businessFeaturesCode': '', // 业务功能
          'regulationStatus': this.regulationStatus, // 规则状态：1.新增  2.送审  3.审核
          'isEnable': this.isEnable,
          'regulationName': this.regulationName,
          'regulationModelName': this.regulationModelName,
          id: this.condition.agency_code,
          menuType: 1,
          regulation_class: regulationClass,
          regulation_type: regulationType,
          regulation_code: regulationCode
        }
        if (this.leftNode.businessType === 2) {
          param.businessModelCode = this.leftNode.code
        } else if (this.leftNode.businessType === 3) {
          param.businessFeaturesCode = this.leftNode.code
        }
        this.tableLoading = true
        HttpModule.queryMonitorTableDatas(param).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.tableData = res.data.results
            this.mainPagerConfig.total = res.data.totalCount
          } else {
            this.$message.error(res.result)
          }
        })
      }
    },
    treeSetConfrimData(curTree) {
      console.log(curTree)
      if (curTree.code === '1') {
        this.treeType = '1'
        this.getLeftTreeData()
      } else {
        this.treeType = '2'
        this.getLeftTreeData1()
      }
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
      this.queryTableDatas()
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
    // 查询 table 数据
    queryTableDatas() {
      if (this.params5 === 'dfr') { // 如果是直达资金监控规则库
        this.regulationClass = '09'
      }
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        'regulationType': this.regulationType, // 规则类型：1.系统级  2.财政级  3.部门级
        'warningLevel': this.warningLevel, // 预警级别
        'handleType': this.handleType, // 处理方式
        'businessModelCode': '', // 业务模块
        'businessFeaturesCode': '', // 业务功能
        'regulationStatus': this.regulationStatus, // 规则状态：1.新增  2.送审  3.审核
        'isEnable': this.isEnable,
        'regulationName': this.regulationName,
        'regulationClass': this.regulationClass,
        'regulationModelName': this.regulationModelName,
        id: this.condition.agency_code,
        menuType: 1
      }
      if (this.leftNode.businessType === 2) {
        param.businessModelCode = this.leftNode.code
      } else if (this.leftNode.businessType === 3) {
        param.businessFeaturesCode = this.leftNode.code
      }
      this.tableLoading = true
      HttpModule.queryMonitorTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.result)
        }
      })
    },
    // 操作日志
    queryActionLog(row) {
      const param = {
        menuId: this.$store.state.curNavModule.guid,
        menuName: this.$store.state.curNavModule.name,
        declareCode: row.regulationCode
      }
      HttpModule.queryActionLog(param).then(res => {
        this.logData = res.data
        console.log(this.logData)
        this.showLogView = true
      })
    },
    // 送审
    audieData(param) {
      HttpModule.audieData(param).then(res => {
        if (res.code === '000000') {
          this.$message.warning('操作成功')
          this.queryTableDatas()
        }
      })
    },
    getLeftTreeData() {
      console.log(this.userInfo)
      let params = {}
      if (this.userInfo.province === '610000000') {
        params = {
          elementcode: 'admdiv',
          province: '610000000',
          year: '2021',
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
          elementcode: 'admdiv',
          province: this.userInfo.province,
          year: '2021',
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 4) + '%\''
        }
      } else {
        params = {
          elementcode: 'admdiv',
          province: this.userInfo.province,
          year: '2021',
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 6) + '%\''
        }
      }
      let that = this
      HttpModule.getLeftTree(params).then(res => {
        if (res.rscode === '100000') {
          let treeResdata = that.getChildrenData(res.data)
          that.treeData = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getLeftTreeData1() {
      let that = this
      if (this.params5 === 'dfr') { // 如果是直达资金监控规则库 显示预警级别树
        that.treeData = proconf.leftYjjbData
        return
      }
      HttpModule.getLeftTree1().then(res => {
        if (res.code === '000000') {
          let arr = []
          // if (this.params5 === 'dfr') {
          //   res.data.children.forEach(item1 => {
          //     if (item1.code === '09') {
          //       this.children = item1
          //     }
          //   })
          //   arr.push(this.children)
          //   let treeResdata = that.getChildrenData(arr)
          //   that.treeData = treeResdata
          // } else {
          arr.push(res.data)
          let treeResdata = that.getChildrenData(arr)
          that.treeData = treeResdata
          // }
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        if (item.children) {
          that.getChildrenData(item.children)
        }
      })

      return datas
    },
    getTreeType() {
      if (this.params5 === 'dfr') { // 如果是直达资金监控规则库
        this.treeTypeConfig = this.treeTypeConfig2
      } else {
        this.treeTypeConfig = this.treeTypeConfig1
      }
    }
  },
  created() {
    this.params5 = this.$store.state.curNavModule.param5 // 如果是直达资金监控规则库 菜单参数配置dfr
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getLeftTreeData1()
    this.queryTableDatas()
    this.getTreeType()
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
