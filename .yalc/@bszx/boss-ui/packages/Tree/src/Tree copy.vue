<!--
 * @Description: 
 * @Author: Comer
 * @Date: 2022-08-26 10:17:19
 * @LastEditors: Comer
 * @LastEditTime: 2022-08-26 10:17:21
-->
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
          class="bs-vxe-pulldown"
          @hide-panel="onHidePanel"
        >
          <template v-slot>
            <div class="select" @click="toggleDrop(undefined)">
              <vxe-input
                ref="inputEntry"
                v-model="treeOptionValue"
                :readonly="configIn.readonly"
                :disabled="configIn.disabled"
                :placeholder="configIn.placeholder"
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
                    @clear="onClearClick"
                    @keydown="onKeydownEnter"
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
                  :props="configIn.treeProps"
                  :node-key="configIn.treeProps.nodeKey"
                  :check-strictly="configIn.treeProps.checkStrictly"
                  :default-expand-all="configIn.defaultExpandAll"
                  :default-expanded-keys="defaultExpandedKeysIn"
                  :default-checked-keys="defaultCheckedKeysIn"
                  :current-node-key="currentNodeKeyIn"
                  :filter-node-method="filterNode"
                  @node-click="configIn.expandOnClickNode ? () => {} : onNodeDblClick"
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
          @clear="onClearClick"
          @keydown="onKeydownEnter"
        />
      </div>
      <div class="el-tree-main scroll-loading">
        <el-tree
          v-if="isRenderTree"
          ref="tree"
          class="filter-tree"
          :check-on-click-node="configIn.checkOnClickNode"
          :show-checkbox="configIn.multiple"
          :lazy="configIn.isLazeLoad"
          :expand-on-click-node="false"
          :data="configIn.scrollLoad ? treeDataRenderIn : treeDataIn"
          :props="configIn.treeProps"
          :load="lazeLoad"
          :render-content="renderContent"
          :node-key="configIn.treeProps.nodeKey"
          :check-strictly="configIn.treeProps.checkStrictly"
          :default-expand-all="configIn.defaultExpandAll"
          :highlight-current="configIn.highlightCurrent"
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
import mixins from '../../tools/mixin'
export default {
  name: 'BsTree',
  mixins: [mixins],
  directives: {
    ClickOutside
  },
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    needLeftTreeHide: {
      type: Boolean
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
      type: [String, Number],
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
      // 当config.url为空时采用掺入数据
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
    disabledNodeIds: {
      // 选中的值 node,其中当为普通树时必须为node节点对象而非id
      type: Array,
      default: () => []
    },
    limitCheckedEnd: {
      type: Boolean,
      default: false
    },
    limitClassifySingleCheck: {
      type: Boolean,
      default: false
    },
    autoFocusDispatch: { // 聚焦默认向外分发事件响应
      type: Boolean,
      default: false
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
        isHump: true, // 是否驼峰
        checkOnClickNode: false,
        clearStyleType: 'filter', // filter||filterBtn
        destroyOnClose: false,
        refreshTreeDataOnDrop: false, // 是否每次渲染下拉重新加载数据
        expandOnClickNode: true, // 展开node
        showFilter: true, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: '', // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'],
        format: '{code}-{name}',
        placeholder: '请选择',
        disabled: false, // 是否禁用
        tooltip: false,
        highlightCurrent: false,
        initLoad: true,
        isPramas: true, // 请求参数是否包裹到params中
        // multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '', // {code}-{name}
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children', // 树的嵌套字段
          checkStrictly: false // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
        },
        axiosConfig: {
          ismock: false,
          rootName: '',
          dataField: 'data',
          successCode: '200', // 成功code
          statusField: 'rscode',
          method: 'post', // 请求方式
          url: '' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true, // 是否可编辑
        clearable: true, // 可清除
        customBgConfig: { // 自定义背景色配置
          isCustom: false, // 是否自定义背景色
          bg: '', // 背景色值
          justFied: '', // 判断字段
          targetVal: '' // 判断字段目标值
        }
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
      curCheckednode: {},
      treeOptionDataArr: [], // 当前操作的数据
      treeOptionValue: '', // 操作结果渲染文本
      selectDropShow: false, // 下拉选择是否显示
      defaultExpandAll: false, // 默认是否展开所有节点
      scrollLoadPageConfig: {
        // 下啦加载配置
        currentPage: 1,
        currentLoadTotal: 0,
        total: 0,
        pageSize: 10,
        totalPage: 1
      },
      valueOut: '',
      treeDataRenderIn: [] // 开启滚动加载时的数据
    }
  },
  methods: {
    filterNode(value, data) {
      // 过滤集合
      if (!value) return true
      const { treeProps, valueKeys } = this.configIn
      if (treeProps.labelFormat) {
        return this.formatLabel(treeProps.labelFormat, data).indexOf(value) !== -1
      } else if (treeProps.label) {
        return data[treeProps.label].indexOf(value) !== -1
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
          nodeData[key] !== 'root' && (nodeData[key] || Number(nodeData[key]) === 0) && arr.push(nodeData[key])
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
    renderContent(h, { node, data, store }) {
      let self = this
      data = JSON.parse(JSON.stringify(data))
      let { tooltip } = self.configIn
      const { valueKeys, treeProps, customBgConfig } = self.configIn
      const { labelFormat, label } = treeProps
      const {
        isCustom, // 是否自定义背景色
        bg, // 背景色值
        justFied, // 判断字段
        targetVal // 判断字段目标值
      } = customBgConfig
      const styleObject = {
        backgroundColor: bg || 'none'
      }
      if (labelFormat) {
        if (tooltip) {
          return [
            <vxe-tooltip leaveDelay={0} placement="right" content={self.getTooltiContent(data, tooltip)} enterable>
              <span class="custom-tree-node">
                <span>{this.formatLabel(labelFormat, data)}</span>
              </span>
            </vxe-tooltip>
          ]
        } else {
          if (!isCustom || (isCustom && justFied && data[justFied] !== targetVal)) {
            return [
              <span class="custom-tree-node">
                <span class={{ 'hasDataClass': data.hasData }}>
                  {this.formatLabel(labelFormat, data)}
                </span>
              </span>
            ]
          } else {
            return [
              <span class="custom-tree-node">
                <span class="custom-tree-node-label"> {this.formatLabel(labelFormat, data)} </span>
                <span class="custom-node-bg" style={styleObject}></span>
              </span>
            ]
          }
        }
      } else if (label) {
        if (tooltip) {
          return [
            <vxe-tooltip leaveDelay={0} placement="right" content={self.getTooltiContent(data, tooltip)} enterable>
              <span class="custom-tree-node">
                <span>{data[label]}</span>
              </span>
            </vxe-tooltip>
          ]
        } else {
          if (!isCustom || (isCustom && justFied && data[justFied] !== targetVal)) {
            return [
              <span class="custom-tree-node">
                <span>{data[label]}</span>
              </span>
            ]
          } else {
            return [
              <span class="custom-tree-node">
                <span class="custom-tree-node-label"> {data[label]} </span>
                <span class="custom-node-bg" style={styleObject}></span>
              </span>
            ]
          }
        }
      } else {
        if (tooltip) {
          return [
            <vxe-tooltip leaveDelay={0} placement="right" content={self.getTooltiContent(data, tooltip)} enterable>
              <span class="custom-tree-node">
                <span>{data[valueKeys[0] || 'code'] + data[valueKeys[1] || 'name']}</span>
              </span>
            </vxe-tooltip>
          ]
        } else {
          if (!isCustom || (isCustom && justFied && data[justFied] !== targetVal)) {
            return [
              <span class="custom-tree-node">
                <span>{data[valueKeys[0] || 'code'] + data[valueKeys[1] || 'name']}</span>
              </span>
            ]
          } else {
            return [
              <span class="custom-tree-node">
                <span class="custom-tree-node-label"> {data[valueKeys[0] || 'code'] + data[valueKeys[1] || 'name']} </span>
                <span class="custom-node-bg" style={styleObject}></span>
              </span>
            ]
          }
        }
      }
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
      const { refreshTreeDataOnDrop } = this.configIn
      // if (disabled) return
      const { xDownTree } = this.$refs
      if (dropPull || !this.selectDropShow) {
        xDownTree.showPanel().then(() => {
          this.isNeedInit = false
          this.selectDropShow = true
          if (this.needInit || (this.selectDropShow && (refreshTreeDataOnDrop || !this.treeDataIn.length))) {
            this.$nextTick(() => {
              this.setDropSelectTreeDefaultValue()
              if (!this.isInitLoadData) {
                this.initTreeData(true)
              }
            })
          } else {
            this.setDropSelectTreeDefaultValue()
          }
          this.$refs.filterInput.focus()
          this.$refs.inputEntry.blur()
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
      }
    },
    getEntryValueArr(treeOptionValue) {
      let self = this
      const { multiple, valueKeys } = self.configIn
      let entryNameArr = treeOptionValue.split(',')
      if (!multiple && entryNameArr.length === 1) {
        let ivalue = self.treeOptionValue.split('-')
        let name = ivalue.length && ivalue.length === 1 ? ivalue[0] : (ivalue.length === 2 ? ivalue[1] : '')
        let code = ivalue.length && ivalue.length === 1 ? '' : (ivalue.length === 2 ? ivalue[0] : '')
        return [
          {
            [valueKeys[1] || 'name']: name,
            [valueKeys[0] || 'code']: code,
            [valueKeys[2] || 'id']: ''
          }
        ]
      } else {
        return [...new Set(entryNameArr)].map(
          (item, index) => {
            let ivalue = item.split('-')
            let name = ivalue.length && ivalue.length === 1 ? ivalue[0] : (ivalue.length === 2 ? ivalue[1] : '')
            let code = ivalue.length && ivalue.length === 1 ? '' : (ivalue.length === 2 ? ivalue[0] : '')
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
      if (this.autoFocusDispatch) {
        this.$emit('input', this.value)
      }
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
          item[valueKeys[0] || 'code'] = ''
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
    lazeLoad(node, self) {
      // 懒加载 developing
    },
    nodeClick(nodeItem) {
      let self = this
      const { isleaf, levelno } = this.configIn
      const nodes = this.$refs.tree.getCurrentNode()
      let node = {}
      if (!nodes) {
        let findNode = {}
        const enterFindNode = (treeData) => {
          treeData.find(item => {
            if (item.children && item.children.length) {
              enterFindNode(item.children)
            }
            nodeItem.value = nodeItem.value.includes('-') ? nodeItem.value.replace(/-/g, ' ') : nodeItem.value
            if ([item.name, item.code, item.label].includes(nodeItem.value)) {
              findNode = item
            }
          })
          return findNode
        }
        node = enterFindNode(this.treeDataIn)
      } else {
        node = nodes
      }
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
      } else if (String(levelno) !== '-1' && !(node.isleaf + '').replace(/0|false|undefined/ig, '')) {
        self.throwWarning('isleaf')
      } else if (levelno !== -1 && !String(levelno).split(',').some((item, index) => {
        return String(node.levelno) === item
      })) {
        self.throwWarning('levelno')
      }
    },
    onNodeDblClick(nodeItem) {
      let self = this
      const { multiple, isleaf, levelno } = this.configIn
      const { children } = this.configIn.treeProps
      if (!multiple) {
        const nodes = this.$refs.tree.getCurrentNode()
        let node = {}
        if (!nodes) {
          let findNode = {}
          const enterFindNode = (treeData) => {
            treeData.find(item => {
              if (item.children && item.children.length) {
                enterFindNode(item.children)
              }
              nodeItem.value = nodeItem.value.includes('-') ? nodeItem.value.replace(/-/g, ' ') : nodeItem.value
              if ([item.name, item.code, item.label].includes(nodeItem.value)) {
                findNode = item
              }
            })
            return findNode
          }
          node = enterFindNode(this.treeDataIn)
        } else {
          node = nodes
        }
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
        } else if (String(levelno) !== '-1' && !(node.isleaf + '').replace(/0|false|undefined/ig, '')) {
          self.throwWarning('isleaf')
        } else if (String(levelno) !== '-1' && !String(levelno).split(',').some((item, index) => {
          return String(node.levelno) === item
        })) {
          self.throwWarning('levelno')
        } else {

        }
      }
    },
    // 点击回车
    onKeydownEnter(nodeItem, $event) {
      let theEvent = $event || window.event
      let code = theEvent.keyCode || theEvent.which || theEvent.charCode
      if (code === 13) {
        this.isDropSelectTree ? this.onNodeDblClick(nodeItem) : this.nodeClick(nodeItem)
      }
      this.setEnterCheckedNodes(code)
    },
    // 回车选中节点
    setEnterCheckedNodes(code) {
      const value = this.filterTextIn
      let filterTreeData = []
      const { treeProps, valueKeys } = this.configIn
      if (value && code === 13) {
        const getFilterData = (data) => {
          data.forEach((item, index) => {
            if (item.children && item.children.length) {
              getFilterData(item.children)
            } else {
              if (treeProps.labelFormat && this.formatLabel(treeProps.labelFormat, item).indexOf(value) !== -1) {
                filterTreeData.push(item)
              } else if (treeProps.label && item[treeProps.label].indexOf(value) !== -1) {
                filterTreeData.push(item)
              } else {
                if ((item[valueKeys[0] || 'code'] + item[valueKeys[1] || 'name']).indexOf(value) !== -1) {
                  filterTreeData.push(item)
                }
              }
            }
          })
        }
        getFilterData(this.treeDataIn)
      }
      this.$refs.tree.setCheckedNodes(filterTreeData)
      this.curCheckednode = filterTreeData[filterTreeData.length - 1] || {}
      this.curCheckednodes = filterTreeData || []
      this.treeOptionDataArr = this.reverFilterChectkedNodes(
        this.curCheckednodes
      )
      if (!this.isDropSelectTree) {
        this.setTreeValue('check')
      } else {
        this.setTreeValue()
      }
      this.setTitleTip(this.treeOptionDataArr)
      let obj = this.curCheckednode
      let data = {}
      data.checkedNodes = this.curCheckednodes
      this.$emit(
        'onCheckChange',
        {
          obj,
          data
        },
        this,
        this.$refs.tree
      )
    },
    setSelectNodeValue(node, isClick) {
      // 设置选中节点
      this.treeOptionDataArr = [node]
      this.curClickNode = node
      // 当限制只能选取末级时，选取叶子节点双击不关闭下拉框
      if (isClick && (!this.limitCheckedEnd || (this.limitCheckedEnd && (!node.children || (node.children && !node.children.length))))) {
        if (this.$refs.xDownTree) {
          this.$refs.xDownTree.togglePanel(false)
          this.selectDropShow = false
        }
        this.setTitleTip(this.treeOptionDataArr)
        this.setTreeValue('click')
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
      window.event.stopPropagation()
      this.filterTextIn = ''
      this.curClickNode = {}
      this.curCheckednodes = []
      this.treeOptionDataArr = []
      this.defaultCheckedKeysIn = []
      this.currentNodeKeyIn = ''
      this.treeOptionValue = ''
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys([])
        this.$refs.tree.setCurrentKey('')
      }
      this.value = ''
      this.setTreeValue()
      this.setTitleTip(this.treeOptionDataArr)
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
      // 多选时，限制只能选末级，且每个分类级别下只能选中一个节点数据
      if (this.limitClassifySingleCheck && this.limitCheckedEnd) {
        const code = obj.code
        const curCheckednodes = data.checkedNodes.filter(item => {
          return (!item.code.startsWith(code.slice(0, 3)) || item.code === code)
        })
        this.$refs.tree.setCheckedNodes(curCheckednodes)
        data.checkedNodes = curCheckednodes
      }
      // node checked事件
      this.curCheckednode = obj
      this.curCheckednodes = data.checkedNodes
      this.treeOptionDataArr = this.reverFilterChectkedNodes(
        this.curCheckednodes
      )
      if (!this.isDropSelectTree) {
        this.setTreeValue('check')
      } else {
        this.setTreeValue()
      }
      this.setTitleTip(this.treeOptionDataArr)
      this.$emit(
        'onCheckChange',
        {
          obj,
          data
        },
        this,
        this.$refs.tree
      )
    },
    leftTreeShow(data) {
      if (data.children) {
        if (data.children.length > 1) {
          return true
        } else if (data.children.length === 1) {
          return this.leftTreeShow(data.children[0])
        }
      } else {
        return false
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
      const { format } = this.configIn
      this.treeOptionValue = valueArr
        .map((item, index) => {
          return self.formatLabel(format, item)
        })
        .join(',')
      this.treeOptionValue = this.treeOptionValue === '-' ? '' : this.treeOptionValue
    },
    setDropSelectTreeDefaultValue() {
      // 设置下拉树 初始值
      let self = this
      let { valueKeys, treeProps, multiple } = this.configIn
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
    setTreeDefaultValue() {
      // 设置普通树 初始值
      let self = this
      if (typeof this.value === 'object') {
        const { multiple } = this.configIn
        if (multiple && this.getDataType(this.value) === 'Array') {
          self.treeOptionDataArr = this.value
        } else if (!multiple && this.getDataType(this.value) === 'Object') {
          self.treeOptionDataArr = [this.value]
        }
        self.currentNodeKeyIn = self.treeOptionDataArr.length
          ? self.treeOptionDataArr[0].id
          : ''
        this.setTitleTip(self.treeOptionDataArr)
      }
    },
    init() {
      // 初始化
      // this.treeDataIn = this.treeData
      if (this.isDropSelectTree) {
        this.setDropSelectTreeDefaultValue()
      } else {
        this.setTreeDefaultValue()
      }
    },
    initTreeData(isInitLoadData) {
      // 初始化树节点数据
      const { disabled, valueKeys } = this.configIn
      if (disabled) return
      let self = this
      // self.isRenderTree = true
      this.queryparamsCp = Object.assign(
        // { roleId: this.$store.state.curNavModule.roleguid, menuId: this.$store.state.curNavModule.guid, appId: this.$store.state.curNavModule.appid, ...this.$store.state.queryPublicParams },
        {},
        this.queryparams
      )
      const queryparamsCp = this.queryparamsCp
      const { axiosConfig, treeProps } = this.configIn
      let dataFieldArr = axiosConfig.dataField ? axiosConfig.dataField.split('.')[0] ? axiosConfig.dataField.split('.') : ['data'] : ['data']
      let ajaxContentType =
        axiosConfig.method === 'postStringify'
          ? 'application/x-www-form-urlencoded'
          : ''
      if (self.isInitLoadData || isInitLoadData) {
        self.isLoadingIn = true
        if (!axiosConfig.url) {
          if (Array.isArray(self.treeData)) {
            self.initScrollLoadPageData(self.treeData)
            if (axiosConfig.rootName) {
              self.treeDataIn = Object.freeze([
                {
                  [valueKeys[2] || 'id']: '0',
                  [treeProps.label || valueKeys[1] || 'name']: axiosConfig.rootName,
                  [valueKeys[0] || 'code']: '',
                  expand: true,
                  isleaf: '0',
                  children: self.treeData
                }
              ])
              self.defaultExpandedKeysIn = ['0']
            } else {
              self.treeDataIn = Object.freeze(self.treeData)
              if (self.treeData.length === 1) {
                self.defaultExpandedKeysIn = [self.treeData[0][valueKeys[2] || 'id']]
              }
            }

            if (self.treeDataIn.length) {
              self.isRenderTree = true
              self.isLoadingIn = false
              self.needInit = false
              self.$nextTick((vm) => {
                if (!self.leftTreeShow(self.$refs.tree.data[0]) && this.needLeftTreeHide) {
                  self.$parent.$parent.$parent.$parent.leftTreeVisible = false
                }
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
            } else {
              self.isLoadingIn = false
            }
          }
        } else {
          // czb树请求参数包裹到params里， 产品和前置团队没有包裹，这里做个区分
          let parmas = this.configIn.isPramas ? [
            axiosConfig.url,
            {
              params: queryparamsCp,
              Origin: false,
              contentType: ajaxContentType,
              ismock: axiosConfig.ismock
            }] : [
            axiosConfig.url,
            queryparamsCp,
            false,
            ajaxContentType
          ]
          self.$http[axiosConfig.method](
            ...parmas
          ).then((res) => {
            if (res.rscode === '200' || res.rscode === '100000' || res.rscode === '200000') {
              let resData = []
              if (self.getDataType(res) === 'Array') {
                resData = res
              } else if (self.getDataType(res) === 'Object') {
                if (
                  (res[axiosConfig.statusField || 'rscode'] ===
                    (axiosConfig.successCode || '200' || '')) ||
                  res[axiosConfig.statusField || 'rscode'] === '110000'
                ) {
                  dataFieldArr.forEach((item, index) => {
                    if (index === 0) {
                      resData = res[item] || []
                    } else {
                      if (axiosConfig.type === 1) {
                        resData = resData[0][item]
                        return
                      }
                      resData = resData[item] || []
                    }
                  })
                  if (axiosConfig.fileter) {
                    axiosConfig.fileter.map(my => {
                      resData = resData.filter(item => {
                        return item.code !== my
                      })
                    })
                  }
                  if (axiosConfig.options) {
                    // 过滤后的数据
                    let myArr = this.checkdata(resData, axiosConfig.options)
                    // console.log(myArr, 44)
                    resData = myArr
                  }
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
              // 禁用不可更改的节点
              if (self.disabledNodeIds && self.disabledNodeIds.length) {
                resData = self.disabledNodeHandle(resData, self.disabledNodeIds)
              }
              // 多选下拉树限制只能选取末级节点
              if (self.limitCheckedEnd && self?.config?.multiple) {
                resData = self.multyCheckDisabledNodeHandle(resData)
              }
              if (axiosConfig.rootName) {
                self.treeDataIn = Object.freeze([
                  {
                    [valueKeys[2] || 'id']: '0',
                    [treeProps.label || valueKeys[1] || 'name']: axiosConfig.rootName,
                    [valueKeys[0] || 'code']: '',
                    expand: true,
                    isleaf: '0',
                    children: resData
                  }
                ])
                self.defaultExpandedKeysIn = ['0']
              } else {
                self.treeDataIn = Object.freeze(resData)
                if (resData.length === 1) {
                  self.defaultExpandedKeysIn = [resData[0][valueKeys[2] || 'id']]
                }
              }
              // 处理默认传的treeProps的值不是children，后台返回的数据的下级是children情况
              if (resData.length && !JSON.stringify(resData).includes(self.configIn.treeProps.children)) {
                self.configIn.treeProps.children = 'children'
              }
              self.initScrollLoadPageData(resData)
              self.isLoadingIn = false
              if (self.treeDataIn.length && self.$refs.tree) {
                self.isRenderTree = true
                self.needInit = false
                self.$nextTick((vm) => {
                  if (!self.leftTreeShow(self.$refs.tree.data[0]) && this.needLeftTreeHide) {
                    self.$parent.$parent.$parent.$parent.leftTreeVisible = false
                  }
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
              }
            } else {
              this.$XModal.message({ status: 'error', message: res.result })
            }
          })
        }
      }
    },
    filterList(myList, Code) {
      return myList.filter(item => {
        return item !== Code // 过滤条件
      }).map(item => {
        item = Object.assign({}, item)
        if (item.children) {
          item.children = this.filterList(item.children, Code)
        }
        return item
      })
    },
    checkdata(data, arr) {
      for (var key = 0; key < data.length; key++) {
        if (data && data[key].children && data[key].children.length > 0) {
          this.checkdata(data[key].children, arr)
          if (!this.isundefined(data[key].children)) {
            data.splice(key, 1)
            key--
          }
        } else {
          if (!arr.includes(data[key].code)) {
            data[key] = undefined
            data.splice(key, 1)
            key--
          }
        }
      }
      return data
    },

    // 判断child 是否都为undefined
    isundefined(f) {
      let b = false
      f.forEach((item, key) => {
        if (item !== undefined) {
          b = true
        }
      })
      return b
    },
    disabledNodeHandle (data = [], disabledNodeIds = []) {
      loopFind(data)
      function loopFind(data) {
        data.forEach(item => {
          if (disabledNodeIds.includes(item.id)) {
            item.disabled = true
          }
          if (item.children && item.children.length) {
            loopFind(item.children)
          }
        })
      }
      return data
    },
    // 多选限制只能选取末级节点
    multyCheckDisabledNodeHandle(data = []) {
      loopFind(data)
      function loopFind(data) {
        data.forEach(item => {
          if (item.children && item.children.length) {
            item.disabled = true
            loopFind(item.children)
          }
        })
      }
      return data
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
    }
  },
  created() {},
  mounted() {},
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
        this.$refs.tree && this.$refs.tree.filter(val)
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
        this.configIn.initLoad && this.initTreeData(!this.isDropSelectTree)
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
  .el-tree-node__content {
    height: auto;
    position: relative;
    .el-tree-node__label {
      line-height: 26px;
    }
    .custom-tree-node{
      font-size: 14px;
    }
    .custom-tree-node-label{
      position:relative;
      z-index:2;
    }
    .el-tree-node__expand-icon{
      position:relative;
      z-index:2;
    }
    .custom-node-bg{
      position:absolute;
      left:0;
      right:0;
      top:0;
      bottom:0;
      z-index:1;
      background-color: rgba(250, 173, 20, .1)
    }
    .el-checkbox{
      position:relative;
      z-index: 2;
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
.vxe-pulldown--panel{
  z-index: 9999 !important;
}
.hasDataClass{
  background: #E3F2FE;
  padding: 2px 3px;
}
</style>
