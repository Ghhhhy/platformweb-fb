<template>
  <vxe-modal
    ref="exportDialog"
    v-model="dialogVisible"
    title="批量导出"
    width="80%"
    height="80%"
    :position="{ top: '10%', left: '10%' }"
    resize
    @close="close"
  >
    <el-row style="margin-bottom:10px;">
      <div style="float: right;padding-right:20px;">
        <vxe-button v-if="agencyStatus !== '2'" status="primary" content="导出Excel">
          <template #dropdowns>
            <vxe-button
              content="分单位导出"
              status="primary"
              @click="exportExcel"
            />
            <vxe-button
              content="分部门导出"
              status="primary"
              @click="exportDeptExcel"
            />
          </template>
        </vxe-button>
        <vxe-button v-if="agencyStatus !== '2'" status="primary" content="导出PDF">
          <template #dropdowns>
            <vxe-button
              content="分单位导出"
              status="primary"
              @click="exportPDF"
            />
            <vxe-button
              content="分部门导出"
              status="primary"
              @click="exportDeptPDF"
            />
          </template>
        </vxe-button>
        <!-- <vxe-button
          v-if="agencyStatus !== '2'"
          content="分部门导出Excel"
          status="primary"
          @click="exportDeptExcel"
        />
        <vxe-button
          v-if="agencyStatus !== '2'"
          content="分部门导出PDF"
          status="primary"
          @click="exportDeptPDF"
        /> -->
        <vxe-button
          v-if="agencyStatus === '2'"
          content="导出Excel"
          status="primary"
          @click="exportExcel"
        />
        <vxe-button
          v-if="agencyStatus === '2'"
          content="导出PDF"
          status="primary"
          @click="exportPDF"
        />
      </div>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8" style="height:80%;width:33%">
        <div>
          <div class="mmc-left-tree-title">
            <BsTreeSet
              title-text="预算单位"
              :is-hide="true"
              @onAsideChange="leftVisible = false"
              @onChangeInput="(value) => {
                agencyTreeFilterText = value
              }"
            />
          </div>
          <div class="mmc-left-tree-body">
            <BsTree
              ref="agencyTree"
              open-loading
              :is-loading="isLoading"
              :loading="delarLoading"
              :filter-text="agencyTreeFilterText"
              :config="agencyTreeExportConfig"
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
      </el-col>
      <el-col :span="8" style="{height:80%;width:33%}">
        <div class="mmc-right-tree height-all">
          <div class="mmc-right-tree-title">
            <BsTreeSet
              title-text="单位公开表"
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
              :config="inputAgencyTableTreeExportConfig"
              :tree-data="inputAgencyTableTreeData"
              :queryparams="inputAgencyTableTreeQueryparams"
              :current-node-key="currentTableTreeNodeKey"
              @onNodeCheckChange="onInputTableTreeNodeChange"
            />
          </div>
        </div>
      </el-col>
      <el-col v-if="agencyStatus !== '2'" :span="8" style="height:80%;width:33%">
        <div class="mmc-right-tree height-all">
          <div class="mmc-right-tree-title">
            <BsTreeSet
              title-text="部门公开表"
              :is-show-input="true"
              :is-hide="true"
              @onChangeInput="(value) => {
                inputTableTreeFilterText = value
              }"
            />
          </div>
          <div class="mmc-left-tree-body">
            <BsTree
              ref="inputDeptTableTree"
              open-loading
              :filter-text="inputTableTreeFilterText"
              :config="inputDeptTableTreeExportConfig"
              :tree-data="inputDeptTableTreeData"
              :queryparams="inputDeptTableTreeQueryparams"
              :current-node-key="currentTableTreeNodeKey"
              @onNodeCheckChange="onInputTableTreeNodeChange"
            />
          </div>
        </div>
      </el-col>
      <el-col style="display:none;">
        <DatavReportView
          ref="datavReportView"
          :isload="true"
          :report-params="reportParams"
        />
      </el-col>
    </el-row>
  </vxe-modal>
