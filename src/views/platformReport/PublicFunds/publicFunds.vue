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
          <div v-if="leftTreeStatus === ''" style="float: left;">
            <vxe-button status="primary" @click="onSearchClick">查询</vxe-button>
          </div>
          <div style="float: left;">
            <el-tag v-if="batch !== ''">{{ batch }}</el-tag>
          </div>
          <div style="float: right;">
            <el-tag v-if="currentTableNode.id === '527e9b006bf211ed93118b2cf5a0ffe1'" style="margin-right: 5px;">{{ feeStatus }}</el-tag>
            <vxe-button v-if="!params5.reportType.endsWith('Dept') && leftTreeStatus === wshStatus" status="primary" @click="submit">保存</vxe-button>
            <vxe-button v-if="leftTreeStatus !== ''" status="primary" @click="onSearchClick">查询</vxe-button>
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
      validateMoney: '0',
      batch: '',
      feeStatus: '',
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
          {
            label: '已审核',
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
      reportViewArray: [],
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
      let result = this.$refs['datavReportView' + this.currentTableNode.id][0].getExcelData()
      if (this.currentTableNode.id === '498b25b0696611ed9e5f739380671c0c') {
        let data = Object.values(result[0].rows)
        console.log(402, data)
        data = data.filter(item => {
          let cellsArray = Object.values(item.cells)
          if (cellsArray[0].text === '因公出国（境）经费' || cellsArray[0].text === '公务接待费' || cellsArray[0].text === '购置费' || cellsArray[0].text === '运行费') {
            if (cellsArray.length >= 6) {
              return true
            }
          }
        }).map(v => {
          let cellsArray = Object.values(v.cells)
          let text = cellsArray[0].text
          let value1 = cellsArray[cellsArray.length - 3].value
          let value2 = cellsArray[cellsArray.length - 2].value
          let remark = cellsArray[cellsArray.length - 1].text
          return { text: text, value1: value1, value2: value2, remark: remark }
        })
        console.log(407, data)
        let flag = false
        let messageArr = []
        data.forEach(item => {
          if (parseFloat(item.value1) > 0 && !item.remark) {
            flag = true
            messageArr.push('<br />' + item.text + '与年初预算数增减额大于0 备注说明不能为空')
          }
          if (parseFloat(item.value2) > 0 && !item.remark) {
            flag = true
            messageArr.push('<br />' + item.text + '与上年同期增减额大于0 备注说明不能为空')
          }
        })
        return {
          flag: flag,
          message: Array.from(new Set(messageArr)).toString()
        }
      } else if (this.currentTableNode.id === '527e9b006bf211ed93118b2cf5a0ffe1') {
        let data = Object.values(result[0].rows)
        data = data.filter(item => {
          let cellsArray = Object.values(item.cells)
          if (cellsArray[0].text === '合计数') {
            if (cellsArray.length >= 6) {
              return true
            }
          }
        }).map(v => {
          let cellsArray = Object.values(v.cells)
          let text = cellsArray[0].text
          let value1 = cellsArray[cellsArray.length - 3].value
          let value2 = cellsArray[cellsArray.length - 2].value
          let remark = cellsArray[cellsArray.length - 1].text
          return { text: text, value1: value1, value2: value2, remark: remark }
        })
        console.log(407, data)
        let flag = false
        let messageArr = []
        data.forEach(item => {
          if (parseFloat(item.value1) > 0 && !item.remark) {
            flag = true
            messageArr.push('<br />会议费' + item.text + '与年初预算数增减额大于0 备注说明不能为空')
          }
          if (parseFloat(item.value2) > 0 && !item.remark) {
            flag = true
            messageArr.push('<br />会议费' + item.text + '与上年同期增减额大于0 备注说明不能为空')
          }
        })
        return {
          flag: flag,
          message: Array.from(new Set(messageArr)).toString()
        }
      } else if (this.currentTableNode.id === '4b9a74506bf011ed93118b2cf5a0ffe1') {
        let flag = false
        let messageArr = []
        let data = Object.values(result[0].rows)
        let money = parseFloat(parseFloat(Object.values(data[3].cells)[1].text).toFixed(2))
        if (parseFloat(this.validateMoney) < money) {
          flag = true
          messageArr.push('因公出国（境）经费执行数[' + this.validateMoney + ']小于因公出国（境）经费培训费执行数[' + money + '],无法保存')
        }
        data = data.filter(item => {
          let cellsArray = Object.values(item.cells)
          if (cellsArray[0].text === '因公出国（境）培训费' || cellsArray[0].text === '培训费') {
            if (cellsArray.length >= 5) {
              return true
            }
          }
        }).map(v => {
          let cellsArray = Object.values(v.cells)
          let text = cellsArray[0].text
          let value1 = cellsArray[cellsArray.length - 3].value
          let value2 = cellsArray[cellsArray.length - 2].value
          let remark = cellsArray[cellsArray.length - 1].text
          return { text: text, value1: value1, value2: value2, remark: remark }
        })
        data.forEach(item => {
          if (parseFloat(item.value1) > 0 && !item.remark) {
            flag = true
            messageArr.push('<br />' + item.text + '与年初预算数增减额大于0 备注说明不能为空')
          }
          if (parseFloat(item.value2) > 0 && !item.remark) {
            flag = true
            messageArr.push('<br />' + item.text + '与上年同期增减额大于0 备注说明不能为空')
          }
        })
        return {
          flag: flag,
          message: Array.from(new Set(messageArr)).toString()
        }
      } else if (this.currentTableNode.id === 'bd7aee10755a11edb5b15dce11cd17ee') {
        let flag = false
        let messageArr = []
        let data = Object.values(result[0].rows)
        let bigMoney = parseFloat(parseFloat(Object.values(data[3].cells)[2].value).toFixed(2))
        let minMoney = parseFloat(parseFloat(Object.values(data[3].cells)[5].text).toFixed(2))
        if (minMoney > bigMoney) {
          flag = true
          messageArr.push('截止至2023年预计数[' + minMoney + ']大于2022年结转余额与2021年结转余额之和[' + bigMoney + '],无法保存')
        }
        return {
          flag: flag,
          message: Array.from(new Set(messageArr)).toString()
        }
      } else if (this.currentTableNode.id === 'f9a0ea906c6611ed9f1967825a03cdcd') {
        let flag = false
        let messageArr = []
        let data = Object.values(result[0].rows)
        let bigMoney = parseFloat(parseFloat(Object.values(data[3].cells)[2].value).toFixed(2))
        let minMoney = parseFloat(parseFloat(Object.values(data[3].cells)[4].text).toFixed(2))
        if (minMoney > bigMoney) {
          flag = true
          messageArr.push('截止至2023年预计数[' + minMoney + ']大于2022年结转余额[' + bigMoney + '],无法保存')
        }
        return {
          flag: flag,
          message: Array.from(new Set(messageArr)).toString()
        }
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
      self.addData = []
      self.updateData = []
      if (self.currentTableNode.id && !this.params5.reportType.endsWith('Dept')) {
        let data = self.$refs['datavReportView' + self.currentTableNode.id][0].submit()
        if (data.add) {
          var dataMap = new Map()
          data.add.forEach(add => {
            if (dataMap.has(add.ITEM_NAME)) {
              dataMap.set(add.ITEM_NAME, Object.assign(dataMap.get(add.ITEM_NAME), add))
            } else {
              dataMap.set(add.ITEM_NAME, add)
            }
          })
          for (let key of dataMap.keys()) {
            let data = dataMap.get(key)
            this.addData.push(data)
          }
        }
        this.addData.forEach(add => {
          for (let key in add) {
            if (key.startsWith('F')) {
              let keys = key.split('_')
              add[keys[0].toLowerCase()] = add[key]
            } else if (key.startsWith('R')) {
              let keys = key.split('_')
              add[keys[0].toLowerCase()] = add[key]
            } else {
              if (key === 'GUID') {
                add['guid'] = add[key]
              }
              if (key === 'ITEM_NAME') {
                add['itemName'] = add[key]
              }
            }
          }
        })
        if (data.update) {
          var updateDataMap = new Map()
          data.update.forEach(update => {
            if (updateDataMap.has(update.ITEM_NAME)) {
              updateDataMap.set(update.ITEM_NAME, Object.assign(updateDataMap.get(update.ITEM_NAME), update))
            } else {
              updateDataMap.set(update.ITEM_NAME, update)
            }
          })
          for (let key of updateDataMap.keys()) {
            let data = updateDataMap.get(key)
            this.updateData.push(data)
          }
        }
        this.updateData.forEach(update => {
          for (let key in update) {
            if (key.startsWith('F')) {
              let keys = key.split('_')
              update[keys[0].toLowerCase()] = update[key]
            } else if (key.startsWith('R')) {
              let keys = key.split('_')
              update[keys[0].toLowerCase()] = update[key]
            } else {
              if (key === 'GUID') {
                update['guid'] = update[key]
              }
              if (key === 'ITEM_NAME') {
                update['itemName'] = update[key]
              }
            }
          }
        })
      }
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
        self.$http.post('/bisBudget/fillReport/updateFillReport', {
          addList: this.addData,
          updateList: this.updateData
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
      this.commitLoading = true
      self.$XModal.confirm('您确定要将' + self.checkedAgencys.agency.name + '单位的报表:' + Array.from(new Set(this.inputTableTreeData.map(v => v.name))).toString() + '数据提交吗?').then(type => {
        if (type === 'confirm') {
          self.$http.post('/bisBudget/fillReport/reportCommit', {
            agencyId: self.checkedAgencys.agency.id,
            status: +self.$store.getters.getMenuParams5.reportStatus + 1,
            IssuedType: this.params5.IssuedType
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
      self.$XModal.confirm('您确定要将' + self.checkedAgencys.agency.name + '单位的报表数据撤销提交吗?').then(type => {
        if (type === 'confirm') {
          self.$http.post('/bisBudget/fillReport/reportCommit', {
            agencyId: self.checkedAgencys.agency.id,
            status: +self.$store.getters.getMenuParams5.reportStatus - 1,
            IssuedType: this.params5.IssuedType
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
      } else {
        this.checkedAgencys = {
          agencyIds: '',
          agencyCodes: '',
          agencyNames: '',
          deptCodes: '',
          sql_dept_code: '',
          sql_agency_code: ''
        }
      }
      if (this.checkedAgencys.agencyCodes && this.currentTableNode.id) {
        this.getSubmitData()
        if (this.addData.length > 0 || this.updateData.length > 0) {
          this.$XModal.confirm('您确定切换单位吗,是否保存当前页面数据?').then(type => {
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
                    this.agencyDeptChange(node)
                  } else {
                    this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
                  }
                }).catch(e => {
                  this.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
                })
              }
            } else {
              this.agencyDeptChange(node)
            }
          })
        } else {
          this.agencyDeptChange(node)
        }
      } else {
        this.agencyDeptChange(node)
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
          if (this.params5.reportType.endsWith('Dept') || this.params5.reportType.endsWith('Ywcs')) {
            this.params5.reportType = this.params5.reportType.substring(0, this.params5.reportType.length - 4)
          }
          this.getReportData(this.params5.reportType)
        }
      } else {
        if (node.isleaf) {
          if (this.params5.reportType.endsWith('Dept') || this.params5.reportType.endsWith('Ywcs')) {
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
      if (!self.currentTableNode.id) {
        this.$XModal.message({ status: 'info', message: '请先选择报表' })
        return false
      }
      // if (this.leftTreeStatus !== '') {
      this.$http.post('/bisBudget/fillReport/getIssuedMonth', {
        reportId: this.params5.reportType.endsWith('Dept') ? this.currentTableNode.reportvname : this.currentTableNode.id,
        agencyCode: this.checkedAgencys.agency.code
      }).then(res => {
        if (res && res.code === '100000') {
          this.setReportableParams(this.currentTableNode, res.data)
          if (res.data < 10) {
            this.batch = '当前批次：当年01至0' + res.data + '月份'
          } else {
            this.batch = '当前批次：当年01至' + res.data + '月份'
          }
          this.inputTableTreeData.forEach(v => {
            if (v.id === self.currentTableNode.id) {
              v['isLoad'] = true
            }
          })
          this.$nextTick(() => {
            console.log('当前查询表为：', self.currentTableNode.name)
            console.log(727, self.$refs)
            self.$refs['datavReportView' + self.currentTableNode.id][0].parentCallSearch()
          })
          this.inputTableTreeData.forEach(v => {
            if (v.id === self.currentTableNode.id) {
              v['isLoad'] = false
            }
          })
        } else {
          this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
        }
      }).catch(e => {
        this.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
      })
      // } else {
      //   if (!this.month) {
      //     this.$XModal.message({ status: 'info', message: '请先选择下达月份' })
      //     // this.currentTableNode = {}
      //     return false
      //   }
      //   this.setReportableParams(this.currentTableNode, this.month.split('-')[1])
      //   // this.reportParams.paramsObj.month = this.month.split('-')[1]
      //   this.inputTableTreeData.forEach(v => {
      //     if (v.id === self.currentTableNode.id) {
      //       v['isLoad'] = true
      //     }
      //   })
      //   this.$nextTick(() => {
      //     console.log('当前查询表为：', self.currentTableNode.name)
      //     console.log(727, self.$refs)
      //     self.$refs['datavReportView' + self.currentTableNode.id][0].parentCallSearch()
      //   })
      //   this.inputTableTreeData.forEach(v => {
      //     if (v.id === self.currentTableNode.id) {
      //       v['isLoad'] = false
      //     }
      //   })
      // }
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
    setReportableParams(inputReport, month) {
      this.reportParams = {
        code: inputReport.id,
        paramsObj: {
          title: inputReport.name + month,
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
          status: +this.params5.reportStatus - 2,
          month: month
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
        label: '未提交',
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
    currentTableNode: {
      handler(val) {
        if (val) {
          if (val.id === '527e9b006bf211ed93118b2cf5a0ffe1') {
            this.$http.post('/bisBudget/fillReport/getConferenceFeeStatus', {
              agencyCode: this.checkedAgencys.agencyCodes
            }).then(res => {
              if (res && res.code === '100000') {
                if (res.data === '1') {
                  this.feeStatus = '会议费状态：单位未提交'
                  this.editable = false
                } else if (res.data === '3') {
                  this.feeStatus = '会议费状态：部门未审核'
                  this.editable = false
                } else if (res.data === '5') {
                  this.feeStatus = '会议费状态：业务处未审核'
                  this.editable = false
                } else if (res.data === '7') {
                  this.feeStatus = '会议费状态：业务处已审核'
                  this.editable = true
                }
                console.log(1039, this.feeStatus)
              } else {
                this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
              }
            }).catch(e => {
              this.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
            })
          } else if (val.id === '498b25b0696611ed9e5f739380671c0c') {
            this.editable = true
            this.$http.post('/bisBudget/fillReport/getValidateMoney', {
              agencyCode: this.checkedAgencys.agencyCodes,
              reportId: '498b25b0696611ed9e5f739380671c0c'
            }).then(res => {
              if (res && res.code === '100000') {
                this.validateMoney = res.data
              } else {
                self.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
              }
            }).catch(e => {
              self.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
            })
          } else {
            this.editable = true
          }
        }
      },
      immediate: true,
      deep: true
    }
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
