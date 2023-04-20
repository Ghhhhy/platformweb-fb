<!--监控规则模板库新增页面弹框-->
<template>
  <div>
    <vxe-modal
      v-model="dialogVisible"
      :title="title"
      width="96%"
      height="90%"
      :show-footer="false"
      @close="dialogClose"
    >
      <div style="width:100%;height:45px;float:left;">
        <div v-for="(item,index) in tabbtn" :key="index" class="setbtn">
          <div :id="index" class="tabone" :class="activeIndex === index ? 'tabone1' : ''" @click="tabClick(index)">
            {{ item }}
          </div>
        </div>
      </div>
      <!--监控事项挂接-->
      <div v-show="monitorShow" class="payVoucherInput" style="margin-top:50px;">
        <div style="width:100%;height: 80px;margin:0 15px">
          <div v-if="showbox" id="bigbox"></div>
          <el-divider style="color:#E7EBF0" />
          <div type="flex" justify="end">
            <div style="width:100%">
              <vxe-button id="savebutton" style="float:right;margin-right:20px" status="primary" @click="addOperation">{{ buttonName }}</vxe-button>
              <vxe-button style="float:right;margin-right:20px" @click="deleteOperation">删除</vxe-button>
            </div>
          </div>
        </div>
        <div v-loading="addLoading" class="body">
          <div class="header-table">
            <BsTable
              ref="operationTableRef"
              height="450px"
              :footer-config="{ showFooter: false }"
              :checkbox-config="checkboxConfig"
              :table-columns-config="monitorTableColumnsConfig"
              :table-data="tableData"
              :table-config="tableConfig"
              :toolbar-config="false"
              :pager-config="false"
              @ajaxData="ajaxTableData"
            />
          </div>
        </div>
      </div>
      <!--规则模板新增-->
      <div v-show="rulesShow" class="payVoucherInput" style="margin-top:50px;">
        <div>
          <div>
            <el-row>
              <el-col :span="12">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;规则模板名称</div>
                      <el-input
                        v-model="ruleTemplateName"
                        placeholder="请输入规则模板名称"
                        style="width:45%"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col :span="12">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;规则类型</div>
                      <BsTreeInput
                        ref="tree"
                        v-model="fiRuleTypeValue"
                        :datas="fiRuleTypeList"
                        :isleaf="true"
                        style="width:45%"
                        formatter="#name"
                        :open-format-label="true"
                        @input="setFiRuleType"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;规则依据</div>
                      <el-input
                        v-model="ruleAccord"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入规则依据"
                        style=" width:45%"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col :span="12">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;规则说明</div>
                      <el-input
                        v-model="ruleRemark"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入规则说明"
                        style=" width:45%"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!--添加挂接函数-->
      <div v-show="funcShow" class="payVoucherInput" style="margin-top:50px;">
        <div style="width:100%;height: 80px;margin:0 15px">
          <div v-if="showbox" id="bigbox"></div>
          <el-divider style="color:#E7EBF0" />
          <div type="flex" justify="end">
            <div style="width:100%">
              <vxe-button id="savebutton" style="float:right;margin-right:20px" status="primary" @click="add">添加</vxe-button>
              <vxe-button style="float:right;margin-right:20px" @click="deleteData">删除</vxe-button>
            </div>
          </div>
        </div>
        <div v-loading="addLoading" class="header-table">
          <BsTable
            ref="mountTableRef"
            height="400px"
            :checkbox-config="checkboxConfig"
            :footer-config="{ showFooter: false }"
            :table-columns-config="mountTableColumnsConfig"
            :table-data="mountTableData"
            :table-config="mounttableConfig"
            :toolbar-config="false"
            :pager-config="false"
            @ajaxData="ajaxFunTableData"
          />
        </div>
        <div slot="footer" style="width:100%;height: 80px;margin:0 15px">
          <div v-if="showbox" id="bigbox"></div>
          <el-divider style="color:#E7EBF0" />
          <div type="flex" justify="end">
            <div style="width:100%">
              <vxe-button id="savebutton" style="float:right;margin-right:20px" status="primary" @click="doInsert">保存</vxe-button>
              <vxe-button style="float:right;margin-right:20px" @click="dialogClose">取消</vxe-button>
            </div>
          </div>
        </div>
      </div>
    </vxe-modal>
    <vxe-modal
      v-model="functionVisible"
      v-loading="addLoading"
      title="挂接函数"
      width="96%"
      height="90%"
      :show-footer="false"
      @close="functionClose"
    >
      <div class="main-query">
        <BsQuery
          ref="funcqueryFrom"
          :query-form-item-config="funcqueryConfig"
          :query-form-data="funcsearchDataList"
          @onSearchClick="searchFun"
        />
      </div>
      <div v-loading="addLoading" class="header-table">
        <BsTable
          ref="functionTableRef"
          height="400px"
          :footer-config="{ showFooter: false }"
          :table-columns-config="mountTableColumnsConfig"
          :table-data="functionTableData"
          :table-config="mounttableConfig"
          :toolbar-config="false"
          :pager-config="false"
          @ajaxData="ajaxFunTableData"
        />
      </div>
      <div style="width:100%;height: 80px;margin:0 15px">
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="end">
          <div style="width:100%">
            <vxe-button id="savebutton" style="float:right;margin-right:20px" status="primary" @click="functionSure">确定</vxe-button>
            <vxe-button style="float:right;margin-right:20px" @click="functionClose">取消</vxe-button>
          </div>
        </div>
      </div>
    </vxe-modal>
    <vxe-modal
      v-model="operationVisible"
      v-loading="addLoading"
      title="事项挂接"
      width="96%"
      height="90%"
      :show-footer="false"
      @close="operationClose"
    >
      <div class="main-query">
        <BsQuery
          ref="declareQueryFrom"
          :query-form-item-config="declareQueryCofig"
          :query-form-data="declareSearchDataList"
          @onSearchClick="searchDeclare"
        />
      </div>
      <div class="header-table">
        <BsTable
          ref="tableRef"
          height="450px"
          :footer-config="{ showFooter: false }"
          :table-columns-config="monitorTableColumnsConfig"
          :table-data="operationTableData"
          :table-config="tableConfig"
          :toolbar-config="false"
          :pager-config="mainPagerConfig"
          @ajaxData="ajaxTableData"
        />
      </div>
      <div style="width:100%;height: 80px;margin:0 15px">
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="end">
          <div style="width:100%">
            <vxe-button id="savebutton" style="float:right;margin-right:20px" status="primary" @click="operationSure">确定</vxe-button>
            <vxe-button style="float:right;margin-right:20px" @click="operationClose">取消</vxe-button>
          </div>
        </div>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import { proconf } from '../MonitoringRuleTemplateLibraryManagement.js'
