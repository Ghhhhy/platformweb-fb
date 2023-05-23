<!--  formList模版   Author:Titans@2396757591@qq.com -->
<template>
  <div class="height-all">
    <BsMainFormListLayout :left-visible.sync="leftVisible">
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <BsSplitPane :min-percent="0" split="horizontal" :default-percent="100">
          <template slot="paneL">
            <div class="mmc-left-tree height-all">
              <div class="mmc-left-tree-title">
                <BsTreeSet
                  :title-text="titleText"
                  :is-hide="true"
                  @onAsideChange="leftVisible = false"
                  @onChangeInput="(value) => {
                    agencyTreeFilterText = value
                  }"
                />
              </div>
              <!-- @onNodeClick="onAgencyTreeNodeClick" -->
              <div class="mmc-left-tree-body">
                <BsTree
                  ref="agencyTree"
                  open-loading
                  :loading="delarLoading"
                  :filter-text="agencyTreeFilterText"
                  :config="agencyTreeConfig"
                  :tree-data="agencyTreeData"
                  :current-node-key="currentAgencyTreeNodeKey"
                  :default-checked-keys="checkedkeys"
                  :queryparams="agencyTreeQueryparams"
                  @onTreeLoaded="onTreeLoaded"
                  @onNodeClick="onAgencyTreeNodeClick"
                  @onNodeCheckChange="onNodeCheckChange"
                />
              </div>
            </div>
          </template>
        </BsSplitPane>
      </template>
      <template v-slot:mainForm>
        <!-- <div class="main-query">
          <BsQuery
            ref="queryForm"
            :query-form-item-config="queryFormItemConfigIn"
            :query-form-data="queryFormData"
            :query-config="queryConfig"
            @onSearchClick="onSearchClick"
            @onSearchResetClick="onresetSearchClick"
            @itemChange="itemChange"
          />
        </div> -->
        <div style="margin-bottom: 10px;margin-top: 10px;">
          <div style="float: right;">
            <vxe-button status="primary" :loading="commitLoading" :content="params5.agencyStatus === '4' ? '送审' : '审核'" @click="commit" />
            <vxe-button status="primary" :loading="commitLoading" :content="params5.agencyStatus === '4' ? '撤回' : '取消审核'" @click="cancel" />
          </div>
        </div>
        <template>
          <div style="height:95%">
            <BsTable
              ref="publicProjectTable"
              class="pronameTable"
              :height="300"
              :table-config="tableConfig"
              :table-columns-config="tableConlums"
              :table-data="tableData"
              :edit-config="editConfig"
              :toolbar-config="toolbarConfig"
              :pager-config="false"
              :cell-style="cellStyle"
              :loading="showLoading"
              :footer-config="{ showFooter: false }"
              @onToolbarBtnClick="onToolbarBtnClick"
              @ajaxData="reLoadTableData"
            >
              <template v-slot:toolbarSlots>
                <el-tag>{{ deptStatus }}</el-tag>
              </template>
            </BsTable>
          </div>
        </template>
        <template>
        </template>
      </template>
    </BsMainFormListLayout>
  </div>
