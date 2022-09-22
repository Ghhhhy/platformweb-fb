<!--  模版   Author:ROYIANS -->
<template>
  <div class="height-all">
    <BsMainFormListLayout :left-visible.sync="leftVisible">
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <BsSplitPane
          :min-percent="0"
          split="horizontal"
          :default-percent="50"
        >
          <template slot="paneL">
            <div class="mmc-left-tree height-all">
              <div class="mmc-left-tree-title">
                <div
                  class="tree-set__content"
                  style="--tree-set-no__icon: 7px"
                >
                  <div v-if="leftVisible" class="fn-inline aside-tree-show-leftvisible" @click="leftVisible = false">
                    <i class="ri-indent-decrease"></i>
                  </div>
                  <div class="fn-inline tree-set__tip">
                    <span>预算菜单列表</span>
                  </div>
                  <div class="fn-inline tree-set__query">
                    <el-input v-model="topTreeFilterText" prefix-icon="el-icon-search" placeholder="搜索菜单" />
                  </div>
                </div>
              </div>
              <div class="mmc-left-tree-body">
                <BsTree
                  ref="topTree"
                  open-loading
                  :filter-text="topTreeFilterText"
                  :config="topTreeConfig"
                  :tree-data="topTreeData"
                  :queryparams="topTreeQueryParams"
                  @onNodeClick="onTopTreeNodeClick"
                />
              </div>
            </div>
          </template>
          <template slot="paneR">
            <div class="mmc-left-tree height-all">
              <div class="mmc-left-tree-title">
                <div class="mmc-left-tree-title">
                  <div
                    class="tree-set__content"
                    style="--tree-set-no__icon: 7px"
                  >
                    <div class="fn-inline tree-set__tip">
                      <span>状态列表</span>
                    </div>
                    <div class="fn-inline tree-set__query">
                      <el-input v-model="procatTreeFilterText" prefix-icon="el-icon-search" placeholder="搜索状态" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mmc-left-tree-body">
                <BsTree
                  ref="bottomTree"
                  :loading="statusTreeLoading"
                  open-loading
                  :filter-text="bottomTreeFilterText"
                  :config="bottomTreeConfig"
                  :tree-data="bottomTreeData"
                  :queryparams="bottomQueryParams"
                />
              </div>
            </div>
          </template>
        </BsSplitPane>
        <div class=""></div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="bsTableRef"
          :loading="tableLoading"
          :footer-config="footerConfig"
          :table-config="tableConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :edit-config="editConfig"
          :toolbar-config="toolbarConfig"
          :edit-rules="editRules"
          :pager-config="pagerConfig"
          :default-money-unit="10000"
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
                <span class="fn-inline">{{ tableHeader }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
            <div style="float: right">
              <vxe-button size="mini" @click="insertRow">新增行</vxe-button>
              <vxe-button size="mini" @click="delRow">删除行</vxe-button>
              <vxe-button size="mini" @click="copyRow">复制选中行</vxe-button>
              <vxe-button size="mini" @click="pasteRow">粘贴</vxe-button>
              <vxe-button size="mini" @click="saveRow">保存</vxe-button>
              <vxe-button size="mini" @click="saveRelation">关系挂接</vxe-button>
              <vxe-button size="mini" @click="showStatus">状态管理</vxe-button>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <div>
      <vxe-modal
        v-if="relationDialog"
        v-model="relationDialog"
        title="关系挂接"
        width="80%"
        height="70%"
        min-height="250px"
        min-width="800px"
        destroy-on-close="true"
        :position="{ top: '15%', left: '10%' }"
      >
        <vxe-button size="mini" @click="saveRelationSure">确定</vxe-button>
        <BsTree
          ref="statusTree"
          open-loading
          :config="bottomTreeConfigCp"
          :tree-data="bottomTreeData"
          :queryparams="bottomQueryParams"
          :default-checked-keys="defaultCheckedKeys"
          :default-expanded-keys="defaultExpandedKeys"
          @onNodeClick="onBottomTreeNodeClick"
        />
      </vxe-modal>
      <vxe-modal
        v-if="statusDialog"
        v-model="statusDialog"
        title="保存状态"
        width="80%"
        height="70%"
        min-height="250px"
        min-width="800px"
        destroy-on-close="true"
        :position="{ top: '15%', left: '10%' }"
      >
        <BsTable
          ref="statusTable"
          :table-config="tableConfig"
          :table-columns-config="statusColumnsConfig"
          :table-data="bottomTreeData"
          :edit-config="editConfig"
          :toolbar-config="toolbarConfig"
          :pager-config="pagerConfig"
        >
          <template v-slot:toolbarSlots>
            <div style="float: right">
              <vxe-button size="mini" @click="insertRowStatus">新增行</vxe-button>
              <vxe-button size="mini" @click="delRowStatus">删除行</vxe-button>
              <vxe-button size="mini" @click="copyRowStatus">复制选中行</vxe-button>
              <vxe-button size="mini" @click="pasteRowStatus">粘贴</vxe-button>
              <vxe-button size="mini" @click="saveRowStatus">保存</vxe-button>
            </div>
          </template>
        </BsTable>
      </vxe-modal>
    </div>
  </div>
</template>
<script>
import { myMethods } from './js/methods.js'
import mix from '@/mixin/commonMixin'
export default {
  name: 'StatusBtnConfig',
  mixins: [mix],
  components: {
  },
  props: {
  },
  data() {
    return {
      relationDialog: false,
      statusDialog: false,
      tabStatusBtnConfig: {},
      treeConfig: {},
      leftVisible: true,
      letftTreeFilterText: '',
      leftTreeConfig: {},
      treeData: [],
      treeQueryparams: {},
      footerConfig: {},
      tableConfig: {
        methods: {
          toolbarButtonClickEvent: this.toolbarButtonClickEvent
        }
      },
      tableColumnsConfig: [],
      tableData: [],
      editConfig: {
        trigger: 'dblclick',
        mode: 'cell'
      },
      curMenuId: '',
      toolbarConfig: {
        moneyConversion: false,
        search: false,
        advancedSearch: false
      },
      editRules: {},
      pagerConfig: false,
      tableHeader: '按钮列表',
      queryFormItemConfig: [],
      statusColumnsConfig: [],
      queryFormData: {},
      isShowQueryConditions: true,
      topTreeFilterText: '',
      topTreeConfig: {
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 1, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'guid'],
        format: '{code}-{name}',
        placeholder: '请选择',
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '{code}-{name}', // {code}-{name}
          nodeKey: 'guid', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          rootName: '全部'
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      topTreeData: [],
      topTreeQueryParams: {},
      bottomTreeFilterText: '',
      bottomTreeConfig: {
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 1, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'guid'],
        format: '{code}-{name}',
        placeholder: '请选择',
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '{code}-{name}', // {code}-{name}
          nodeKey: 'guid', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          rootName: '全部'
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      bottomTreeConfigCp: {
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 1, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'guid'],
        format: '{code}-{name}',
        placeholder: '请选择',
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '{code}-{name}', // {code}-{name}
          nodeKey: 'guid', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          rootName: '全部'
        },
        multiple: true, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      copyRowData: [],
      copyRowStatusData: [],
      bottomTreeData: [],
      bottomQueryParams: {},
      statusTreeLoading: false,
      tableLoading: false,
      defaultCheckedKeys: [],
      defaultExpandedKeys: ['root'],
      curSelectBtn: []
    }
  },
  computed: {
  },
  methods: {
    ...myMethods
  },
  async mounted() {
    await this.initMounted()
  },
  created() {
    this.initCreated()
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
