<!-- 左侧树tree 组件 by comer -->
<template>
  <div
    v-if="isVisible"
    v-loading="treeLoading"
    class="boss-tree__base"
    :style="treestyle"
  >
    <div v-if="isShowInput" class="boss-tree__base__input">
      <el-input v-model="filterText" :size="size" placeholder="输入关键字进行过滤" />
    </div>
    <div class="boss-tree__base__tree" :class="bossTreeHeight">
      <!--bug: expandedkeys 一个页面两个以上的树不会展开，如nodekey设置固定可展开但会报错-->
      <el-tree
        ref="tree"
        :style="eltreestyle"
        :empty-text="emptyTip"
        :render-content="renderContent"
        :show-checkbox="checkbox"
        :node-key="treeid"
        :data="data"
        :props="treeProps"
        :highlight-current="highlightCurrent"
        :accordion="accordion"
        :default-expanded-keys="expandedkeys"
        :default-checked-keys="checkedkeys"
        :filter-node-method="filterNode"
        @check="nodecheckmethod"
        @node-click="clickmethod"
        @check-change="checkChange"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import {
  defaultGlobalConfig
} from './config/config'
export default {
  name: 'BossTree',
  props: {
    isCheckbox: { // 是否多选，默认false
      type: Boolean
    },
    datas: { // 树数据
      type: Array,
      default: () => []
    },
    treeProps: {
      type: Object,
      default: () => {}
    },
    isShowInput: { // 是否显示input输入框  默认不显示
      type: Boolean
    },
    treeid: { // 树node key同一页面要保持唯一，否则报错，如页面只有一个树可以不设置
      type: String,
      default: 'id'
    },
    defaultcheckedkeys: {
      type: Array,
      default: () => []
    },
    isNeedRoot: {
      type: Boolean
    },
    rootname: { // 根节点名称
      type: String,
      default: '全部'
    },
    highlightCurrent: {
      type: Boolean,
      default() {
        return true
      }
    },
    accordion: { // 是否每次只打开一个同级树节点展开
      type: Boolean
    },
    size: { // 输入框尺寸 medium/small/mini
      type: String,
      default: ''
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    isServer: { // 是否服务端加载 默认不是
      type: Boolean
    },
    ajaxType: {
      type: String,
      default: 'post'
    },
    queryparams: {
      // 查询条件获取方法
      type: Object,
      default() {
        return {}
      }
    },
    serverUri: {
      // 获取数据访问uri，可自定义
      type: String,
      default: 'plan-service/queryTreeAssistData'
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
    treestyle: {
      type: [Object, String],
      default: () => ({})
    },
    eltreestyle: {
      type: [Object, String],
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default() {
        return true
      }
    },
    openLoading: {
      type: Boolean
    },
    openTreeCache: {
      type: Boolean,
      default() {
        return true
      }
    },
    defaultexpandedkeys: {
      type: Array,
      default() {
        return ['root']
      }
    },
    globalConfig: { // 树配置
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      filterText: '',
      checkbox: this.isCheckbox,
      isVisible: this.visible,
      expandedkeys: [...this.defaultexpandedkeys], // 默认展开节点数组
      checkedkeys: [...this.defaultcheckedkeys],
      data: this.datas, // 数据
      params: this.queryparams,
      treeLoading: false,
      cacheData: null,
      useTreeCache: this.openTreeCache,
      bossTreeHeight: { // 有input框，树内容区域父元素高度 - input高度； 无input框，树内容区域高度为父元素高度
        fullHeight: !this.isShowInput,
        notfullHeight: this.isShowInput
      },
      emptyTxt: this.emptyText,
      emptyTip: '',
      globalConfigIn: { ...defaultGlobalConfig }

    }
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
  methods: {
    ...mapMutations('basicInfo', ['setBossTree']),
    // 初始化参数
    initData() {
      this.initGlobalConfig()
    },
    // 初始化api服务数据
    initGlobalConfig() {
      this.globalConfigIn = Object.assign(
        {},
        this.globalConfigIn,
        this.globalConfig
      )
    },

    // 隐藏树组件
    hideTree() {
      this.isVisible = !this.isVisible
      this.$emit('update:visible', this.isVisible)
    },

    // 树内容过滤
    filterNode(value, data) {
      // 搜索过滤
      // let data1 = data.children
      // let data2 = {}
      // data1.forEach(item => {
      //   if (item.children) {
      //     item.children.forEach(item2 => {
      //       data2 = item2
      //     })
      //   }
      // })
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    // 获取缓存数据
    getCacheData() {
      this.data = this.cacheData
      this.$nextTick(() => {
        this.afterloadmethod(this.data)
      })
    },

    // 获取请求数据
    async getHttpData() {
      let self = this
      if (this.treeLoading) {
        return
      }
      this.emptyTip = ''
      this.openLoading && (this.treeLoading = true)
      self.data = []
      await this.$http[this.ajaxType](this.serverUri, this.params).then(res => {
        // let res1 = JSON.parse((res))
        let treeResdata = []
        // self.data = (res && Array.isArray(res)) ? res : ((res.code === '100000' || res.code === '200') ? res.data : [])
        if (res.data.results) {
          treeResdata = (res && Array.isArray(res)) ? res : ((res.code === '000000') ? res.data.results : [])
          treeResdata.forEach(item => {
            item.label = item.businessName
            item.code = item.id
            if (item.children) {
              item.children.forEach(item1 => {
                item1.label = item1.businessName
                item1.code = item1.id
                if (item1.children) {
                  item1.children.forEach(item2 => {
                    item2.label = item2.businessName
                    item2.code = item2.id
                  })
                }
              })
            }
          })
          if (self.isNeedRoot) {
            const result = [
              {
                id: 'root',
                label: self.rootname,
                code: 'root',
                isleaf: '0',
                children: treeResdata
              }
            ]
            self.data = result
            console.log(self.data)
          } else {
            self.data = treeResdata
          }
        } else {
          if (res.code) {
            let busdata = []
            busdata.push(res.data)
            console.log(busdata)
            treeResdata = (res && Array.isArray(res)) ? res : ((res.code === '000000') ? busdata : [])
            treeResdata.forEach(item => {
              item.label = item.businessName
              item.code = item.id
              if (item.children) {
                item.children.forEach(item1 => {
                  item1.label = item1.businessName
                  item1.code = item1.id
                  if (item1.children) {
                    item1.children.forEach(item2 => {
                      item2.label = item2.businessName
                      item2.code = item2.id
                    })
                  }
                })
              }
            })
            if (self.isNeedRoot) {
              const result = [
                {
                  id: 'root',
                  label: self.rootname,
                  code: 'root',
                  isleaf: '0',
                  children: treeResdata
                }
              ]
              self.data = result
              console.log(self.data)
            } else {
              self.data = treeResdata
            }
          } else {
            treeResdata = (res && Array.isArray(res)) ? res : ((res.rscode === '100000') ? res.data : [])
            treeResdata.forEach(item => {
              item.label = item.code + '-' + item.name
              if (item.children) {
                item.children.forEach(item1 => {
                  item1.label = item1.code + '-' + item1.name
                })
              }
            })
            if (self.isNeedRoot) {
              const result = [
                {
                  id: 'root',
                  label: self.rootname,
                  code: 'root',
                  isleaf: '0',
                  children: treeResdata
                }
              ]
              self.data = result
              console.log(self.data)
            } else {
              self.data = treeResdata
            }
          }
        }
        // let treeResdata = (res1 && Array.isArray(res1)) ? res1 : ((res1.code === '000') ? res1 : [])

        // 关闭模态框
        self.treeLoading = false

        // 缓存数据
        self.setBossTree({
          params: self.treeParams,
          treeData: self.data
        })

        this.emptyTip = this.emptyTxt
        // 树加载完，回调数据
        self.$nextTick(() => {
          self.afterloadmethod(self.data)
        })
      }).catch(err => {
        console.log(err)
      })
    },

    // 加载树
    initTree() { // 使用异步调用，返回结果后再执行
      if (this.isServer) {
        // this.getHttpData()
        this.cacheData = this.cacheTree(this.treeParams)
        // console.log(55, this.useTreeCache, this.cacheData)
        if (this.useTreeCache && this.cacheData) {
          // console.log('来自树缓存数据')
          this.getCacheData()
        } else {
          // console.log('来自树请求数据')
          this.getHttpData()
        }
      }
    },

    // 自定义树节点内容区渲染模版
    renderContent(h, { node, data, store }) {
      return h('span', [
        h('i', { class: '' }),
        h('span', { style: { 'margin-left': '4px' } }, node.label)
      ])
    },

    // 勾选
    setFirstChildNode(isFirst, level) {
      // isFirst true 强制选中第一个， false 如果没有默认选中就选中第一个, level 层级，哪一层级的第一个节点
      if (this.data && this.data.length) {
        this.$nextTick(() => {
          let curnode = this.$refs.tree.getCurrentNode()
          this.expandedkeys.length = 0
          if (!isFirst && curnode) {
            this.setCurrentNodeByKey(curnode.id)
            return
          }
          let curLevel = 1
          let key = this.getFirstChildNode(
            this.data[0],
            level,
            curLevel
          )
          this.setCurrentNodeByKey(key.id)
        })
      }
    },
    getFirstChildNode(data, level, curLevel) {
      if (!level || curLevel < level) {
        let childrens = data.children
        if (childrens && childrens.length) {
          return this.getFirstChildNode(
            childrens[0],
            level,
            curLevel + 1
          )
        }
      }
      return data
    },

    //= =============================给调用者暴露的方法==============================//

    // 返回树对象
    treeOptionFn() {
      return this.$refs.tree
    },

    // 刷新树
    refreshTree() {
      this.initTree()
    },

    setCheckedKeys(keys = []) {
      this.$refs.tree && this.$refs.tree.setCheckedKeys(keys)
    },

    getCheckedKeys() {
      this.$refs.tree && this.$refs.tree.getCheckedKeys()
    },

    // 获取当前树选中节点数据
    getData() {
      let rdata
      if (this.checkbox) {
        rdata = this.$refs.tree.getCheckedNodes()
      } else {
        rdata = this.$refs.tree.getCurrentNode()
      }
      return rdata
    },

    // 设置勾选
    setCurrentNodeByKey(key) {
      this.$refs.tree.setCurrentKey(key)
      this.checkbox ? this.$refs.tree.setChecked(key, true, true) : this.$refs.tree.setChecked(key)
      this.expandedkeys.push(key)
      this.clickmethod(this.$refs.tree.getCurrentNode(), this)
    },

    //= =============================给调用者暴露的方法==============================//
    currentChange(obj, node) { // 当前选中节点变化时触发的事件
      this.$emit('currentChange', obj, node, this, this.$refs.tree)
    },
    nodeContextmenu(e, obj, node, vess) { // 当某一节点被鼠标右键点击时会触发该事件
      this.$emit('nodeContextmenu', obj, node, this, this.$refs.tree)
    },
    nodeExpand(obj, node, vess) { // 节点被展开时触发的事件
      this.$emit('nodeExpand', obj, node, vess, this, this.$refs.tree)
    },
    nodeCollapse(obj, node, vess) { // 节点被关闭时触发的事件
      this.$emit('nodeCollapse', obj, node, vess, this, this.$refs.tree)
    }

  },
  created() {
    this.initTree()
  },
  mounted() {
    this.initData()
    // console.log(this.data, this.queryparams)
  },
  watch: {
    globalConfig: {
      handler(newValue, oldValue) {
        this.initGlobalConfig()
      },
      deep: true,
      immediate: true
    },
    'globalConfig.inputVal'(val) {
      console.log('bstree', val)
      this.$refs.tree.filter(val)
    },
    emptyText(val) {
      this.emptyTxt = val
    },
    isCheckbox(val) {
      this.checkbox = val
    },
    visible(val) {
      this.isVisible = val
    },
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    openTreeCache(val) {
      this.useTreeCache = val
    },
    defaultcheckedkeys: {
      handler(newvalue, oldValue) {
        this.checkedkeys = newvalue
        this.$forceUpdate()
      },
      immediate: true
    },
    datas: { // 表格配置监听
      handler(newvalue, oldValue) {
        this.data = newvalue
      },
      immediate: true
    },
    queryparams: {
      handler(newvalue, oldValue) {
        this.params = newvalue
        // 树查询条件有变动，自动进行查询
        // this.refreshTree()
      },
      deep: true,
      immediate: true
    },
    defaultexpandedkeys: {
      handler(newValue, oldValue) {
        this.expandedkeys = newValue
      },
      immediate: true
    },
    checkedkeys: {
      handler(newvalue, oldValue) {
        console.log('333', newvalue)
      },
      immediate: true
    }

  }

}
</script>
<style lang="scss">
.boss-tree__base{
  height: calc(100% - 44px);
  background-color: #fff;
  .boss-tree__base__input{
    height: 40px;
    padding: 5px;
  }
  .boss-tree__base__tree{
    overflow: auto;
    .el-tree {
      min-width: calc(100% - 20px);
      font-size: 14px;
      display: inline-block;
      padding: 10px;
    }
  }

  .fullHeight{
    height: 100%;
    max-height: 100%;
  }
  .notfullHeight{
    height: calc(100% - 50px);
    max-height: calc(100% - 50px);
  }
}

</style>
