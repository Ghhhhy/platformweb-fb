<!--  工作流   Author:Titans@2396757591@qq.com -->
<template>
  <div :style="{ 'height': '100%' }">
    <div ref="wfdRoot" class="wfd-root">
      <ToolbarPanel v-if="!isView" ref="toolbar">
        <vxe-button size="small" style="margin-right:6px;" @click="exportXML">导出XML</vxe-button>
        <vxe-button size="small" style="margin-right:6px;" @click="save">保存流程图</vxe-button>
        <vxe-button size="small" style="margin-right:6px;" @click="viewFlowchart">预览流程图</vxe-button>
      </ToolbarPanel>
      <div ref="wfdmain" style="display: flex;" :style="{ 'height': !isView ? 'calc(100% - 50px)' : '100%' }">
        <ItemPanel v-if="!isView" ref="addItemPanel" height="100%" />
        <div ref="canvas" class="canvasPanel" :style="{ 'height': '100%','width': isView ? '100%' : '70%','border-bottom': isView ? 0 : null }"></div>
        <DetailPanel
          v-if="!isView"
          ref="detailPanel"
          :height="gheight"
          :model="selectedModel"
          :read-only="mode !== 'edit'"
          :signal-defs="processModel.signalDefs"
          :message-defs="processModel.messageDefs"
          :on-change="(key,val) => { onItemCfgChange(key,val) }"
        />
      </div>
    </div>
    <vxe-modal
      v-if="modalVisible"
      v-model="modalVisible"
      :title="viewData.wfd.name + '预览'"
      width="90%"
      height="90%"
      :position="{ top: '8%',left: '5%' }"
      resize
      remember
      transfer
    >
      <div class="height-all">
        <WfdVue ref="wfd" :data="viewData" is-view />
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import G6 from '@antv/g6/src'
import { getShapeName } from '../config/clazz'
import Command from '../plugins/command'
import Toolbar from '../plugins/toolbar'
import AddItemPanel from '../plugins/addItemPanel'
import CanvasPanel from '../plugins/canvasPanel'
import Detail from '../plugins/detail'

