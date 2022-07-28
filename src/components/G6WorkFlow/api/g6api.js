// G6Api   Author: Titans@2396757591@qq.com

/* eslint-disable no-new-func g6Api */
/* eslint-disable no-eval */
/* eslint-disable  no-useless-call */
// methods   Author:Titans@2396757591@qq.com
import G6 from '@antv/g6/src'

const util = {
  getbasicDataType(obj) {
    // 获取数据类型
    return Object.prototype.toString.call(obj).slice(8, -1)
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
  toNumberLocaleString(num) {
    return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,').replace(/(,$)/, '')
  },
  reduceCalc(arr, cb) {
    return arr.reduce(cb)
  },
  accurateJiafa(arg1, arg2) { // 精确加法
    let r1, r2, m
    try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  },
  accurateJianfa(arg1, arg2) { // 精确减法
    let r1, r2, m, n
    try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    // last modify by deeka
    // 动态控制精度长度
    n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  },
  accurateChengFa(arg1, arg2) { // 精确乘法
    let m = 0; let s1 = arg1.toString(); let s2 = arg2.toString()
    try { m += s1.split('.')[1].length } catch (e) { }
    try { m += s2.split('.')[1].length } catch (e) { }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  },
  accurateChuFa(arg1, arg2) { // 精确除法
    let t1 = 0; let t2 = 0; let r1; let r2
    try { t1 = arg1.toString().split('.')[1].length } catch (e) { }
    try { t2 = arg2.toString().split('.')[1].length } catch (e) { }
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  },
  accurateFixed(number, n) { // 保留小数位数(四舍五入)
    n = n ? parseInt(n) : 0
    if (n <= 0) return Math.round(number)
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n)
    return String(number)
  },
  each(object, callback) {
    /* js原生each方法 */
    let type = (function(obj) {
      switch (obj.constructor) {
        case Object:
          return 'Object'
        case Array:
          return 'Array'

        case NodeList:
          return 'NodeList'
        default:
          return 'null'
      }
    })(object)
    // 为数组或类数组时, 返回: index, value
    if (type === 'Array' || type === 'NodeList') {
      // 由于存在类数组NodeList, 所以不能直接调用every方法
      [].every.call(object, function(v, i) {
        return callback.call(v, i, v) !== false
      })
    } else if (type === 'Object') {
      // 为对象格式时,返回:key, value
      for (let i in object) {
        if (callback.call(object[i], i, object[i]) === false) {
          break
        }
      }
    }
  },
  debounceItemChange: (function (debounce) {
    return debounce(1000)
  })(function (delay) {
    // 利用闭包保存定时器
    let timer = null
    return function (cb) {
      // 在规定时间内再次触发会先清除定时器后再重设定时器
      clearTimeout(timer)
      timer = setTimeout(function () {
        cb()
      }, delay)
    }
  })
}

