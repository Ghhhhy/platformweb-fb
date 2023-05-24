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
                  title-text="下达报表"
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
                  :is-loading="reportLoading"
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
          <vxe-radio v-if="isEdit" v-model="agencyType" label="2" content="市直机关" />
          <!-- <vxe-radio v-if="isEdit" v-model="agencyType" label="3" content="党政机关基层单位" /> -->
          <div style="float: right;">
            <vxe-button v-if="!isEdit" status="primary" @click="doEdit">编辑</vxe-button>
            <vxe-button v-if="isEdit" :loading="submitLoading" status="primary" @click="submit">提交</vxe-button>
            <vxe-button v-if="isEdit" :loading="submitLoading" @click="cancel">取消</vxe-button>
          </div>
        </div>
        <template>
          <div style="height:95%">
            <el-row>
              <div style="margin-bottom: 10px;margin-top: 10px;">
                <vxe-input
                  v-model="month"
                  placeholder="下达月份"
                  style="width:45%"
                  :readonly="!isEdit"
                  :disabled-method="disabledDateMethod"
                  value-format="yyyy-MM"
                  type="month"
                />
              </div>
              <div style="width:45%">
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
                  <div class="mmc-left-tree-body" style="height: 400px;">
                    <BsTree
                      ref="agencyTree"
                      open-loading
                      :is-loading="delarLoading"
                      :filter-text="agencyTreeFilterText"
                      :config="agencyTreeConfig"
                      :tree-data="agencyTreeData"
                      :current-node-key="currentAgencyTreeNodeKey"
                      :default-checked-keys="checkedkeys"
                      :queryparams="agencyTreeQueryparams"
                      @onNodeCheckChange="onNodeCheckChange"
                    />
                  </div>
                </div>
              </div>
            </el-row>
          </div>
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
      agencyType: '1',
      submitLoading: false,
      isEdit: false,
      month: '',
      reportLoading: false,
      leftTreeStatus: '1',
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
          url: 'bisBasicinfo/basicinfo/basAgencyInfoGd/queryAgencyTree' // 'bisBasicinfo/basicinfo/basAgencyInfoGd/queryAgencyTree' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        defaultSelectFirstLeafNode: true,
        multiple: false, // 是否多选,
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
      checkedAgencys: {
        agencyIds: [],
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
    onAgencyTypeClick(object, $event) {
      this.delarLoading = true
      this.$http.get('/bisBudget/fillReport/getAgencyByAgencyType', {
        agencyType: object.label
      }).then(res => {
        if (res && res.code === '100000') {
          this.$refs.agencyTree.treeOptionFn().setCheckedKeys(res.data)
          this.onNodeCheckChange()
          this.delarLoading = false
        } else {
          this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
          this.delarLoading = false
        }
      }).catch(e => {
        this.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
        this.delarLoading = false
      })
    },
    cancel() {
      this.isEdit = false
      this.agencyTreeConfig.multiple = false
      this.inputTableTreeConfig.multiple = false
      this.$refs.inputTableTree.onNodeClick = this.onInputTableTreeNodeClick
      this.onInputTableTreeNodeClick({ node: this.currentTableNode })
    },
    doEdit() {
      this.isEdit = true
      this.agencyTreeConfig.multiple = true
      this.inputTableTreeConfig.multiple = true
      this.$refs.inputTableTree.onNodeClick = false
      this.agencyType = '1'
    },
    disabledDateMethod({ date }) {
      let year = date.format('YYYY')
      if (year !== '2023') {
        return true
      }
    },
    submit() {
      if (this.$refs.inputTableTree.getCheckedNodes().length > 0) {
        if (this.month) {
          if (this.params5.IssuedType === '2' && this.$refs.inputTableTree.getCheckedNodes().length > 1) {
            this.$XModal.message({ status: 'error', message: '结转结余只能选择一个下达报表' })
          } else if (this.params5.IssuedType === '1' && this.$refs.inputTableTree.getCheckedNodes().length !== 3) {
            this.$XModal.message({ status: 'error', message: '三公经费请选择全部报表' })
          } else {
            this.submitLoading = true
            this.$http.post('/bisBudget/fillReport/getReportIssuedMonth', {
              reportIds: this.$refs.inputTableTree.getCheckedNodes().map(v => v.id)
            }).then(res => {
              if (res && res.code === '100000') {
                let historyMonth
                if (res.data > 0 && res.data < 10) {
                  historyMonth = '当前选中报表批次：当年01至0' + res.data + '月份'
                } else if (res.data === 0) {
                  historyMonth = '当前批次为空'
                } else {
                  historyMonth = '当前选中报表批次：当年01至' + res.data + '月份'
                }
                this.$XModal.confirm(historyMonth + ',下达月份为' + this.month.split('-')[1] + '月份，是否下达？').then(type => {
                  if (type === 'confirm') {
                    this.$http.post('/bisBudget/fillReport/IssuedReport', {
                      agencyIds: this.checkedAgencys.agencyIds,
                      reportIds: this.$refs.inputTableTree.getCheckedNodes().map(v => v.id),
                      month: this.month.split('-')[1],
                      IssuedType: this.params5.IssuedType
                    }).then(res => {
                      if (res && res.code === '100000') {
                        this.$XModal.message({ status: 'success', message: '保存成功' })
                        this.isEdit = false
                        this.agencyTreeConfig.multiple = false
                        this.inputTableTreeConfig.multiple = false
                        this.submitLoading = false
                      } else {
                        this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
                        this.submitLoading = false
                      }
                    }).catch(e => {
                      this.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
                      this.submitLoading = false
                    })
                  } else {
                    this.submitLoading = false
                  }
                })
              } else {
                this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
                this.submitLoading = false
              }
            }).catch(e => {
              this.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
              this.submitLoading = false
            })
          }
        } else {
          this.$XModal.message({ status: 'error', message: '请选择下达月份' })
        }
      } else {
        this.$XModal.message({ status: 'error', message: '请选择下达报表' })
      }
    },
    onInputTableTreeNodeClick({ node }) {
      if (node && node.id) {
        this.$nextTick(() => {
          this.currentTableNode = node
          // if (this.month) {
          this.delarLoading = true
          this.agencyTreeConfig.multiple = true
          this.$http.post('/bisBudget/fillReport/queryReportIssuedAgency', {
            reportId: this.currentTableNode.id
          }).then(res => {
            if (res && res.code === '100000') {
              if (res.data.length > 0) {
                this.$refs.agencyTree.treeOptionFn().setCheckedKeys(res.data.map(item => item.agencyId))
                this.month = this.$store.state.userInfo.year + '-' + res.data[0].month
              } else {
                this.$refs.agencyTree.treeOptionFn().setCheckedKeys([])
              }
              this.onNodeCheckChange()
              this.delarLoading = false
            } else {
              this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
              this.delarLoading = false
            }
          }).catch(e => {
            this.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
            this.delarLoading = false
          })
          // }
        })
      }
    },
    onNodeCheckChange() {
      let agencies = this.$refs.agencyTree.getCheckedNodes()
      console.log(338, agencies)
      // if (!agencies || agencies.length === 0 || (agencies.length === 1 && agencies[0].code === 'root' && agencies[0].children.length === 0)) {
      //   // this.$XModal.message({ status: 'info', message: '请' })
      //   return
      // }
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
      if (this.currentTableNode) {
        this.setReportableParams(this.currentTableNode)
      }
      setTimeout(() => {
        this.delarLoading = false
      }, 500)
    },
    getReportData(reportType) {
      this.reportLoading = true
      let param = {
        type: reportType,
        menuGuid: this.curNavModule.guid
      }
      let self = this
      self.$http.post('bisBudget/cfg/bgtCfgAgencyToReport/queryReportTree', param).then((res) => {
        self.resolveResult(data => {
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
        this.reportLoading = false
      }).catch((e) => {
        self.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
        this.reportLoading = false
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
          report_id: '\'' + inputReport.id + '\'',
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
  },
  created() {
    // this.initFiscalConfig(this.$store.state.curNavModule.guid)
    // this.getQueryFormData()
    this.getreportParams()
  },
  watch: {
    agencyType(curVal, oldVal) {
      this.delarLoading = true
      if (this.agencyType === '1') {
        console.log(528, this.agencyTreeData)
        this.delarLoading = false
      } else {
        this.$http.get('/bisBudget/fillReport/getAgencyByAgencyType', {
          agencyType: this.agencyType
        }).then(res => {
          if (res && res.code === '100000') {
            this.$refs.agencyTree.treeOptionFn().setCheckedKeys(res.data)
            this.onNodeCheckChange()
            this.delarLoading = false
          } else {
            this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
            this.delarLoading = false
          }
        }).catch(e => {
          this.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
          this.delarLoading = false
        })
      }
    }
    // month(curVal, oldVal) {
    //   if (!this.currentTableNode.id) {
    //     this.agencyTreeConfig.multiple = false
    //     this.$XModal.message({ status: 'error', message: '请选择报表' })
    //   } else {
    //     if (curVal) {
    //       this.delarLoading = true
    //       this.agencyTreeConfig.multiple = true
    //       this.$http.post('/bisBudget/fillReport/queryReportIssuedAgency', {
    //         reportId: this.currentTableNode.id,
    //         month: curVal.split('-')[1]
    //       }).then(res => {
    //         if (res && res.code === '100000') {
    //           this.$refs.agencyTree.treeOptionFn().setCheckedKeys(res.data)
    //           this.onNodeCheckChange()
    //           console.log(675, this.checkedAgencys)
    //           this.delarLoading = false
    //         } else {
    //           this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
    //           this.delarLoading = false
    //         }
    //       }).catch(e => {
    //         this.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
    //         this.delarLoading = false
    //       })
    //     } else {
    //       this.delarLoading = true
    //       this.agencyTreeConfig.multiple = false
    //       this.$refs.agencyTree.treeOptionFn().setCheckedKeys([])
    //       this.onNodeCheckChange()
    //       this.delarLoading = false
    //     }
    //   }
    // }
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
