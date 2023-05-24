<!--  formList模版   Author:Titans@2396757591@qq.com -->
<template>
  <div class="height-all reportSearchModel">
    <BsMainFormListLayout :left-visible.sync="leftVisible">
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <BsSplitPane :min-percent="0" split="horizontal" :default-percent="percentNum">
          <template slot="paneL">
            <div v-if="showFlag === '1'" class="mmc-left-tree height-all">
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
                  @onCheckChange="onNodeCheckChange"
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
      percentNum: 50,
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
        isPramas: false,
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
          url: '' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
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
        roleGuid: this.$store.state.curNavModule.roleguid,
        // eleCode: 'VW_BAS_AGENCY_PR_TREE',
        // eleCode: 'vw_bas_mof_dep_tree',
        eleCode: 'VW_BAS_AGENCY_INFO_LEAF_TREE',
        queryCondition: this.transJson(this.$store.state.curNavModule.param5).queryCondition
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
        if (item.field === 'qssj') {
          data.qssj = new Date(Date.parse(new Date().getFullYear() + '-1-1')).format('YYYY-MM-DD')
        }
      })
      this.queryFormData = data
      get('/bisBudget/api/budget/bisBudget/bgtFbConfig/getFbPageConfig?menuguid=' + menuguid).then(res => {
        if (res && res.code === '100000') {
          let optionsss = []
          let options = ''
          if (res.data && res.data.reportdatatype) {
            options = res.data.reportdatatype
          }
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
      if (curSelectNode) {
        this.currentAgencyTreeNodeKey = curSelectNode.id
        this.currentAgencyNode = curSelectNode
      }
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
      if (this.showFlag !== '2') {
        if (!self.checkedAgencys.agencyCodes) {
          this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
          return false
        }
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
      if (this.showFlag !== '2') {
        if (!this.checkedAgencys.agencyCodes) {
          this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
          return false
        }
      }
      if (node && node.id) {
        this.currentTableNode = node
        this.isquery = false
        this.$nextTick(() => {
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
    onNodeCheckChange(a) {
      this.delarLoading = true
      console.log(arguments)
      console.log(this.$refs.agencyTree.curCheckednodes)
      let agencies = this.$refs.agencyTree.curCheckednodes
      if (!agencies || agencies.length === 0 || (agencies.length === 1 && agencies[0].code === 'root' && agencies[0].children.length === 0)) {
        // this.$XModal.message({ status: 'info', message: '请' })
        this.checkedAgencys.agencyCodes = ''
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
      let menuGuidValue = this.params5.reportMenu
      if (!this.params5.reportMenu) {
        menuGuidValue = this.curNavModule.guid
      }
      let param = {
        type: this.params5.reportType,
        // agencyId: agencyIds,
        // menuGuid: '30828356A82C49EBA4EF7EBBA1F90989'
        menuGuid: menuGuidValue
      }
      let self = this
      self.$http.post('/bisBudget/api/budget/bisBudget/cfg/bgtCfgAgencyToReport/queryReportTree', param).then((res) => {
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
    getTreeData() {
      let self = this
      self.$http.get('/bisBudget/api/budget/bisBasicinfo/basicinfo/basAgencyInfoGd/queryAgencyTree', self.agencyTreeQueryparams).then((res) => {
        self.showLoading = false
        self.resolveResult(data => {
          self.agencyTreeData = data
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
      self.$http.post('/bisBudget/api/budget/bisConfig/config/common/queryTreeAssistData', param).then((res) => {
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
          datass.shFundTypeCode = getqueryFormDataCode.join(',')
          datass.shFundTypeId = getqueryFormDataId.join(',')
          datass.shFundTypeName = getqueryFormDataName.join(',')
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
    getreportParams() {
      // this.params5 = this.$store.getters.getMenuParams5
      this.params5 = this.transJson(this.$store.state.curNavModule.param5)
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
      get('/bisBudget/api/budget/bisConfig/config/report/getBossReportConfig', { dicCode }).then(res => {
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
    this.getreportParams()
    this.agencyTreeQueryparams.eleCode = this.params5.eleCode
    this.getReportData()
    this.getTreeData()
  },
  created() {
    this.getreportParams()
    if (this.params5.showFlag === '2') {
      this.showFlag = '2'
      this.percentNum = 0
    } else {
      // 默认值 '1'
      // this.showFlag = '1'
      this.showFlag = '1'
      this.percentNum = 50
    }
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
.reportSearchModel {
  .vxe-form--item-title {
      display: inline-block !important;
  }
}
</style>
