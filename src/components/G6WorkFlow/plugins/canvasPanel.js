// 画布插件   Author: Titans@2396757591@qq.com
class CanvasPanel {
  constructor(cfgs) {
    this._cfgs = Object.assign(this.getDefaultCfg(), cfgs)
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
    const parentNode = this.get('container')
    parentNode.addEventListener('dragover', e => {
      graph.emit('canvas:mousemove', e)
    })
    parentNode.addEventListener('dragleave', e => {
      graph.emit('canvas:mouseleave', e)
    })
  }

  destroy() {
    this.get('canvas').destroy()
    const container = this.get('container')
    container.parentNode.removeChild(container)
  }
}

export default CanvasPanel