</template>

<script>
import DatavReportView from './index.vue'

export default {
  name: 'AddDialog',
  components: { DatavReportView },
  props: {
    reportParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    excelPassword: {
      type: String,
      default: () => {
        return ''
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    agencyTreeConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    agencyTreeQueryparams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    inputAgencyTableTreeConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    inputDeptTableTreeConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    inputTableTreeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    reportType: {
      type: String,
      default: () => {
        return ''
      }
    },
    agencyStatus: {
      type: String,
      default: () => {
        return ''
      }
    },
    reportDeptType: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      deptAgencys: [],
      isLoading: false,
      delarLoading: false,
      agencyTreeFilterText: '',
      agencyTreeData: [],
      currentAgencyTreeNodeKey: '',
      checkedkeys: [],
      inputTableTreeFilterText: '',
      inputAgencyTableTreeQueryparams: {
        type: ''
      },
      inputDeptTableTreeQueryparams: {
        type: ''
      },
      currentTableTreeNodeKey: '',
      agencyTreeExportConfig: {},
      inputAgencyTableTreeExportConfig: {},
      inputDeptTableTreeExportConfig: {},
      checkedAgencys: {},
      checkInputTable: [],
      isLoad: false,
      inputAgencyTableTreeData: [],
      inputDeptTableTreeData: []
    }
  },
  methods: {
    onTreeLoaded({ treeData, tree, currentNodeKey, curSelectNode }, bstree) {
      let id = this.getFirstId(treeData)
      if (id && id !== null && id !== '') {
        tree.setCurrentKey(id)
        bstree.defaultExpandedKeys = [id]
      }
      this.currentAgencyTreeNodeKey = curSelectNode.id
      this.currentAgencyNode = curSelectNode
      // this.onAgencyTreeNodeClick({ node: curSelectNode })
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
    onNodeCheckChange() {
      this.delarLoading = true
      let agencies = this.$refs.agencyTree.getCheckedNodes()
      if (!agencies || agencies.length === 0 || (agencies.length === 1 && agencies[0].code === 'root' && agencies[0].children.length === 0)) {
        // this.$XModal.message({ status: 'info', message: '请' })
        this.checkedAgencys = {}
        this.deptAgencys = []
        return
      }
      let dept = agencies.filter(item => item.code.substring(0, 3) === item.code).map(item => { return item })
      let agency = agencies.filter(item => item.isleaf).map(item => { return item })
      let agencyIds = agency.map(v => v.id)
      let agencyCodes = agency.map(v => v.code)
      let deptCodes = dept.map(v => v.code)
      let agencyNames = agency.map(v => v.name)
      let sqlAgencyCode = agencyCodes.map(i => '\'' + i + '\'').join(',')
      let sqlDeptCode = deptCodes.map(i => '\'' + i + '\'').join(',')
      this.checkedAgencys = {
        dept,
        agency,
        agencyIds,
        agencyCodes,
        agencyNames,
        deptCodes,
        sql_agency_code: sqlAgencyCode,
        sql_dept_code: sqlDeptCode
      }
      let deptAgencys = []
      dept.forEach(data => {
        let deptAgency = agency.filter(item => item.code.substring(0, 3) === data.code)
        deptAgencys.push({
          dept: data,
          agencys: deptAgency
        })
      })
      this.deptAgencys = deptAgencys
      setTimeout(() => {
        this.delarLoading = false
      }, 500)
    },
    onInputTableTreeNodeChange() {
      let reports = this.$refs.inputTableTree.getCheckedNodes()
      if (!reports || reports.length === 0) {
        return
      }
      this.checkInputTable = reports
    },
    exportExcel() {
      console.log(279, this.checkedAgencys)
      if (!this.checkedAgencys.agencyCodes) {
        this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
        return false
      }
      let reports = this.$refs.inputTableTree.getCheckedNodes()
      if (reports.length === 0) {
        this.$XModal.message({ status: 'info', message: '请先选择单位报表' })
        return false
      }
      let excelParams = this.setExportParams(reports)
      console.log(234, this.$refs.datavReportView)
      this.$refs.datavReportView.batchExportExcel(excelParams)
    },
    exportDeptExcel() {
      if (this.deptAgencys.length === 0) {
        this.$XModal.message({ status: 'info', message: '请先选择部门' })
        return false
      }
      let agencyReports = this.$refs.inputTableTree.getCheckedNodes()
      let deptReports = this.$refs.inputDeptTableTree.getCheckedNodes()
      console.log(360, deptReports)
      // if (agencyReports.length === 0) {
      //   this.$XModal.message({ status: 'info', message: '请先选择单位报表' })
      //   return false
      // }
      if (deptReports.length === 0) {
        this.$XModal.message({ status: 'info', message: '请先选择部门报表' })
        return false
      }
      let excelParams = this.setDeptExportParams(agencyReports, deptReports)
      this.$refs.datavReportView.batchExportExcel(excelParams)
    },
    exportDeptPDF() {
      if (this.deptAgencys.length === 0) {
        this.$XModal.message({ status: 'info', message: '请先选择部门' })
        return false
      }
      let agencyReports = this.$refs.inputTableTree.getCheckedNodes()
      let deptReports = this.$refs.inputDeptTableTree.getCheckedNodes()
      // if (agencyReports.length === 0) {
      //   this.$XModal.message({ status: 'info', message: '请先选择单位报表' })
      //   return false
      // }
      if (deptReports.length === 0) {
        this.$XModal.message({ status: 'info', message: '请先选择部门报表' })
        return false
      }
      let excelParams = this.setDeptExportParams(agencyReports, deptReports)
      this.$refs.datavReportView.batchExportPDF(excelParams)
    },
    exportPDF() {
      if (!this.checkedAgencys.agencyCodes) {
        this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
        return false
      }
      let reports = this.$refs.inputTableTree.getCheckedNodes()
      if (reports.length === 0) {
        this.$XModal.message({ status: 'info', message: '请先选择单位报表' })
        return false
      }
      let excelParams = this.setExportParams(reports)
      console.log(234, this.$refs.datavReportView)
      this.$refs.datavReportView.batchExportPDF(excelParams)
    },
    setExportParams(reports) {
      let excelParams = []
      let editPassword = this.$refs.datavReportView.encodeExcelPassword(this.excelPassword)
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
        reports.forEach(report => {
          excels.push({
            excelCode: report.id,
            sheetName: report.name,
            params: paramsObj
          })
        })
        excelParams.push({
          editPasswordEnabled: true,
          editPassword: editPassword,
          excelName: agency.code + '-' + agency.name + '-' + this.$store.state.curNavModule.name,
          excels: excels
        })
      })
      return excelParams
    },
    setDeptExportParams(agencyReports, deptReports) {
      console.log(391, agencyReports)
      console.log(392, deptReports)
      let editPassword = this.$refs.datavReportView.encodeExcelPassword(this.excelPassword)
      console.log(392, editPassword)
      let excelParams = []
      this.deptAgencys.forEach(data => {
        let dept = data.dept
        let deptFolderList = []
        deptFolderList.push(dept.code)
        deptFolderList.push(dept.code + dept.name)
        let cxexcels = []
        let caexcels = []
        deptReports.forEach(report => {
          if (report.parentId === 'gkquerytableparent') {
            cxexcels.push(
              {
                excelCode: report.id,
                sheetName: report.name,
                params: {
                  sql_agency_code: '\'' + dept.code + '\'',
                  mofDivCode: this.$store.state.userInfo.admdiv,
                  mof_div_code: this.$store.state.userInfo.province,
                  fiscalYear: this.$store.state.userInfo.year
                }
              }
            )
          } else {
            caexcels.push(
              {
                excelCode: report.id,
                sheetName: report.name,
                params: {
                  sql_agency_code: '\'' + dept.code + '\'',
                  mofDivCode: this.$store.state.userInfo.admdiv,
                  mof_div_code: this.$store.state.userInfo.province,
                  fiscalYear: this.$store.state.userInfo.year
                }
              }
            )
          }
        })
        // 部门查询表设置参数
        if (cxexcels.length > 0) {
          excelParams.push({
            editPasswordEnabled: true,
            editPassword: editPassword,
            folderList: deptFolderList,
            excelName: dept.name,
            excels: cxexcels
          })
        }
        // 草案表设置参数
        if (caexcels.length > 0) {
          excelParams.push({
            editPasswordEnabled: true,
            editPassword: editPassword,
            folderList: [dept.code],
            excelName: dept.code + dept.name + '（草案附表）',
            excels: caexcels
          })
        }
        // 单位查询表设置参数
        data.agencys.forEach(agency => {
          let agencyFolderList = []
          agencyFolderList.push(dept.code)
          agencyFolderList.push(dept.code + dept.name)
          agencyFolderList.push(dept.name + '下属单位')
          let excels = []
          agencyReports.forEach(report => {
            excels.push(
              {
                excelCode: report.id,
                sheetName: report.name,
                params: {
                  sql_agency_code: '\'' + agency.code + '\'',
                  mofDivCode: this.$store.state.userInfo.admdiv,
                  mof_div_code: this.$store.state.userInfo.province,
                  fiscalYear: this.$store.state.userInfo.year
                }
              }
            )
          })
          if (excels.length > 0) {
            excelParams.push({
              editPasswordEnabled: true,
              editPassword: editPassword,
              folderList: agencyFolderList,
              excelName: agency.name,
              excels: excels
            })
          }
        })
      })
      console.log(416, excelParams)
      return excelParams
    },
    searchCilck() {
    },
    close() {
      this.$emit('update:dialogVisible', false)
    }
  },
  created() {
    this.reportParams = {
      code: 'aee8c2a03ccf11edbb113367536e32bc',
      paramsObj: {}
    }
  },
  mounted() {
  },
  updated() {
  },
  watch: {
    dialogVisible: {
      handler(newval) {
        if (newval) {
          this.searchCilck()
        }
      },
      immediate: true
    },
    inputAgencyTableTreeConfig: {
      handler(newval) {
        if (newval) {
          this.inputAgencyTableTreeExportConfig = {
            ...newval,
            multiple: true,
            axiosConfig: {
              rootName: '全部',
              successCode: '100000', // 成功code
              statusField: 'code',
              method: 'post', // 请求方式
              url: 'bisBudget/cfg/bgtCfgAgencyToReport/queryReportTree'
            }
          }
          this.inputAgencyTableTreeQueryparams = {
            type: this.reportType,
            menuGuid: this.$store.state.curNavModule.guid
          }
        }
      },
      immediate: true,
      deep: true
    },
    inputDeptTableTreeConfig: {
      handler(newval) {
        if (newval) {
          this.inputDeptTableTreeExportConfig = {
            ...newval,
            multiple: true,
            axiosConfig: {
              rootName: '全部',
              successCode: '100000', // 成功code
              statusField: 'code',
              method: 'post', // 请求方式
              url: 'bisBudget/cfg/bgtCfgAgencyToReport/queryReportTree'
            }
          }
          this.inputDeptTableTreeQueryparams = {
            type: this.reportDeptType,
            menuGuid: this.$store.state.curNavModule.guid
          }
        }
      },
      immediate: true,
      deep: true
    },
    agencyTreeConfig: {
      handler(newval) {
        if (newval) {
          this.agencyTreeExportConfig = {
            ...newval,
            multiple: true
          }
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped>
.mmc-left-tree-body {
    height: 400px;
    border: solid 1px #aaa;
}

</style>