import ToolbarPanel from '../components/ToolbarPanel'
import ItemPanel from '../components/ItemPanel'
import DetailPanel from '../components/DetailPanel.vue'
import i18n from '../locales'
import { exportXML } from '../plugins/bpmn'
import registerShape from '../shape'
import registerBehavior from '../behavior'
import WfdVue from './Wfd'
registerShape(G6)
registerBehavior(G6)
export default {
  name: 'WfdVue',
  components: {
    ToolbarPanel,
    ItemPanel,
    DetailPanel,
    WfdVue
  },
  provide() {
    return {
      i18n: i18n[this.lang]
    }
  },
  props: {
    isView: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'edit'
    },
    height: {
      type: Number,
      default: 0
    },
    lang: {
      type: String,
      default: 'zh'
    },
    data: {
      type: Object,
      default: () => ({ nodes: [], edges: [] })
    }
  },
  data() {
    return {
      modalVisible: false,
      gheight: 0,
      resizeFunc: () => {},
      selectedModel: {},
      processModel: {
        id: '',
        name: '工作流',
        clazz: 'process',
        dataObjs: [],
        signalDefs: [],
        messageDefs: []
      },
      viewData: { wfd: {} },
      graph: null,
      cmdPlugin: null
    }
  },
  watch: {
    data(oldData, newData) {
      if (oldData !== newData) {
        if (this.graph) {
          this.graph.changeData(this.initShape(newData))
          this.graph.setMode(this.mode)
          this.graph.emit('canvas:click')
          if (this.cmdPlugin) {
            this.cmdPlugin.initPlugin(this.graph)
          }
          if (this.isView) {
            this.graph.fitView(5)
          }
        }
      }
    }
  },
  methods: {
    getUuid(hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') { // 获取uuid
      let s = []
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = ''
      let uuid = s.join('')
      return uuid
    },
    initShape(data) {
      if (data && data.nodes) {
        return {
          nodes: data.nodes.map(node => {
            return {
              shape: getShapeName(node.clazz),
              ...node
            }
          }),
          edges: data.edges
        }
      }
      return data
    },
    initEvents() {
      this.graph.on('afteritemselected', (items) => {
        if (items && items.length > 0) {
          const item = this.graph.findById(items[0])
          this.selectedModel = { ...item.getModel() }
        } else {
          this.selectedModel = this.processModel
        }
      })
      this.resizeFunc = () => {
        const page = this.$refs['canvas']
        const graph = this.graph
        const gheight = this.$refs.wfdmain.offsetHeight - 1
        graph.changeSize(page.offsetWidth, gheight)
      }
      this.$nextTick(() => {
        this.resizeFunc()
      })
      window.addEventListener('resize', this.resizeFunc)
    },
    onItemCfgChange(key, value) {
      const items = this.graph.get('selectedItems')
      if (items && items.length > 0) {
        const item = this.graph.findById(items[0])
        if (this.graph.executeCommand) {
          this.graph.executeCommand('update', {
            itemId: items[0],
            updateModel: { [key]: value }
          })
        } else {
          this.graph.updateItem(item, { [key]: value })
        }
        this.selectedModel = { ...item.getModel() }
      } else {
        const canvasModel = { ...this.processModel, [key]: value }
        this.selectedModel = canvasModel
        this.processModel = canvasModel
      }
      this.$nextTick(() => {
        this.graph.data(this.initShape(this.save()))
        this.graph.render()
      })
    },
    init() {
      let plugins = []
      if (!this.isView) {
        this.cmdPlugin = new Command()
        const toolbar = new Toolbar({ container: this.$refs['toolbar'].$el })
        const addItemPanel = new AddItemPanel({ container: this.$refs['addItemPanel'].$el })
        const canvasPanel = new CanvasPanel({ container: this.$refs['canvas'] })
        const detailPanel = new Detail({ container: null })
        plugins = [ this.cmdPlugin, toolbar, addItemPanel, canvasPanel, detailPanel ]
      }
      this.gheight = this.height || this.$refs.wfdmain.offsetHeight
      const width = this.$refs['canvas'].offsetWidth
      this.graph = new G6.Graph({
        plugins: plugins,
        container: this.$refs['canvas'],
        height: this.gheight - 1,
        width: width,
        modes: {
          default: ['drag-canvas', 'clickSelected'],
          view: ['hoverNodeActived', 'clickSelected'],
          edit: ['drag-canvas', 'hoverNodeActived', 'hoverAnchorActived', 'dragNode', 'dragEdge', 'dragPanelItemAddNode', 'clickSelected', 'deleteItem', 'itemAlign']
        },
        fitView: 'tl',
        maxZoom: 1.5,
        defaultEdge: {
          shape: 'flow-polyline-round'
        }
      })
      this.graph.saveXML = (createFile = true) => exportXML(this.graph.save(), this.processModel, createFile)
      if (this.isView) { this.graph.setMode('view') } else { this.graph.setMode(this.mode) }
      this.graph.data(this.initShape(this.data))
      this.graph.render()
      // if (this.isView && this.data && this.data.nodes) {
      //   this.graph.fitView('tl')//  'tl', 'lc', 'bl', 'cc', 'tc', 'tr', 'rc', 'br', 'bc', 'autoZoom'
      // }
    },
    save() {
      let savedata = Object.assign(this.graph.save(), { wfd: this.processModel })
      return savedata
    },
    exportXML() {
      let saveXML = this.graph.saveXML(false)
      return saveXML
    },
    viewFlowchart() {
      this.viewData = this.save()
      this.modalVisible = true
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeFunc)
    this.graph.getNodes().forEach(node => {
      node.getKeyShape().stopAnimate()
    })
  },
  mounted() {
    this.init()
    this.initEvents()
  }
}
</script>
  <style lang="scss" scoped>
    .wfd-root{
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: block;
    }
    .canvasPanel {
    flex: 0 0 auto;
    float: left;
    width:70%;
    background-color: #fff;
    border-bottom: 1px solid #E9E9E9;
    }
  </style>
