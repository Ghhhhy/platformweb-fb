
<template>
  <vxe-modal
    v-model="dialogVisible"
    title="动态表体"
    width="98%"
    class-name="modal-content-padding0"
    height="90%"
    :position="{ top: '8%' }"
    resize
    remember
    transfer
  >
    <div class="height-all">
      <BsMainFormListLayout :left-visible.sync="leftVisible">
        <template v-slot:topTap>
          <div class="option-line-group-flex">
            <div class="fn-inline option-line-group-left">
            </div>
            <div class="fn-inline option-line-group-btn" style="padding: 4px 10px 0 10px;">
              <vxe-button v-preventClick="6000" status="primary" @click="onSureClick">确 定</vxe-button>
              <vxe-button code="reset" @click="dialogVisible = false">取 消</vxe-button>
            </div>
          </div>
        </template>
        <template v-slot:topTabPane>
        </template>
        <template v-slot:query>
        </template>
        <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
        <template v-slot:mainTree>
        </template>
        <template v-slot:mainForm>
          <div class="height-all auto-tbody">
            <div class="height-all auto-tbody-tree">
              <div class="auto-tbody-title">要素：</div>
              <div class="title" style="height: calc(100% - 40px)">
                <BsTree
                  ref="bsTree"
                  :config="leftTreeConfig"
                  :tree-data="leftTreeData"
                  :queryparams="leftTreeQueryparams"
                  :default-expanded-keys="leftTreeDefaultExpandedKeys"
                  :current-node-key="leftTreeCurrentNodeKey"
                  @onNodeClick="oonLeftTreeNodeClick"
                />
              </div>
            </div>
            <div class="height-all auto-tbody-tree">
              <div class="auto-tbody-title">要素值集：</div>
              <div class="title" style="height: calc(100% - 40px)">
                <BsTree
                  ref="bsTree"
                  :config="rightTreeConfig"
                  :tree-data="rightTreeData"
                  :queryparams="rightTreeQueryparams"
                  :default-expanded-keys="rightTreeDefaultExpandedKeys"
                  :current-node-key="rightTreeCurrentNodeKey"
                  @onNodeClick="onRightTreeNodeClick"
                  @onNodeCheckClick="onRightTreeonNodeCheckClick"
                />
              </div>
            </div>
          </div>
        </template>
      </BsMainFormListLayout>
    </div>
  </vxe-modal>
</template>

<script>
export default {
  name: 'AutoTbody',
  components: {
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      leftTreeConfig: {
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 0, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
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
          rootName: '',
          successCode: '100000', // 成功code
          statusField: 'code',
          method: 'get', // 请求方式
          url: ''
          // url: 'bisConfig/config/basDicInfo/getDicInfoTree' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      leftTreeData: [],
      leftTreeQueryparams: {
      },
      leftTreeCurrentNode: null,
      leftTreeCurrentNodeKey: '',
      leftTreeDefaultExpandedKeys: [],
      rightTreeConfig: {
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 0, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
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
          rootName: '',
          successCode: '100000', // 成功code
          statusField: 'code',
          method: 'get', // 请求方式
          url: ''
          // url: 'bisConfig/config/basDicInfo/getDicInfoTree' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      rightTreeData: [],
      rightTreeQueryparams: {
        isFolder: '0'
      },
      rightTreeCurrentNode: null,
      rightTreeCurrentNodeKey: '',
      rightTreeDefaultExpandedKeys: []
    }
  },
  methods: {
    changeInput(val) {
      this.letftTreeFilterText = val
    },
    oonLeftTreeNodeClick({ node, treeData }, UnitTree, tree) {

    },
    onRightTreeNodeClick({ node, treeData }, UnitTree, tree) {

    },
    onRightTreeonNodeCheckClick({ node, nodes, treeData, value }, UnitTree, tree) {

    },
    onSureClick() {
      this.$refs.JsEditor.getValue()
    },
    initrightTreeData(elementcode, province) {
      // debugger
      this.$http.post(`large-monitor-platform/lmp/elementQuery/elementtree`, {
        elementCode: elementcode,
        province
      }).then((res) => {

      })
    },
    initLeftTreeData() {
      // debugger
      this.$http.get('mp-b-basedata-service/v2/dicds', {}).then((res) => {

      })
    }
  },
  mounted() {
    this.initLeftTreeData()
    this.initrightTreeData('agency', '350000000')
  },
  watch: {
    dialogVisible: {
      handler(newval) {
        this.$emit('update:dialogVisible', newval)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
  .auto-tbody{
    font-size:0;
    .auto-tbody-tree {
      display: inline-block;
      width:50%;
    }
    .auto-tbody-title{
      line-height:40px;
      font-size:14px;
      padding:0  10px;
    }
  }

</style>
