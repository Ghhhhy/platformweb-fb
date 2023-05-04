<!--  formList模版   Author:Titans@2396757591@qq.com -->
<template>
  <div class="height-all">
    <BsMainFormListLayout :left-visible.sync="leftVisible">
      <template v-slot:topTabPane>
        <BsTabPanel
          show-zero
          :tab-status-btn-config="tabStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @tabClick="onTabPaneltabClick"
          @btnClick="onTabPanelBtnClick"
          @onQueryConditionsClick="(val) => { isShowQueryConditions = val }"
        />
      </template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryForm"
            :query-form-item-config="queryFormItemConfig"
            :query-form-data="queryFormData"
            @itemChange="queryItemChange"
            @onSearchClick="onSearchClick"
          />
        </div>
      </template>
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <div class="mmc-left-tree height-all">
          <div class="mmc-left-tree-title">
            <BsTreeSet
              :tree-config="treeConfig"
              @onAsideChange="leftVisible = false"
              @onChangeInput="changeInput"
              @onConfrimData="confrimData"
            />
          </div>
          <!--
              :is-drop-select-tree="true"
              :editable="true"
          -->
          <div class="mmc-left-tree-body">
            <BsTree
              ref="testTree"
              :filter-text="letftTreeFilterText"
              :config="leftTreeConfig"
              :tree-data="treeData"
              :queryparams="treeQueryparams"
              @onNodeCheckClick="onNodeCheckClick"
              @onNodeClick="onNodeClick"
            />
          </div>
        </div>
        <div class=""></div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          id="1001"
          ref="bsTableRef"
          row-id="id"
          :batch-modify-fields="['name','age','sex','agency','bonus','inductionTime##departureTime']"
          :footer-config="{
            showFooter: true,
            combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
          }"
          :table-config="tableConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :calculate-constraint-config="calculateConstraintConfig"
          :expand-config="{
            showIcon: true,
            accordion: false,
            lazy: true,
            reserve: true,
            toggleMethod: toggleContentMethod,
            loadMethod: loadContentMethod,
          }"
          :tree-config="{ dblExpandAll: true, accordion: false, dblExpand: true }"
          :edit-config="{
            activeMethod: activeMethod,
          }"
          :checkbox-config="{ highlight: true }"
          :toolbar-config="toolbarConfig"
          :edit-rules="editRules"
          :pager-config="pagerConfig"
          :default-money-unit="10000"
          :cell-style="cellStyle"
          @editClosed="onEditClosed"
          @checkboxChange="checkboxChange"
          @checkboxAll="checkboxAll"
          @ajaxData="ajaxData"
          @cellDblclick="cellDblclick"
          @cellClick="cellClick"
          @onOptionRowClick="onOptionRowClick"
          @onToolbarBtnClick="onToolbarBtnClick"
        >
          <template v-if="ifRenderExpandContentTable" v-slot:expandContent="{ row, $rowIndex, rowIndex ,fixed },">
            <div :style="{ 'height': 60 + row.childData.length * 32 + 'px' }">
              <BsTable
                :id="'sbsTable' + row.id"
                :ref="'expandContentTableRef' + (fixed ? fixed + row.id : row.id)"
                :row-id="false"
                :footer-config="false"
                :table-columns-config="expandContentTableColumnsConfig"
                :table-data="row.childData"
                :edit-config="{
                  activeMethod(){
                    return true
                  },
                }"
                :toolbar-config="{
                  reverseCheck: true,
                }"
                :pager-config="false"
                height="100%"
                @checkboxChange="(obj,e) => { expandContentTableCheckboxChange(obj,e,row) }"
                @checkboxAll="(obj,e) => { expandContentTableCheckboxAll(obj,e,row) }"
              />
            </div>
          </template>
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div
                v-if="leftVisible === false"
                class="table-toolbar-contro-leftvisible"
                @click="leftVisible = true"
              ></div>
              <div class="table-toolbar-left-title">
                <span class="fn-inline">计划申请单列表</span>
                <i class="fn-inline"></i>
              </div>
              <vxe-button
                title="反选"
                @click="checkReverse('zoom')"
              />
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <div>
      <BasicInforAdd v-if="addDialogVisible" :form-data="modelData" :dialog-visible.sync="addDialogVisible" />
    </div>
  </div>
