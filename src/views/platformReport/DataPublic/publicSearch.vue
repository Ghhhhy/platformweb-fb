<!--  formList模版   Author:Titans@2396757591@qq.com -->
<template>
  <div class="height-all">
    <BsMainFormListLayout :left-visible.sync="leftVisible">
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <BsSplitPane :min-percent="0" split="horizontal" :default-percent="50">
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
          <template slot="paneR">
            <div class="mmc-left-tree height-all">
              <div class="mmc-left-tree-title">
                <BsTreeSet
                  title-text="查询表"
                  :is-show-input="true"
                  :is-hide="true"
                  @onChangeInput="(value) => {
                    inputTableTreeFilterText = value
                  }"
                />
              </div>
              <div class="mmc-left-tree-body">
                <BsTree
                  ref="inputTableTree"
                  open-loading
                  :filter-text="inputTableTreeFilterText"
                  :config="inputTableTreeConfig"
                  :tree-data="inputTableTreeData"
                  :queryparams="inputTableTreeQueryparams"
                  :current-node-key="currentTableTreeNodeKey"
                  @onNodeClick="onInputTableTreeNodeClick"
                />
              </div>
            </div>
          </template>
        </BsSplitPane>
      </template>
      <template v-slot:mainForm>
        <div style="margin-bottom: 10px;margin-top: 10px;">
          <div style="float: left;"><el-tag v-if="status">{{ status }}</el-tag></div>
          <div style="float: right;">
            <vxe-button v-if="agencyStatus === '2'" status="primary" :loading="commitLoading" content="提交" @click="commit" />
            <vxe-button v-if="agencyStatus === '2'" status="primary" :loading="commitLoading" content="撤销提交" @click="cancel" />
            <vxe-button status="primary" content="打印">
              <template #dropdowns>
                <vxe-button
                  content="打印当前报表"
                  status="primary"
                  @click="print"
                />
                <vxe-button
                  content="批量打印"
                  status="primary"
                  @click="batchprint"
                />
              </template>
            </vxe-button>
            <vxe-button status="primary" content="导出">
              <template #dropdowns>
                <vxe-button
                  content="当前报表导出Excel"
                  status="primary"
                  @click="exportCurrentExcel"
                />
                <vxe-button
                  content="当前报表导出PDF"
                  status="primary"
                  @click="exportCurrentPDF"
                />
                <vxe-button
                  content="批量导出"
                  status="primary"
                  @click="batchExportExcel"
                />
              </template>
            </vxe-button>
            <vxe-button status="primary" @click="onSearchClick">查询</vxe-button>
          </div>
        </div>
        <template>
          <div style="height:95%">
            <div
              v-for="(item, index) in reportViewArray"
              :key="index"
              :style="{ height: item.id === currentTableNode.id ? '100%' : '0px' }"
            >
              <div
                v-show="item.id === currentTableNode.id"
                :style="{ height: item.id === currentTableNode.id ? '100%' : '0px' }"
              >
                <DatavReportView
                  :ref="'datavReportView' + item.id"
                  :isload="item.isLoad"
                  :report-params="reportParams"
                  :style="{ height: item.id === currentTableNode.id ? '100%' : '0px' }"
                />
              </div>
            </div>
          </div>
        </template>
        <template>
          <ExportDialog
            v-if="dialogVisible"
            ref="ExportDialog"
            :excel-password="excelPassword"
            :agency-tree-config="agencyTreeConfig"
            :report-type="params5.reportType"
            :agency-status="params5.agencyStatus"
            :report-dept-type="params5.reportDeptType"
            :agency-tree-queryparams="agencyTreeQueryparams"
            :input-agency-table-tree-config="inputTableTreeConfig"
            :input-dept-table-tree-config="inputTableTreeConfig"
            :input-table-tree-data="inputTableTreeData"
            :dialog-visible.sync="dialogVisible"
          />
        </template>
        <template>
          <PrintDialog
            v-if="printVisible"
            ref="PrintDialog"
            :agency-tree-config="agencyTreeConfig"
            :agency-tree-queryparams="agencyTreeQueryparams"
            :input-table-tree-config="inputTableTreeConfig"
            :input-table-tree-data="inputTableTreeData"
            :print-visible.sync="printVisible"
          />
        </template>
      </template>
    </BsMainFormListLayout>
  </div>
