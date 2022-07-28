<!--  formList模版   Author:Titans@2396757591@qq.com -->
<template>
  <!-- <BsMainFormListLayout :left-visible.sync="leftVisible">
    <template v-slot:topTap>
      topTap
    </template>
    <template v-slot:topTabPane>
      topTabPane
    </template>
    <template v-slot:query>
     query
    </template>
     leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则只渲染mainForm插槽
    <template v-slot:mainTree>
      mainTree
    </template>
    <template v-slot:mainForm>
      mainForm
    </template>
  </BsMainFormListLayout>
  -->
  <div class="height-all">
    <BsMainFormListLayout :left-visible.sync="leftVisible">
      <template v-slot:topTabPane>
        <BsTabPanel
          show-zero
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="tabStatusBtnConfig"
          :server-config="serverConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @tabClick="onTabPaneltabClick"
          @btnClick="onTabPanelBtnClick"
          @onQueryConditionsClick="(val) => { isShowQueryConditions = val }"
        >
        <!-- <template v-slot:preBtns>
          <el-button type="primary" @click="preClick">前置自定义按钮</el-button>
        </template>
        <template v-slot:lastBtns>
          <el-select v-model="value" placeholder="请选择" @change="onChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template> -->
        </BsTabPanel>
      </template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryForm"
            :query-form-item-config="queryFormItemConfig"
            :query-form-data="queryFormData"
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
          <div class="mmc-left-tree-body">
            <BsTree
              ref="testTree"
              open-loading
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
          ref="bsTableRef"
          :footer-config="{
            showFooter: true,
            combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
          }"
          :table-config="tableConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :expand-config="{
            showIcon: true,
            accordion: true,
            lazy: true,
            toggleMethod: toggleContentMethod,
            loadMethod: loadContentMethod,
          }"
          :tree-config="{ dblExpandAll: true, dblExpand: true }"
          :edit-config="{}"
          :toolbar-config="toolbarConfig"
          :edit-rules="editRules"
          :pager-config="pagerConfig"
          :default-money-unit="1"
          @ajaxData="ajaxData"
        >
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
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <div>
      <BasicInforAdd :model-data="modelData" :dialog-visible.sync="addDialogVisible" />
    </div>
  </div>
</template>
<script>

import getFormConfData from './formConf.js'
import { statusButtons, curStatusButton, tabStatusNumConfigDefault, buttonsInfos } from './config/config'
import BasicInforAdd from './FormAdd'
export default {
  name: '',
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
      isShowQueryConditions: true,
      isMoreSearch: false,
      leftTreeConfig: {
        showFilter: true, // 是否显示过滤
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
          successCode: '200', // 成功code
          statusField: 'rscode',
          method: 'postStringify', // 请求方式
          url: 'fb-govbudget-service/queryTreeAssistData?160464552085' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: true, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
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
              { value: 1, label: '绘画' },
              { value: 0, label: '棋牌' }
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
        // name: '',
        // interest: [],
        // age: '',
        // sex: '',
        // income: '',
        // select: '',
        // personality: '',
        // treeinput: '',
        // category: '',
        // address: '',
        // status: ''
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
      tableConfig: getFormConfData('basicInfo', 'tableConfig'),
      tableColumnsConfig: getFormConfData('basicInfo', 'tableColumnsConfig'),
      tableData: getFormConfData('basicInfo', 'tableData'),
      editRules: getFormConfData('basicInfo', 'editRules'),
      addDialogVisible: false,
      modelData: {}
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
    onImportSuccess(importData) {
    },
    onNodeCheckClick({ node, nodes, treeData }, UnitTree, tree) {
    },
    onNodeClick({ node, treeData }, UnitTree, tree) {
    },
    onTabPaneltabClick(obj) {
    },
    onTabPanelBtnClick(obj) {
      const { selection } = this.$refs.bsTableRef.getTableData()
      switch (obj.code) {
        case 'edit':
          if (selection.length === 1) {
            this.modelData = selection[0]
            this.addDialogVisible = true
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
    onSearchClick(obj, objArr) {
      console.log(obj)
    },
    ajaxData({ currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.queryParams = Object.assign(this.queryParams, {
        currentPage,
        pageSize
      })
      this.getTableDatas(currentPage, pageSize)
    },
    getTableDatas(currentPage, pageSize) {
      // 服务端查询数据
      this.showLoading = true
      let self = this
      this.$http.post('url', this.queryParams).then(res => {
        if (res.code === 200) {
          self.tableData = res.data.list
          self.pagerConfig = {
            total: res.data.total,
            currentPage: currentPage
          }
          this.showLoading = false
        }
      })
    },
    toggleContentMethod({ expanded, column, columnIndex, row, rowIndex }) {
      this.$refs.bsTableRef.tableOptionFn().clearRowExpandLoaded(row)
      return true
    },
    loadContentMethod({ row, rowIndex, $rowIndex }) {
      console.log('1234')
      // let self = this
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
                name: '$moneyRender'
              }
            },
            {
              field: 'tax',
              title: 'Tax',
              cellRender: {
                name: '$moneyRender'
              }
            },
            {
              field: 'deduction',
              title: 'Deduction',
              formula: '{income}*0.07',
              cellRender: {
                name: '$calculateRender'
              }
            },
            {
              field: 'bonus',
              title: 'Bonus',
              cellRender: {
                name: '$moneyRender'
              }
            },
            {
              field: 'profit',
              title: 'Profit',
              combinedType: ['average', 'total'],
              formula: '{income}-{tax}-{Deduction}+{bonus}',
              cellRender: {
                name: '$calculateRender'
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
          resolve()
        }, 500)
      })
    }
  },
  mounted() {
  },
  watch: {
    queryFormData: {
      handler(newval) {
        console.log(newval)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
