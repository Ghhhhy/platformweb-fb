<template>
  <div class="tree-content">
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
</template>

<script>
import data from './data.js'
export default {
  name: '',
  props: {

  },
  data() {
    return {
      leftTreeConfig: {
        showFilter: true, // 是否显示过滤
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
          labelFormat: '{code}-{name}', // {code}-{name}
          nodeKey: 'id', // 树的主键
          label: 'label', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          successCode: '100000', // 成功code
          statusField: 'rscode',
          method: 'post', // 请求方式
          url: '' // 'fiscal-config/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      treeQueryparams: {
        batchno: 2,
        datatype: 2,
        eleCode: 'procat',
        sxspecroleguid: '21DE02718C104153BBC214146434A73B',
        useRight: true,
        queryConditions: ' and code not in (\'1\',\'11\',\'12\',\'21\') '
      },
      letftTreeFilterText: '',
      treeData: data
    }
  },
  methods: {
    onNodeCheckClick({ node, nodes, treeData }, UnitTree, tree) {

    },
    onNodeClick({ node, treeData }, UnitTree, tree) {

    }
  },
  created() {

  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
  .tree-content{
    width: 400px;
    margin: 0 auto;
  }
</style>
