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
                />
              </div>
            </div>
          </template>
        </BsSplitPane>
      </template>
      <template v-slot:mainForm>
        <div style="margin-bottom: 10px;margin-top: 10px;">
          <div style="float: right;">
            <vxe-button v-if="leftTreeStatus === wshStatus" status="primary" @click="submit">保存</vxe-button>
          </div>
          <div style="float: left;">
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
                  :editable="editable"
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
      addData: [],
      updateData: [],
      editable: true,
      month: '',
      reportLoading: false,
      wshStatus: '(' + this.$store.getters.getMenuParams5.wshStatus + ')',
      shStatus: '(' + this.$store.getters.getMenuParams5.shStatus.replaceAll('-', ',') + ')',
      leftTreeStatus: '(' + this.$store.getters.getMenuParams5.wshStatus + ')',
      tabStatusBtnConfig: {
        buttons: [
          {
            label: '全部',
            code: '',
            type: 'button',
            iconName: 'base-all.png',
            iconNameActive: 'base-all-active.png',
            iconUrlActive: '',
            iconUrl: '',
            status: '1',
            curValue: 'commonTransferBudgetAddApplyEntryYwConfig-wtj'
          },
          {
            label: this.$store.getters.getMenuParams5.reportStatus === '2' ? '未提交' : '未审核',
            code: '(' + this.$store.getters.getMenuParams5.wshStatus + ')',
            type: 'button',
            iconName: 'base-daiban.png',
            iconNameActive: 'base-daiban-active.png',
            iconUrlActive: '',
            iconUrl: '',
            status: '4',
            curValue: 'commonTransferBudgetAddApplyEntryYwConfig-bth'
          },
          {
            label: this.$store.getters.getMenuParams5.reportStatus === '2' ? '已提交' : '已审核',
            code: '(' + this.$store.getters.getMenuParams5.shStatus.replaceAll('-', ',') + ')',
            type: 'button',
            iconName: 'base-daiban.png',
            iconNameActive: 'base-daiban-active.png',
            iconUrlActive: '',
            iconUrl: '',
            status: '2',
            curValue: 'commonTransferBudgetAddApplyEntryYwConfig-ytj'
          }
        ],
        curButton: {
          label: '未审核',
          code: '(' + this.$store.getters.getMenuParams5.wshStatus + ')',
          type: 'button',
          iconName: 'base-daiban.png',
          iconNameActive: 'base-daiban-active.png',
          iconUrlActive: '',
          iconUrl: '',
          status: '4',
          curValue: 'commonTransferBudgetAddApplyEntryYwConfig-bth'
        },
        buttonsInfos: {
        }
      },
      excelPassword: '1234',
      status: '',
      reportViewArray: [
        {
          id: 'f3cb4fe08c3011edaeab6942f6dc4b15',
          name: '会议费细化'
        }
      ],
      isleaf: true,
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
          url: 'bisBasicinfo/basicinfo/basAgencyInfoGd/queryPublicFundsAgencyTree' // 'bisBasicinfo/basicinfo/basAgencyInfoGd/queryAgencyTree' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
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
        reportStatus: '(' + this.$store.getters.getMenuParams5.wshStatus + ')',
        IssuedType: this.$store.getters.getMenuParams5.IssuedType,
        roleGuid: this.$store.state.curNavModule.roleguid,
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
    validateExcelData() {
      let flag = false
      let messageArr = []
      let totalConferenceFee = parseFloat(parseFloat(this.updateData[2]).toFixed(2))
      let firstConferenceFee = parseFloat(parseFloat(this.updateData[3]).toFixed(2))
      let secondConferenceFee = parseFloat(parseFloat(this.updateData[4]).toFixed(2))
      let thirdConferenceFee = parseFloat(parseFloat(this.updateData[5]).toFixed(2))
      let fourthConferenceFee = parseFloat(parseFloat(this.updateData[6]).toFixed(2))
      console.log(341, firstConferenceFee + secondConferenceFee + thirdConferenceFee + fourthConferenceFee)
      if (totalConferenceFee !== parseFloat((firstConferenceFee + secondConferenceFee + thirdConferenceFee + fourthConferenceFee).toFixed(2))) {
        flag = true
        messageArr.push('一类会议，二类会议，三类会议，四类会议之和不等于会议费合计，无法保存。')
      }
      return {
        flag: flag,
        message: Array.from(new Set(messageArr)).toString()
      }
    },
    disabledDateMethod({ date }) {
      let year = date.format('YYYY')
      if (year !== '2023') {
        return true
      }
    },
    doEdit() {
      let self = this
      if (!self.checkedAgencys.agencyCodes) {
        self.$XModal.message({ status: 'warning', message: '请先选择预算单位' })
        return false
      }
      if (!self.currentTableNode.id) {
        self.$XModal.message({ status: 'info', message: '请先选择报表' })
        return false
      }
    },
    cancelEdit() {
      let self = this
      self.$XModal.confirm('您确定切换单位吗,是否保存当前页面数据?').then(type => {
        if (type === 'confirm') {
          self.submit()
        } else {
          // self.buttonEditable = false
        }
      })
    },
    onTapPanelTabClick(obj) {
      this.leftTreeStatus = obj.code
      this.agencyTreeQueryparams.reportStatus = this.leftTreeStatus
      this.currentTableNode = {}
    },
    getSubmitData() {
      let self = this
      self.updateData = []
      let result = this.$refs['datavReportView' + this.currentTableNode.id][0].getExcelData()
      self.updateData = Object.values(Object.values(result[0].rows)[Object.values(result[0].rows).length - 1].cells).map(v => v.text)
    },
    submit() {
      let self = this
      if (!self.checkedAgencys.agencyCodes) {
        self.$XModal.message({ status: 'warning', message: '请先选择预算单位' })
        return false
      }
      if (!self.currentTableNode.id) {
        self.$XModal.message({ status: 'info', message: '请先选择报表' })
        return false
      }
      this.getSubmitData()
      console.log(513, this.updateData)
      let errorObj = this.validateExcelData()
      if (errorObj?.flag) {
        this.$notify({
          title: '填报校验不通过',
          dangerouslyUseHTMLString: true,
          message: `<div style="color: teal">${errorObj.message}</div>`,
          type: 'warning',
          duration: 7000
        })
        return false
      } else {
        self.$http.post('/bisBudget/fillReport/updateConferenceFee', {
          agencyCode: this.checkedAgencys.agencyCodes,
          f1: parseFloat(this.updateData[3]).toFixed(2),
          f2: parseFloat(this.updateData[4]).toFixed(2),
          f3: parseFloat(this.updateData[5]).toFixed(2),
          f4: parseFloat(this.updateData[6]).toFixed(2)
        }).then(res => {
          if (res && res.code === '100000') {
            self.$XModal.message({ status: 'success', message: '保存成功' })
            this.onSearchClick()
          } else {
            self.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
          }
        }).catch(e => {
          self.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
        })
      }
    },
    commit() {
      let self = this
      if (!self.checkedAgencys.agencyCodes) {
        self.$XModal.message({ status: 'warning', message: '请先选择预算单位' })
        return false
      }
      this.getSubmitData()
      let errorObj = this.validateExcelData()
      if (errorObj?.flag) {
        this.$notify({
          title: '校验不通过',
          dangerouslyUseHTMLString: true,
          message: `<div style="color: teal">${errorObj.message}</div>`,
          type: 'warning',
          duration: 7000
        })
        return false
      } else {
        this.commitLoading = true
        self.$XModal.confirm('您确定要将' + self.checkedAgencys.agency.name + '单位的会议费明细数据提交吗?').then(type => {
          if (type === 'confirm') {
            self.$http.post('/bisBudget/fillReport/conferenceFeeCommit', {
              agencyCode: self.checkedAgencys.agencyCodes,
              feeStatus: +self.$store.getters.getMenuParams5.reportStatus + 1
            }).then(res => {
              if (res && res.code === '100000') {
                this.$refs.agencyTree.initTreeData(true)
                this.commitLoading = false
                this.currentTableNode = {}
                self.$XModal.message({ status: 'success', message: '提交成功' })
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
      }
    },
    cancel() {
      let self = this
      if (!self.checkedAgencys.agencyCodes) {
        self.$XModal.message({ status: 'warning', message: '请先选择预算单位' })
        return false
      }
      if (+self.params5.reportStatus === 2) {
        if (+self.checkedAgencys.agency.agencyStatus === 5) {
          self.$XModal.message({ status: 'warning', message: '该单位数据部门已审核，无法撤销提交' })
          return false
        } else if (+self.checkedAgencys.agency.agencyStatus === 7) {
          self.$XModal.message({ status: 'warning', message: '该单位数据业务处已审核，无法撤销提交' })
          return false
        }
      } else if (+self.params5.reportStatus === 4) {
        if (+self.checkedAgencys.agency.agencyStatus === 7) {
          self.$XModal.message({ status: 'warning', message: '该单位数据业务处已审核，无法撤销提交' })
          return false
        }
      }
      this.commitLoading = true
      self.$XModal.confirm('您确定要将' + self.checkedAgencys.agency.name + '单位的会议费明细数据撤销提交吗?').then(type => {
        if (type === 'confirm') {
          self.$http.post('/bisBudget/fillReport/conferenceFeeCommit', {
            agencyCode: self.checkedAgencys.agencyCodes,
            feeStatus: +self.$store.getters.getMenuParams5.reportStatus - 1
          }).then(res => {
            if (res && res.code === '100000') {
              self.$refs.agencyTree.initTreeData(true)
              self.commitLoading = false
              self.currentTableNode = {}
              self.$XModal.message({ status: 'success', message: '撤销提交成功' })
            } else {
              self.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
              self.commitLoading = false
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
      if (id) {
        this.currentAgencyTreeNodeKey = curSelectNode.id
        this.currentAgencyNode = curSelectNode
        this.onAgencyTreeNodeClick({ node: curSelectNode })
      } else {
        this.currentAgencyTreeNodeKey = ''
        this.currentAgencyNode = ''
        this.onAgencyTreeNodeClick({})
      }
    },
    onAgencyTreeNodeClick({ node }) {
      if (node) {
        let agency = node
        let agencyIds = node.id
        let agencyCodes = node.code
        let agencyNames = node.name
        let deptCodes = node.code.substr(0, 3)
        let sqlAgencyCode = '\'' + node.code + '\''
        let sqlDeptCode = '\'' + deptCodes + '\''
        let deptStatus = node.deptStatus
        this.checkedAgencys = {
          agency,
          agencyIds,
          agencyCodes,
          agencyNames,
          deptCodes,
          sql_agency_code: sqlAgencyCode,
          sql_dept_code: sqlDeptCode,
          deptStatus: deptStatus
        }
        this.currentTableNode = this.reportViewArray[0]
      } else {
        this.checkedAgencys = {
          agencyIds: '',
          agencyCodes: '',
          agencyNames: '',
          deptCodes: '',
          sql_dept_code: '',
          sql_agency_code: ''
        }
        this.currentTableNode = {}
      }
      if (node && this.currentTableNode.id) {
        this.setReportableParams(this.currentTableNode)
        this.onSearchClick()
      }
      setTimeout(() => {
        this.delarLoading = false
      }, 500)
    },
    agencyDeptChange(node) {
      // 单位部门报表切换
      if (this.isleaf) {
        if (!node.isleaf) {
          if (!this.params5.reportType.endsWith('Dept')) {
            this.params5.reportType += 'Dept'
          }
          this.getDeptReportData(this.params5.reportType)
        } else {
          if (this.params5.reportType.endsWith('Dept')) {
            this.params5.reportType = this.params5.reportType.substring(0, this.params5.reportType.length - 4)
          }
          this.getReportData(this.params5.reportType)
        }
      } else {
        if (node.isleaf) {
          if (this.params5.reportType.endsWith('Dept')) {
            this.params5.reportType = this.params5.reportType.substring(0, this.params5.reportType.length - 4)
          }
          this.getReportData(this.params5.reportType)
        } else {
          if (!this.params5.reportType.endsWith('Dept')) {
            this.params5.reportType += 'Dept'
          }
          this.getDeptReportData(this.params5.reportType)
        }
      }
      this.isleaf = node.isleaf
      this.currentTableNode = {}
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
      if (!this.checkedAgencys.agencyCodes) {
        this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
        return false
      }
      if (node && node.id) {
        this.$nextTick(() => {
          this.inputTableTreeData.forEach(v => {
            if (v.id === node.id) {
              v['isLoad'] = true
            } else {
              v['isLoad'] = false
            }
          })
          this.getSubmitData()
          if (this.addData.length > 0 || this.updateData.length > 0) {
            this.$XModal.confirm('您确定切换报表吗,是否保存当前页面数据?').then(type => {
              if (type === 'confirm') {
                let errorObj = this.validateExcelData()
                if (errorObj?.flag) {
                  this.$notify({
                    title: '填报校验不通过',
                    dangerouslyUseHTMLString: true,
                    message: `<div style="color: teal">${errorObj.message}</div>`,
                    type: 'warning',
                    duration: 7000
                  })
                  return false
                } else {
                  this.$http.post('/bisBudget/fillReport/updateFillReport', {
                    addList: this.addData,
                    updateList: this.updateData
                  }).then(res => {
                    if (res && res.code === '100000') {
                      this.$XModal.message({ status: 'success', message: '保存成功' })
                      this.currentTableNode = node
                      this.onSearchClick()
                    } else {
                      this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
                    }
                  }).catch(e => {
                    this.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
                  })
                }
              } else {
                this.currentTableNode = node
                this.onSearchClick()
              }
            })
          } else {
            this.currentTableNode = node
            this.onSearchClick()
          }
          // this.currentTableNode = node
          // this.onSearchClick()
        })
      } else {
        this.$XModal.message({ status: 'info', message: '请先选择预算单位' })
      }
    },
    getReportData(reportType) {
      this.reportLoading = true
      let param = {
        type: reportType,
        menuGuid: this.curNavModule.guid,
        agencyCode: this.checkedAgencys.agencyCodes,
        status: this.leftTreeStatus
      }
      let self = this
      self.$http.post('bisBudget/fillReport/queryPublicFundsReportTree', param).then((res) => {
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
    getDeptReportData(reportType) {
      let param = {
        type: reportType,
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
          fiscalYear: this.$store.state.userInfo.year,
          status: +this.params5.reportStatus - 2
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
    // this.getReportData(this.params5.reportType)
  },
  created() {
    // this.initFiscalConfig(this.$store.state.curNavModule.guid)
    // this.getQueryFormData()
    if (+this.$store.getters.getMenuParams5.wshStatus > 1) {
      this.tabStatusBtnConfig.buttons.push({
        label: '未上报',
        code: '(' + this.$store.getters.getMenuParams5.wtjStatus.replaceAll('-', ',') + ')',
        type: 'button',
        iconName: 'base-daiban.png',
        iconNameActive: 'base-daiban-active.png',
        iconUrlActive: '',
        iconUrl: '',
        status: '2',
        curValue: 'commonTransferBudgetAddApplyEntryYwConfig-ytj'
      })
    }
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