</template>
<script>
import resolveResult from '@/utils/result.js'
// import { get } from '@/api/http'
export default {
  name: 'DatavReportSearch',
  components: {},
  props: {
  },
  data() {
    return {
      deptStatus: '',
      tableConfig: {
        globalConfig: {
          checkType: '', // hasCheckbox'radio'
          seq: false, // 序号列
          hasOptionRow: false // 操作列
        },
        methods: {
          toolbarButtonClickEvent: this.toolbarButtonClick
        }
      },
      tableConlums: [],
      tableData: [],
      editConfig: {
        editable: false,
        trigger: 'click',
        mode: 'cell',
        showStatus: true,
        showAsterisk: true
      },
      toolbarConfig: {
        search: false,
        advanceSearch: false,
        import: false,
        moneyConversion: false,
        calculator: false,
        refresh: false,
        custom: false,
        export: false,
        disabledMoneyConversion: false, // --統一修改為可以切換的，20211008
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      mainPagerConfig: {
        total: 0,
        pageSize: 20,
        currentPage: 1
      },
      showLoading: false,
      commitLoading: false,
      titleText: '预算单位',
      dialogVisible: false,
      queryConfig: {
        searchBtnText: '查询',
        resetBtnText: false
      },
      checkedkeys: [],
      shfundtype: null,
      Batchno: null,
      datatype: null,
      leftTreeShow: false,
      leftVisible: true,
      agencyTreeConfig: {
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: this.$store.getters.getMenuParams5.agencyStatus === '2' ? 1 : 0, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'],
        format: '{code}-{name}',
        placeholder: '请选择',
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '{code}-{name}-{agencyStatus}', // {code}-{name}
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          rootName: '全部',
          successCode: '100000', // 成功code
          statusField: 'code',
          method: 'get', // 请求方式
          url: 'bisBasicinfo/basicinfo/basAgencyInfoGd/queryGkAgencyTree' // 'bisBasicinfo/basicinfo/basAgencyInfoGd/queryAgencyTree' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        defaultSelectFirstLeafNode: true,
        // multiple: true, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      currentAgencyTreeNodeKey: '',
      currentAgencyNode: {},
      agencyTreeQueryparams: {
        roleGuid: this.$store.state.curNavModule.roleguid,
        // eleCode: 'VW_BAS_AGENCY_PR_TREE',
        // eleCode: 'vw_bas_mof_dep_tree',
        agencyStatus: this.$store.getters.getMenuParams5.agencyStatus,
        isDept: 1
        // eleCode: 'VW_GK_AGENCY_TREE' // 'VW_BAS_AGENCY_INFO_LEAF_TREE',
        // queryCondition: this.$store.getters.getMenuParams5.queryCondition // 'and AGENCY_IDEN_CODE like \'1%\''
      },
      agencyTreeFilterText: '',
      agencyTreeData: [],
      inputTableTreeQueryparams: {
        type: ''
      },
      inputTableTreeFilterText: '',
      inputTableTreeData: [],
      tablePanls: [],
      currentTableTreeNodeKey: '',
      reportParams: {},
      params5: {},
      tabSelect: {},
      delarLoading: false,
      checkedAgencys: {
        agencyIds: '',
        agencyCodes: '',
        agencyNames: '',
        deptCodes: '',
        sql_dept_code: '',
        sql_agency_code: '',
        agencyStatus: ''
      },
      checkedForms: {
        sql_shfundtype_code: '',
        sql_batch_no: '1',
        sql_datatype: ''
      },
      currentTableNode: {},
      queryFormData: {
        sh_fund_type_: '',
        sh_fund_type_Code: '',
        shFundType___viewSort: '',
        batch_no_: '1',
        datatype_: ''
      },
      shFundType_: '',
      shFundType_Code: '',
      shFundType_Id: '',
      shFundType_Name: '',
      shFundType___viewSort: '',
      recordMap: [],
      usertype: '',
      newDataArr: '',
      defshFundType: ''
    }
  },
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    ...resolveResult,
    onToolbarBtnClick(obj, $this) {
      if (obj.code === 'refresh') {
        this.loadData()
      }
    },
    reLoadTableData({ currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.loadData()
    },
    loadData() {
      this.showLoading = true
      this.$http.post('/bisBudget/bgt/privateProject/getDeptAgencyStatus', {
        agencyId: this.checkedAgencys.agencyIds,
        agencyCode: this.checkedAgencys.agencyCodes
      }).then(res => {
        if (res && res.code === '100000') {
          this.resolveResult(data => {
            this.tableData = data
          }, res)
        } else {
          this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.message}]` })
        }
        this.showLoading = false
      }).catch(e => {
        this.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
        this.showLoading = false
      })
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // 改变单元格样式
      if ((column.property === 'agencyStatus' || column.property === 'auditResult') && row.agencyStatus + '' === '1') {
        return { color: 'red' }
      }
    },
    commit() {
      let self = this
      if (!self.checkedAgencys.agencyCodes) {
        self.$XModal.message({ status: 'warning', message: '请先选择预算单位' })
        return false
      }
      let id = this.tableData.findIndex(item => {
        if (item.agencyStatus === 1) {
          return true
        }
      })
      if (id >= 0) {
        self.$XModal.message({ status: 'warning', message: '还有未提交的单位，无法送审' })
        return false
      }
      let agencyStatus = this.$store.getters.getMenuParams5.agencyStatus
      if (+agencyStatus === 4) {
        if (self.checkedAgencys.agencyStatus === '已审核') {
          self.$XModal.message({ status: 'warning', message: '该部门报表数据已审核,无法再次送审' })
          return false
        }
        if (self.checkedAgencys.agencyStatus === '业务处已审核') {
          self.$XModal.message({ status: 'warning', message: '该部门报表数据业务处已审核,无法再次送审' })
          return false
        }
      } else if (+agencyStatus === 6) {
        if (self.checkedAgencys.agencyStatus === '部门未审核') {
          self.$XModal.message({ status: 'warning', message: '该部门报表数据部门未审核,无法审核' })
          return false
        }
        if (self.checkedAgencys.agencyStatus === '已审核') {
          self.$XModal.message({ status: 'warning', message: '该部门报表数据已审核,无法再次审核' })
          return false
        }
      }
      this.commitLoading = true
      self.$XModal.confirm('您确定要将该单位的公开表数据提交吗?').then(type => {
        if (type === 'confirm') {
          self.$http.post('/bisBudget/bgt/privateProject/commitGkTable', {
            agencyId: self.checkedAgencys.agencyIds,
            agencyCode: self.checkedAgencys.agencyCodes,
            status: +self.$store.getters.getMenuParams5.agencyStatus + 1
          }).then(res => {
            if (res && res.code === '100000') {
              this.$refs.agencyTree.initTreeData(true)
              this.commitLoading = false
            } else {
              self.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
              this.commitLoading = false
            }
            this.commitLoading = false
          }).catch(e => {
            self.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
          })
        } else {
          this.commitLoading = false
        }
      })
    },
    cancel() {
      let self = this
      if (!self.checkedAgencys.agencyCodes) {
        self.$XModal.message({ status: 'info', message: '请先选择预算单位' })
        return false
      }
      let agencyStatus = this.$store.getters.getMenuParams5.agencyStatus
      if (+agencyStatus === 4) {
        if (self.checkedAgencys.agencyStatus === '未审核') {
          self.$XModal.message({ status: 'warning', message: '该部门报表数据未审核,无法撤回' })
          return false
        }
        if (self.checkedAgencys.agencyStatus === '业务处已审核') {
          self.$XModal.message({ status: 'warning', message: '该部门报表数据业务处已审核,无法撤回' })
          return false
        }
      } else if (+agencyStatus === 6) {
        if (self.checkedAgencys.agencyStatus === '未审核') {
          self.$XModal.message({ status: 'warning', message: '该部门报表数据未审核,无法取消审核' })
          return false
        }
        if (self.checkedAgencys.agencyStatus === '部门未审核') {
          self.$XModal.message({ status: 'warning', message: '该部门报表数据部门未审核,无法取消审核' })
          return false
        }
      }
      this.commitLoading = true
      self.$XModal.confirm('您确定要将该单位的公开表数据撤销提交吗?').then(type => {
        if (type === 'confirm') {
          self.$http.post('/bisBudget/bgt/privateProject/commitGkTable', {
            agencyId: self.checkedAgencys.agencyIds,
            agencyCode: self.checkedAgencys.agencyCodes,
            status: +self.$store.getters.getMenuParams5.agencyStatus - 1
          }).then(res => {
            if (res && res.code === '100000') {
              this.$refs.agencyTree.initTreeData(true)
              this.commitLoading = false
            } else {
              self.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
              this.commitLoading = false
            }
            this.commitLoading = false
          }).catch(e => {
            self.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
            this.commitLoading = false
          })
        } else {
          this.commitLoading = false
        }
      })
    },
    getFirstId(data) {
      if (data && data.length > 0) {
        let firstData = data[0]
        let getChildrenId = (data) => {
          if (data && data.length > 0) {
            let child = data[0]
            if (child.children && child.children.length > 0) {
              return getChildrenId(child.children)
            } else {
              return child.id
            }
          } else {
            return ''
          }
        }
        let id = getChildrenId(firstData.children)
        if (id === '') {
          id = firstData.id
        }
        return id
      } else {
        return ''
      }
    },
    onTreeLoaded({ treeData, tree, currentNodeKey, curSelectNode }, bstree) {
      let id = this.getFirstId(treeData)
      if (id && id !== null && id !== '') {
        tree.setCurrentKey(id)
        bstree.defaultExpandedKeys = [id]
      }
      this.currentAgencyTreeNodeKey = curSelectNode.id
      this.currentAgencyNode = curSelectNode
      this.onAgencyTreeNodeClick({ node: curSelectNode })
      this.loadData()
    },
    onAgencyTreeNodeClick({ node }) {
      let agency = node
      let agencyIds = node.id
      let agencyCodes = node.code
      let agencyNames = node.name
      let deptCodes = node.code.substr(0, 3)
      let sqlAgencyCode = '\'' + node.code + '\''
      let sqlDeptCode = '\'' + deptCodes + '\''
      let agencyStatus = node.agencyStatus
      this.checkedAgencys = {
        agency,
        agencyIds,
        agencyCodes,
        agencyNames,
        deptCodes,
        sql_agency_code: sqlAgencyCode,
        sql_dept_code: sqlDeptCode,
        agencyStatus: agencyStatus
      }
      this.deptStatus = node.name + '状态: ' + node.agencyStatus
      this.loadData()
      setTimeout(() => {
        this.delarLoading = false
      }, 500)
    },
    itemChange(obj) {
      console.log(obj, 22222222)
      let DataArr = []
      obj.$form.$children[0].$children[0].curCheckednodes.forEach((item) => {
        DataArr.push(item.code)
      })
      this.newDataArr = DataArr.map(i => '\'' + i + '\'').join(',')
    },
    getreportParams() {
      this.params5 = this.$store.getters.getMenuParams5
    },
    getTableConfig() {
      const self = this
      self.$http.get('/bisConfig/config/report/getBossReportConfig', { dicCode: '333007003' }).then(res => {
        this.resolveResult(data => {
          self.tableConlums = JSON.parse(data.editTableCols)
          self.tableRules = JSON.parse(data.validateRules)
        }, res)
      }).catch(e => {
        this.$XModal.message({ status: 'error', message: '获取配置列失败' })
      })
    }
  },
  mounted() {
    this.getTableConfig()
  },
  created() {
    // this.initFiscalConfig(this.$store.state.curNavModule.guid)
    this.getreportParams()
  },
  watch: {
  }
}
</script>

<style lang='scss'>
// 横向分割条
.T-mainFormListLayout-modulebox .mmc-formlist .vue-splitter-container .splitter-pane-resizer.horizontal {
  width: 100% !important;
  height: 5px !important;
}

// .x-spreadsheet .x-spreadsheet-sheet {
// }
// .no-left-tree {
// }
.flex {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.inner-padding {
  padding: 0 0px;
}
</style>
