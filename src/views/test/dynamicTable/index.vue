<!--  动态 -->
<template>
  <div class="main-modulebox xmsb">
    <div class="main-modulebox-con main-modulebox-tabcon">
      <div class="fmc-main">
        <div class="fmc-left-con fn-inline height-all" :class="leftVisible ? 'fmc-left-visible' : 'fmc-left-hidden'">
          <aside class="fmc-left fn-inline">
            <div style="height:calc(100% - 46px)">
              <div class="height-half">
                <div class="fmc-title">
                  <span class="fn-inline">单位列表</span>
                </div>
                <div class="fmc-left-tree">
                  <BsBossTree
                    ref="agencytree"
                    :is-server="true"
                    :is-show-input="true"
                    :visible="true"
                    :tree-data="[]"
                    rootname="全部"
                    empty-text="暂无数据"
                    :is-need-root="true"
                    :server-uri="treeUrl"
                    :clickmethod="onePanelTreeNodeClick"
                    :afterloadmethod="onePanelOnAfterLoadUnit"
                    :queryparams="onePanelQueryparams"
                    :open-loading="true"
                  />
                </div>
              </div>
              <div class="height-half">
                <div class="fmc-title">
                  <span class="fn-inline">项目类别</span>
                </div>
                <div class="fmc-left-tree">
                  <BsTree
                    ref="testTree"
                    open-loading
                    :filter-text="letftTreeFilterText"
                    :config="leftTreeConfig"
                    :tree-data="treeData"
                    :queryparams="treeQueryparams"
                    :default-expanded-keys="defaultExpandedKeys"
                    :current-node-key="currentNodeKey"
                    @onNodeCheckClick="onNodeCheckClick"
                    @onNodeClick="onNodeClick"
                  />
                  <!-- <BsBossTree
                    ref="agencytree"
                    :is-server="false"
                    :is-show-input="true"
                    :visible="true"
                    :tree-data="treeData"
                    rootname="全部"
                    empty-text="暂无数据"
                    :is-need-root="true"
                    :clickmethod="twoPanelTreeNodeClick"
                    :afterloadmethod="onePanelOnAfterLoadProject"
                    :queryparams="twoPanelQueryparams"
                    :open-loading="true"
                  /> -->
                </div>
              </div>
            </div>
          </aside>
          <div class="fmc-left-visible-control fn-inline" style="height:100%">
            <div class="fn-inline height-all w1"></div>
            <div class="fn-inline fmcl-visible-control" @click="leftVisible = !leftVisible">
              <div class="fmcl-control-bg pointer">
                <i class="fmcl-control-ico fn-inline">
                </i>
              </div>
            </div>
          </div>
        </div>
        <main class="fmc-right fn-inline" :style="leftVisible ? 'width:calc(100% - 320px)' : 'width:calc(100% - 20px)'">
          <BsTable
            ref="projectTable"
            v-loading="showLoading"
            :edit-config="false"
            :toolbar-config="tableButton"
            :table-columns-config="tableColumnsConfig"
            :table-data="tableData"
            :cell-style="cellStyle"
            :table-config="tableConfig"
            :pager-config="mainPagerConfig"
            :footer-config="{ showFooter: true }"
            @ajaxData="ajaxTableData"
            @cellClick="cellClick"
            @checkboxChange="checkboxChange"
          >
            <template v-slot:toolbarSlots>
              <div class="table-toolbar-left">
                <div class="table-toolbar-left-title">
                  <span class="fn-inline">部门预算调剂申请列表</span>
                  <i class="fn-inline"></i>
                </div>
              </div>
            </template>

          </BsTable>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import col from './col.json'