</template>
<script>
import DatavReportView from '../platformReport/index.vue'
import ExportDialog from '../platformReport/ExportDialog.vue'
import PrintDialog from '../platformReport/PrintDialog.vue'
import resolveResult from '@/utils/result.js'
// import { get } from '@/api/http'
export default {
  name: 'DatavReportSearch',
  components: {
    DatavReportView,
    ExportDialog,
    PrintDialog
  },
  props: {
  },
  data() {
    return {
      excelPassword: '1234',
      status: '',
      reportViewArray: [],
      isleaf: true,
      agencyStatus: this.$store.getters.getMenuParams5.agencyStatus,
      commitLoading: false,
      titleText: '预算单位',
      dialogVisible: false,
      printVisible: false,
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
        isDept: 0
        // eleCode: 'VW_GK_AGENCY_TREE' // 'VW_BAS_AGENCY_INFO_LEAF_TREE',
        // queryCondition: this.$store.getters.getMenuParams5.queryCondition // 'and AGENCY_IDEN_CODE like \'1%\''
      },
      agencyTreeFilterText: '',
      agencyTreeData: [],
      inputTableTreeConfig: {
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 1, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'],
        format: '{name}',
        placeholder: '请选择',
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '{name}', // {code}-{name}
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          successCode: '100000', // 成功code
          statusField: 'code',
          method: 'post', // 请求方式
          url: ''
          // url: 'bisBudget/cfg/bgtCfgAgencyToReport/reportTree' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        defaultSelectFirstLeafNode: false,
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      inputTableTreeQueryparams: {
        type: ''
      },
      inputTableTreeFilterText: '',
      inputTableTreeData: [],
      tablePanls: [],
      currentTableTreeNodeKey: '',
      showLoading: true,
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
      queryFormItemConfigIn: [
        {
          field: 'sh_fund_type_',
          title: '资金渠道:',
          span: 12,
          itemRender: {
            name: '$vxeTree',
            props: {
              config: {
                placeholder: '资金渠道',
                isleaf: true,
                isHump: true,
                multiple: true,
                clearable: false,
                valueKeys: ['code', 'name', 'id'],
                format: '{code}-{name}',
                treeProps: {
                  // 树配置选项
                  labelFormat: '{code}-{name}',
                  nodeKey: 'id', // 树的主键
                  label: 'name', // 树的显示lalel字段
                  children: 'children' // 树的嵌套字段
                },
                axiosConfig: {
                  rootName: '全部',
                  successCode: '100000', // 成功code
                  statusField: 'code',
                  method: 'post', // 请求方式
                  url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
                }
              },
              queryparams: {
                eleCode: 'SHFUND_TYPE'
              }
            }
          }
        },
        {
          field: 'batch_no_',
          title: '上报批次:',
          span: 6,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                value: '1',
                label: '一上'
              },
              {
                value: '2',
                label: '二上'
              }
            ],
            props: {
              clearable: false,
              placeholder: '批次'
            }
          }
        },
        {
          field: 'datatype_',
          title: '数据节点:',
          span: 6,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                value: '',
                label: '全部'
              },
              {
                value: '1',
                label: '单位'
              },
              {
                value: '3',
                label: '部门'
              },
              {
                value: '5',
                label: '财政'
              }
            ],
            props: {
              clearable: false,
              placeholder: '审核状态'
            }
          }
        }
      ],
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
    commit() {
      let self = this
      if (!self.checkedAgencys.agencyCodes) {
        self.$XModal.message({ status: 'warning', message: '请先选择预算单位' })
        return false
      }
      if (self.checkedAgencys.agencyStatus !== '未提交') {
        self.$XModal.message({ status: 'warning', message: '该单位报表数据已提交,无法再次提交' })
        return false
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
        self.$XModal.message({ status: 'warning', message: '请先选择预算单位' })
        return false
      }
      if (self.checkedAgencys.agencyStatus !== '已提交') {
        self.$XModal.message({ status: 'warning', message: '该单位报表数据未提交,无法撤销提交' })
        return false
      }
      if (+self.checkedAgencys.deptStatus > 3) {
        self.$XModal.message({ status: 'warning', message: '该单位部门报表数据已送审，无法撤回' })
        return false
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
    setExcelParams() {
      let excelParams = []
      this.checkedAgencys.agency.forEach(agency => {
        let paramsObj = {
          sql_agency_code: '\'' + agency.code + '\'',
          sql_dept_code: '\'' + agency.code.substr(0, 3) + '\'',
          menuGuid: this.$store.state.curNavModule.guid,
          roleGuid: this.$store.state.curNavModule.roleguid,
          mofDivCode: this.$store.state.userInfo.admdiv,
          mof_div_code: this.$store.state.userInfo.province,
          fiscalYear: this.$store.state.userInfo.year
        }
        let excels = []
        this.inputTableTreeData.forEach(report => {
          excels.push({
            excelCode: report.id,
            sheetName: report.name,
            params: paramsObj
          })
        })
        let editPassword = this.$refs['datavReportView' + self.currentTableNode.id][0].encodeExcelPassword(this.excelPassword)
        excelParams.push({
          editPasswordEnabled: true,
          editPassword: editPassword,
          excelName: agency.name + this.$store.state.curNavModule.name,
          excels: excels
        })
      })
      return excelParams
    },
    setPrintParams() {
      let PrintParams = []
      this.checkedAgencys.agency.forEach(agency => {
        let paramsObj = {
          sql_agency_code: '\'' + agency.code + '\'',
          sql_dept_code: '\'' + agency.code.substr(0, 3) + '\'',
          menuGuid: this.$store.state.curNavModule.guid,
          roleGuid: this.$store.state.curNavModule.roleguid,
          mofDivCode: this.$store.state.userInfo.admdiv,
          mof_div_code: this.$store.state.userInfo.province,
          fiscalYear: this.$store.state.userInfo.year
        }
        let excels = []
        this.inputTableTreeData.forEach(report => {
          excels.push({
            excelCode: report.id,
            catalogueName: report.name,
            params: paramsObj
          })
        })
        PrintParams.push({
          excelName: agency.name + this.$store.state.curNavModule.name,
          excels: excels
        })
      })
      return PrintParams
    },
    batchExportExcel() {
      this.dialogVisible = true
      // let self = this
      // if (!this.checkedAgencys.agencyCodes) {
      //   this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
      //   return false
      // }
      // if (!self.currentTableNode.id) {
      //   this.$XModal.message({ status: 'info', message: '请先选择报表' })
      //   return false
      // }
      // let excelParams = this.setExcelParams()
      // self.$refs['datavReportView' + self.currentTableNode.id][0].batchExportExcel(excelParams)
    },
    batchExportPDF() {
      let self = this
      if (!this.checkedAgencys.agencyCodes) {
        this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
        return false
      }
      if (!self.currentTableNode.id) {
        this.$XModal.message({ status: 'info', message: '请先选择报表' })
        return false
      }
      let excelParams = this.setExcelParams()
      self.$refs['datavReportView' + self.currentTableNode.id][0].batchExportPDF(excelParams)
    },
    exportCurrentExcel() {
      let self = this
      if (!self.checkedAgencys.agencyCodes) {
        this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
        return false
      }
      if (!self.currentTableNode.id) {
        this.$XModal.message({ status: 'info', message: '请先选择报表' })
        return false
      }
      self.$refs['datavReportView' + self.currentTableNode.id][0].exportCurrentExcel()
    },
    exportCurrentPDF() {
      let self = this
      if (!self.checkedAgencys.agencyCodes) {
        this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
        return false
      }
      if (!self.currentTableNode.id) {
        this.$XModal.message({ status: 'info', message: '请先选择报表' })
        return false
      }
      self.$refs['datavReportView' + self.currentTableNode.id][0].exportCurrentPDF()
    },
    print() {
      let self = this
      if (!self.checkedAgencys.agencyCodes) {
        this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
        return false
      }
      if (!self.currentTableNode.id) {
        this.$XModal.message({ status: 'info', message: '请先选择报表' })
        return false
      }
      self.$refs['datavReportView' + self.currentTableNode.id][0].print()
    },
    // 批量打印
    batchprint() {
      this.printVisible = true
      // let self = this
      // if (!this.checkedAgencys.agencyCodes) {
      //   this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
      //   return false
      // }
      // if (!self.currentTableNode.id) {
      //   this.$XModal.message({ status: 'info', message: '请先选择报表' })
      //   return false
      // }
      // let draftList = this.setPrintParams()
      // self.$refs['datavReportView' + self.currentTableNode.id][0].batchprint(draftList)
    },
    // initFiscalConfig(menuguid) {
    //   get('/bisBudget/bgtFbConfig/getFbPageConfig?menuguid=' + menuguid).then(res => {
    //     if (res && res.code === '100000') {
    //       let optionsss = []
    //       let options = res.data.reportdatatype
    //       if (options && options !== '') {
    //         let optionss = options.split('#')
    //         optionss.forEach(s => {
    //           let ss = s.split('=')
    //           let value = ss[0]
    //           let label = ss[1]
    //           optionsss.push({ value: value, label: label })
    //         })
    //         this.queryFormItemConfigIn[2].itemRender.options = optionsss
    //       }
    //     }
    //   })
    // },
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
    showDialog() {
      this.dialogVisible = true
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
    },
    onAgencyTreeNodeClick({ node }) {
      this.status = node.name + '状态: ' + node.agencyStatus
      let agency = node
      let agencyIds = node.id
      let agencyCodes = node.code
      let agencyNames = node.name
      let deptCodes = node.code.substr(0, 3)
      let sqlAgencyCode = '\'' + node.code + '\''
      let sqlDeptCode = '\'' + deptCodes + '\''
      let agencyStatus = node.agencyStatus
      let deptStatus = node.deptStatus
      this.checkedAgencys = {
        agency,
        agencyIds,
        agencyCodes,
        agencyNames,
        deptCodes,
        sql_agency_code: sqlAgencyCode,
        sql_dept_code: sqlDeptCode,
        agencyStatus: agencyStatus,
        deptStatus: deptStatus
      }
      // 单位部门报表切换
      if (this.isleaf) {
        if (!node.isleaf) {
          this.isleaf = node.isleaf
          this.getReportData(this.params5.reportDeptType)
          this.currentTableNode = {}
        }
      } else {
        if (node.isleaf) {
          this.isleaf = node.isleaf
          this.getReportData(this.params5.reportType)
          this.currentTableNode = {}
        }
      }
      if (this.currentTableNode.id) {
        this.setReportableParams(this.currentTableNode)
        this.onSearchClick()
      }
      setTimeout(() => {
        this.delarLoading = false
      }, 500)
    },
    itemChange(obj) {
      let DataArr = []
      obj.$form.$children[0].$children[0].curCheckednodes.forEach((item) => {
        DataArr.push(item.code)
      })
      this.newDataArr = DataArr.map(i => '\'' + i + '\'').join(',')
    },
    onSearchClick() {
      let self = this
      if (!self.checkedAgencys.agencyCodes) {
        this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
        return false
      }
      if (!self.currentTableNode) {
        this.$XModal.message({ status: 'info', message: '请先选择查询表' })
        return false
      }
      // self.checkedForms = {
      //   sql_shfundtype_code: self.newDataArr,
      //   sql_batch_no: self.$refs.queryForm.getFormData().batch_no_,
      //   sql_datatype: self.$refs.queryForm.getFormData().datatype_
      // }
      // console.log(self.checkedForms, this.$refs.queryForm.getFormData(), 999999999999999)
      self.setReportableParams(self.currentTableNode)
      this.inputTableTreeData.forEach(v => {
        if (v.id === self.currentTableNode.id) {
          v['isLoad'] = true
        }
      })
      this.$nextTick(() => {
        console.log('当前查询表为：', self.currentTableNode.name)
        console.log(727, self.$refs)
        self.$refs['datavReportView' + self.currentTableNode.id][0].parentCallSearch()
        // self.$refs[`datavReportView${self.currentTableNode.id}`][0].parentCallSearch()
      })
      this.inputTableTreeData.forEach(v => {
        if (v.id === self.currentTableNode.id) {
          v['isLoad'] = false
        }
      })
    },
    onInputTableTreeNodeClick({ node }) {
      let self = this
      if (!this.checkedAgencys.agencyCodes) {
        this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
        return false
      }
      if (this.$store.state.userInfo.province === '310000000') {
        if (self.userInfo.usertype === '0') {
          self.usertype = '1'
        } else if (self.userInfo.usertype === '1') {
          self.usertype = '5'
        } else if (self.userInfo.usertype === '2') {
          self.usertype = '3'
        }
      }
      if (node && node.id) {
        // 初始页面显示的值
        // let data = this.$refs.queryForm.getFormData()
        // data.sh_fund_type_ = this.shFundType_
        // data.sh_fund_type_Code = this.shFundType_Code
        // data.sh_fund_type_Id = this.shFundType_Id
        // data.sh_fund_type_Name = this.shFundType_Name
        // data.batch_no_ = '1'
        // data.datatype_ = self.usertype
        // this.queryFormData = data
        this.$nextTick(() => {
          // 资金渠道真实的值（全局搜newDataArr）
          // this.newDataArr = self.defshFundType.split(',').map(v => {
          //   v = `'${v}'`
          //   return v
          // })
          // this.newDataArr = this.newDataArr.join(',')
          this.inputTableTreeData.forEach(v => {
            if (v.id === node.id) {
              v['isLoad'] = true
            } else {
              v['isLoad'] = false
            }
          })
          this.setReportableParams(node)
          this.currentTableNode = node
          // if (self.recordMap.indexOf(self.currentTableNode.id) !== -1) {
          //   console.log('当前跳过查询表为：', self.currentTableNode.name)
          //   return
          // }
          this.onSearchClick()
          this.recordMap.push(node.id)
        })
        // this.$refs.bsTab.curTabSelect = this.deepCopy(node)
      } else {
        this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
      }
    },
    onNodeCheckChange() {
      this.delarLoading = true
      let agencies = this.$refs.agencyTree.getCheckedNodes()
      if (!agencies || agencies.length === 0 || (agencies.length === 1 && agencies[0].code === 'root' && agencies[0].children.length === 0)) {
        // this.$XModal.message({ status: 'info', message: '请' })
        return
      }
      let agency = agencies.filter(item => item.isleaf).map(item => { return item })
      let agencyIds = agency.map(v => v.id)
      let agencyCodes = agency.map(v => v.code)
      let agencyNames = agency.map(v => v.name)
      let deptCodes = Array.from(new Set(agency.map(v => v.code.substr(0, 3))))
      let sqlAgencyCode = agencyCodes.map(i => '\'' + i + '\'').join(',')
      let sqlDeptCode = deptCodes.map(i => '\'' + i + '\'').join(',')
      this.checkedAgencys = {
        agencyIds,
        agencyCodes,
        agencyNames,
        deptCodes,
        sql_agency_code: sqlAgencyCode,
        sql_dept_code: sqlDeptCode
      }
      if (this.currentTableNode) {
        this.setReportableParams(this.currentTableNode)
      }
      setTimeout(() => {
        this.delarLoading = false
      }, 500)
    },
    getReportData(reportType) {
      let param = {
        type: reportType,
        // agencyId: agencyIds,
        menuGuid: this.curNavModule.guid
      }
      let self = this
      self.$http.post('bisBudget/cfg/bgtCfgAgencyToReport/queryReportTree', param).then((res) => {
        self.showLoading = false
        self.resolveResult(data => {
          console.log(850, self.inputTableTreeData)
          self.inputTableTreeData = data
          self.inputTableTreeData.forEach(v => {
            v['isLoad'] = false
          })
          if (this.reportViewArray.length === 0) {
            this.reportViewArray = data
          } else {
            data.forEach(row => {
              let id = this.reportViewArray.findIndex(item => {
                if (item.reportguid === row.reportguid) {
                  return true
                }
              })
              if (id < 0) {
                this.reportViewArray.push(row)
              }
            })
            data.forEach(rows => {
              rows.children.forEach(row => {
                let id = this.reportViewArray.findIndex(item => {
                  if (item.reportguid === row.reportguid) {
                    return true
                  }
                })
                if (id < 0) {
                  this.reportViewArray.push(row)
                }
              })
            })
          }
        }, res)
      }).catch((e) => {
        self.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
        self.showLoading = false
      })
    },
    getQueryFormData() {
      let param = {
        eleCode: 'SHFUND_TYPE'
      }
      let self = this
      self.$http.post('bisConfig/config/common/queryTreeAssistData', param).then((res) => {
        self.showLoading = false
        self.resolveResult(data => {
          // 传输数据
          let defSort = self.getAllData(data)
          let defshFundType = []
          defSort.forEach(item => {
            defshFundType.push(item.code)
          })
          self.defshFundType = defshFundType.toString()
          // 显示数据
          let datas = self.getAllChildren(data)
          let getqueryFormData = []
          let getqueryFormDataCode = []
          let getqueryFormDataId = []
          let getqueryFormDataName = []
          datas.forEach(item => {
            getqueryFormData.push(item.code + '##' + item.name + '##' + item.guid)
            getqueryFormDataCode.push(item.code)
            getqueryFormDataId.push(item.guid)
            getqueryFormDataName.push(item.name)
          })
          self.shFundType_ = getqueryFormData.join(',')
          self.shFundType_Code = getqueryFormDataCode
          self.shFundType_Id = getqueryFormDataId
          self.shFundType_Name = getqueryFormDataName
        }, res)
      }).catch((e) => {
        self.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
        self.showLoading = false
      })
    },
    getAllChildren(data, children = []) {
      data.forEach(item => {
        if (item.children && item.children.length) {
          this.getAllChildren(item.children, children)
        } else {
          children.push(item)
        }
      })
      return children
    },
    getAllData(data, children = []) {
      data.forEach(item => {
        children.push(item)
        if (item.children && item.children.length) {
          // children.push(item.code)
          this.getAllData(item.children, children)
        }
      })
      return children
    },
    setReportableParams(inputReport) {
      this.reportParams = {
        code: inputReport.id,
        paramsObj: {
          title: inputReport.name,
          city: '上海市',
          agencyCode: this.checkedAgencys.agencyCodes,
          agencyId: this.checkedAgencys.agencyIds,
          agencyName: this.checkedAgencys.agencyNames,
          deptCode: this.checkedAgencys.deptCodes,
          sql_agency_code: this.checkedAgencys.sql_agency_code,
          sql_dept_code: this.checkedAgencys.sql_dept_code,
          menuGuid: this.$store.state.curNavModule.guid,
          roleGuid: this.$store.state.curNavModule.roleguid,
          mofDivCode: this.$store.state.userInfo.admdiv,
          mof_div_code: this.$store.state.userInfo.province,
          fiscalYear: this.$store.state.userInfo.year
          // sql_shfundtype_code: this.checkedForms.sql_shfundtype_code,
          // sql_batch_no: this.checkedForms.sql_batch_no,
          // sql_datatype: this.checkedForms.sql_datatype
        }
      }
    },
    getreportParams() {
      this.params5 = this.$store.getters.getMenuParams5
    },
    initPasswordConfig() {
      return new Promise((resolve, reject) => {
        this.$ToolFn.pageFn.getPageConfig({}, this).then(res => {
          if (res) {
            if (res.code === '100000') {
              if (res.data.excelpassword) {
                this.excelPassword = res.data.excelpassword
              }
            }
          }
          reject(new Error('没有请求到数据'))
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    deepCopy(obj) { // 深拷贝通用方法
      // var new_arr = JSON.parse(JSON.stringify(arr)) // 不仅可拷贝数组还能拷贝对象（ 但不能拷贝函数）
      // 只拷贝对象
      let me = this
      if (typeof obj !== 'object' || obj === null) return obj
      // 根据obj的类型判断是新建一个数组还是一个对象
      let newObj = obj instanceof Array ? [] : {}
      for (let key in obj) {
        // 遍历obj,并且判断是obj的属性才拷贝
        if (obj.hasOwnProperty(key)) {
          // 判断属性值的类型，如果是对象递归调用深拷贝
          newObj[key] =
            typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
        }
      }
      return newObj
    }
  },
  mounted() {
    if (this.params5.reportType === 'querytable') {
      this.titleText = '预算部门'
    }
    this.getReportData(this.params5.reportType)
    this.initPasswordConfig()
  },
  created() {
    // this.initFiscalConfig(this.$store.state.curNavModule.guid)
    this.getQueryFormData()
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
