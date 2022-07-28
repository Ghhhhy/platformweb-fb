<template>
  <div v-loading="showLoading" style="height:100%">
    <BsMainFormListLayout>
      <template v-slot:topTap> topTap</template>
      <template v-slot:topTabPane>
        <BsTabPanel
          is-open
          is-hide-query
          :tab-status-btn-config="tabStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <!-- <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="searchFromConfig"
            :query-form-data="advSearchDataList"
            @onSearchClick="onSearchClick"
          />
        </div>
      </template> -->
      <template v-slot:mainForm>
        <template>
          <BsTable
            ref="bsTableRef"
            :table-columns-config="tableColumnsConfig1"
            :table-data="tableData"
            :expand-config="{
              showIcon: true,
              accordion: true,
              lazy: true,
              toggleMethod: toggleContentMethod,
              loadMethod: loadContentMethod,
              visibleMethod: visibleContentMethod,
            }"
            :edit-config="false"
            :toolbar-config="tableToolbarConfig"
            :pager-config="pagerConfig"
            @ajaxData="ajaxData"
          >
            <template v-slot:toolbarSlots>
              <div class="table-toolbar-left">
                <div class="table-toolbar-left-title">
                  <span class="fn-inline">直达资金违规处理单录入</span>
                  <i class="fn-inline"></i>
                </div>
              </div>
            </template>
          </BsTable>
        </template>
      </template>
    </BsMainFormListLayout>
    <AddDialog ref="addOrUpDialog" :dialog-visible="addDialogVisible" :title="dialogTitle" />
  </div>
</template>
<script>
import api from '@/api/frame/main/directFund/dfrViolationProcessingBill'
import AddDialog from './AddDialog'
import { buttons1, curStatusButton, statusButtons } from './dfrViolationProcessingBill'

