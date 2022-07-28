<!--树： 滚动加载-->
<template>
  <div class="tree_scollLoad">
    <div v-if="isShowInput" class="tree_scollLoad__base__input">
      <el-input v-model="filterText" :size="size" placeholder="输入关键字进行过滤" @input="searchTreeList(filterText)" />
    </div>
    <div v-loading="treeLoading" class="tree_scollLoad__base__tree">
      <el-tree
        ref="treeLeft"
        :style="eltreestyle"
        :empty-text="emptyTip"
        :node-key="treeid"
        :data="data"
        :show-checkbox="checkbox"
        :highlight-current="highlightCurrent"
        :default-expanded-keys="expandedkeys"
        :default-checked-keys="checkedkeys"
        :accordion="accordion"
        :filter-node-method="filterNode"
        @check="nodecheckmethod"
        @node-click="nodeClickmethod"
        @check-change="checkChange"
      />
      <InfiniteLoading ref="infiniteLoading" spinner="spiral" @infinite="infiniteHandler">
        <p slot="spinner">加载中...</p>
        <p slot="no-results">{{ noResults }}</p>
        <p slot="no-more" class="no_more">{{ noMore }}</p>
      </InfiniteLoading>
    </div>
  </div>
</template>

<script>
// import api from '@/api/components/test/tree/treeScroll'
import { mapGetters, mapMutations } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: 'TreeScollLoad',
  components: {
    InfiniteLoading
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
          isShowInput: true,
          isCheckbox: false
        }
      }
    },
    queryparams: {
      // 查询条件获取方法
      type: Object,
      default() {
        return {
          size: 40,
          page: 1,
          keywords: ''
        }
      }
    },
    server: {
      // 查询条件获取方法
      type: Object,
      default() {
        return {
          isServer: true,
          ajaxType: 'post',
          // serverUri: 'plan-service/queryTreeAssistData'
          serverUri: 'mp-b-epay-rule/v1/userList'
        }
      }
    },
    clickmethod: { // 节点被点击时的回调
      type: Function,
      default: function(obj, node, vess) {}
    },
    checkChange: { // 节点选中状态发生变化时的回调
      type: Function,
      default: function(obj, isChecked, ischildChecked) {}
    },
    nodecheckmethod: { // 当复选框被点击的时候触发
      type: Function,
      default: function(obj, checksObj) {}
    },
    afterloadmethod: { // 数据已经加载完
      type: Function,
      default: function(datas) {}
    },
    highlightCurrent: { // 选中节点高亮
      type: Boolean,
      default() {
        return true
      }
    },
    eltreestyle: {
      type: [Object, String],
      default: () => ({})
    },
    treeid: { // 树node key同一页面要保持唯一，否则报错，如页面只有一个树可以不设置
      type: String,
      default: 'id'
    },
    noResults: {
      type: String,
      default: '已经到底了'
    },
    noMore: {
      type: String,
      default: '没有更多了'
    },
    size: { // 输入框尺寸 medium/small/mini
      type: String,
      default: ''
    },
    accordion: { // 是否每次只打开一个同级树节点展开
      type: Boolean
    },
    defaultexpandedkeys: {
      type: Array,
      default() {
        return ['root']
      }
    },
    defaultcheckedkeys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      treeLoading: false,
      cacheData: null,
      emptyTip: '',
      data: [],
      filterText: '',
      params: this.queryparams,
      isShowInput: this.globalConfig.isShowInput,
      noResult: this.noResults,
      pageNum: 1,
      checkbox: this.globalConfig.isCheckbox,
      expandedkeys: [...this.defaultexpandedkeys],
      checkedkeys: [...this.defaultcheckedkeys]
    }
  },
  methods: {
    ...mapMutations('basicInfo', ['setBossTree']),
    nodeClickmethod(obj, node, vess) {
      this.$parent.$parent.$parent.$parent.treeNodeClick(obj, node, vess)
    },
    // 树内容过滤
    filterNode(value, data) {
      // 搜索过滤
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 左侧树模糊搜索
    searchTreeList(val) {
      let self = this
      this.params = {
        size: 40,
        page: 1,
        keywords: val
      }
      this.data = []
      this.$http.post('mp-b-epay-rule/v1/userList', this.params).then(res => {
        if (res.data.length) {
          self.data = res.data
          self.$parent.$parent.$parent.$parent.onUserTreeLoadFinish(self.data)
        }
      })
    },
    async infiniteHandler($state) {
      this.treeLoading = true
      let self = this
      await this.$http[this.server.ajaxType](this.server.serverUri, this.params).then(res => {
        self.treeLoading = false
        if (res.rscode === '200') {
          if (res.data.length) {
            self.data = self.data.concat(res.data)
            self.params.page += 1
            self.$parent.$parent.$parent.$parent.onUserTreeLoadFinish(self.data)
            $state.loaded()
          } else {
            $state.complete()
          }
        } else {
          $state.complete()
        }
      }).catch(err => {
        console.log(err)
      })
    }
    // 获取请求数据
    // async getHttpData() {
    //   let self = this
    //   if (this.treeLoading) {
    //     return
    //   }
    //   this.emptyTip = ''
    //   this.openLoading && (this.treeLoading = true)
    //   self.data = []
    //   await this.$http[this.server.ajaxType](this.server.serverUri, this.params).then(res => {
    //     self.data = (res && Array.isArray(res)) ? res : ((res.rscode === '100000' || res.rscode === '200') ? res.data : [])
    //     if (self.isNeedRoot) {
    //       const result = [
    //         {
    //           id: 'root',
    //           label: self.rootname,
    //           code: 'root',
    //           isleaf: '0',
    //           children: self.data
    //         }
    //       ]
    //       self.data = result
    //     }

    //     // 关闭模态框
    //     self.treeLoading = false

    //     // 缓存数据
    //     self.setBossTree({
    //       params: self.treeParams,
    //       treeData: self.data
    //     })

    //     this.emptyTip = this.emptyTxt
    //     // 树加载完，回调数据
    //     self.$nextTick(() => {
    //       self.afterloadmethod(self.data)
    //     })
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // // 获取缓存数据
    // getCacheData() {
    //   this.data = this.cacheData
    //   this.$nextTick(() => {
    //     this.afterloadmethod(this.data)
    //   })
    // },
    // // 加载树
    // initTree() { // 使用异步调用，返回结果后再执行
    //   if (this.isServer) {
    //     // this.getHttpData()
    //     this.cacheData = this.cacheTree(this.treeParams)
    //     // console.log(55, this.useTreeCache, this.cacheData)
    //     if (this.useTreeCache && this.cacheData) {
    //       // console.log('来自树缓存数据')
    //       this.getCacheData()
    //     } else {
    //       // console.log('来自树请求数据')
    //       this.getHttpData()
    //     }
    //   }
    // }
  },
  computed: {
    ...mapGetters('basicInfo', ['cacheTree']),
    treeParams() {
      return {
        ajaxType: this.ajaxType,
        serverUri: this.serverUri,
        params: this.queryparams
      }
    }
  },
  created() {
    this.initTree()
  },
  mounted() {
  }
}
</script>

<style lang="scss">
.no_more{
  // color:#f99
}
.tree_scollLoad{
  height: 100%;
  width: 100%;
  background:#fff;
  .tree_scollLoad__base__input{
    height: 40px;
    width: calc(100% - 30px);
    // margin: 10px 15px;
  }
  .tree_scollLoad__base__tree{
    height:calc(100% - 40px);
    width: 100%;
    overflow: auto;
    .el-tree {
      min-width: calc(100% - 20px);
      font-size: 14px;
      display: inline-block;
      padding: 10px;
    }
  }
}
</style>
