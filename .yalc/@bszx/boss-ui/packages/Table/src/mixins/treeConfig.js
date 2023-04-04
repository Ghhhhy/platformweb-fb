/*
 * @Author: 轻语
 * @Date: 2021-11-10 11:56:50
 * @LastEditors: 轻语
 * @LastEditTime: 2022-03-03 14:51:05
 * @Description:
 */
export default {
  props: {
    treeConfig: { // table tree配置
      type: [Object, Boolean]
    }
  },
  data() {
    return {
      treeConfigIn: {}
    }
  },
  watch: {
    treeConfig: { // table 展开行配置监听
      handler() {
        this.initTreeConfig()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    initTreeConfig() { // 表格树配置
      if (this.getBasicDataType(this.treeConfig) === 'Boolean') {
        this.treeConfigIn = this.treeConfig
      } else {
        this.treeConfigIn = Object.assign({
          dblExpandAll: false, // 双击展开当前节点树形数据
          onlyDblTreeNodeExpand: false, // 在不允许编辑模式下是否仅仅双击树列才允许执行展开
          dblExpand: false, // 是否执行双击展开树形数据
          children: 'children',
          accordion: true
        }, this.treeConfig)
      }
    }

  },
  mounted() {
  }
}