export default {
  name: 'DataSource',
  components: { AddDialog },
  data() {
    return {
      isShowQueryConditions: true,
      params: {
        current: 1,
        size: 20,
        status: '0'
      },
      condition: {},
      pagerConfig: {
        total: 0,
        pageSize: 20,
        currentPage: 1
      },
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tabStatusNumConfig: {
        '1': 0,
        '2': 0,
        '3': 0
      },
      tableColumnsConfig1: [],
      tableColumnsConfig: [
        {
          title: '单号',
          field: 'billNo',
          sortable: true,
          align: 'center',
          width: 190
        },
        // {
        //   title: '预警级别',
        //   field: 'warningLevel',
        //   sortable: true,
        //   align: 'center',
        //   width: 190
        // },
        {
          title: '规则名称',
          field: 'ruleName',
          sortable: true,
          align: 'center',
          width: 190
        },
        {
          title: '认定结果',
          field: 'identificationResult',
          cellRender: {
            name: '$vxeSelect',
            options: [
              {
                value: '1',
                label: '违规'
              },
              {
                value: '0',
                label: '正常'
              }
            ]
          },
          width: 190
        },
        {
          title: '监控触发时间',
          field: 'createTime',
          align: 'center',
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' },
          tooltip: true,
          width: 190
        },
        {
          title: '支付申请编号',
          field: 'payAppNo',
          align: 'center',
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' },
          tooltip: true,
          width: 190
        },
        {
          title: '支付金额',
          field: 'payAppAmt',
          sortable: true,
          align: 'right',
          combinedType: [
            'average',
            'subTotal',
            'total',
            'totalAll'
          ],
          cellRender: {
            name: '$moneyRender'
          },
          width: 190
        },
        {
          title: '预算单位',
          field: 'agencyName',
          sortable: true,
          align: 'center',
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' },
          width: 190
        },
        {
          title: '政府支出经济分类',
          field: 'govBatEco',
          fixed: '',
          width: '200',
          align: 'center',
          name: '$vxeTree',
          // filters: '',
          renderType: 'cellRender',
          renderName: '$vxeTree',
          options: [],
          defaultValue: '',
          props: {
            format: '{code}-{name}'
          },
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '部门支出经济分类',
          field: 'depBgtEco',
          fixed: '',
          width: '200',
          align: 'center',
          name: '$vxeTree',
          // filters: '',
          renderType: 'cellRender',
          renderName: '$vxeTree',
          options: [],
          defaultValue: '',
          props: {
            format: '{code}-{name}'
          },
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '支出项目',
          field: 'proName',
          sortable: true,
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '资金性质名称',
          field: 'fundTypeName',
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '支出功能分类科目',
          field: 'expFuncName',
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '违规类型',
          field: 'violationType',
          width: 190
        },
        {
          title: '违规单位',
          field: 'agencyCode',
          width: 190
        },
        {
          title: '违规事项描述',
          field: 'violationDisc',
          width: 190
        },
        {
          title: '整改要求',
          field: 'rectificationRequirement',
          width: 190
        },
        {
          title: '责令处理时间 ',
          field: 'rectificationDate',
          width: 190
        },
        {
          title: '状态',
          field: 'status',
          cellRender: {
            name: '$vxeSwitch',
            options: [
              {
                value: '1',
                label: '已送审'
              },
              {
                value: '0',
                label: '未送审'
              }
            ]
          },
          width: 190
        }
      ],
      tableinfoColumnsConfig2: [
        {
          title: '监控触发时间',
          field: 'createTime',
          align: 'center',
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' },
          tooltip: true,
          width: 190
        },
        {
          title: '规则名称',
          field: 'ruleName',
          sortable: true,
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        // {
        //   title: '预警级别',
        //   field: 'warningLevel',
        //   sortable: true,
        //   align: 'center',
        //   width: 190
        // },
        {
          title: '支付申请编号',
          field: 'payAppNo',
          align: 'center',
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' },
          tooltip: true,
          width: 190
        },
        {
          title: '支付金额',
          field: 'payAppAmt',
          sortable: true,
          align: 'right',
          combinedType: [
            'average',
            'subTotal',
            'total',
            'totalAll'
          ],
          cellRender: {
            name: '$moneyRender'
          },
          width: 190
        },
        {
          title: '预算单位代码',
          field: 'agencyCode',
          sortable: true,
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '预算单位',
          field: 'agencyName',
          sortable: true,
          align: 'center',
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' },
          width: 190
        },
        {
          title: '资金用途',
          field: 'use',
          sortable: true,
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '政府支出经济分类',
          field: 'govBgtEco',
          fixed: '',
          width: '200',
          align: 'center',
          name: '$vxeTree',
          // filters: '',
          renderType: 'cellRender',
          renderName: '$vxeTree',
          options: [],
          defaultValue: '',
          props: {
            format: '{code}-{name}'
          },
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '部门支出经济分类',
          field: 'depBgtEco',
          fixed: '',
          width: '200',
          align: 'center',
          name: '$vxeTree',
          // filters: '',
          renderType: 'cellRender',
          renderName: '$vxeTree',
          options: [],
          defaultValue: '',
          props: {
            format: '{code}-{name}'
          },
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '付款人名称',
          field: 'agencyAcctName',
          sortable: true,
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '付款人账号',
          field: 'agencyAcctNo',
          sortable: true,
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '付款人开户行',
          field: 'payBankName',
          sortable: true,
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '收款人名称',
          field: 'payeeAcctName',
          sortable: true,
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '收款人账号',
          field: 'payeeAcctNo',
          sortable: true,
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '收款人开户行',
          field: 'payeeAcctBankName',
          sortable: true,
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '支出项目',
          field: 'proName',
          sortable: true,
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },

        // {
        //   title: '指标类型代码',
        //   field: 'bgt_type_code',
        //   align: 'center'
        // },
        {
          title: '资金性质名称',
          field: 'fundTypeName',
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        // {
        //   title: '资金性质代码',
        //   field: 'fund_type_code',
        //   align: 'center'
        // },
        {
          title: '支出功能分类科目',
          field: 'expFuncName',
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '工资标识',
          field: 'isSal',
          fixed: '',
          width: '200',
          align: 'center',
          name: '$vxeTree',
          // filters: '',
          renderType: 'cellRender',
          renderName: '$vxeTree',
          options: [],
          defaultValue: '',
          props: {
            format: '{code}-{name}'
          },
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '是否工会经费',
          field: 'isFun',
          fixed: '',
          width: '200',
          align: 'center',
          name: '$vxeTree',
          // filters: '',
          renderType: 'cellRender',
          renderName: '$vxeTree',
          options: [],
          defaultValue: '',
          props: {
            format: '{code}-{name}'
          },
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '三公经费',
          field: 'thrExp',
          fixed: '',
          width: '200',
          align: 'center',
          name: '$vxeTree',
          // filters: '',
          renderType: 'cellRender',
          renderName: '$vxeTree',
          options: [],
          defaultValue: '',
          props: {
            format: '{code}-{name}'
          },
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        // {
        //   title: '处理时间',
        //   field: 'dealDate',
        //   align: 'center',
        //   width: 190,
        //   filters: [{ data: { vals: [], sVal: '' } }],
        //   filterRender: { name: 'FilterContent' }
        // },
        {
          title: '申请人姓名',
          field: 'applyName',
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '申请人电话',
          field: 'applyDial',
          align: 'center',
          width: 190,
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        }
        // {
        //   title: '作废时间',
        //   field: 'updateTime',
        //   align: 'center',
        //   width: 190,
        //   filters: [{ data: { vals: [], sVal: '' } }],
        //   filterRender: { name: 'FilterContent' }
        // }
        // {
        //   title: '是否上传附件',
        //   field: 'upload',
        //   sortable: true,
        //   align: 'center',
        //   width: 150,
        //   filters: [{ data: { vals: [], sVal: '' } }],
        //   filterRender: { name: 'FilterContent' }
        // }
      ],
      tableData: [],
      tableData1: [],
      tableData2: [],
      iftableDate: true,
      formData: {},
      formData1: [],
      addDialogVisible: false,
      showDialogVisible: false, // 查看
      tabStatusBtnConfig: {
        // changeBtns: true,
        buttons: statusButtons,
        curButton: curStatusButton,
        buttonsInfo: buttons1,
        methods: {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
      },
      queryData: {},
      searchFromConfig: [],
      advSearchDataList: [],
      formGloabalConfig: {
        size: 'small'
      },
      dialogTitle: '',
      showLoading: false,
      tabSelect: '1'
    }
  },
  mounted() {
    this.params5 = this.transJson(this.$store.state.curNavModule.param5)
    // this.queryData = this.$route.params.curNavModule.ruleParam
    // this.initTableDate()
  },
  methods: {
    refresh() {
      // this.queryData = this.$route.params.curNavModule.ruleParam
      this.$refs.queryFrom.onSearchResetClick()
      this.initTableDate(this.params)
    },
    // eslint-disable-next-line vue/no-dupe-keys
    searchFromConfig() {
      this.getSearchDataList()
    },
    // 初始化高级查询data
    getSearchDataList() {
      let searchDataObj = {}
      this.searchFromConfig.forEach(item => {
        if (item.field) {
          searchDataObj[item.field] = ''
        }
      })
      this.advSearchDataList = searchDataObj
    },
    // 查询和高级查询
    search(isLeftTreeSearch) {
      let condition = this.getConditionList()
      for (let key in condition) {
        if (
          (this.advSearchDataList[key] !== undefined) &
          (this.advSearchDataList[key] !== null)
        ) {
          if (Array.isArray(this.advSearchDataList[key])) {
            condition[key] = this.advSearchDataList[key]
          } else if (typeof (this.advSearchDataList[key]) === 'string') {
            if (this.advSearchDataList[key].trim() !== '') {
              this.advSearchDataList[key].split(',').forEach(item => {
                condition[key] = item
              })
            }
          }
        }
      }
      if (this.advSearchDataList.create_time && this.advSearchDataList.create_time.trim() !== '') {
        condition.create_time = this.advSearchDataList.create_time.replace(/-/g, '')
      }
      this.searchFromConfig.forEach(item => {
        if (item.islike === true && this.searchDataList[item.field]) {
          condition[item.field] = {}
          condition[item.field][item.liketype] = this.searchDataList[item.field]
        }
      })
      this.condition = condition
      this.params.condition = condition
      this.getTableInfoDatas(this.params)
    },
    // 初始化高级查询参数condition
    getConditionList() {
      let condition = this.condition
      this.searchFromConfig.forEach(item => {
        if (item.field) {
          condition[item.field] = []
        }
      })
      return condition
    },
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
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
    // 表格初始加载
    ajaxData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.params = Object.assign(this.params, {
        params,
        current: currentPage,
        size: pageSize
      })
      this.initTableDate(this.params)
    },
    // 初始化查询表格数据+条件查询表格数据
    initTableDate() {
      this.showLoading = true
      let datas = Object.assign({}, this.params, this.queryData)
      var _this = this
      if (this.tabSelect === '1') {
        this.tableColumnsConfig1 = this.tableinfoColumnsConfig2
        api
          .getProcList(datas)
          .then(res => {
            _this.showLoading = false
            if (res.code === '000000') {
              _this.tableData = res.data.records
              _this.pagerConfig.total = res.data.total
            }
          })
          .catch()
      } else {
        this.tableColumnsConfig1 = this.tableColumnsConfig
        api
          .getProcTable(datas)
          .then(res => {
            _this.showLoading = false
            if (res.code === '000000') {
              _this.tableData = res.data.records
              _this.pagerConfig.total = res.data.total
            }
          })
          .catch()
      }
    },
    // 按钮触发后，回调方式
    bsToolbarClickEvent(obj, $this) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.tabSelect = obj.curValue
      if (this.tabSelect === '1') {
        this.tableColumnsConfig1 = this.tableinfoColumnsConfig2
        this.params.status = '0'
        this.refresh()
      } else if (this.tabSelect === '2') {
        this.tableColumnsConfig1 = this.tableColumnsConfig
        this.params.status = '0'
        this.refresh()
      } else {
        this.tableColumnsConfig1 = this.tableColumnsConfig
        this.params.status = '1'
        this.refresh()
      }
      // this.params.status = this.tabSelect === '1' ? '0' : '1'
    },
    operationToolbarButtonClickEvent(obj, context, e) {
      switch (obj.code) {
        // case 'toorbar_add':
        //   this.newDataForm()
        //   break
        case 'toorbar_set':
          var selectionRow3 = this.$refs.bsTableRef.selection
          if (selectionRow3.length === 0) {
            this.$message.success('请选择至少一条数据进行生成')
            return
          }
          selectionRow3.forEach(function(item, index) {
            item.status = 1
          })
          // this.newDataForm()
          this.generate(selectionRow3)
          break
        case 'toorbar_delete':
          var selectionRow = this.$refs.bsTableRef.selection
          if (selectionRow.length === 0) {
            this.$message.success('请选择至少一条任务删除')
            return
          }
          var deleteIds = []
          selectionRow.forEach(function(item, index) {
            deleteIds.push(item.id)
          })
          this.deleteViolation(deleteIds)
          break
        case 'toorbar_send':
          var selectionRow1 = this.$refs.bsTableRef.selection
          if (selectionRow1.length === 0) {
            this.$message.success('请选择至少一条任务送审')
            return
          }
          selectionRow1.forEach(function(item, index) {
            item.status = 1
          })
          this.sendProc(selectionRow1)
          break
        case 'toorbar_cancel':
          var selectionRow2 = this.$refs.bsTableRef.selection
          if (selectionRow2.length === 0) {
            this.$message.success('请选择至少一条任务取消送审')
            return
          }
          selectionRow2.forEach(function(item, index) {
            item.status = 0
          })
          this.recallaudit(selectionRow2)
          break
        default:
          console.log('default fallback')
      }
    },
    newDataForm() {
      this.dialogTitle = '直达资金监控录入'
      this.addDialogVisible = true
      this.$refs.addOrUpDialog.setData(this.formData1)
    },
    onSearchClick(obj) {
      this.initTableDate()
    },
    toggleContentMethod({ expanded, column, columnIndex, row, rowIndex }) {
      this.$refs.bsTableRef.tableOptionFn().clearRowExpandLoaded(row)
      return true
    },
    loadContentMethod({ row, rowIndex, $rowIndex }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 500)
      })
    },
    deleteViolation(deleteIds) {
      this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showLoading = true
        var _this = this
        api
          .deleteProc(deleteIds)
          .then(res => {
            _this.showLoading = false
            if (res.code === '000000') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              _this.initTableDate()
            }
          })
          .catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    generate(datas) {
      this.$confirm('此操作将生成选中数据, 是否继续?', '提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formData1 = Object.assign(this.formData1, datas)
        this.dialogTitle = '直达资金监控生成'
        this.addDialogVisible = true
        this.$refs.addOrUpDialog.setData(this.formData1)
        // this.newDataForm()
        // this.showLoading = true
        // var _this = this
        // api
        //   .generate(datas)
        //   .then(res => {
        //     _this.showLoading = false
        //     if (res.code === '000000') {
        //       this.$message({
        //         type: 'success',
        //         message: '生成成功!'
        //       })
        //       _this.initTableDate()
        //       // _this.tableData = []
        //     }
        //   })
        //   .catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    recallaudit(datas) {
      this.$confirm('此操作将取消送审选中数据, 是否继续?', '提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showLoading = true
        var _this = this
        api
          .updateProc(datas)
          .then(res => {
            _this.showLoading = false
            if (res.code === '000000') {
              this.$message({
                type: 'success',
                message: '取消送审成功!'
              })
              _this.initTableDate()
            }
          })
          .catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    sendProc(datas) {
      this.$confirm('此操作将送审选中数据, 是否继续?', '提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showLoading = true
        var _this = this
        api
          .updateProc(datas)
          .then(res => {
            _this.showLoading = false
            if (res.code === '000000') {
              this.$message({
                type: 'success',
                message: '送审成功!'
              })
              _this.initTableDate()
            }
          })
          .catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 表格行操作
    onOptionRowClick({ row, column, optionType }) {
      switch (optionType) {
        // 编辑
        case 'edit':
          this.formData = Object.assign(this.formData, row)
          this.title = '处理单修改'
          this.addDialogVisible = true // 提到前面，先渲染
          this.$refs.addOrUpDialog.setForData(this.formData)
          break
        // 明细
        case 'detail':
          break
        // 查看
        case 'attachment':
          break
        // 删除
        case 'delete':
          var deleteId = []
          deleteId.push(row.id)
          this.deleteViolation(deleteId)
          break
        default:
      }
    }
  }
}
</script>

<style lang="scss">
</style>
