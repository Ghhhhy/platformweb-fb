// 预览工作流 详情   Author: Titans@2396757591@qq.com

import utils from '../utils/utils.js'
const { deepMix, each, wrapBehavior } = utils

class DetailPanel {
  constructor(cfgs) {
    this._cfgs = deepMix(this.getDefaultCfg(), cfgs)
  }
  getDefaultCfg() {
    return { container: null }
  }

  get(key) {
    return this._cfgs[key]
  }
  set(key, val) {
    this._cfgs[key] = val
  }

  initPlugin(graph) {
    const self = this
    this.set('graph', graph)
    const events = self.getEvents()
    const bindEvents = {}
    each(events, (v, k) => {
      const event = wrapBehavior(self, v)
      bindEvents[k] = event
      graph.on(k, event)
    })
    this._events = bindEvents
    this.updatePanel()
  }

  updatePanel() {
    const graph = this.get('graph')
    const selectedItems = graph.get('selectedItems')
    let selectedItem = null
    if (selectedItems && selectedItems.length > 0) {
      selectedItem = graph.findById(selectedItems[0])
    }
    if (selectedItem && graph.getCurrentMode() === 'view') {
      // 预览展示model
      console.log(selectedItem.getModel())
    }
  }

  getEvents() {
    return { afteritemselected: 'updatePanel' }
  }

  destroy() {
    this.get('canvas').destroy()
    const container = this.get('container')
    container.parentNode.removeChild(container)
  }
}

export default DetailPanel
