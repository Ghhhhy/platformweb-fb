<!--树： 滚动加载-->
<template>
  <div class="tree_scollLoad">

  </div>
</template>

<script>
// import api from '@/api/components/test/tree/treeScroll' ss
export default {
  name: 'TreeScollLoad',
  components: {
  },
  props: {
    globalConfig: {
      // 全局配置
      type: Object,
      default() {
        return {
          openLoading: false,
          emptyText: '暂无数据',
          isNeedRoot: false,
          rootname: '全部',
          isShowInput: false,
          isCheckbox: false
        }
      }
    },
    queryparams: {
      // 查询条件获取方法
      type: Object,
      default() {
        return {}
      }
    },
    server: {
      // 查询条件获取方法
      type: Object,
      default() {
        return {
          isServer: true,
          ajaxType: 'get',
          // serverUri: 'plan-service/queryTreeAssistData'
          serverUri: 'mp-b-epay-rule/v1/user'
        }
      }
    },
    clickmethod: {// 节点被点击时的回调
      type: Function,
      default: function(obj, node, vess) {}
    },
    checkChange: {// 节点选中状态发生变化时的回调
      type: Function,
      default: function(obj, isChecked, ischildChecked) {}
    },
    nodecheckmethod: {// 当复选框被点击的时候触发
      type: Function,
      default: function(obj, checksObj) {}
    },
    afterloadmethod: {// 数据已经加载完
      type: Function,
      default: function(datas) {}
    }
  },
  data() {
    return {

    }
  },
  methods: {

  },
  created() {

  },
  mounted() {
  }
}
</script>

<style lang="scss">

</style>