import HttpModule from '@/api/frame/main/Monitoring/MonitoringRule.js'
import HttpModule1 from '@/api/frame/main/Monitoring/Declaration.js'
import HttpModule2 from '@/api/frame/main/Monitoring/Monitoring.js'
export default {
  name: 'AddDialog',
  components: {},
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  watch: {
    declareQueryCofig() {
      this.getDeclareSearchDataList()
    },
    queryConfig() {
      this.getSearchDataList()
    },
    funcqueryConfig() {
      this.getFunSearchDataList()
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    ruleTemplateCode: {
      type: String,
      default: ''
    },
    functionCodeList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      checkboxConfig: {
        checkAll: true
      },
      condition: {},
      funcondition: {},
      tabbtn: ['监控事项挂接', '规则模板新增', '添加挂接函数'],
      activeIndex: 0,
      monitorShow: true,
      rulesShow: false,
      funcShow: false,
      mounttableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRow1
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      mountTableColumnsConfig: proconf.mountTableColumnsConfig,
      mountTableData: [],
      // BsQuery 查询栏
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      declareSearchDataList: proconf.declareQueryData,
      declareQueryCofig: proconf.declareQueryCofig,
      funcqueryConfig: proconf.funchighQueryConfig,
      funcsearchDataList: proconf.funchighQueryData,
      // table 配置
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $gloableOptionRow: proconf.gloableOptionRow
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      monitorTableColumnsConfig: proconf.monitorTableColumnsConfig,
      operationTableData: [],
      declareTarget: '',
      ruleTemplateName: '',
      businessSystemCode: '',
      businessSystemName: '',
      businessSystemCodeoptions: [],
      businessModuleCode: '',
      businessModuleName: '',
      businessModuleCodeoptions: [],
      businessFunctionCode: '',
      businessFunctionName: '',
      businessFunctionCodeoptions: [],
      policiesName: '',
      ruleRemark: '',
      ruleAccord: '',
      dialogVisible: true,
      addLoading: false,
      token: '',
      isContinuity: false,
      // 文件上传相关参数
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      attachmentId: '',
      showbox: false,
      mainPagerConfig: {
        total: 1,
        currentPage: 1,
        pageSize: 20
      },
      FunmainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      SysparentId: 0,
      ModparentId: 0,
      functionVisible: false,
      functionTableData: [],
      tableData: [],
      operationVisible: false,
      buttonName: '修改',
      fiRuleTypeList: [
        { id: '1',
          label: '中央监控规则',
          children: [
            { id: '11', label: '通用类监控规则' },
            { id: '12', label: '专项类监控规则' },
            { id: '19', label: '其他监控规则' }
          ]
        },
        { id: '2',
          label: '地方监控规则',
          children: [
            { id: '21', label: '通用类监控规则' },
            { id: '22', label: '专项类监控规则' },
            { id: '29', label: '其他监控规则' }
          ]
        }
      ],
      fiRuleTypeCode: '',
      fiRuleTypeName: '',
      selectVal: '',
      selectName: '',
      fiRuleTypeValue: ''
    }
  },
  methods: {
    getDeclareSearchDataList() {
    },
    getFunSearchDataList() {
      // 下拉树
      let searchDataObj = {}
      this.funcqueryConfig.forEach(item => {
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
      this.funcsearchDataList = searchDataObj
    },
    // 初始化高级查询参数condition
    getFunConditionList() {
      let condition = {}
      this.funcqueryConfig.forEach(item => {
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
    searchDeclare(val) {
      console.log(val)
      this.declareName = val.declareName
      this.createPersonName = val.createPersonName
      this.mofDivName = val.mofDivName
      this.manageMofName = val.manageMofName
      this.loadMonitor()
    },
    // 搜索
    searchFun(val) {
      console.log(val)
      this.funcsearchDataList = val
      let condition = this.getFunConditionList()
      for (let key in condition) {
        if (
          (this.funcsearchDataList[key] !== undefined) &
          (this.funcsearchDataList[key] !== null)
        ) {
          if (Array.isArray(this.funcsearchDataList[key])) {
            condition[key] = this.funcsearchDataList[key]
          } else if (typeof (this.funcsearchDataList[key]) === 'string') {
            if (this.funcsearchDataList[key].trim() !== '') {
              this.funcsearchDataList[key].split(',').forEach(item => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      if (this.funcsearchDataList.functionType && this.funcsearchDataList.functionType.trim() !== '') {
        condition.functionType = this.funcsearchDataList.functionType
      }
      if (this.funcsearchDataList.functionName && this.funcsearchDataList.functionName.trim() !== '') {
        condition.functionName = this.funcsearchDataList.functionName
      }
      if (this.funcsearchDataList.functionParameter && this.funcsearchDataList.functionParameter.trim() !== '') {
        condition.functionParameter = this.funcsearchDataList.functionParameter
      }
      this.funcondition = condition
      this.loadFunMonitor()
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
    // 搜索
    search(val) {
      console.log(val)
      this.searchDataList = val
      let condition = this.getConditionList()
      for (let key in condition) {
        if (
          (this.searchDataList[key] !== undefined) &
          (this.searchDataList[key] !== null)
        ) {
          if (Array.isArray(this.searchDataList[key])) {
            condition[key] = this.searchDataList[key]
          } else if (typeof (this.searchDataList[key]) === 'string') {
            if (this.searchDataList[key].trim() !== '') {
              this.searchDataList[key].split(',').forEach(item => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      if (this.searchDataList.declareName && this.searchDataList.declareName.trim() !== '') {
        condition.declareName = this.searchDataList.declareName
      }
      if (this.searchDataList.createPersonName && this.searchDataList.createPersonName.trim() !== '') {
        condition.createPersonName = this.searchDataList.createPersonName
      }
      this.condition = condition
      console.log(this.condition)
      this.loadMonitor()
    },
    // tab切换
    tabClick(index) {
      this.activeIndex = index
      if (this.activeIndex === 0) {
        this.monitorShow = true
        this.rulesShow = false
        this.funcShow = false
      } else if (this.activeIndex === 1) {
        this.monitorShow = false
        this.rulesShow = true
        this.funcShow = false
      } else if (this.activeIndex === 2) {
        this.monitorShow = false
        this.rulesShow = false
        this.funcShow = true
      }
    },
    ajaxFunTableData({ params, currentPage, pageSize }) {
      this.FunmainPagerConfig.currentPage = currentPage
      this.FunmainPagerConfig.pageSize = pageSize
      this.loadFunMonitor()
    },
    // 挂接函数列表
    loadFunMonitor() {
      const param = {
        page: this.FunmainPagerConfig.currentPage, // 页码
        pageSize: 100,
        functionName: this.funcondition.functionName ? this.funcondition.functionName.toString() : '',
        functionType: this.funcondition.functionType ? this.funcondition.functionType.toString() : '',
        functionParameter: this.funcondition.functionParameter ? this.funcondition.functionParameter.toString() : ''
      }
      this.addLoading = true
      HttpModule2.queryTableDatas(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          // this.mountTableData = res.data.results
          this.functionTableData = res.data.results
          this.FunmainPagerConfig.total = res.data.totalCount
          if (this.title === '修改') {
            this.functionTableData.forEach(item => {
              for (let i = 0; i < this.functionCodeList.length; i++) {
                if (item.functionCode === this.functionCodeList[i]) {
                  this.mountTableData.push(item)
                }
              }
            })
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.loadMonitor()
    },
    // 监控事项挂接
    loadMonitor() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        declareName: this.declareName,
        mofDivName: this.mofDivName,
        manageMofName: this.manageMofName,
        createPersonName: this.createPersonName ? this.createPersonName.toString() : '',
        agencyCodes: [],
        manageMofCodes: this.manageMofCodes,
        mofDivCodes: [],
        menuId: this.$store.state.curNavModule.guid,
        flowStatus: ''
      }
      this.addLoading = true
      HttpModule1.queryTableDatas(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.operationTableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 选择业务系统
    changeSysCode(val) {
      console.log(val)
      this.SysparentId = val
      this.businessModuleCode = ''
      let busName = this.businessSystemCodeoptions.find(item => {
        return item.id === val
      })
      this.businessSystemName = busName.businessName
      this.getModLists()
    },
    // 选择业务模块
    changeModCode(val) {
      console.log(val)
      this.ModparentId = val
      this.businessFunctionCode = ''
      let busName = this.businessModuleCodeoptions.find(item => {
        return item.id === val
      })
      this.businessModuleName = busName.businessName
      this.getFunLists()
    },
    changeFunCode(val) {
      console.log(val)
      this.businessFunctionCode = val
      let busName = this.businessFunctionCodeoptions.find(item => {
        return item.id === val
      })
      this.businessFunctionName = busName.businessName
    },
    // 业务系统下拉树
    getSysLists() {
      const param = {
        businessType: 1,
        parentId: 0
      }
      this.addLoading = true
      HttpModule.getbusLists(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.businessSystemCodeoptions = res.data.results
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 业务模块下拉树
    getModLists() {
      const param = {
        businessType: 2,
        parentId: this.SysparentId
      }
      this.addLoading = true
      HttpModule.getbusLists(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.businessModuleCodeoptions = res.data.results
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 业务功能下拉树
    getFunLists() {
      const param = {
        businessType: 3,
        parentId: this.ModparentId
      }
      this.addLoading = true
      HttpModule.getbusLists(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.businessFunctionCodeoptions = res.data.results
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      // console.log(context.$parent.$parent.$parent)
      console.log(row.attachment_id)
      switch (optionType) {
        // 删除
        case 'delMount':
          this.clickAddBtn(row)
          break
        default:
      }
    },
    dialogClose() {
      this.$parent.dialogVisible = false
      this.$parent.queryTableDatas()
    },
    // 修改回显
    showInfo() {
      if (this.title === '新增') {
        this.attachmentId = this.$ToolFn.utilFn.getUuid()
        return
      }
      // this.loadMonitor()
      this.loadFunMonitor()
      let params = {
        ruleTemplateCode: this.ruleTemplateCode
      }
      HttpModule.getDetail(params).then(res => {
        if (res.code === '000000') {
          this.ruleTemplateName = res.data.ruleTemplateName
          this.ruleRemark = res.data.ruleRemark
          this.ruleAccord = res.data.ruleAccord
          this.fiRuleTypeValue = String(res.data.fiRuleTypeCode)
          this.fiRuleTypeCode = res.data.fiRuleTypeCode
          this.fiRuleTypeName = res.data.fiRuleTypeName
          this.$nextTick(() => {
            this.$refs.tree.setTreeData()
          })
          if (res.data.declareInfo.declareCode) {
            this.tableData = [res.data.declareInfo]
            console.log(this.$refs.operationTableRef)
            this.$refs.operationTableRef.handleCheckboxChange(this.tableData)
          }
          this.getModLists()
          this.getFunLists()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    add() {
      this.functionVisible = true
    },
    addOperation() {
      this.operationVisible = true
    },
    functionClose() {
      this.functionVisible = false
    },
    operationClose() {
      this.operationVisible = false
    },
    functionSure() {
      let selection = this.$refs.functionTableRef.getSelectionData()
      if (selection.length === 0) {
        this.$message.warning('请选择数据')
        return
      }
      this.functionVisible = false
      if (this.mountTableData.length > 0) {
        selection.forEach(item => {
          let bool = true
          this.mountTableData.forEach(it => {
            if (item.functionCode === it.functionCode) {
              bool = false
            }
          })
          if (bool) {
            this.mountTableData.push(item)
          }
        })
      } else {
        this.mountTableData = selection
      }
    },
    operationSure() {
      let selection = this.$refs.tableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据进行操作')
        return
      }
      this.operationClose()
      this.tableData = selection
      this.ruleAccord = selection[0].ruleAccord
    },
    deleteData() {
      let selection = this.$refs.mountTableRef.getSelectionData()
      if (selection.length === 0) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('是否删除选中数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.mountTableRef.removeCheckboxRow()
        selection.forEach(item => {
          this.mountTableData.forEach((it, index) => {
            if (item.functionCode === it.functionCode) {
              this.mountTableData.splice(index, 1)
            }
          })
        })
        console.log(this.$refs.mountTableRef)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    deleteOperation() {
      let selection = this.$refs.operationTableRef.getSelectionData()
      if (selection.length === 0) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('是否确定删除选中数据 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData = []
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 保存
    doInsert() {
      let selection = this.$refs.operationTableRef.getSelectionData()
      // if (this.title === '修改') {
      //   selection = this.operationTableData
      // }
      if (selection.length > 1) {
        this.$message.warning('请选择一条监控事项')
        return
      }
      if (this.ruleTemplateName === '') {
        this.$message.warning('请输入规则模板名称')
        return
      }
      if (this.fiRuleTypeCode === undefined) {
        this.$message.warning('请选择规则类型')
        return
      }
      // if (this.businessSystemCode === undefined) {
      //   this.$message.warning('请选择业务系统')
      //   return
      // }
      // if (this.businessSystemName === null) {
      //   this.$message.warning('请选择业务系统')
      //   return
      // }
      // if (this.businessModuleCode === undefined) {
      //   this.$message.warning('请选择业务模块')
      //   return
      // }
      // if (this.businessModuleName === null) {
      //   this.$message.warning('请选择业务模块')
      //   return
      // }
      // if (this.businessFunctionCode === undefined) {
      //   this.$message.warning('请选择业务功能')
      //   return
      // }
      // if (this.businessFunctionName === null) {
      //   this.$message.warning('请选择业务功能')
      //   return
      // }
      if (this.ruleRemark === '') {
        this.$message.warning('请输入规则说明')
        return
      }
      if (this.ruleAccord === '') {
        this.$message.warning('请输入规则依据')
        return
      }
      let funSelection = this.$refs.mountTableRef.getSelectionData()
      if (this.title === '修改') {
        funSelection = this.mountTableData
      }
      if (funSelection.length < 1) {
        this.$message.warning('请选择挂接函数')
        return
      }
      if (this.ruleTemplateName.length > 20) {
        this.$message.warning('规则模板名称长度应小于等于20位')
        return
      }
      if (this.ruleRemark.length > 100) {
        this.$message.warning('规则说明长度应小于等于100位')
        return
      }
      let functionCodes = []
      let businessSystemNames = []
      let businessModuleNames = []
      let businessSystemCodes = []
      let businessModuleCodes = []
      funSelection.forEach(item => {
        functionCodes.push(item.functionCode)
        businessSystemNames.push(item.businessSystemName)
        businessModuleNames.push(item.businessModuleName)
        businessSystemCodes.push(item.businessSystemCode)
        businessModuleCodes.push(item.businessModuleCode)
      })
      if (this.title === '新增') {
        let params = {}
        if (selection.length === 0) {
          params = {
            'ruleTemplateName': this.ruleTemplateName,
            'ruleRemark': this.ruleRemark,
            'ruleAccord': this.ruleAccord,
            'functionCodeList': functionCodes,
            'businessSystemName': businessSystemNames[0],
            'businessModuleName': businessModuleNames[0],
            'businessSystemCode': businessSystemCodes[0],
            'businessModuleCode': businessModuleCodes[0],
            'fiRuleTypeCode': this.fiRuleTypeCode,
            'fiRuleTypeName': this.fiRuleTypeName

          }
        } else {
          params = {
            'declareCode': selection[0].declareCode,
            'ruleTemplateName': this.ruleTemplateName,
            'ruleRemark': this.ruleRemark,
            'ruleAccord': this.ruleAccord,
            'functionCodeList': functionCodes,
            'businessSystemName': businessSystemNames[0],
            'businessModuleName': businessModuleNames[0],
            'businessSystemCode': businessSystemCodes[0],
            'businessModuleCode': businessModuleCodes[0],
            menuName: this.$store.state.curNavModule.name,
            'fiRuleTypeCode': this.fiRuleTypeCode,
            'fiRuleTypeName': this.fiRuleTypeName
          }
        }
        HttpModule.addTemplate(params).then(res => {
          if (res.code === '000000') {
            this.$message.success('新增成功')
            this.$parent.dialogVisible = false
            this.$parent.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        let params = {}
        if (selection.length === 0) {
          params = {
            ruleTemplateCode: this.ruleTemplateCode,
            'ruleTemplateName': this.ruleTemplateName,
            'ruleRemark': this.ruleRemark,
            'ruleAccord': this.ruleAccord,
            'functionCodeList': functionCodes,
            'fiRuleTypeCode': this.fiRuleTypeCode,
            'fiRuleTypeName': this.fiRuleTypeName
          }
        } else {
          params = {
            ruleTemplateCode: this.ruleTemplateCode,
            'declareCode': selection[0].declareCode,
            'ruleTemplateName': this.ruleTemplateName,
            'ruleRemark': this.ruleRemark,
            'ruleAccord': this.ruleAccord,
            'functionCodeList': functionCodes,
            'fiRuleTypeCode': this.fiRuleTypeCode,
            'fiRuleTypeName': this.fiRuleTypeName
          }
        }
        HttpModule.changeTemplate(params).then(res => {
          if (res.code === '000000') {
            this.$message.success('修改成功')
            this.$parent.dialogVisible = false
            this.$parent.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    setFiRuleType(val) {
      let valArr = val.split('##')
      this.fiRuleTypeName = valArr[2]
      this.fiRuleTypeCode = Number(valArr[0])
    }
  },
  created() {
    this.showInfo()
    if (this.title === '新增') {
      this.checkboxConfig.checkAll = false
      this.buttonName = '添加'
      this.loadFunMonitor()
    }
    this.loadMonitor()
    this.getSysLists()
    // this.getModLists()
    // this.getFunLists()
  }
}
</script>
<style lang="scss">
  .payVoucherInput {
    margin: 15px;
    .el-card {
      margin-top: 0
    }
  }
  .setbtn{
    width:100px;
    height:45px;
    float:left;
    margin-right:20px;
  }
  .tabone{
    width:100px;
    height:40px;
    text-align:center;
    line-height:40px;
    float:left;
    border:1px solid #ccc;
    border-radius:4px;
  }
  .tabone1{
    width:100px;
    height:40px;
    text-align:center;
    line-height:40px;
    float:left;
    border:1px solid #ccc;
    background-color:#f2f2f2;
    border-radius:4px;
  }
  .vxe-modal--wrapper .vxe-modal--box {
    z-index: 0;
  }
  #bigbox {
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .3;
  }
  .el-row-item .font-set-small .hline{
    width:72px;
  }
</style>
