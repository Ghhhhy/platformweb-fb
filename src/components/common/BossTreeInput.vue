<!-- treeinput 组件 by comer -->
<template>
  <div class="boss-tree__input" :style="{ 'background-color': backgroundColor }">
    <div v-if="showTitle" class="boss-tree__input_title">
      <span v-if="title.require" style="color: red;">*</span>
      <span :title="title.tip">{{ title.tip }}:&nbsp;&nbsp;</span>
    </div>
    <el-select
      ref="selectRef"
      class="boss-tree__input_select"
      :size="size"
      :disabled="selectDisabled"
      :popper-class="className"
      :filter-method="selectFilter"
      :value="valueTitle"
      clearable
      filterable
      @visible-change="showSelectBox"
      @click.native="selectFocus"
      @clear="clearHandle"
    >
      <el-option v-loading="treeLoading" :value="valueTitle" :label="valueTitle">
        <el-tree
          ref="selectTree"
          class="boss-tree__input_tree"
          :show-checkbox="checkbox"
          :data="data"
          :props="props"
          :node-key="props.value"
          :empty-text="emptyText"
          :default-expanded-keys="defaultExpandedKey"
          :filter-node-method="filterNode"
          @dblclick.native="dblNodeClick"
        />
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'BossTreeinput',
  props: {
    props: {
      type: Object,
      default: () => {
        return {
          value: 'id', // ID字段名
          label: 'label', // 显示名称
          children: 'children' // 子级字段名
        }
      }
    },
    value: { // 双向绑定的值 支持对象和##拼接字符串
      type: [Object, String],
      default() {
        return ' ## ## '
      }
    },
    datas: { // 树数据
      type: Array,
      default: () => {
        return []
      }
    },
    size: { // select尺寸 medium/small/mini
      type: String,
      default: ''
    },
    disabled: { // select是否禁用  默认不禁用
      type: Boolean
    },
    showcheckbox: { // 树是否多选，默认不是
      type: Boolean
    },
    isleaf: { // 限制单选只能选底级  多选只显示底级
      type: Boolean
    },
    isServer: { // 是否服务端加载 默认不是
      type: Boolean
    },
    ajaxType: {
      type: String,
      default: 'post'
    },
    serverUri: { // 获取数据访问uri，可自定义[微服务/url]
      type: String,
      default: 'plan-service/queryTreeAssistData'
    },
    openFormatLabel: { // 是否启用格式化label
      type: Boolean
    },
    formatter: { // 树显示label格式化
      type: String,
      default: '#code-#name'
    },
    reloaddata: { // 每次点击是否重新加载数据
      type: Boolean,
      default() {
        return true
      }
    },
    dropdownmethod: { // 单选情况下双击选中事件后触发， 回调
      type: Function,
      default: function(datas) {}
    },
    aftercheckmethod: { // 多选情况下勾选触发，回调
      type: Function,
      default: function(datas) {}
    },
    afterloadmethod: { // 数据已经加载完， 回调
      type: Function,
      default: function(datas) {}
    },
    openQuerySeach: {
      type: Boolean
    },
    queryparams: { // 查询条件获取方法
      type: Object,
      default() {
        return {}
      }
    },
    prefix: {
      type: String,
      default() {
        return ''
      }
    },
    openTreeCache: {
      type: Boolean,
      default() {
        return true
      }
    },
    openLoading: { // 是否开启loading 默认开启
      type: Boolean,
      default() {
        return true
      }
    },
    backgroundColor: {
      type: String,
      default() {
        return '#ffffff'
      }
    },
    titleConfig: { // 标题内容配置
      type: Object,
      default() {
        return {
          require: false,
          tip: ''

        }
      }
    },
    editConfig: { // 树是否允许录入，默认不允许
      type: Boolean
    }
  },
  data() {
    return {
      className: 'boss-tree__input_tree',
      questUri: this.serverUri,
      selectDisabled: this.disabled,
      valueId: '', // 初始值
      lineData: this.value, // 行数据
      valueTitle: '',
      inputval: '', // 记录一下文本框里面输入的值
      emptyText: '',
      defaultExpandedKey: [],
      data: this.datas,
      params: this.queryparams,
      checkbox: this.showcheckbox,
      curNode: { // 当前点击节点
        id: '',
        name: '',
        code: ''
      },
      treePrefix: this.prefix,
      cacheData: null,
      treeLoading: false,
      tempNode: null, // 临时的node值
      useTreeCache: this.openTreeCache,
      title: this.titleConfig
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
    },
    showTitle() {
      return !!this.title.tip
    }
  },
  methods: {
    ...mapMutations('basicInfo', ['setBossTree']),

    // 判断是否为对象
    isObject(obj) {
      return (Object.prototype.toString.call(obj) === '[object Object]')
    },

    // 监听value变化， value改变时改变valueId及curNode的值
    initValue() {
      if (this.isObject(this.value)) {
        this.valueId = this.value[`${this.treePrefix}id`]
        this.curNode.id = this.value[`${this.treePrefix}id`]
        this.curNode.code = this.value[`${this.treePrefix}code`]
        this.curNode.name = this.value[`${this.treePrefix}name`]
      } else {
        this.valueId = this.value.split('##')[0]
        this.curNode.id = this.value.split('##')[0]
        this.curNode.code = this.value.split('##')[1]
        this.curNode.name = this.value.split('##')[2]
      }

      let node = {
        code: (this.curNode.code && this.curNode.code !== ' ') ? this.curNode.code : '',
        name: (this.curNode.name && this.curNode.name !== ' ') ? this.curNode.name : ''

      }
      if (this.openFormatLabel) {
        let fmt = this.formatter
        let fmtArr = this.formatter.split('-')
        for (let j = 0; j < fmtArr.length; j++) {
          fmt = fmt.replace(
            fmtArr[j],
            node[fmtArr[j].replace('#', '')] || ''
          )
        }
        this.valueTitle = fmt
      } else {
        // 默认显示为code与name拼接
        this.valueTitle = (node.name && node.code) ? node.code + '-' + node.name : ''
      }

      // console.log(111, this.valueTitle, this.value)
    },

    // 下拉框输入时触发,自定义搜索方法
    selectFilter(val) {
      this.$refs.selectTree && this.$refs.selectTree.filter(val)
      this.inputval = val
    },

    // 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
    filterNode(value, data) {
      // 搜索过滤
      if (!value) return true
      let valArr = value.split(',')
      let isOk = false
      for (let i = 0; i < valArr.length; i++) {
        if (isOk) {
          break
        }
        isOk = data.label.indexOf(valArr[i]) !== -1
      }
      return isOk
    },

    // 格式化树的label
    formatLabel(data) {
      if (data && data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].name = data[i].name || data[i].label
          if (this.openFormatLabel) {
            let fmt = this.formatter
            let fmtArr = this.formatter.split('-')
            for (let j = 0; j < fmtArr.length; j++) {
              fmt = fmt.replace(
                fmtArr[j],
                data[i][fmtArr[j].replace('#', '')] || ''
              )
            }
            data[i]['label'] = fmt
          }
          if (data[i].children) { // 非底级节点
            data[i].isleaf = '0'
            data[i].leaf = false
            this.formatLabel(data[i].children)
          } else { // 底级节点
            data[i].isleaf = '1'
            data[i].leaf = true
          }
        }
      }
    },
    selectFocus() {
      if (this.reloaddata) {
        this.initTree()
      }
      this.$refs.selectTree && this.$refs.selectTree.filter('') // 每次显示数据清除掉之前的过滤
    },

    setValue(val) {
      this.valueId = val
      if (!val) {
        this.clearHandle()
      }
      this.setTreeData()
    },

    // 加载完后处理数据
    dealDataAfterLoad() {
      this.$nextTick(() => {
        this.formatLabel(this.data)
        this.setTreeData()
        this.selectFilter('')
        this.$nextTick(() => {
          this.afterloadmethod(this.data)
        })
      })
    },

    // 获取缓存数据
    getCacheData() {
      this.data = this.cacheData
      this.dealDataAfterLoad()
    },

    // 获取请求数据
    async getHttpData() {
      let self = this
      if (this.treeLoading) {
        return
      }
      this.emptyText = ''
      this.openLoading && (this.treeLoading = true)
      await this.$http[this.ajaxType](this.questUri, this.params)
        .then(res => {
          self.data = (res && Array.isArray(res)) ? res : ((res.rscode === '100000' || res.rscode === '200') ? res.data : [])
          this.treeLoading = false
          if (!Array.isArray(res)) {
            console.log('树数据接口返回问题： ' + res)
          }
        })
        .catch(err => {
          this.treeLoading = false
          console.log(err)
        })
      this.emptyText = '暂无数据'
      this.dealDataAfterLoad()
      // 缓存数据
      this.setBossTree({
        params: this.treeParams,
        treeData: this.data
      })
    },
    // 初始化值
    async initTree() {
      if (this.isServer) {
        this.getHttpData()
        // this.cacheData = this.cacheTree(this.treeParams)
        // // console.log(55, this.useTreeCache, this.cacheData)
        // if (this.useTreeCache && this.cacheData) {
        //   // console.log('来自树缓存数据')
        //   this.getCacheData()
        // } else {
        //   // console.log('来自树请求数据')
        //   this.getHttpData()
        // }
      } else {
        if (this.data.length) { // 说明是传入的树数据
          this.dealDataAfterLoad()
        }
      }
    },

    // 下拉框出现/隐藏时触发 出现则为 true，隐藏则为 false
    showSelectBox(isShow) {
      if (!isShow) {
        if (this.checkbox) {
          let nodes = this.$refs.selectTree.getCheckedNodes()
          let fileternodes = []
          if (this.isleaf) {
            for (let i = 0; i < nodes.length; i++) {
              if (nodes[i].leaf) {
                fileternodes.push(nodes[i])
              }
            }
            nodes = fileternodes
          }

          if (nodes.length > 0) {
            let allValueId = ''
            let allValueTitle = ''
            for (let i = 0; i < nodes.length; i++) {
              if (i === nodes.length - 1) {
                allValueId += nodes[i][this.props.value] + ''
                allValueTitle += nodes[i][this.props.label] + ''
              } else {
                allValueId += nodes[i][this.props.value] + ','
                allValueTitle += nodes[i][this.props.label] + ','
              }
            }
            this.valueId = allValueId
            this.valueTitle = allValueTitle
          } else {
            this.valueId = ''
            this.valueTitle = ''
          }
          this.afterNodeChecked(nodes, this.valueId)
        } else {
          if (!this.valueId.trim()) {
            // 当前不为空
            let node = this.$refs.selectTree.getCurrentNode()

            if (this.isleaf) {
              // 如果必须底级
              if (node && node.leaf) {
                // 是底级就显示
                this.valueTitle = node[this.props.label]
                this.valueId = node[this.props.value]
              } else {
                // 不是底级就清楚树的选中
                this.$refs.selectTree.setCurrentKey(null)
                this.valueTitle = ''
                this.$refs.selectTree.filter('')
              }
            } else {
              if (node) {
                this.valueTitle = node[this.props.label]
                this.valueId = node[this.props.value]
              } else {
                this.$refs.selectTree.setCurrentKey(null)
                this.valueTitle = ''
                this.$refs.selectTree.filter('')
              }
            }
          } else {
            if (typeof this.valueId === 'string' && !String(this.valueId).includes('initId')) {
              this.$refs.selectTree.setCurrentKey(this.valueId)
            }
          }
        }
        this.emitLineData()
      }
    },

    afterNodeChecked(nodes, values) {
      if (this.aftercheckmethod) {
        this.aftercheckmethod(nodes, values)
      }
    },

    // 树单击事件
    handleNodeClick($event, node, curndoe, e) {
      // window.event.stopPropagation()
      // window.event.preventDefault()

      if (this.isleaf) {
        if (node['leaf']) {
          this.curNode = node
        } else {
          this.throwWarn()
        }
      } else {
        this.curNode = node
      }
      // this.$refs.selectRef.focus()
      // if (this.$parent && this.$parent.$parent && (typeof this.$parent.$parent.clearActived === 'function')) {
      //   this.$parent.$parent.clearActived()
      // }
    },

    // 非底级节点提示
    throwWarn() {
      this.$message({ message: '非底级节点不能选中!', type: 'warning' })
    },

    // 树双击事件【只有checkbox为false情况下触发】
    dblNodeClickBak(event) {
      if (!this.checkbox) {
        if (this.isleaf) {
          if (this.curNode['leaf']) {
            this.valueTitle = this.curNode[this.props.label]
            this.valueId = this.curNode[this.props.value]
            this.defaultExpandedKey = [this.valueId]
            this.$refs.selectRef.blur()
            this.onDropdownMenuClosed(this.curNode, event)
          }
        } else {
          this.valueTitle = this.curNode[this.props.label]
          this.valueId = this.curNode[this.props.value]
          this.defaultExpandedKey = [this.valueId]
          this.$refs.selectRef.blur()
          this.onDropdownMenuClosed(this.curNode, event)
        }

        this.inputval = ''
        // 值修改监控事件
        this.emitLineData()
      }
    },

    // 树双击事件【只有checkbox为false情况下触发】
    dblNodeClick(event) {
      if (!this.checkbox) {
        const node = this.$refs.selectTree.getCurrentNode()
        if (this.isleaf && !node['leaf']) {
          this.throwWarn()
          return
        }

        this.$refs.selectRef.blur()
        this.onDropdownMenuClosed(node, event)
        this.inputval = ''
        // 值修改监控事件
        this.emitLineData()
      }
    },

    // 双击选中后触发
    onDropdownMenuClosed(data, event) {
      this.dropdownmethod(data, event)
    },

    // 清除选中
    clearHandle() {
      this.valueTitle = ''
      this.valueId = null
      this.inputval = ''
      this.defaultExpandedKey = []
      if (this.checkbox) {
        this.$refs.selectTree.setCheckedKeys([])
      } else {
        this.$refs.selectTree.setCurrentKey(null)
      }
      this.emitClearLineData()
    },

    dealCss() {
      var uldiv = this.$el.getElementsByClassName(
        'el-select-dropdown__wrap el-scrollbar__wrap'
      )
      var ul = this.$el.getElementsByClassName(
        'el-scrollbar__view el-select-dropdown__list'
      )
      if (uldiv.length) {
        uldiv[0].style.marginBottom = '0px'
        uldiv[0].style.marginRight = '0px'
        uldiv[0].style.overflow = 'auto'
      }
      if (ul.length) {
        ul[0].style.padding = 0
      }
    },

    // 设置树数据【input显示  默认选中  默认展开】
    setTreeData() {
      if (!this.checkbox) {
        if (this.valueId && !String(this.valueId).includes('initId')) {
          let node = this.$refs.selectTree && this.$refs.selectTree.getNode(this.valueId)
          this.valueTitle = (node && node.data[this.props.label]) || ''// 初始化显示
          this.$refs.selectTree && this.$refs.selectTree.setCurrentKey(this.valueId) // 设置默认选中
          this.defaultExpandedKey = [this.valueId] // 设置默认展开
        }
      } else {
        if (this.valueId) {
          let valArr = this.valueId.split(',')
          this.valueTitle = ''
          this.defaultExpandedKey = []
          for (let i = 0; i < valArr.length; i++) {
            if (i === valArr.length - 1) {
              if (this.$refs.selectTree.getNode(valArr[i])) {
                this.valueTitle += this.$refs.selectTree.getNode(valArr[i]).data[this.props.label] // 初始化显示
                this.defaultExpandedKey.push(valArr[i])
              }
            } else {
              if (this.$refs.selectTree.getNode(valArr[i])) {
                this.valueTitle +=
                  this.$refs.selectTree.getNode(valArr[i]).data[this.props.label] + ',' // 初始化显示
                this.defaultExpandedKey.push(valArr[i])
              }
            }
            this.$refs.selectTree.setCheckedKeys(this.defaultExpandedKey)
          }
        }
      }
    },

    // select  双击  清空，影响了lineData改变
    emitLineData() {
      const curVal = this.getData()
      if (this.isObject(this.value)) {
        this.lineData[`${this.treePrefix}id`] = curVal.id
        this.lineData[`${this.treePrefix}code`] = curVal.code
        this.lineData[`${this.treePrefix}name`] = curVal.name
      } else {
        this.lineData = `${curVal.id}##${curVal.code}##${curVal.name}`
      }
      // console.log(77, this.lineData)
      this.$emit('input', this.lineData)
    },

    emitClearLineData() {
      let timeStamp = +new Date()
      if (this.isObject(this.value)) {
        this.lineData[`${this.treePrefix}id`] = 'initId' + timeStamp
        this.lineData[`${this.treePrefix}code`] = ' '
        this.lineData[`${this.treePrefix}name`] = ' '
      } else {
        this.lineData = `initId${timeStamp}## ## `
      }

      // console.log(78, this.lineData)
      this.$emit('input', this.lineData)
    },

    splitLineData() {
      let lineDataObj = Object.create(null)
      if (this.isObject(this.value)) {
        lineDataObj.id = this.lineData[`${this.treePrefix}id`]
        lineDataObj.code = this.lineData[`${this.treePrefix}code`]
        lineDataObj.name = this.lineData[`${this.treePrefix}name`]
      } else {
        [lineDataObj.id, lineDataObj.code, lineDataObj.name] = this.lineData.split('##')
      }

      return lineDataObj
    },

    //= =============================给调用者暴露的方法==============================//

    // 返回select对象和树对象
    treeInputOptionFn() {
      return {
        selectRef: this.$refs.selectRef,
        selectTree: this.$refs.selectTree
      }
    },

    // 刷新树
    refreshTree() {
      this.initTree()
    },

    // 获取树数据
    getData() {
      let rdata
      let timeStamp = +new Date()
      const defaultObj = {
        id: 'initId' + timeStamp,
        code: ' ',
        name: ' '
      }
      if (this.checkbox) {
        rdata = this.$refs.selectTree.getCheckedNodes()
      } else {
        // console.log(44, this.$refs.selectTree.getCurrentNode())
        rdata = this.$refs.selectTree.getCurrentNode() || this.splitLineData()
      }
      return rdata || defaultObj
    }

    //= =============================给调用者暴露的方法==============================//

  },
  mounted() {
    this.initTree()
    this.initValue()
    this.$nextTick(() => {
      this.dealCss()
    })
  },
  created() {

  },
  watch: {
    showcheckbox(val) {
      this.checkbox = val
    },
    disabled(val) {
      this.selectDisabled = val
    },
    prefix(val) {
      this.treePrefix = val
    },
    openTreeCache(val) {
      this.useTreeCache = val
    },
    questUri(val) {
      this.questUri = val
    },
    datas: { // 表格配置监听
      handler(newvalue, oldValue) {
        this.data = newvalue
      },
      immediate: true
    },
    titleConfig: {
      handler(newValue, oldValue) {
        this.title = newValue
      },
      deep: true,
      immediate: true
    },
    queryparams: {
      handler(newValue, oldValue) {
        const flag = JSON.stringify(newValue) === JSON.stringify(oldValue)
        if (!flag) {
          this.params = newValue
        }

        if (this.openQuerySeach && !flag && oldValue) {
          this.initTree()
        }
      },
      deep: true,
      immediate: true
    },
    value: {
      handler(newValue, oldValue) {
        const val = this.isObject(this.value) ? this.value[`${this.treePrefix}id`] : this.value.split('##')[0]
        if (this.value && val) {
          this.initValue()
          this.lineData = this.value
        }
      },
      deep: true,
      immediate: true
    },
    valueTitle(val) { // 解决from加载树时，只有一个id没有code和name时需要回显名称问题
      let data = Object.create(null)
      if (this.isObject(this.value)) {
        data = this.lineData
      } else {
        const arr = this.lineData.split('##')
        data[this.treePrefix + 'id'] = arr[0]
        data[this.treePrefix + 'code'] = arr[1]
        data[this.treePrefix + 'name'] = arr[2]
      }

      let _id = data[this.treePrefix + 'id'].trim()
      let _code = data[this.treePrefix + 'code'].trim()
      let _name = data[this.treePrefix + 'name'].trim()
      if (_id && !String(_id).includes('initId') && !_code && !_name) {
        let timeStamp = +new Date()
        const defaultObj = {
          id: 'initId' + timeStamp,
          code: ' ',
          name: ' '
        }
        const curVal = this.$refs.selectTree.getCurrentNode() || defaultObj
        if (this.isObject(this.value)) {
          this.lineData[`${this.treePrefix}id`] = curVal.id
          this.lineData[`${this.treePrefix}code`] = curVal.code
          this.lineData[`${this.treePrefix}name`] = curVal.name
        } else {
          this.lineData = `${curVal.id}##${curVal.code}##${curVal.name}`
        }
        this.$emit('input', this.lineData)
        // console.log(99, this.lineData)
      }
    }

  }
}
</script>
<style lang="scss" scope>
  .boss-tree__input{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .boss-tree__input_title{
      line-height: 40px;
      flex-shrink: 0;
      max-width: 320px;
      text-align: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      /* padding-right: .8em; */
      font-size: 14px;
      vertical-align: middle;
      display: inline-block;
    }
    .el-select{
      display:block;
      height: 40px;
      display: inline-block;
      position: relative;
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
    }
  }
  .boss-tree__input_tree{
    min-height: 200px;
    .el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
      height: auto;
      max-height: 274px;
      padding: 0;
      overflow: hidden;
      overflow-y: auto;
    }
    .el-select-dropdown__item.selected{
      font-weight: 400 !important;
    }
  }
</style>
