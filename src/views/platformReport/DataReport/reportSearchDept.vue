<!--
 * @Description:
 * @Author: ghy
 * @Date: 2023-01-04 16:07:27
 * @LastEditors: chenxuanke
 * @LastEditTime: 2023-07-06 18:00:20
-->
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
                  title-text="预算单位"
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
        <div class="main-query">
          <BsQuery
            v-if="isquery"
            ref="queryForm"
            :query-form-item-config="queryFormItemConfigIn"
            :query-form-data="queryFormData"
            :query-config="queryConfig"
            @onSearchClick="onSearchClick"
            @onSearchResetClick="onresetSearchClick"
            @itemChange="itemChange"
          />
        </div>
        <div
          v-for="(item, index) in inputTableTreeData"
          :key="index"
          :style="{ height: item.id === currentTableNode.id ? '7%' : '0px' }"
        >
          <div v-show="item.id === currentTableNode.id" :style="{ height: item.id === currentTableNode.id ? '100%' : '0px' }">
            <div class="main-query">
              <BsQuery
                :ref="'queryForm' + item.id"
                :query-form-item-config="queryFormItemConfigIn"
                :query-form-data="queryFormData"
                :query-config="queryConfig"
                :edit-rules="queryFormRules"
                @onSearchClick="onSearchClick"
                @onSearchResetClick="onresetSearchClick"
                @itemChange="itemChange"
              />
            </div>
          </div>
        </div>
        <template>
          <div style="height:95%">
            <div
              v-for="(item, index) in inputTableTreeData"
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
      </template>
    </BsMainFormListLayout>
  </div>
