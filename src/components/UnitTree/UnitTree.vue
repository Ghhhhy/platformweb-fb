<!--  全局Tree   Author:Titans@2396757591@qq.com -->
<template>
  <div
    class="unit-tree-main"
    :class="!isDropSelectTree ? 'unit-tree-main-nodrop' : 'unit-tree-main-drop'"
    @click.stop
  >
    <div v-if="isDropSelectTree" class="selection-tree" :style="{ 'pointerEvents': configIn.disabled ? 'none' : 'auto' }">
      <span v-if="!editable" class="text" text>{{ treeOptionValue }}</span>
      <div v-if="title" class="fn-inline selection-tree-label">
        {{ title }}
      </div>
      <div class="selection-tree-box" :class="title ? 'fn-inline ' : 'block'">
        <vxe-pulldown
          v-if="editable"
          ref="xDownTree"
          size="medium"
          :destroy-on-close="configIn.destroyOnClose"
          :transfer="true"
          :disabled="configIn.disabled"
          @hide-panel="onHidePanel"
        >
          <template v-slot>
            <div class="select" @click="toggleDrop(undefined)">
              <vxe-input
                ref="inputEntry"
                v-model="treeOptionValue"
                :style="selectStyle"
                :readonly="configIn.readonly"
                :placeholder="configIn.placeholder"
                :disabled="configIn.disabled"
                :clearable="configIn.clearStyleType === 'filterBtn' ? false : configIn.clearable"
                @blur="onEntryBlur"
                @focus="onEntryFocus"
                @keyup="onEntryClose"
                @clear="onClearClick"
              >
                <template v-slot:suffix>
                  <i
                    v-if="!selectDropShow"
                    class="vxe-input--suffix-icon vxe-icon--caret-bottom"
                  ></i>
                  <i
                    v-if="selectDropShow"
                    class="vxe-input--suffix-icon vxe-icon--caret-bottom rotate180"
                  ></i>
                <!-- <i v-show="!selectDropShow" class="vxe-icon--arrow-bottom"></i>
                <i v-show="selectDropShow" class="vxe-icon--arrow-top"></i> -->
                <!-- </transition> -->
                </template>
              </vxe-input>
            </div>
          </template>
          <template v-slot:dropdown>
            <div
              class="option unit-tree-main-drop-option"
              :class="configIn.showFilter ? 'no-filter' : ''"
              @click.stop
            >
              <div class="filter-line" :class="configIn.clearStyleType === 'filterBtn' ? 'filter-line-inputbtn' : 'filter-line-onlyinput'">
                <div class="fn-inline filter-line-input">
                  <vxe-input
                    v-if="configIn.showFilter"
                    ref="filterInput"
                    v-model="filterTextIn"
                    clearable
                    placeholder="输入关键字进行过滤"
                    @keyup="onFilterEnterKeyup"
                  />
                </div>
                <div class="fn-inline filter-line-btn">
                  <vxe-button status="primary" content="重置" @click="onClearClick" />
                </div>
              </div>
              <div
                ref="xScrollLoad"
                class="option-tree scroll-loading"
                @scroll="scrollLoad"
              >
                <el-tree
                  ref="tree"
                  v-loading="isLoadingIn"
                  class="filter-tree"
                  :render-content="renderContent"
                  :check-on-click-node="configIn.checkOnClickNode"
                  :expand-on-click-node="configIn.expandOnClickNode"
                  :show-checkbox="configIn.multiple"
                  :lazy="configIn.isLazeLoad"
                  :data="configIn.scrollLoad ? treeDataRenderIn : treeDataIn"
                  :load="lazeLoad"
                  :disabled="configIn.disabled"
                  :props="configIn.treeProps"
                  :node-key="configIn.treeProps.nodeKey"
                  :default-expand-all="configIn.defaultExpandAll"
                  :default-expanded-keys="defaultExpandedKeysIn"
                  :default-checked-keys="defaultCheckedKeysIn"
                  :current-node-key="currentNodeKeyIn"
                  :filter-node-method="filterNode"
                  @node-click="selectOnNodeClick || !configIn.expandOnClickNode ? onNodeDblClick : () => {} "
                  @dblclick.native="onNodeDblClick"
                  @check="onCheckChange"
                  @check-change="onNodeCheckChange"
                />
                <div v-show="scrollLoading" class="scroll-loading-tip">
                  加载中......
                </div>
              </div>
            </div>
          </template>
        </vxe-pulldown>
      </div>
    </div>
    <div
      v-if="!isDropSelectTree"
      class="selection-tree selection-tree-nodrop"
      :class="configIn.showFilter ? '' : 'no-filter'"
    >
      <div class="vxe-input-filter-tree">
        <vxe-input
          v-if="configIn.showFilter"
          v-model="filterTextIn"
          clearable
          placeholder="输入关键字进行过滤"
        />
      </div>
      <div class="el-tree-main scroll-loading">
        <el-tree
          v-if="isRenderTree"
          ref="tree"
          v-loading="isLoadingIn"
          class="filter-tree"
          :check-on-click-node="configIn.checkOnClickNode"
          :show-checkbox="configIn.multiple"
          :lazy="configIn.isLazeLoad"
          :expand-on-click-node="configIn.expandOnClickNode"
          :data="configIn.scrollLoad ? treeDataRenderIn : treeDataIn"
          :props="configIn.treeProps"
          :load="lazeLoad"
          :disabled="configIn.disabled"
          :render-content="renderContent"
          :node-key="configIn.treeProps.nodeKey"
          :default-expand-all="configIn.defaultExpandAll"
          :default-expanded-keys="defaultExpandedKeysIn"
          :default-checked-keys="defaultCheckedKeysIn"
          :current-node-key="currentNodeKeyIn"
          :filter-node-method="filterNode"
          @node-click="nodeClick"
          @check="onCheckChange"
          @check-change="onNodeCheckChange"
        />
        <div v-show="scrollLoading" class="scroll-loading-tip">
          加载中......
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClickOutside from './clickOutside.js'
export default {
  name: 'UnitTree',
  directives: {
    ClickOutside
  },
  props: {
    nodeStyle: {
      type: [Object, Function],
      default() {
        return {
        }
      }
    },
    title: {
      type: String,
      default() {
        return ''
      }
    },
    defaultExpandedKeys: {
      // 默认展开树的主键
      type: Array,
      default() {
        return []
      }
    },
    defaultCheckedKeys: {
      // 默认勾选的节点的 key 的数组
      type: Array,
      default() {
        return []
      }
    },
    currentNodeKey: {
      // 当前选中的节点key
      type: String,
      default: ''
    },
    fieldName: {
      type: String,
      default() {
        return ''
      }
    },
    isDropSelectTree: { // true||false||'dropTree'
      // 是不是下拉树 ，默认是普通树
      type: [Boolean, String],
      default: false
    },
    filterText: {
      // 过滤文本
      type: String,
      default: ''
    },
    isLoading: {
      // 是不是加载
      type: Boolean
    },
    editable: {
      // 下拉树是不是可编辑树
      type: Boolean
    },
    treeData: {
      // 当config.axiosConfg.url为空时采用掺入数据
      type: Array,
      default() {
        return [
          // {
          //   id: 1,
          //   label: '一级 1',
          //   userKey: { key: '一级 1' },
          //   children: [
          //     {
          //       id: 4,
          //       label: '二级 1-1',
          //       userKey: { key: '二级 1-1' },
          //       children: [
          //         {
          //           id: 9,
          //           label: '三级 1-1-1',
          //           userKey: { key: '三级 1-1-1' }
          //         },
          //         {
          //           id: 10,
          //           label: '三级 1-1-2',
          //           userKey: { key: '三级 1-1-2' }
          //         }
          //       ]
          //     }
          //   ]
          // },
          // {
          //   id: 2,
          //   label: '一级 2',
          //   userKey: { key: '一级 2' },
          //   children: [
          //     {
          //       id: 5,
          //       userKey: { key: '二级 2-1' },
          //       label: '二级 2-1'
          //     },
          //     {
          //       id: 6,
          //       userKey: { key: '二级 2-2' },
          //       label: '二级 2-2'
          //     }
          //   ]
          // },
          // {
          //   id: 3,
          //   label: '一级 3',
          //   userKey: { key: '一级 3' },
          //   children: [
          //     {
          //       id: 7,
          //       userKey: { key: '二级 3-1' },
          //       label: '二级 3-1'
          //     },
          //     {
          //       id: 8,
          //       userKey: { key: '二级 3-2' },
          //       label: '二级 3-2'
          //     }
          //   ]
          // }
        ]
      }
    },
    config: {
      // 树配置
      type: Object,
      default() {
        return {}
      }
    },
    queryparams: {
      // 请求treeData 参数
      type: [Object],
      default() {
        return {}
      }
    },
    value: {
      // 选中的值 node,其中当为普通树时必须为node节点对象而非id
      type: [Object, Array, String],
      default() {
        return {}
      }
    },
    romoteFilterMethod: {
      type: [Boolean, Function, String],
      default() {
        return false
      }
    },
    customClear: {
      type: [Function],
      default: undefined
    },
    selectStyle: {
      type: [Object, String],
      default: ''
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      needInit: true,
      isNeedInit: true, // 是否需要初始化
      isLoadingIn: false, // 是否是加载状态
      scrollLoading: false,
      configIn: {
        renderContent: undefined, // 函数
        autoFocusFilter: true, // 是否在下拉展开后自动聚焦过滤
        filterEnterToSelectAndQuery: false, // 允许过滤回车选中，再回车查询
        filterEnterToSelectAndQueryHideDrop: false, // 允许过滤回车选中，再回车查询并收起下拉框
        // isHump: true, // 是否驼峰
        checkOnClickNode: false,
        clearStyleType: 'filter', // filter||filterBtn
        destroyOnClose: false,
        refreshTreeDataOnDrop: false, // 是否每次渲染下拉重新加载数据
        expandOnClickNode: true, // 展开node
        selectOnNodeClick: true, // 是否单机选中
        showFilter: true, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: false, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'], // 树数据对应 字段code，name,id的属性名 [qwe1,asd2,zxc3]  aaa_de
        format: '{code}-{name}',
        defaultExpandRootNode: true, // 是否默认展开根节点
        placeholder: '请选择',
        disabled: false, // 是否禁用
        tooltip: false,
        romoteFilter: false, // 是否远程过滤
        // multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '', // {code}-{name}
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          rootName: '',
          dataField: 'data',
          successCode: '200', // 成功code
          statusField: 'rscode',
          method: 'post', // 请求方式
          url: '' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true, // 是否可录入编辑,可录入时需要点击输入框光标聚焦再录入
        clearable: true // 可清除
      },
      isRenderTree: true, // 是否渲染树
      defaultExpandedKeysIn: [], // 默认展开树的主键
      defaultCheckedKeysIn: [], // 默认勾选的节点的 key 的数组
      currentNodeKeyIn: '', // 当前选中的节点key
      queryparamsCp: {}, // 请求树的参数
      filterTextIn: '', // 过滤输入文本
      treeDataIn: [], // 树渲染原始数据
      curClickNode: {}, // 当前点击项
      curCheckedNodes: [], // 当前选中的树的节点集合
      curHalfCheckedNodes: [], // 当前选中的树的半节点集合
      curCheckednode: {},
      treeOptionDataArr: [], // 当前操作的数据
      treeOptionValue: '', // 操作结果渲染文本
      selectDropShow: false, // 下拉选择是否显示
      scrollLoadPageConfig: {
        // 下啦加载配置
        currentPage: 1,
        currentLoadTotal: 0,
        total: 0,
        pageSize: 10,
        totalPage: 1
      },
      valueOut: '',
      treeDataRenderIn: [], // 开启滚动加载时的数据
      treeDataInList: [],
      filterTextInCp: null
    }
  },
  mounted() {
    this.$emit('register', this.$refs.tree || this)
  },
  methods: {
    filterNode(value, data) {
      // 过滤集合
      if (!value) return true
      const { treeProps, valueKeys } = this.configIn
      if (treeProps.labelFormat) {
        return this.formatLabel(treeProps.labelFormat, data).indexOf(value) !== -1
      } else if (treeProps.label) {
        return String(data[treeProps.label]).indexOf(value) !== -1
      } else {
        return (data[valueKeys[0] || 'code'] + data[valueKeys[1] || 'name']).indexOf(value) !== -1
      }
      // return (data[treeProps.label || valueKeys[1] || 'name']).indexOf(value) !== -1
    },
    hyphenate(str) {
      // 小驼峰转成连字符
      return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
    },
    smallHump(str) {
      // 连字符转成小驼峰
      return str.replace(/(\w*)-(\w*)/g, function($1, $2, $3) {
        return $2 + $3[0].toUpperCase() + $3.slice(1)
      })
    },
    deepCopy(obj) {
      // 深拷贝通用方法
      let me = this
      if (typeof obj !== 'object' || obj === null) return obj
      let newObj = obj instanceof Array ? [] : {}
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
        }
      }
      return newObj
    },
    getDataType(obj) {
      // 获取数据类型
      return Object.prototype.toString.call(obj).slice(8, -1)
    },
    formatLabel(format, nodeData) {
      // 格式化显示label
      // let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
      // let rowsKey = format.match(regR) === null ? [] : format.match(regR)
      // if (rowsKey.length) {
      //   for (let keyCF in rowsKey) {
      //     let keyC = rowsKey[keyCF].replace(/\{|\}/g, '')
      //     let reg = new RegExp('({' + keyC + '})', 'ig')
      //     format = format.replace(reg, nodeData[keyC])
      //   }
      // }
      //  return format
      const { valueKeys } = this.configIn
      let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
      let rowsKey = format.match(regR).map((key, keyIndex) => {
        return key.replace(/{|}/gi, '')
      })
      let arr = []
      rowsKey.forEach((key, index) => {
        if (key === (valueKeys[0] || 'code' || 'code')) {
          nodeData[key] !== 'root' && nodeData[key] && arr.push(nodeData[key])
        } else {
          nodeData[key] && arr.push(nodeData[key])
        }
      })
      return arr.join('-')
    },
    getTooltiContent(data, tooltip) {
      if (!tooltip) {
        return ''
      } else {
        let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
        let rowsKey = (tooltip.match(regR) || []).map((key, keyIndex) => {
          return key.replace(/{|}/gi, '')
        })
        let arr = []
        rowsKey.forEach((key, index) => {
          data[key] && arr.push(data[key])
        })
        if (arr.length) {
          rowsKey.forEach((key, index) => {
            let reg = new RegExp('({' + key + '})', 'ig')
            tooltip = tooltip.replace(reg, data[key])
          })
          return tooltip
        } else {
          return data[tooltip]
        }
      }
    },
    renderContent(h, obj) {
      let self = this
      let { tooltip, renderContent } = self.configIn
      if (typeof (renderContent) === 'function') {
        return renderContent(h, obj, this)
      }
      let { data } = obj
      const { valueKeys, treeProps } = self.configIn
      const { labelFormat, label } = treeProps
      let nodeStyle = {}
      if (typeof this.nodeStyle === 'function') {
        nodeStyle = this.nodeStyle(obj, this.configIn)
      } else {
        nodeStyle = this.nodeStyle
      }
      if (labelFormat) {
        if (tooltip) {
          return [
            <vxe-tooltip leaveDelay={0} placement="right" content={self.getTooltiContent(data, tooltip)} enterable>
              <span class="custom-tree-node" style={nodeStyle}>
                <span>{this.formatLabel(labelFormat, data)}</span>
              </span>
            </vxe-tooltip>
          ]
        } else {
          return [
            <span class="custom-tree-node" style={nodeStyle}>
              <span>{this.formatLabel(labelFormat, data)}</span>
            </span>
          ]
        }
      } else if (label) {
        if (tooltip) {
          return [
            <vxe-tooltip leaveDelay={0} placement="right" content={self.getTooltiContent(data, tooltip)} enterable>
              <span class="custom-tree-node" style={nodeStyle}>
                <span>{data[label]}</span>
              </span>
            </vxe-tooltip>
          ]
        } else {
          return [
            <span class="custom-tree-node" style={nodeStyle}>
              <span>{data[label]}</span>
            </span>
          ]
        }
      } else {
        if (tooltip) {
          return [
            <vxe-tooltip leaveDelay={0} placement="right" content={self.getTooltiContent(data, tooltip)} enterable>
              <span class="custom-tree-node" style={nodeStyle}>
                <span>{data[valueKeys[0] || 'code'] + data[valueKeys[1] || 'name']}</span>
              </span>
            </vxe-tooltip>
          ]
        } else {
          return [
            <span class="custom-tree-node" style={nodeStyle}>
              <span>{data[valueKeys[0] || 'code'] + data[valueKeys[1] || 'name']}</span>
            </span>
          ]
        }
      }
    },
    setCheckedKeys() {

    },
    setCheckedNodes() {

    },
    treeOptionFn() {
      // 树的操作函数暴露
      // expandOnClickNode: (...)
      // setChecked: ƒ ()
      // setCheckedKeys: ƒ ()
      // setCheckedNodes: ƒ ()
      return this.$refs.tree
    },
    toggleDrop(dropPull) {
      // 显示或隐藏下拉集
      const { refreshTreeDataOnDrop, autoFocusFilter } = this.configIn
      // if (disabled) return
      const { xDownTree } = this.$refs
      if (dropPull || !this.selectDropShow) {
        xDownTree.showPanel().then(() => {
          this.selectDropShow = true
          if (this.needInit || (this.selectDropShow && (refreshTreeDataOnDrop || !this.treeDataIn.length))) {
            this.$nextTick(() => {
              this.setDropSelectTreeDefaultValue()
              if (this.isNeedInit || !this.isInitLoadData) {
                this.initTreeData(true)
              }
            })
          } else {
            this.setDropSelectTreeDefaultValue()
          }
          if (autoFocusFilter) {
            this.$refs.filterInput.focus()
            this.$refs.inputEntry.blur()
          }
        })
      } else {
        this.filterTextIn = ''
        this.selectDropShow = false
        xDownTree.hidePanel()
        this.isNeedInit = true
      }
    },
    throwWarning(type) {
      // 非传入的级别节点提示
      switch (type) {
        case 'isleaf':
          this.$message({ message: '非底级节点不能选中!', type: 'warning' })
          break
        case 'levelno':
          this.$message({ message: '非期望的节点不能选中!', type: 'warning' })
          break
        case 'treeLoadedFailed':
          this.$message({ message: '树数据加载失败，请核查!', type: 'warning' })
          break
      }
    },
    getEntryValueArr(treeOptionValue) {
      let self = this
      const { multiple, valueKeys } = self.configIn
      let entryNameArr = treeOptionValue.split(',')
      if (!multiple && entryNameArr.length === 1) {
        let ivalue = self.treeOptionValue.split('-')
        let name = ivalue.length && ivalue.length === 1 ? ivalue[0] : (ivalue.length === 2 ? ivalue[1] : '')
        let code = ivalue.length && ivalue.length === 1 ? '' : (ivalue.length === 2 ? (ivalue[0].match(/[0-9]/ig) || []).join('') : '')
        return [
          {
            [valueKeys[1] || 'name']: name,
            [valueKeys[0] || 'code']: code,
            [valueKeys[2] || 'id']: ''
          }
        ]
      } else {
        return Array.from(new Set(entryNameArr)).map(
          (item, index) => {
            let ivalue = item.split('-')
            let name = ivalue.length && ivalue.length === 1 ? ivalue[0] : (ivalue.length === 2 ? ivalue[1] : '')
            let code = ivalue.length && ivalue.length === 1 ? '' : (ivalue.length === 2 ? (ivalue[0].match(/[0-9]/ig) || []).join('') : '')
            return {
              [valueKeys[1] || 'name']: name,
              [valueKeys[0] || 'code']: code,
              [valueKeys[2] || 'id']: ''
            }
          }
        )
      }
    },
    onEntryFocus() {
      // 录入聚焦
      this.treeOptionValueCp = this.treeOptionValue
      this.treeOptionDataArrCp = this.deepCopy(this.treeOptionDataArr)
    },
    compareName(data, key, value) {
      // 比较数据是否存在
      let obj = {}
      let result = data.some((item, index) => {
        obj = item
        return item[key] === value
      })
      return result && obj
    },
    updataEntryData(data) {
      let self = this
      // 更新录入数据
      const { valueKeys } = self.configIn
      return data.map((item, index) => {
        let has = self.compareName(self.treeOptionDataArrCp, valueKeys[1] || 'name', item[valueKeys[1] || 'name'])
        if (!has) {
          item[valueKeys[2] || 'id'] = ''
        } else {
          item[valueKeys[0] || 'code'] = has[valueKeys[0] || 'code']
          item[valueKeys[2] || 'id'] = has[valueKeys[2] || 'id']
        }
        return item
      })
    },
    onEntryClose() {
      // this.onEntryBlur()
    },
    onEntryBlur() {
      // 录入
      let self = this
      window.event.stopPropagation()
      if (!this.selectDropShow) {
        if (
          self.treeOptionValue &&
          self.treeOptionValueCp !== self.treeOptionValue
        ) {
          self.treeOptionDataArr = self.updataEntryData(self.getEntryValueArr(self.treeOptionValue))
          self.setTreeValue('entry')
          self.setTitleTip(self.treeOptionDataArr, 'entry')
        }
      }
    },
    reset() { // 重置
      return new Promise((resolve, reject) => {
        this.defaultExpandedKeysIn = []// 默认展开树的主键
        this.defaultCheckedKeysIn = [] // 默认勾选的节点的 key 的数组
        this.currentNodeKeyIn = '' // 当前选中的节点key
        this.queryparamsCp = {} // 请求树的参数
        this.filterTextIn = '' // 过滤输入文本
        this.treeDataIn = [] // 树渲染原始数据
        this.curClickNode = {} // 当前点击项
        this.curCheckedNodes = [] // 当前选中的树的节点集合
        this.curHalfCheckedNodes = []
        this.curCheckednode = {}
        this.treeOptionDataArr = [] // 当前操作的数据
        if (this.isDropSelectTree) {
          this.$emit('input', '')
        } else {
          this.$emit('input', null)
        }
        resolve(this)
      })
    },
    lazeLoad(node, resolve) {
      // 懒加载 developing
    },
    nodeClick() {
      let self = this
      const { isleaf, levelno } = this.configIn
      const node = this.$refs.tree.getCurrentNode()
      const { children } = this.configIn.treeProps
      if ((Array.isArray(node[children || 'children']) && !node[children || 'children'].length) || !node[children || 'children']) {
        node.isleaf = true
      } else {
        node.isleaf = false
      }
      if (
        isleaf &&
        String(levelno) !== '-1' &&
        (node.isleaf + '').replace(/0|false|undefined/ig, '') &&
        String(levelno).split(',').some((item, index) => {
          return String(node.levelno) === item
        })
      ) {
        self.setSelectNodeValue(node, true)
      } else if (isleaf && String(levelno) === '-1' && (node.isleaf + '').replace(/0|false|undefined/ig, '')) {
        self.setSelectNodeValue(node, true)
      } else if (!isleaf && String(levelno) !== '-1' && String(levelno).split(',').some((item, index) => {
        return String(node.levelno) === item
      })) {
        self.setSelectNodeValue(node, true)
      } else if (!isleaf && String(levelno) === '-1') {
        self.setSelectNodeValue(node, true)
      } else if (isleaf && !(node.isleaf + '').replace(/0|false|undefined/ig, '')) {
        self.throwWarning('isleaf')
      } else if (String(levelno) !== '-1' && !String(levelno).split(',').some((item, index) => {
        return String(node.levelno) === item
      })) {
        self.throwWarning('levelno')
      }
    },
    onNodeDblClick(event) {
      let self = this
      const { multiple, isleaf, levelno } = this.configIn
      const { children } = this.configIn.treeProps
      if (!multiple) {
        const node = this.$refs.tree.getCurrentNode()
        if ((Array.isArray(node[children || 'children']) && !node[children || 'children'].length) || !node[children || 'children']) {
          node.isleaf = true
        } else {
          node.isleaf = false
        }
        // 最里级 且 满足可选层级
        if (
          isleaf &&
          String(levelno) !== '-1' &&
          (node.isleaf + '').replace(/0|false|undefined/ig, '') &&
          String(levelno).split(',').some((item, index) => {
            return String(node.levelno) === item
          })
        ) {
          self.setSelectNodeValue(node, true)
          // 只满足最里级
        } else if (isleaf && String(levelno) === '-1' && (node.isleaf + '').replace(/0|false|undefined/ig, '')) {
          self.setSelectNodeValue(node, true)
          // 只满足可选层级
        } else if (!isleaf && String(levelno) !== '-1' && String(levelno).split(',').some((item, index) => {
          return String(node.levelno) === item
        })) {
          self.setSelectNodeValue(node, true)
          // 无限制
        } else if (!isleaf && String(levelno) === '-1') {
          self.setSelectNodeValue(node, true)
          // 不满足最里级
        } else if (isleaf && !(node.isleaf + '').replace(/0|false|undefined/ig, '')) {
          self.throwWarning('isleaf')
          // 不满足可选层级
        } else if (String(levelno) !== '-1' && !String(levelno).split(',').some((item, index) => {
          return String(node.levelno) === item
        })) {
          self.throwWarning('levelno')
        } else {

        }
      }
    },
    setSelectNodeValue(node, isClick) {
      // 设置选中节点
      this.treeOptionDataArr = [node]
      this.curClickNode = node
      this.setTitleTip(this.treeOptionDataArr)
      if (isClick) {
        this.setTreeValue('click')
        if (this.$refs.xDownTree) {
          this.$refs.xDownTree.togglePanel(false)
          this.selectDropShow = false
        }
      }
    },
    reverFilterChectkedNodes(nodes, arr = []) {
      // 递归过滤选中节点
      const { isleaf, levelno } = this.configIn
      const { children } = this.configIn.treeProps
      nodes.forEach((node, index) => {
        if ((Array.isArray(node[children || 'children']) && !node[children || 'children'].length) || !node[children || 'children']) {
          node.isleaf = true
        } else {
          node.isleaf = false
        }
        if (
          isleaf &&
          String(levelno) !== '-1' &&
          (node.isleaf + '').replace(/0|false|undefined/ig, '') &&
          String(levelno).split(',').some((item, index) => {
            return String(node.levelno) === item
          })
        ) {
          arr.push(node)
        } else if (isleaf && String(levelno) === '-1' && (node.isleaf + '').replace(/0|false|undefined/ig, '')) {
          arr.push(node)
        } else if (!isleaf && String(levelno) !== '-1' && String(levelno).split(',').some((item, index) => {
          return String(node.levelno) === item
        })) {
          arr.push(node)
        } else if (!isleaf && String(levelno) === '-1') {
          arr.push(node)
        }
      })
      return arr
    },
    onClearClick() {
      // 清除
      if (typeof (this.customClear) === 'function') {
        this.customClear(this, this.$refs.tree).then(() => {
          this.setTreeValue()
          this.setTitleTip(this.treeOptionDataArr)
          this.$emit('onClearClick', this)
        })
      } else {
        window.event.stopPropagation()
        this.filterTextIn = ''
        this.curClickNode = {}
        this.curCheckednodes = []
        this.curHalfCheckedNodes = []
        this.treeOptionDataArr = []
        this.defaultCheckedKeysIn = []
        this.currentNodeKeyIn = ''
        this.treeOptionValue = ''
        this.defaultCheckedKeysIn = []
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedKeys([])
          this.$refs.tree.setCurrentKey('')
        }
        this.value = ''
        this.setTreeValue()
        this.setTitleTip(this.treeOptionDataArr)
        this.$emit('onClearClick', this)
      }
    },
    onHidePanel() {
      // 隐藏下拉框
      this.selectDropShow = false
      // const { multiple } = this.configIn
      // if (multiple) {
      //   this.setTreeValue()
      // }
      // else {
      //   this.setTreeValue()
      // }
      this.isNeedInit = true
    },
    onNodeCheckChange(node, checked, childrenChecked) {
      // 遍历节点选中状态发生变化时的回调
      this.$emit(
        'onNodeCheckChange',
        {
          node,
          checked,
          childrenChecked
        },
        this,
        this.$refs.tree
      )
    },
    onCheckChange(obj, data) {
      // node checked事件
      const { valueKeys, disabled } = this.configIn
      if (disabled) {
        this.setCheckedNodes()
        return
      }
      this.curCheckednode = obj
      this.curHalfCheckedNodes = data.halfCheckedNodes
      this.curCheckednodes = data.checkedNodes
      this.treeOptionDataArr = this.sortDataByKey(this.reverFilterChectkedNodes(
        this.curCheckednodes
      ), valueKeys[0], 'string')
      if (!this.isDropSelectTree) {
        this.setTreeValue('check')
      } else {
        this.setTreeValue()
      }
      this.setTitleTip(this.treeOptionDataArr)
    },
    sortDataByKey(data, property, type, order = 'asc') {
      // 通用 排序
      data.sort(function (a, b) {
        if (order === 'asc') {
          if (type === 'number') {
            return a[property] - b[property]
          }
          return (String(a[property])).localeCompare(String(b[property]))
        } else {
          if (type === 'number') {
            return b[property] - a[property]
          }
          return (String(b[property])).localeCompare(String(a[property]))
        }
      })
      return data
    },
    groupBy(data, key) {
      let itemMap = {}
      let itemkeys = []
      data.forEach((item, index) => {
        if (itemMap[item[key]]) {
          itemMap[item[key]].count = itemMap[item[key]].count + 1
          itemMap[item[key]].list.push(item)
        } else {
          itemMap[item[key]] = {
            count: 1,
            list: [item],
            firstItem: item
          }
          itemkeys.push(item[key])
        }
      })
      return {
        itemMap,
        itemkeys
      }
    },
    setTreeValue(type) {
      // 设置值
      const { valueKeys, multiple } = this.configIn
      if (this.isDropSelectTree === true) {
        this.valueOut = this.treeOptionDataArr
          .map((item) => {
            let arr = []
            valueKeys.forEach((key, index) => {
              item[key] ? arr.push(item[key]) : arr.push('')
            })
            return arr.join('##')
          })
          .join(',')
        this.value = this.valueOut
        this.$emit('input', this.valueOut)
        if (multiple) {
          this.$emit(
            'onNodeCheckClick',
            {
              node: this.curCheckednode,
              nodes: this.treeOptionDataArr,
              halfNodes: this.curHalfCheckedNodes,
              treeData: this.treeDataIn,
              value: this.valueOut,
              fieldName: this.fieldName
            },
            this,
            this.$refs.tree
          )
        } else {
          this.$emit(
            'onNodeClick',
            {
              node: this.treeOptionDataArr[0] || null,
              treeData: this.treeDataIn,
              value: this.valueOut,
              fieldName: this.fieldName
            },
            this,
            this.$refs.tree
          )
        }
      } else {
        if (type === 'check') {
          this.$emit('input', this.treeOptionDataArr)
          this.$emit(
            'onNodeCheckClick',
            {
              halfNodes: this.curHalfCheckedNodes,
              node: this.curCheckednode,
              nodes: this.deepCopy(this.treeOptionDataArr),
              treeData: this.treeDataIn
            },
            this,
            this.$refs.tree
          )
        } else if (type === 'click') {
          this.$emit('input', this.treeOptionDataArr[0])
          this.$emit(
            'onNodeClick',
            {
              node: this.deepCopy(this.treeOptionDataArr[0]),
              treeData: this.treeDataIn
            },
            this,
            this.$refs.tree
          )
        } else {

        }
      }
    },
    setTitleTip(valueArr, type) {
      // 设置展示title
      let self = this
      let { valueKeys } = this.configIn
      valueArr = valueArr.map((item, index) => {
        return Object.assign({}, item, {
          code: item[valueKeys[0]],
          name: item[valueKeys[1]],
          id: item[valueKeys[2]]
        })
      })
      const { format } = this.configIn
      this.treeOptionValue = valueArr
        .map((item, index) => {
          return self.formatLabel(format, item)
        })
        .join(',')
      this.treeOptionValue = this.treeOptionValue === '-' ? '' : this.treeOptionValue
    },
    setDropSelectTreeDefaultValue(isInit) {
      // 设置下拉树 初始值
      let self = this
      let { valueKeys, disabled, treeProps, multiple } = this.configIn
      const { nodeKey } = treeProps
      if (this.isDropSelectTree !== true && typeof this.value === 'object') {
        if (multiple) {
          self.treeOptionDataArr = this.value
        } else {
          self.treeOptionDataArr = [this.value]
        }
      } else {
        valueKeys = valueKeys || ['code', 'name', 'id']
        if (self.getDataType(this.value) === 'String') {
          self.treeOptionDataArr = self.value
            ? self.value.split(',').map((item) => {
              let nodeArr = item.split('##')
              return {
                [valueKeys[1] || 'name']: (nodeArr[1] + '').replace(/null|undefined|^\s+|\s+$/ig, ''),
                [valueKeys[0] || 'code']: (nodeArr[0] + '').replace(/null|undefined|^\s+|\s+$/ig, ''),
                [valueKeys[2] || 'id']: (nodeArr[2] + '').replace(/null|undefined|^\s+|\s+$/ig, '')
              }
            })
            : []
        }
      }
      if (isInit && disabled) {
        self.defaultExpandedKeysIn = self.treeOptionDataArr.map((node) => {
          return node[treeProps.nodeKey || 'id']
        })
      }
      self.defaultCheckedKeysIn = self.treeOptionDataArr.map(
        (item, index) => {
          return item[nodeKey || 'id']
        }
      )
      self.currentNodeKeyIn = self.treeOptionDataArr.length
        ? self.treeOptionDataArr[0].id
        : ''

      this.setTitleTip(self.treeOptionDataArr)
    },
    setTreeDefaultValue(isInit) {
      // 设置普通树 初始值
      let self = this
      if (typeof this.value === 'object') {
        const { multiple, disabled, treeProps } = this.configIn
        if (multiple && this.getDataType(this.value) === 'Array') {
          self.treeOptionDataArr = this.value
        } else if (!multiple && this.getDataType(this.value) === 'Object') {
          self.treeOptionDataArr = [this.value]
        }
        self.currentNodeKeyIn = self.treeOptionDataArr.length
          ? self.treeOptionDataArr[0].id
          : ''
        if (isInit && disabled) {
          self.defaultExpandedKeysIn = self.treeOptionDataArr.map((node) => {
            return node[treeProps.nodeKey || 'id']
          })
        }
        this.setTitleTip(self.treeOptionDataArr)
      }
    },
    init() {
      // 初始化
      // this.treeDataIn = this.treeData
      if (this.isDropSelectTree) {
        this.setDropSelectTreeDefaultValue(true)
      } else {
        this.setTreeDefaultValue(true)
      }
    },
    setTreeData(data) {
      this.treeDataIn = data
    },
    getParamsMap(fn, args) {
      if (typeof fn !== 'object' && typeof fn !== 'function') return
      const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
      const DEFAULT_PARAMS = /=[^,)]+/mg
      const FAT_ARROWS = /=>.*$/mg
      let code = fn.prototype ? fn.prototype.constructor.toString() : fn.toString()
      code = code.replace(COMMENTS, '').replace(FAT_ARROWS, '').replace(DEFAULT_PARAMS, '')
      let argName = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g)
      argName = argName || []
      let params = {}
      Array.from(args).forEach((arg, aindex) => {
        params[argName[aindex]] = arg
      })
      return params
    },
    dearConditions(format, arg = {}, types = ['$userInfo', '$curNavModule', '$arg']) { // 匹配$user() 等等等
      let storeState = (this.$store && this.$store.state) || {}
      let params = this.getParamsMap(this.dearConditions, arguments)
      let typesValue = types.map((item) => {
        let key = item.replace('$', '')
        return storeState[key] ? storeState[key] : (params[key] ? params[key] : {})
      })
      for (let i in types) {
        let $key = types[i]
        let regUKey = (format.match(new RegExp('(\\' + $key + '{[a-zA-Z0-9_]{1,}})', 'ig')) || []).map((key, keyIndex) => {
          return key.replace(new RegExp('\\' + $key + '{|}', 'ig'), '')
        })
        regUKey.map((key, indexkey) => {
          format = format.replace($key + '{' + key + '}', typesValue[i][key] || arg[key] || '')
        })
      }
      return format
    },
    parseConditions(conditionsObj, data) {
      return JSON.parse(this.dearConditions(JSON.stringify(conditionsObj), data || {}))
    },
    initTreeData(isInitLoadData, data) {
      // 初始化树节点数据
      const { valueKeys, defaultExpandRootNode } = this.configIn
      let self = this
      // self.isRenderTree = true
      this.queryparamsCp = this.parseConditions(this.deepCopy(Object.assign(
        // { roleId: this.$store.state.curNavModule.roleguid, menuId: this.$store.state.curNavModule.guid, appId: this.$store.state.curNavModule.appid, ...this.$store.state.queryPublicParams },
        {},
        this.queryparams
      )))
      // debugger
      const queryparamsCp = this.queryparamsCp
      const { axiosConfig, treeProps } = this.configIn
      let dataFieldArr = axiosConfig.dataField ? axiosConfig.dataField.split('.')[0] ? axiosConfig.dataField.split('.') : ['data'] : ['data']
      let ajaxContentType =
        axiosConfig.method === 'postStringify'
          ? 'application/x-www-form-urlencoded'
          : ''
      if (self.isInitLoadData || isInitLoadData) {
        if (!axiosConfig.url) {
          self.isLoadingIn = true
          if (Array.isArray(data || self.treeData) && (data || self.treeData).length) {
            self.initScrollLoadPageData(data || self.treeData)
            if (axiosConfig.rootName) {
              self.treeDataIn = [
                {
                  [valueKeys[2] || 'id']: 'root',
                  [treeProps.label || valueKeys[1] || 'name']: axiosConfig.rootName,
                  [valueKeys[0] || 'code']: 'root',
                  [treeProps.nodeKey || 'id']: 'root',
                  expand: true,
                  isleaf: '0',
                  children: data || self.treeData
                }
              ]
              if (defaultExpandRootNode) {
                self.defaultExpandedKeysIn = [self.treeDataIn[0][treeProps.nodeKey || 'id']]
              }
            } else {
              self.treeDataIn = data || self.treeData
              if (self.treeData.length === 1 && defaultExpandRootNode) {
                self.defaultExpandedKeysIn = [self.treeDataIn[0][treeProps.nodeKey || 'id']]
              }
            }
            self.treeDataInList = self.gernarateTreeDataList(self.treeDataIn)
            self.isRenderTree = true
            if (Array(data || self.treeData) && (data || self.treeData).length) {
              self.needInit = false
            }
            self.$nextTick((vm) => {
              if (self.filterTextIn) {
                self.$refs.tree && self.$refs.tree.filter(self.filterTextIn)
              }
              self.isLoadingIn = false
              // self.onNodeClick(self.treeDataIn[0], self.treeDataIn[0], self.$refs.tree)
              self.$emit(
                'onTreeLoaded',
                {
                  treeData: self.treeDataIn,
                  tree: self.$refs.tree
                },
                self
              )
            })
          } else if (!Array.isArray(data || self.treeData)) {
            self.treeDataIn = []
            self.$nextTick((vm) => {
              self.isLoadingIn = false
              // self.onNodeClick(self.treeDataIn[0], self.treeDataIn[0], self.$refs.tree)
              self.throwWarning('treeLoadedFailed')
              self.$emit(
                'onTreeLoadedFailed',
                {
                  treeData: [],
                  tree: self.$refs.tree
                },
                self
              )
            })
          } else {
            self.treeDataIn = []
            self.$nextTick((vm) => {
              self.isLoadingIn = false
              // self.onNodeClick(self.treeDataIn[0], self.treeDataIn[0], self.$refs.tree)
              //  self.throwWarning('treeLoadedFailed')
              self.$emit(
                'onTreeLoaded',
                {
                  treeData: [],
                  tree: self.$refs.tree
                },
                self
              )
            })
          }
        } else {
          self.isLoadingIn = true
          self.$http[axiosConfig.method](
            axiosConfig.url,
            queryparamsCp,
            false,
            ajaxContentType
          ).then((res) => {
            let resData = []
            if (self.getDataType(res) === 'Array') {
              resData = res
            } else if (self.getDataType(res) === 'Object') {
              if (
                res[axiosConfig.statusField || 'rscode'] ===
                (axiosConfig.successCode || '100000')
              ) {
                if (self.getDataType(res.data) === 'Object') {
                  res.data = res.data.data
                }
                dataFieldArr.forEach((item, index) => {
                  if (index === 0) {
                    resData = res[item]
                  } else {
                    resData = resData[item]
                  }
                })
              } else {
                self.isLoadingIn = false
                console.log(
                  '获取组机构选择树节点数据异常，当前返回数据为：\n',
                  resData
                )
              }
            } else {
              self.isLoadingIn = false
              console.log(
                '获取组机构选择树节点数据异常，当前返回数据为：\n',
                resData
              )
            }
            if (Array.isArray(resData) && resData.length) {
              if (axiosConfig.rootName) {
                self.treeDataIn = [
                  {
                    [valueKeys[2] || 'id']: 'root',
                    [treeProps.label || valueKeys[1] || 'name']: axiosConfig.rootName,
                    [valueKeys[0] || 'code']: 'root',
                    [treeProps.nodeKey || 'id']: 'root',
                    expand: true,
                    isleaf: '0',
                    children: resData
                  }
                ]
                if (defaultExpandRootNode) {
                  self.defaultExpandedKeysIn = [self.treeDataIn[0][treeProps.nodeKey || 'id']]
                }
              } else {
                self.treeDataIn = resData
                if (resData.length === 1 && defaultExpandRootNode) {
                  self.defaultExpandedKeysIn = [self.treeDataIn[0][treeProps.nodeKey || 'id']]
                }
              }
              self.initScrollLoadPageData(resData)
              self.treeDataInList = self.gernarateTreeDataList(self.treeDataIn)
              self.isRenderTree = true
              self.needInit = false
              self.$nextTick((vm) => {
                if (self.filterTextIn) {
                  self.$refs.tree && self.$refs.tree.filter(self.filterTextIn)
                }
                self.isLoadingIn = false
                // self.onNodeClick(self.treeDataIn[0], self.treeDataIn[0], self.$refs.tree)
                self.$emit(
                  'onTreeLoaded',
                  {
                    treeData: self.treeDataIn,
                    tree: self.$refs.tree
                  },
                  self
                )
              })
            } else if (!Array.isArray(resData)) {
              self.treeDataIn = []
              self.$nextTick((vm) => {
                self.isLoadingIn = false
                // self.onNodeClick(self.treeDataIn[0], self.treeDataIn[0], self.$refs.tree)
                self.throwWarning('treeLoadedFailed')
                self.$emit(
                  'onTreeLoadedFailed',
                  {
                    treeData: [],
                    tree: self.$refs.tree
                  },
                  self
                )
              })
            } else {
              self.treeDataIn = []
              self.$nextTick((vm) => {
                self.isLoadingIn = false
                // self.onNodeClick(self.treeDataIn[0], self.treeDataIn[0], self.$refs.tree)
                //  self.throwWarning('treeLoadedFailed')
                self.$emit(
                  'onTreeLoaded',
                  {
                    treeData: [],
                    tree: self.$refs.tree
                  },
                  self
                )
              })
            }
          }).catch((e) => {
            console.error(e)
          })
        }
      }
    },
    getCfKey(data, key, map = {}, list = []) { // 金典递归来获取数据里的重复key
      let self = this
      data.forEach((item, index) => {
        if (!map[item[key]]) {
          map[item[key]] = item
        } else {
          console.log('存在重复key的集合为', item, map[item[key]], item[key])
          list.push(item)
          list.push(map[item[key]])
        }
        if (Array.isArray(item.children) && item.children.length) {
          self.getCfKey(item.children, key, map, list)
        }
      })
      return list
    },
    initScrollLoadPageData(data) {
      // 初始化分页
      let total = data.length
      this.scrollLoadPageConfig = Object.assign(this.scrollLoadPageConfig, {
        currentLoadTotal: total < 20 ? total : 20,
        total: total,
        totalPage: Math.ceil(total / 20)
      })
      this.treeDataRenderIn = data.slice(0, this.scrollLoadPageConfig.pageSize)
    },
    scrollLoad() {
      // 兼容手机端和PC端滚动加载
      let self = this
      // 滚动条的位置 在页面上返回内容的可视高度 返回整个元素的高度（包括带滚动条的隐蔽的地方）
      const { scrollTop, clientHeight, scrollHeight } = self.$refs.xScrollLoad
      // 是否滚动到底部的判断
      if (Math.round(scrollTop) + clientHeight === scrollHeight) {
        const { currentPage, totalPage } = self.scrollLoadPageConfig
        if (currentPage < totalPage) {
          self.scrollLoading = true
          self
            .loadPage(self.scrollLoadPageConfig, self.treeDataIn)
            .then((res) => {
              self.scrollLoading = false
              let { data, pageData } = res
              self.treeDataRenderIn = self.treeDataRenderIn.concat(data)
              self.scrollLoadPageConfig.currentPage += 1
              self.scrollLoadPageConfig = Object.assign(
                self.scrollLoadPageConfig,
                pageData
              )
            })
        }
      }
    },
    loadPage({ currentPage, pageSize, currentLoadTotal }, data) {
      // 加载数据
      const { remoteLoad } = this.configIn.axiosConfig
      return new Promise((resolve, reject) => {
        if (!remoteLoad) {
          let loadData = data.slice(
            currentLoadTotal - 1,
            currentLoadTotal + pageSize
          )
          resolve({
            data: loadData,
            pageData: {
              currentLoadTotal: currentLoadTotal + loadData.length
            }
          })
        } else {
          // 远程分页加载 developing
        }
      })
    },
    onFilterEnterKeyup({ value, $event }) {
      // 过滤回车选中，再回车查询
      let { filterEnterToSelectAndQuery, filterEnterToSelectAndQueryHideDrop } = this.configIn
      if (filterEnterToSelectAndQuery && $event.keyCode === 13) {
        if (this.filterTextInCp === this.filterTextIn) {
          let QueryNode = this.$parent
          while (QueryNode.$options.name !== 'QueryForm') {
            QueryNode = QueryNode.$parent
          }
          if (filterEnterToSelectAndQueryHideDrop) {
            this.toggleDrop(false)
          }
          QueryNode && QueryNode.onSearchClick()
        } else {
          if (this.filterTextInCp !== this.filterTextIn && this.filterTextIn !== '') {
            this.filteredTreeData = this.getFilterTreedata(this.treeDataIn, (item, index) => {
              return this.filterNode(this.filterTextIn, item)
            })
          } else {
            this.filteredTreeData = this.treeDataIn
          }
          this.filterTextInCp = value
          let firstLeafNode = this.findFirstLeafNode(this.filteredTreeData)
          this.$refs.tree.setCheckedNodes([firstLeafNode])
          this.$nextTick(() => {
            this.onCheckChange(firstLeafNode, { checkedNodes: this.$refs.tree.getCheckedNodes() })
            this.$refs.filterInput.focus()
          })
        }
      } else {
        if ($event.keyCode === 13 && this.configIn.romoteFilter && typeof this.romoteFilterMethod === 'function') {
          this.romoteFilterMethod({
            filterText: this.filterTextIn,
            config: this.configIn,
            queryParams: this.queryparamsCp,
            bsTree: this,
            tree: this.$refs.tree
          }).then((res) => {
            this.initTreeData(true, res)
          }).catch(e => {
            throw (e)
          })
        }
      }
    },
    findFirstLeafNode(arr) {
      // 获取第一个子节点
      let item = arr[0] || {}
      while (Array.isArray(item.children) && item.children.length) {
        item = item.children[0]
      }
      return item
    },
    getFilterTreedata(data, filterNodeCb) {
      // 获取过滤后的数据
      return this.listToTree(this.treeDataInList.filter(filterNodeCb))
    },
    gernarateTreeDataList(data, list = [], bsTreePid = '') {
      // 树形数据转换成平行数据
      let { treeProps } = this.configIn
      let { nodeKey } = treeProps
      nodeKey = nodeKey || 'id'
      data.forEach((item, index) => {
        list.push(Object.assign(item, { bsTreePid }))
        if (Array.isArray(item.children) && item.children.length) {
          this.gernarateTreeDataList(item.children, list, item[nodeKey])
        }
      })
      return list
    },
    listToTree(tempData) {
      // 平行数据转换程树形数据
      let { treeProps } = this.configIn
      let { nodeKey } = treeProps
      nodeKey = nodeKey || 'id'
      let map = {}
      tempData.forEach(function(item) {
        delete item.children
        map[item[nodeKey]] = item
      })
      let treeData = []
      tempData.forEach(child => {
        const mapItem = map[child.bsTreePid]
        if (mapItem) {
          (mapItem.children || (mapItem.children = [])).push(child)
        } else {
          treeData.push(child)
        }
      })
      return treeData
    }
  },
  created() {},
  watch: {
    fieldName: {
      handler() {}
    },
    isDropSelectTree: {
      // 是不是下拉树
      handler() {}
    },
    editable: {
      // 下拉树 可编辑
      handler() {
        this.configIn = Object.assign(this.configIn, this.config)
      }
    },
    configIn: {
      handler(val) {
      },
      deep: true,
      immediate: true
    },
    config: {
      // 树 配置
      handler(val) {
        this.needInit = true
        this.configIn = Object.assign(this.configIn, this.config)
        // this.setTreeData()
      },
      deep: true,
      immediate: true
    },
    value: {
      // 树 值
      handler(val) {
        // if (val === '####' || !val || this.isNeedInit) {
        this.init()
        // }
      },
      deep: true,
      immediate: true
    },
    treeOptionValue: {
      handler(val) {
      },
      immediate: true
    },
    filterTextIn: {
      // 树 过滤
      handler(val) {
        let self = this
        // if (self.queryparams.elementcode === 'pro') {
        //   clearTimeout(self.itemTimer)
        //   self.itemTimer = setTimeout(function() {
        //     self.queryparams.condition = val
        //     self.initTreeData(true)
        //   }, 3000)
        // } else {
        //   this.filterTextInCp = null
        //   self.$refs.tree && this.$refs.tree.filter(val)
        // }
        this.filterTextInCp = null
        self.$refs.tree && this.$refs.tree.filter(val)
      },
      immediate: true
    },
    treeData: {
      // 树 数据
      handler(val) {
        const { url } = this.configIn.axiosConfig
        if (Array.isArray(val) && Array.length && !url) {
          this.initTreeData(true)
        }
      },
      deep: true,
      immediate: true
    },
    queryparams: {
      // 查询参数
      handler(val) {
        this.needInit = true
        this.initTreeData(!this.isDropSelectTree)
      },
      deep: true,
      immediate: true
    },
    filterText: {
      // 树 过滤
      handler(val) {
        this.filterTextIn = val
      }
    },
    isLoading: {
      // 树 加载
      handler(val) {},
      immediate: true
    },
    defaultExpandedKeys: {
      // 默认展开树的主键
      handler(val) {
        this.defaultExpandedKeysIn = val
      },
      deep: true,
      immediate: true
    },
    defaultCheckedKeys: {
      // 默认勾选的节点的 key 的数组
      handler(val) {
        this.defaultCheckedKeysIn = val
      },
      deep: true,
      immediate: true
    },
    currentNodeKey: {
      // 当前选中的节点key
      handler(val) {
        this.currentNodeKeyIn = val
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
.unit-tree-main {
  white-space: normal;
  .el-tree-node__content {
    height: auto;
    .el-tree-node__content{
        line-height:32px;
    }
    .el-tree-node__label {
      line-height: 26px;
    }
    .custom-tree-node{
      font-size: 14px;
    }
  }
  .selection-tree {
    .selection-tree-label{
      color: #333;
    }
    user-select: none;
    .vxe-pulldown {
      display: block;
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: 0.5s;
    }
    .select {
      box-sizing: border-box;
      min-width: 100px;
      height: 100%;
      cursor: pointer;
      text-align: left;
    }
  }
  .selection-tree > span {
    display: block;
  }
  .scroll-loading {
    position: relative;
    .scroll-loading-tip {
      position: absolute;
      bottom: 0;
      background: #fff;
      line-height: 50px;
      width: 100%;
      color: #1890ff;
      font-size: 14px;
      text-align: center;
    }
  }
}
.unit-tree-main-drop-option {
  padding: 5px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  text-align: left;
  width: 100%;
  .vxe-input{
    width:100%
  }
  .option-tree {
    margin-top: 10px;
    height: 245px;
    overflow: auto;
  }
  .filter-line{
       text-align:left;
       font-size:0;
     .filter-line-input{
        width: calc(100% - 80px);
     }
     .filter-line-btn{
       margin-left:10px;
       width:50px;
       text-align:right;
     }
  }
  .filter-line-onlyinput{
     .filter-line-input{
        width: 100%;
     }
     .filter-line-btn{
       display:none;
     }
  }
}
.el-tree-node__content {
    line-height: 32px;
}
.unit-tree-main-drop-option.no-filter {
  height: 300px;
}
.unit-tree-main.unit-tree-main-nodrop {
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  .selection-tree-nodrop {
    height: 100%;
    .vxe-input-filter-tree {
       margin-bottom: 10px;
      .vxe-input {
        width: 100%;
      }
    }
    .el-tree-main {
      background: transparent;
      height: calc(100% - 40px);
      overflow: auto;
    }
    .el-tree {
      width: max-content;
      min-width: 100%;
      .el-tree-node.is-current > .el-tree-node__content {
        background-color: #e3f1fe;
        color: #333;
        height: auto;
      }
    }
  }
  .no-filter {
    height: 100%;
    .vxe-input-filter-tree{
      display: none;
      margin-bottom: 0px;
    }
    .el-tree-main {
      height: 100%;
      overflow:auto;
      .el-tree{
        height: 100%;
      }
    }
  }
}
.unit-tree-main.unit-tree-main-drop {
  padding: 0;
}
.unit-tree-main-drop-option .el-tree{
  width: max-content;
  min-width: 100%;
}
</style>