</template>
<script>
import getFormConfData from './formConf.js'
import { statusButtons, curStatusButton, tabStatusNumConfigDefault, buttonsInfos } from './config/config'
import BasicInforAdd from './FormAdd'
export default {
  name: 'FormTemplate',
  components: {
    BasicInforAdd
  },
  props: {
    allPropData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      leftVisible: true,
      curSplitPaneLeftWidth: 20,
      isShowQueryConditions: false,
      isMoreSearch: false,
      leftTreeConfig: {
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
          labelFormat: '{label}', // {code}-{name}
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          successCode: '200', // 成功code
          statusField: 'rscode',
          method: 'postStringify', // 请求方式
          url: ''
          // url: 'fb-govbudget-service/queryTreeAssistData?160464552085' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: true, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      treeData: [
        {
          id: 1,
          label: '一级 1',
          userKey: { key: '一级 1' },
          children: [
            {
              id: 4,
              label: '二级 1-1',
              userKey: { key: '二级 1-1' },
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                  userKey: { key: '三级 1-1-1' }
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                  userKey: { key: '三级 1-1-2' }
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          userKey: { key: '一级 2' },
          children: [
            {
              id: 5,
              userKey: { key: '二级 2-1' },
              label: '二级 2-1'
            },
            {
              id: 6,
              userKey: { key: '二级 2-2' },
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          userKey: { key: '一级 3' },
          children: [
            {
              id: 7,
              userKey: { key: '二级 3-1' },
              label: '二级 3-1'
            },
            {
              id: 8,
              userKey: { key: '二级 3-2' },
              label: '二级 3-2'
            }
          ]
        }
      ],
      treeQueryparams: {
        tokenid: 'b75ee9e2f1583f15b5259979c098549f',
        appguid: 'zfys',
        parameters: { 'eleCode': 'AGENCY', 'batchno': 2, 'sxspecroleguid': '7F6D5DF72BAA4D1A9A2D73B836D5309C', 'appguid': 'zfys' }
      },
      letftTreeFilterText: '',
      treeConfig: {
        curRadio: 'zf',
        radioGroup: [
          {
            code: 'zf',
            label: '政府部门树'
          },
          {
            code: 'xuexiao',
            label: '学校树'
          },
          {
            code: 'jigou',
            label: '机构树'
          }
        ]
      },
      tabStatusBtnConfig: {
        // 状态按钮和左侧按钮触发后回调
        changeBtns: true,
        buttons: statusButtons,
        curButton: curStatusButton,
        buttonsInfo: buttonsInfos,
        methods: {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
      },
      tabStatusNumConfig: { ...tabStatusNumConfigDefault },
      globalConfig: {
        inputVal: ''
      },
      formGloabalConfig: {
        span: 4,
        align: 'left',
        size: 'medium',
        titleAlign: 'right',
        titleWidth: 0,
        titleColon: false,
        preventSubmit: false,
        loading: false,
        validConfig: {
          autoPos: true
        }
      },
      queryParams: {},
      queryFormItemConfig: [
        {
          field: 'name',
          span: 4,
          title: '姓名',
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'text',
              placeholder: '请输入名称'
            }
          }
        },
        {
          field: 'sex',
          title: '性别',
          span: 4,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                value: 0,
                label: '女'
              },
              {
                value: 1,
                label: '男'
              }
            ],
            props: {
              placeholder: '请选择性别'
            }
          }
        },
        {
          'field': 'acc_date',
          'title': '生成日期',
          'span': 4,
          'itemRender': {
            name: '$vxeTime',
            defaultValue: '',
            props: {
              format: 'YYYY-MM-DD',
              type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
              placeholder: '生成日期'
            }
          }
        },
        {
          field: 'age',
          title: '年龄',
          span: 4,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'number',
              placeholder: '请输入年龄'
            }
          }
        },
        {
          field: 'interest',
          title: '兴趣爱好',
          span: 4,
          itemRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '绘画' },
              { value: '0', label: '棋牌' }
            ],
            props: {
              multiple: true,
              placeholder: '请选择兴趣'
            }
          }
        },
        {
          field: 'category',
          title: '角色',
          span: 4,
          itemRender: {
            name: '$vxeSelect',
            options: [
              { value: '前端', label: '前端' },
              { value: '后端', label: '后端' },
              { value: '运维', label: '测试' },
              { value: '实施', label: '实施' },
              { value: '测试', label: '测试' }
            ],
            props: {
              placeholder: '请输入角色'
            }
          }
        },
        {
          field: 'select',
          title: '学历',
          span: 4,
          itemRender: {
            name: '$vxeSelect',
            options: ((str) => {
              return str.split('+').map((item, index) => {
                return { value: item.split('#')[0], label: item.split('#')[1] }
              })
            })(
              '009#博士后+001#小学+002#初中+003#高中+004#中专+005#大专+006#本科+007#硕士+008#博士'
            ),
            props: {
              placeholder: '请选择学历'
            }
          }
        },
        {
          title: '收入',
          field: 'income',
          span: 4,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'float',
              min: 0,
              max: 10000000000000,
              placeholder: '请输入收入'
            }
          }
        },
        {
          title: '是否在职',
          field: 'status',
          span: 4,
          itemRender: {
            name: '$vxeSelect',
            options: [
              { value: 1, label: '是' },
              { value: 0, label: '否' }
            ],
            props: {
              placeholder: '是否在职'
            }
          }
        },
        {
          title: '通讯地址',
          field: 'address',
          span: 4,
          align: 'center',
          tooltip: true,
          itemRender: {
            name: '$vxeInput',
            props: {
              rows: 4,
              type: 'text',
              placeholder: '请填写通信地址,地址精确到小区门牌号。'
            }
          }
        }
      ],
      queryFormData: {
        name: '',
        interest: [],
        age: '',
        sex: '',
        income: '',
        select: '',
        personality: '',
        treeinput: '',
        category: '',
        address: '',
        status: ''
      },
      calculateConstraintConfig: {
        enabled: true,
        extendMapInfoField: true, // 是否扩展mapInfo字段
        // gradedSummaryFields: ['bonus', 'income'],
        calcAndConstraintItemCodeField: 'itemCode',
        // 示例中1001为tableId
        rowCodeFormulaConfig: {
          // 单元格交叉计算
          // rowFormulaMap= { "colField:itemcode":"{tableId:colField:itemcode}[运算符]" }
          '10:bonus': '{1001:income:10}+{1001:bonus:10}',
          '20:bonus': '{1001:income:30}*{1001:age:30}+{1001:bonus:40}'
        },
        cellDataConfig: [// 提取和计算

        ],
        colFormulaConfig: {
          income: '{age}>=18?Math.pow({age},4)/2:0',
          deduction: '{income}*0.1',
          profit: '{age}>=18?({income}-{tax}-{deduction}):0',
          actualIncome: '{profit}+{bonus}'

        },
        getDataAxiosConfig: { // 跨表提取请求配置
          dataField: 'data', // 数据字段
          successCode: '100000', // 成功code
          statusField: 'rscode',
          method: 'get', // 请求方式
          url: '' // 'queryTreeAssistData', //
        //  [{ itemCode: "002", colField: "f005", value: "1500.0" }, { itemCode: "002001", colField: "f005", value: "500.0" }]
        },
        getDataParams: { // 提取公共参数

        },
        colConstraintConfig: {
          // 'age': 'income::value::{age}>=18?Math.pow({age},4)/2:0--&&--name::style::{age}>18&&{age}<=60--??--color=#F00&fontSize=20px--+--{age}>60--??--color=#ff0&fontSize=20px'
        },
        rowCodeConstraintConfig: { // 表间约束配置
          // '20:age': '10:income::value::{1001:age:20}>=18?Math.pow({1001:age:20},4)/2:0--&&--10:bonus::editable::{1001:age:20}>=18?true:false--&&--30:bonus::clear::{1001:age:20}<=18?true:false--&&--10:name::style::{1001:age:20}>18&&{1001:age:20}<=60--??--color=#F00&fontSize=20px--+--{1001:age:1001}>60--??--color=#ff0&fontSize=20px'
        }
      },
      pagerConfig: {
        currentPage: 1,
        total: 100
      },
      currentPage: 1,
      toolbarConfig: {
        disabledMoneyConversion: false,
        ...getFormConfData('basicInfo', 'toolbarConfig')
      },
      childCols: [
        {
          field: 'time',
          title: 'Time'
        },
        {
          field: 'income',
          title: 'Income',
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          field: 'tax',
          title: 'Tax',
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          field: 'deduction',
          title: 'Deduction',
          formula: '{income}*0.07',
          cellRender: {
            name: '$vxeCalculate'
          }
        },
        {
          field: 'bonus',
          title: 'Bonus',
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          field: 'profit',
          title: 'Profit',
          combinedType: ['average', 'total'],
          formula: '{income}-{tax}-{Deduction}+{bonus}',
          cellRender: {
            name: '$vxeCalculate'
          }
        }
      ],
      tableConfig: getFormConfData('basicInfo', 'tableConfig'),
      tableColumnsConfig: getFormConfData('basicInfo', 'tableColumnsConfig'),
      tableData: [],
      editRules: getFormConfData('basicInfo', 'editRules'),
      addDialogVisible: false,
      modelData: {},
      ifRenderExpandContentTable: true,
      expandContentTableColumnsConfig: [
        {
          field: 'time',
          title: 'Time'
        },
        {
          field: 'income',
          title: 'Income',
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          field: 'tax',
          title: 'Tax',
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          field: 'deduction',
          title: 'Deduction',
          formula: '{income}*0.07',
          cellRender: {
            name: '$vxeCalculate'
          }
        },
        {
          field: 'bonus',
          title: 'Bonus',
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          field: 'profit',
          title: 'Profit',
          combinedType: ['average', 'total'],
          formula: '{income}-{tax}-{Deduction}+{bonus}',
          cellRender: {
            name: '$vxeCalculate'
          }
        }
      ],
      expandContextMap: {
      },
      tableDataMap: {
        fulldata: [],
        selection: [],
        dataMap: {
          id: {
            expand: true,
            checked: true,
            children: {
              fulldata: [],
              selection: []
            }
          }
        }
      }
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
    deepCopy(obj) {
      // 深拷贝通用方法
      let me = this
      if (typeof obj !== 'object' || obj === null) return obj
      let newObj = obj instanceof Array ? [] : {}
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
        }
      }
      return newObj
    },
    onTabPaneltabClick(obj) {
      this.pagerConfig.currentPage = 1
      this.queryParams = Object.assign(this.queryParams, {
        pagerParams: this.pagerConfig,
        queryParams: Object.assign(this.queryParams, obj)
      })
      this.getTableDatas()
    },
    onTabPanelBtnClick(obj) {
      const { selection } = this.$refs.bsTableRef.getTableData()
      switch (obj.code) {
        case 'edit':
          if (selection.length === 1) {
            this.modelData = this.deepCopy(selection[0])
            this.addDialogVisible = true
          } else {
            this.$message.warning('请选择一条数据进行编辑')
          }
          break
        case 'audit':
          if (selection.length === 1) {
            this.$BsFcUtil.audit({
              content: '',
              title: '审核意见',
              confirm(msg) {
                console.log('auditMsg', msg)
              }
            })
          } else {
            this.$message.warning('请选择一条数据进行编辑')
          }
          break
      }
    },
    // 按钮触发后
    bsToolbarClickEvent(obj, $this) {
      console.log(55, '回调方式二', obj, $this.$options, '状态按钮当前为：' + $this.$data.curTabSelect.label)
      if ($this.$data.curTabSelect.type === 'select' && $this.$data.curTabSelect.curValue === 'ycl') {
        // this.tabStatusNumConfig['ycl'] = 10
      }
    },
    onImportSuccess(importData) {
    },
    onNodeCheckClick({ node, nodes, treeData }, UnitTree, tree) {
    },
    onNodeClick({ node, treeData }, UnitTree, tree) {
      this.pagerConfig.currentPage = 1
      this.queryParams = Object.assign(this.queryParams, {
        pagerParams: this.pagerConfig,
        queryParams: Object.assign(this.queryParams, node)
      })
      this.getTableDatas()
    },
    onSearchClick(obj, objArr) {
      // this.pagerConfig.currentPage = 1
      // this.queryParams = Object.assign(this.queryParams, {
      //   pagerParams: this.pagerConfig,
      //   queryParams: Object.assign(this.queryParams, obj)
      // })
      // this.getTableDatas()
    },
    ajaxData({ currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.queryParams = Object.assign(this.queryParams, {
        pagerParams: this.pagerConfig
      })
      this.getTableDatas()
    },
    getTableDatas() {
      // 服务端查询数据
      this.showLoading = true
      let self = this
      this.$http.post('url', this.queryParams).then(res => {
        if (res.code === 200) {
          self.tableData = res.data.list
          self.pagerConfig = {
            total: res.data.total,
            currentPage: res.data.currentPage
          }
          this.showLoading = false
        }
      })
    },
    onOptionRowClick({ row, optionType }, context) {
    },
    onToolbarBtnClick(obj, context) {

    },
    activeMethod(obj) {
      return true
    },
    changeInput(val) {
      this.letftTreeFilterText = val
    },
    confrimData(curTree) {
      this.confrimData.curRadio = curTree.code
      switch (curTree.code) {
        case 'zf':
          console.log('切换成政府树条件，加载政府树...')
          break
        case 'xuexiao':
          console.log('切换成学校树条件，加载学校树...')
          this.tabStatusNumConfig['ycl'] = 12
          break
        case 'jigou':
          console.log('切换成机构树条件，加载机构树...')
          break
      }
    },
    onSplitPaneResize(leftWidth) {
      if (leftWidth > 1) {
        this.curSplitPaneLeftWidth = leftWidth
        this.leftVisible = true
      } else {
        this.leftVisible = false
      }
    },
    queryItemChange({ $form, data, itemValue, property, node, nodes }) {
      switch (property) {
        case '':
          data.qwe = 123
          break
      }
    },
    cellStyle() {

    },
    toggleContentMethod({ expanded, column, columnIndex, row, rowIndex }) {
      this.$refs.bsTableRef.tableOptionFn().clearRowExpandLoaded(row)
      return true
    },
    genarateTableDataMap() {
      let self = this
      self.tableDataMap.fulldata = self.tableData
      self.tableDataMap.selection = []
      this.tableData.forEach((item, index) => {
        self.dataMap[item.id] = {
          data: item,
          expandTableRefName: 'expandContentTableRef' + item.id,
          expand: false,
          checked: false,
          children: {
            fulldata: item.childData,
            selection: []
          }
        }
      })
    },
    loadContentMethod({ row, rowIndex, $rowIndex }) {
      console.log('1234')
      let self = this
      return new Promise((resolve) => {
        setTimeout(() => {
          const childCols = [
            {
              field: 'time',
              title: 'Time'
            },
            {
              field: 'income',
              title: 'Income',
              cellRender: {
                name: '$vxeMoney'
              }
            },
            {
              field: 'tax',
              title: 'Tax',
              cellRender: {
                name: '$vxeMoney'
              }
            },
            {
              field: 'deduction',
              title: 'Deduction',
              formula: '{income}*0.07',
              cellRender: {
                name: '$vxeCalculate'
              }
            },
            {
              field: 'bonus',
              title: 'Bonus',
              cellRender: {
                name: '$vxeMoney'
              }
            },
            {
              field: 'profit',
              title: 'Profit',
              combinedType: ['average', 'total'],
              formula: '{income}-{tax}-{Deduction}+{bonus}',
              cellRender: {
                name: '$vxeCalculate'
              }
            }
          ]
          const childData = [
            {
              time: '2020-01-20',
              income: 14000,
              tax: 200,
              bonus: 1000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-02-20',
              income: 14000,
              tax: 200,
              bonus: 1000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-03-20',
              income: 14000,
              tax: 200,
              bonus: 1000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-04-20',
              income: 14000,
              tax: 200,
              bonus: 6000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-05-20',
              income: 16000,
              tax: 210,
              bonus: 2000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-06-20',
              income: 16000,
              tax: 210,
              bonus: 2000,
              profit: '',
              deduction: ''
            }
          ]
          row.childCols = childCols
          row.childData = childData
          self.$nextTick(function() {
            setTimeout(() => {
              self.$refs['expandContentTableRef' + 1].triggerReverseCheck().then((resC) => {
                console.log(resC)
              })
            }, 1000)
          })
          resolve()
        }, 0)
      })
    },
    checkReverse() {
      let self = this
      // self.$refs['expandContentTableRef' + 1].$refs.xGrid.setCheckboxRow(this.$refs['expandContentTableRef' + 1].getTableData().tableData, true).then(() => {})
      self.$refs.bsTableRef.triggerReverseCheck().then(res => {
        self.$nextTick(function() {
          setTimeout(() => {
            for (let i = 0; i < res.length; i++) {
              self.$refs['expandContentTableRef' + res[i].id] && self.$refs['expandContentTableRef' + res[i].id].triggerReverseCheck().then((resC) => {
              })
            }
            // self.ifRenderExpandContentTable = false
            // self.$nextTick(() => {
            //   self.ifRenderExpandContentTable = true
            // })
          }, 1000)
        })
      })
    },
    checkboxChange({ records, reserves, indeterminates, checked, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }) {
      this.tableDataMap.selection = records
    },
    checkboxAll({ records, reserves, indeterminates, checked, $event }) {
      this.tableDataMap.selection = records
    },
    expandContentTableCheckboxChange({ records, reserves, indeterminates, checked, $event }, pRow) {
      Object.assign(this.dataMap[pRow.id].children, {
        selection: records
      })
    },
    expandContentTableCheckboxAll({ records, reserves, indeterminates, checked, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }, pRow) {
      Object.assign(this.dataMap[pRow.id].children, {
        selection: records
      })
    },
    cellDblclick(obj) {
      // console.log('双击', obj)
    },
    cellClick(obj) {
      // console.log('单机', obj)
    },
    onEditClosed(obj, bsTable, xGrid) {
      bsTable.performTableDataCalculate(obj)
    },
    initTableData() {
      let tableDataTest = getFormConfData('basicInfo', 'tableData')
      this.tableData = tableDataTest
      // let self = this
      // let tableData = []
      // for (let i = 0; i < 100; i++) {
      //   tableData.push({
      //     itemcode: '1001' + i,
      //     id: i,
      //     agency_code: '123',
      //     agency_name: '预算单位',
      //     name: 'jack',
      //     age: 24,
      //     sex: '1',
      //     days: 380,
      //     eduBack: '008',
      //     category: '前端',
      //     interest: [0, 1],
      //     bonus: 40000,
      //     time: '2020-2-2',
      //     params: {},
      //     income: 20000,
      //     actualIncome: 0,
      //     address: 'Sydney No. 1 Lake Park',
      //     conditions: '',
      //     status: '0',
      //     inductionTime: '2020-01-01',
      //     departureTime: '2023-01-01'
      //   })
      // }
      // this.tableData = tableData
    }
  },
  created() {
  },
  mounted() {
    this.initTableData()
    this.genarateTableDataMap()
  },
  watch: {
    $refs: {
      handler(newval) {
      },
      deep: true,
      immediate: true
    },
    queryFormData: {
      handler(newval) {
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
