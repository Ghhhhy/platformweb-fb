<!--  formList模版   Author:Titans@2396757591@qq.com -->
<template>
  <div class="height-all config-wrap">
    <BsMainFormListLayout :left-visible.sync="leftVisible">
      <template v-slot:topTabPane>
        <!-- <header>
          <el-button v-for="(k, v) in btns" :key="v" size="mini" :type="k.type" @click="btnClick(k.code)"> {{ k.title }}</el-button>
        </header> -->
      </template>
      <template v-slot:query>
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
              :default-expanded-keys="defaultExpandedKeys"
              :current-node-key="currentNodeKey"
              @onNodeCheckClick="onNodeCheckClick"
              @onNodeClick="onNodeClick"
            />
          </div>
        </div>
        <div class=""></div>
      </template>
      <template v-slot:mainForm>
        <header>
          <el-button v-for="(k, v) in btns" :key="v" size="mini" :type="k.type" @click="btnClick(k.code)"> {{ k.title }}</el-button>
        </header>
        <mainContent />
        <!-- <BsQuery
          ref="queryForm"
          :query-form-item-config="queryFormItemConfig"
          :query-form-data="queryFormData"
          @onSearchClick="onSearchClick"
        /> -->
      </template>
    </BsMainFormListLayout>
    <el-dialog :visible.sync="dialogTableVisible">
      <main-content />
    </el-dialog>
  </div>
</template>
<script>
import mainContent from './components/mainContent'
// import AddDialog from './components/addDialog'
// import sourceDialog from './components/sourceDialog'
export default {
  name: '',
  components: {
    mainContent
    // AddDialog,
    // sourceDialog
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
      dialogTableVisible: false,
      btns: [
        { title: '新增', code: 'create', type: 'primary' },
        { title: '修改', code: 'update' },
        { title: '删除', code: 'delete' },
        { title: '导入', code: 'import' },
        { title: '导出', code: 'export' }
      ],
      leftVisible: true,
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
      treeConfig: {
        curRadio: 'zgbm',
        radioGroup: [
          {
            code: 'zgbm',
            label: '主管部门'
          },
          {
            code: 'ywcs',
            label: '业务处室'
          },
          {
            code: 'ysc',
            label: '预算处'
          }
        ]
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    btnClick(code) {
      console.log('fuck')
      this.dialogTableVisible = true
    },
    changeInput(val) {
      console.log(val)
      // this.treeGlobalConfig.inputVal = val
    },
    confrimData(curTree) {
      this.confrimData.curRadio = curTree.code
      switch (curTree.code) {
        case 'zf':
          console.log('切换成政府树条件，加载政府树...')
          break
      }
    },
    onNodeCheckClick({ node, nodes, treeData }, UnitTree, tree) {
    },
    onNodeClick({ node, treeData }, UnitTree, tree) {
    },
    onSearchClick(obj) {
      console.log(obj)
    },
    // 自定义按钮操作
    onOptionRowClick(data) {
      switch (data.optionType) {
        case 'has_assign_source':
          this.sourceDialogVisible = true
          break
        default:
          console.log('default callback')
      }
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
  }
}
</script>

<style lang='scss'>
.config-wrap{
  header{
    margin-top: 10px;
    text-align: right;
  }
  .mmc-toolbar-search{
    padding-bottom: 0;
  }
  .Titans-table{
    height: auto;
  }
}
</style>