</template>
<script>
import DatavReportView from '../platformReport/index.vue'
import resolveResult from '@/utils/result.js'
import { get } from '@/api/http'
export default {
  name: 'DatavReportSearch',
  components: {
    DatavReportView
  },
  props: {
  },
  data() {
    return {
      isquery: true,
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
        isleaf: 1, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'],
        format: '{code}-{name}',
        placeholder: '请选择',
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '{code}-{name}', // {code}-{name}
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          rootName: '全部',
          successCode: '100000', // 成功code
          statusField: 'code',
          method: 'get', // 请求方式
          url: 'bisBasicinfo/basicinfo/comm/queryCommTree' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        defaultSelectFirstLeafNode: true,
        multiple: true, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      currentAgencyTreeNodeKey: '',
      currentAgencyNode: {},
      agencyTreeQueryparams: {
        roleguid: this.$store.state.curNavModule.roleguid,
        eleCode: 'vw_bas_agency_dep_tree',
        // eleCode: this.$store.getters.getMenuParams5.eleCode,
        queryCondition: this.$store.getters.getMenuParams5.queryCondition // 'and AGENCY_IDEN_CODE like \'1%\''
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
      checkedForms: {
        sql_batch_no: '',
        sql_datatype: ''
      },
      checkedAgencys: {
        agencyIds: '',
        agencyCodes: '',
        agencyNames: '',
        deptCodes: '',
        sql_dept_code: '',
        sql_agency_code: ''
      },
      currentTableNode: {},
      queryFormRules: {},
      queryFormData: {},
      shFundType_: '',
      shFundType_Code: '',
      shFundType_Id: '',
      shFundType_Name: '',
      queryFormItemConfigIn: [],
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
    initFiscalConfig(menuguid) {
      let self = this
      let data = this.$refs.queryForm.getFormData()
      this.queryFormItemConfigIn.forEach((item) => {
        if (item.field === 'batchNo') {
          data.batchNo = '2'
        }
        if (item.field === 'datatype') {
          if (this.$store.state.userInfo.province === '310000000') {
            if (self.userInfo.usertype === '0') {
              data.datatype = '1'
            } else if (self.userInfo.usertype === '1') {
              data.datatype = '5'
            } else if (self.userInfo.usertype === '2') {
              data.datatype = '3'
            } else {
              data.datatype = '0'
            }
          }
        }
      })
      this.queryFormData = data
      get('/bisBudget/bgtFbConfig/getFbPageConfig?menuguid=' + menuguid).then(res => {
        if (res && res.code === '100000') {
          let optionsss = []
          let options = res.data.reportdatatype
          if (options && options !== '') {
            let optionss = options.split('#')
            optionss.forEach(s => {
              let ss = s.split('=')
              let value = ss[0]
              let label = ss[1]
              optionsss.push({ value: value, label: label })
            })
            this.queryFormItemConfigIn.forEach((item) => {
              if (item.field === 'datatype') {
                item.itemRender.options = optionsss
              }
            })
            // this.queryFormItemConfigIn[2].itemRender.options = optionsss
          }
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
      // this.onAgencyTreeNodeClick({ node: curSelectNode })
    },
    onAgencyTreeNodeClick({ node }) {
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
      if (self.$refs['queryForm' + self.currentTableNode.id][0].getFormData().batchNo) {
        self.checkedForms.sql_batch_no = self.$refs['queryForm' + self.currentTableNode.id][0].getFormData().batchNo
      }
      if (self.$refs['queryForm' + self.currentTableNode.id][0].getFormData().datatype) {
        self.checkedForms.sql_datatype = self.$refs['queryForm' + self.currentTableNode.id][0].getFormData().datatype
      }
      self.setReportableParams(self.currentTableNode)
      console.log(this.reportParams, 888888888)
      this.inputTableTreeData.forEach(v => {
        if (v.id === self.currentTableNode.id) {
          v['isLoad'] = true
        }
      })
      this.$nextTick(() => {
        console.log('当前查询表为：', self.currentTableNode.name)
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
      if (node && node.id) {
        this.currentTableNode = node
        this.isquery = false
        this.$nextTick(() => {
          console.log(self.defshFundType, '00')
          // 资金渠道真实的值（全局搜newDataArr）
          this.newDataArr = self.defshFundType.split(',').map(v => {
            v = `'${v}'`
            return v
          })
          this.newDataArr = this.newDataArr.join(',')
          this.inputTableTreeData.forEach(v => {
            if (v.id === node.id) {
              v['isLoad'] = true
            } else {
              v['isLoad'] = false
            }
          })
          if (self.recordMap.indexOf(self.currentTableNode.id) !== -1) {
            console.log('当前跳过查询表为：', self.currentTableNode.name)
            return
          }
          setTimeout(() => {
            this.onSearchClick()
            this.recordMap.push(node.id) // 有时间改成得到值再记录
          }, 10)
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
    getReportData() {
      let param = {
        type: this.params5.reportType,
        // agencyId: agencyIds,
        menuGuid: this.curNavModule.guid
      }
      let self = this
      self.$http.post('bisBudget/cfg/bgtCfgAgencyToReport/queryReportTree', param).then((res) => {
        self.showLoading = false
        self.resolveResult(data => {
          self.inputTableTreeData = data
          self.inputTableTreeData.forEach(v => {
            v['isLoad'] = false
          })
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
          let datass = this.$refs.queryForm.getFormData()
          datass.shFundType = getqueryFormData.join(',')
          datass.shFundTypeCode = getqueryFormDataCode
          datass.shFundTypeId = getqueryFormDataId
          datass.shFundTypeName = getqueryFormDataName
          this.queryFormData = datass
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
      let self = this
      let formData = {}
      if (self.$refs['queryForm' + self.currentTableNode.id]) {
        formData = self.$refs['queryForm' + self.currentTableNode.id][0].getFormData()
        for (var v in formData) {
          if (v.endsWith('Code')) {
            let data = formData[v].split(',').map(v => {
              v = `'${v}'`
              return v
            })
            formData[v] = data.join(',')
          }
        }
      }
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
          fiscalYear: this.$store.state.userInfo.year,
          sql_shfundtype_code: self.newDataArr,
          sql_datatype: this.checkedForms.sql_datatype,
          sql_batch_no: this.checkedForms.sql_batch_no,
          ...formData
        }
      }
      console.log(this.reportParams, '++++++++++++')
    },
    getreportParams() {
      this.params5 = this.$store.getters.getMenuParams5
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
    },
    queryFormItem(dicCode) {
      let self = this
      get('/bisConfig/config/report/getBossReportConfig', { dicCode }).then(res => {
        self.resolveResult(data => {
          self.queryFormItemConfigIn = JSON.parse(data.formItems)
          this.initFiscalConfig(this.$store.state.curNavModule.guid)
        }, res)
      }).catch(e => {
        self.$XModal.message({ status: 'error', message: '获取配置列失败' })
      })
    }
  },
  mounted() {
    this.getReportData()
  },
  created() {
    this.getreportParams()
    if (this.params5.dicCode) {
      this.queryFormItem(this.params5.dicCode)
      this.getQueryFormData()
    }
    console.log(this.params5)
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
// 数据量过大时 默认展示横向滚动条
.sheet-edit[data-v-1135dae0] {
    width: 100%;
    height: 98% !important;
    position: relative;
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