const initMethods = {
  initCreated() {
    // 初始化Created

  },
  initMounted() {
    // 初始化Mounted
    this.initG6Graph()
  },
  initG6Graph() { // 初始化G6graph
    let plugins = []
    if (!this.isView) {

    }
    let canvas = this.$refs['canvas']
    let { offsetWidth, offsetHeight } = canvas
    this.curGraph = new G6.Graph({
      container: canvas,
      width: offsetWidth, // 宽度
      height: offsetHeight, // 高度
      modes: {
        default: ['drag-canvas', 'clickSelected'],
        view: [],
        edit: [
          'drag-canvas', 'hoverNodeActived', 'hoverAnchorActived', 'dragNode', 'dragEdge',
          'dragPanelItemAddNode', 'clickSelected', 'deleteItem', 'itemAlign']
      },
      plugins: plugins, // 插件集
      defaultEdge: {
        shape: 'flow-polyline-round'
      }
    })
    if (this.isView) { this.curGraph.setMode('view') } else { this.curGraph.setMode(this.mode) }
    this.curGraph.data(this.initShape(this.data))
    this.curGraph.render()
    if (this.isView && this.data && this.data.nodes) {
      this.curGraph.fitView(5)
    }
    this.initEvents()
  },
  initShape(data) {
    if (data && data.nodes) {
      return {
        nodes: data.nodes,
        edges: data.edges
      }
    }
    return data
  },
  initEvents() {
    let self = this
    this.curGraph.on('afteritemselected', (items) => {
      if (items && items.length > 0) {
        const item = this.curGraph.findById(items[0])
        this.selectedModel = { ...item.getModel() }
      } else {
        this.selectedModel = this.processModel
      }
    })
    let canvas = this.$refs['canvas']
    let { offsetWidth, offsetHeight } = canvas
    this.resizeFunc = () => {
      self.curGraph.changeSize(offsetWidth, offsetHeight - 1)
    }
    window.addEventListener('resize', this.resizeFunc)
  },
  onItemCfgChange(key, value) {
    const items = this.curGraph.get('selectedItems')
    if (items && items.length > 0) {
      const item = this.curGraph.findById(items[0])
      if (this.curGraph.executeCommand) {
        this.curGraph.executeCommand('update', {
          itemId: items[0],
          updateModel: { [key]: value }
        })
      } else {
        this.curGraph.updateItem(item, { [key]: value })
      }
      this.selectedModel = { ...item.getModel() }
    } else {
      const canvasModel = { ...this.processModel, [key]: value }
      this.selectedModel = canvasModel
      this.processModel = canvasModel
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeFunc)
    this.curGraph.getNodes().forEach(node => {
      node.getKeyShape().stopAnimate()
    })
  }
}
const registFn = {
  Graph: { // 数据
    nodes: [{
      id: 'node1', // id 必须唯一
      color: '#333', // 颜色
      size: 10 || [10, 10], // 尺寸 || [宽, 高]
      shape: 'circle', // 所用图形
      style: { // 关键形样式（优先级高于color）
        fill: 'red',
        stroke: 'blue'
      },
      label: '文本标签' || { // 文本标签 || 文本图形配置
        text: '文本标签',
        fill: 'green'
      },
      parent: 'group1', // 所属组
      index: 1 // 渲染层级
    }],
    edges: [{
      id: 'edge1', // id 必须唯一
      source: 'node1', // 源节点 id
      target: 'node2', // 目标节点 id
      controlPoints: [{ // 控制点
        x: 10,
        y: 10
      }],
      sourceAnchor: 0, // 源节点锚点
      targetAnchor: 2, // 目标节点锚点
      color: 'red', // 颜色
      size: 3, // 尺寸
      shape: 'line', // 所用图形
      style: { // 关键形样式（优先级高于color）
        fill: 'red',
        stroke: 'blue'
      },
      label: '文本标签' || { // 文本标签 || 文本图形配置
        text: '文本标签',
        fill: 'green'
      },
      parent: 'group1', // 所属组
      index: 1 // 渲染层级
    }],
    groups: [{
      id: 'group1', // id 必须唯一
      color: '#333', // 颜色
      size: 10 || [10, 10], // 尺寸 || [宽, 高]
      shape: 'circle', // 所用图形
      style: { // 关键形样式（优先级高于color）
        fill: 'red',
        stroke: 'blue'
      },
      label: '文本标签' || { // 文本标签 || 文本图形配置
        text: '文本标签',
        fill: 'green'
      },
      parent: 'group2' // 所属组
    }],
    guides: [] // 导引数据
  },
  eventApi: {
    // 事件可以与前缀 '' （ 空即任意 ）， 'node'，'edge'，'group', 'guide'，自由组合使用：
    // event: {
    //   currentItem,  // drag 拖动子项
    //   currentShape, // drag 拖动图形
    //   shape,        // 图形对象
    //   item,         // 子项
    //   domEvent,     // 原生的 dom 事件
    //   x,            // 图横坐标
    //   y,            // 图纵坐标
    //   domX,         // dom横坐标
    //   domY,         // dom纵坐标
    //   action,       // 数据变更动作 add、update、remove、changeData
    //   toShape,      // mouseleave、dragleave 到达的图形
    //   toItem,       // mouseleave、dragleave 到达的子项
    // }
    graph: {
      // 鼠标事件
      click(ev) { // 鼠标左键点击事件
        this.$emit('onGraphClick', ev)
      },
      dblclick(ev) { // 鼠标左键双击事件
        this.$emit('onGraphDblclick', ev)
      },
      mouseenter(ev) { // 鼠标移入事件
        this.$emit('onGraphMouseenter', ev)
      },
      mouseleave(ev) { }, // 鼠标移出事件
      mousedown(ev) { }, // 鼠标按下事件
      mouseup(ev) { }, // 鼠标抬起事件
      mousemove(ev) { }, // 鼠标移动事件
      dragstart(ev) { }, // 鼠标开始拖拽事件
      drag(ev) { }, // 鼠标拖拽事件
      dragend(ev) { }, // 鼠标拖拽结束事件
      dragenter(ev) { }, // 鼠标拖拽进入事件
      dragleave(ev) { }, // 鼠标拖拽移出事件
      drop(ev) { }, // 鼠标拖拽放置事件
      contextmenu(ev) { }, // 菜单事件
      // 其他事件
      keydown(ev) { }, // 键盘按键按下事件
      keyup(ev) { }, // 键盘按键抬起事件
      wheel(ev) { }, // 滚轮事件
      beforechangesize(ev) { }, // 画布尺寸变化前
      afterchangesize(ev) { }, // 画布尺寸变化后
      beforeviewportchange(ev) { }, // 视口变化前
      afterviewportchange(ev) { }, // 视口变化后
      beforechange(ev) { }, // 子项数据变化前
      afterchange(ev) { } // 子项数据变化后
    }
  },
  registEvent() { // 事件监听
    this.curG6Graph.on('', (ev) => { })
  }
}
const optonsEvent = {
  registerNode(name, config) { // 自定义节点
    // G6.registerNode('customNode', {
    //   draw(item) {
    //     const group = item.getGraphicGroup();
    //     const html = G6.Util.createDOM('<div class="node">HTML 节点</div>');
    //     return group.addShape('dom', {
    //       attrs: {
    //         x: 0,
    //         y: 0,
    //         width: 100,
    //         height: 24,
    //         html
    //       }
    //     });
    //   }
    // });
    G6.registerNode(name, config)
  },
  registerEdge(name, config) { // 自定义边
    G6.registerNode(name, config)
  },
  registerGroup(name, config) { // 自定义群组
    G6.registerGroup(name, config)
  },
  registerEvent(eventType, callback) { // 自定义交互
    this.curG6Graph.on(eventType, callback)
  },
  save() { // 保存当前图数据
    this.curG6Graph.save() // 返回图数据
  },
  read(data = {
    nodes: [],
    edges: [],
    groups: [],
    guides: []
  }) { // 读取并渲染图数据。
    this.curG6Graph.read(data)
  },
  find(id) { // 查询
    return this.curG6Graph.find(id)
  },
  add(type, model) { // 新增项
    // type   { string } 项类型 可以是 node 、edge 、guide
    // model { object } 数据模型
    this.curG6Graph.add(type, model)
  },
  remove(item) { // 删除项
    // item   { string || object } 项 id 或 项对象
    this.curG6Graph.remove(item)
  },
  update(type, model) { // 更新项
    // type   { string } 项类型 可以是 node 、edge 、guide
    // model { object } 数据模型
    this.curG6Graph.add(type, model)
  },
  node(mappingObject) {
    // mappingObject      {object}  映射对象
    this.curG6Graph.node(mappingObject)
  },
  edge(mappingObject) {
    // mappingObject      {object}  映射对象
    this.curG6Graph.edge(mappingObject)
  },
  group(mappingObject) {
    // mappingObject      {object}  映射对象
    this.curG6Graph.group(mappingObject)
  },
  getDomPoint(graphPoint) {
    // 参数 graphPoint   { object } 图坐标
    // 返回 domPoint       { object } dom 坐标
    return this.curG6Graph.getDomPoint(graphPoint)
  },
  getPoint(domPoint) {
    // domPoint       {object} dom 坐标
    // 返回 graphPoint   {object} 图坐标
    return this.curG6Graph.getDomPoint(domPoint)
  },
  focusPoint(graphPoint) { // 聚焦某点，即将视口中心移动到该点
    this.curG6Graph.focusPoint(graphPoint)
  },
  focus(item) { // 聚焦某点，即将视口中心移动到该点
    //  item   { string || object } 项 id 或 项对象
    this.curG6Graph.focus(item)
  },
  zoom(scale) { // 以画布中心，进行缩放
    this.curG6Graph.zoom(scale)
  },
  zoomPoint(graphPoint, scale) { // 以图坐标 point 中心，进行缩放
    this.curG6Graph.zoom(graphPoint, scale)
  },
  getZoom() { // 获取画布缩放比率
    return this.curG6Graph.getZoom()
  },
  translate(dx, dy) { // 平移画布
    // dx   { number } 右方向为正，平移 dx 距离
    // dy   { number } 下方向为正，平移 dy 距离
    // 画布向右平移 50，向下平移 50
    this.curG6Graph.translate(dx, dy)
  },
  changeSize(width, height) { // 改变画布尺寸
    this.curG6Graph.changeSize(width, height)
  },
  setFitView(fitView) { // 适合窗口
    this.curG6Graph.setFitView(fitView)
  },
  getWidth() { // 获取画布宽
    return this.curG6Graph.getWidth()
  },
  getHeight() { // 获取画布高
    return this.curG6Graph.getHeight()
  },
  getItems() { // 获取图内所有项
    return this.curG6Graph.getItems()
  },
  getNodes() { // 获取图内所有节点
    return this.curG6Graph.getNodes()
  },
  getEdges() { // 获取图内所有边
    return this.curG6Graph.getEdges()
  },
  getGroups() { // 获取图内所有群组
    return this.curG6Graph.getGroups()
  },
  getGuides() { // 获取图内所有导引
    return this.curG6Graph.getGuides()
  },
  preventAnimate(callback) {
    // 阻止动画，回掉函数中的执行代码，将不会做动画。
    this.curG6Graph.preventAnimate(callback)
  }

}

export default {
  ...util, // 工具类
  ...initMethods, // 初始化函数
  ...registFn, // 注册函数
  ...optonsEvent
}
