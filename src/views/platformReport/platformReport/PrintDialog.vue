<!--
 * @Description:
 * @Author: ghy
 * @Date: 2022-11-07 19:20:58
 * @LastEditors: ghy
 * @LastEditTime: 2022-11-11 14:59:53
-->
<template>
  <vxe-modal
    v-model="printVisible"
    title="批量打印"
    width="80%"
    height="80%"
    :position="{ top: '10%', left: '10%' }"
    resize
    @close="close"
  >
    <el-row style="margin-bottom:10px;">
      <div style="float: right;padding-right:20px;">
        <vxe-button
          content="打印"
          status="primary"
          @click="batchPrint"
        />
      </div>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" style="height:480px;width:600px">
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
      <el-col :span="12" style="height:480px;width:600px">
        <div class="mmc-right-tree height-all">
          <div class="mmc-right-tree-title">
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
              :config="inputTableTreeExportConfig"
              :tree-data="inputTableTreeData"
              :queryparams="inputTableTreeQueryparams"
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
    printVisible: {
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
    inputTableTreeConfig: {
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
    }
  },
  data() {
    return {
      isLoading: false,
      delarLoading: false,
      agencyTreeFilterText: '',
      agencyTreeData: [],
      currentAgencyTreeNodeKey: '',
      checkedkeys: [],
      inputTableTreeFilterText: '',
      inputTableTreeQueryparams: {
        type: ''
      },
      currentTableTreeNodeKey: '',
      agencyTreeExportConfig: {},
      inputTableTreeExportConfig: {},
      checkedAgencys: {},
      checkInputTable: [],
      isLoad: false
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
        agency,
        agencyIds,
        agencyCodes,
        agencyNames,
        deptCodes,
        sql_agency_code: sqlAgencyCode,
        sql_dept_code: sqlDeptCode
      }
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
    batchPrint() {
      if (!this.checkedAgencys.agencyCodes) {
        this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
        return false
      }
      let reports = this.$refs.inputTableTree.getCheckedNodes()
      if (reports.length === 0) {
        this.$XModal.message({ status: 'info', message: '请先选择报表' })
        return false
      }
      let draftList = this.setPrintParams(reports)
      this.$refs.datavReportView.batchPrint(draftList)
    },
    setPrintParams(reports) {
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
        reports.forEach(report => {
          excels.push({
            excelCode: report.id,
            params: paramsObj
          })
        })
        PrintParams.push({
          catalogueName: agency.name + this.$store.state.curNavModule.name,
          excels: excels
        })
      })
      return PrintParams
    },
    searchCilck() {
    },
    close() {
      this.$emit('update:printVisible', false)
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
    printVisible: {
      handler(newval) {
        if (newval) {
          this.searchCilck()
        }
      },
      immediate: true
    },
    inputTableTreeConfig: {
      handler(newval) {
        if (newval) {
          this.inputTableTreeExportConfig = {
            ...newval,
            axiosConfig: {
              rootName: '全部',
              successCode: '100000', // 成功code
              statusField: 'code',
              method: 'post', // 请求方式
              url: ''
            },
            multiple: true
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