import row from './row.json'
const buttonsDefault = [
  { code: 'update', name: '修改' },
  { code: 'toolbar-recall', name: '撤销' },
  { code: 'toolbar-viewlog', name: '操作日志' }
]
const buttonsEdit = [
  { code: 'save', name: '保存' },
  { code: 'cancel', name: '取消' }

]
export default {
  name: '',
  components: {
  },
  data() {
    return {
      tableButton: {
        // table工具栏配置(已处理)
        disabledMoneyConversion: false,
        buttons: buttonsDefault
      },
      sourceDialogVisible: false,
      leftVisible: true,
      curSplitPaneLeftWidth: 20,
      isShowQueryConditions: true,
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
          labelFormat: '{code}-{name}',
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          successCode: '200', // 成功code
          statusField: 'rscode',
          method: 'post', // 请求方式
          url: '' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      treeQueryparams: {
        useRight: false,
        batchno: 2,
        datatype: 5,
        eleCode: 'DEPBGTECO',
        sxspecroleguid: '637B6D5A823F459AB313CBF94C87765B'
      },
      currentNodeKey: '0',
      defaultExpandedKeys: ['156001'],
      treeData: [{
        id: '0',
        code: '0',
        name: '省级',
        children: [{
          id: '156',
          code: '156',
          name: '教育厅',
          children: [{
            id: '156001',
            code: '156001',
            name: '教育厅本级'
          }, {
            id: '156002',
            code: '156002',
            name: '实验中学'
          }, {
            id: '156003',
            code: '156003',
            name: '基金学校'
          }]
        }, {
          id: '160',
          code: '160',
          name: '体育局',
          children: [{
            id: '160001',
            code: '160001',
            name: '体育局本级'
          }, {
            id: '160002',
            code: '160002',
            name: '社会体育中心'
          }, {
            id: '160003',
            code: '160003',
            name: '体育信息中心'
          }]
        }]
      }],
      letftTreeFilterText: '',
      globalConfig: {
        inputVal: ''
      },
      pagerConfig: {
        currentPage: 1,
        total: 2
      },
      currentPage: 1,
      toolbarConfig: {
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换,
        import: true,
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tableConfig: {
        globalConfig: {
          // 全局配置
          checkType: 'checkbox', // hasCheckbox
          seq: true // 序号列
        },

        methods: {
          toolbarButtonClickEvent: this.toolbarButtonClick
        },
        renderers: {
          has_assign_source: {
            renderDefault(h, cellRender, { row, column }, context) {
              return [
                <div>
                  {
                    row._edit
                      ? <el-input value={ row[column.property] } onInput={ (val) => { row[column.property] = val } }
                        type="textarea"></el-input>
                      : <span>{ row[column.property] }</span>
                  }
                </div>
              ]
            }
          }
        }
      },
      tableColumnsConfig: [
        {
          title: '申请单号',
          align: '',
          field: 'application_no',
          cellRender: {
            name: 'vexInput',
            props: {
              type: 'text'
            }
          }
        }
      ],
      tableData: [],

      addDialogVisible: false
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
    toolbarButtonClick(obj) {
      switch (obj.code) {
        case 'update':
          if (!this.selectItems) {
            this.$message('先选一项')
            return
          }
          // 备份数据
          this.backup = JSON.parse(JSON.stringify(this.tableData))
          this.tableButton.buttons = buttonsEdit
          this.selectItems.forEach(item => {
            this.$set(item, '_edit', true)
          })
          break
        case 'cancel':
          this.tableButton.buttons = buttonsDefault
          this.selectItems.forEach(item => {
            this.$set(item, '_edit', false)
          })
          this.tableData = this.backup
          break
        case 'save':
          this.selectItems.forEach(item => {
            this.$set(item, '_edit', false)
          })
          this.tableButton.buttons = buttonsDefault
          break
        default:
          break
      }
      console.log(obj.code, 'va;')
    },
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
    },
    onNodeCheckClick({ node, nodes, treeData }, UnitTree, tree) {
    },
    onNodeClick({ node, treeData }, UnitTree, tree) {
      col.columns = col.columns.map(item => (
        { ...item,
          width: null,
          cellRender: {
            name: 'has_assign_source'
          }
        }))
      this.tableColumnsConfig = col.columns
      this.tableData = row.rows
    },
    checkboxChange(val) {
      this.selectItems = val.records
      console.log(val.records, 'checkboxChange')
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
    }
  },
  mounted() {
    // debugger
  },
  watch: {
    queryFormData: {
      handler(newval) {
        console.log(newval, '22')
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
.xmsb {
  .dialog-info {
    text-align: center;
  }
  .detail {
    height: 500px;
  }
  .tree-aduit {
    justify-content: center;
  }
  .tree-title {
    padding-left: 10px;
    font-size: 16px;
  }
  .dialog-title {
    font-size: 18px;
  }
  .el-dialog {
    height: 80%;
    margin-top: 7%;
  }
  .otherjx {
    height: 420px;
  }
}
</style>
