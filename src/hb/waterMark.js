class WaterMark {
  constructor(text, settings) {
    this.settings = Object.assign({
      showType: 'canvas', // div 还是 canvas
      x: 20, // 水印起始位置x轴坐标
      y: 100, // 水印起始位置Y轴坐标
      xSpace: 150, // 水印x轴间隔
      ySpace: 100, // 水印y轴间隔
      color: '#cfcccc', // 水印字体颜色
      alpha: 0.4, // 水印透明度
      fontsize: '18px', // 水印字体大小
      angle: 20, // 水印倾斜度数
      curTime: true // 是否自动拼接当前时间
    }, settings || {})
    this.globalWidth = window.innerWidth
    this.globalHeight = window.innerHeight
    this.initCanvas()
    this.draw(text)
    this.insertWaterMark()
  }
  initCanvas() {
    this.renderCanvas = document.createElement('canvas')
    this.renderContext = this.renderCanvas.getContext('2d')
    this.renderCanvas.width = this.globalWidth
    this.renderCanvas.height = this.globalHeight
    this.div = document.createElement('div')
  }
  insertWaterMark() {
    this.WaterMarkEl = this.renderCanvas
    if (this.settings.type === 'div') {
      this.WaterMarkEl = this.div
      this.WaterMarkEl.style.backgroundImage = 'url(' + this.renderCanvas.toDataURL('image/png') + ')'
    }
    const style = this.WaterMarkEl.style
    style.position = 'fixed'
    style.opacity = this.settings.alpha
    style.top = style.left = 0
    style.zIndex = '9999'
    style.width = this.globalWidth + 'px'
    style.height = this.globalHeight + 'px'
    style.pointerEvents = 'none'

    this.WaterMarkEl.id = 'waterMark'
    document.body.append(this.WaterMarkEl)
  }
  draw(waterMarkText, settings) {
    this.settings = Object.assign(this.settings, settings || {})
    let { x, y, xSpace, ySpace, color, fontsize, angle } = this.settings
    let { globalWidth, globalHeight, renderContext } = this

    renderContext.clearRect(0, 0, globalWidth, globalHeight)
    renderContext.font = fontsize + ' microsoft yahei'
    renderContext.fillStyle = color
    renderContext.textAlign = 'left'
    renderContext.textBaseline = 'Middle'
    let measureText = renderContext.measureText(waterMarkText)
    let width = measureText.width
    let height = Math.ceil(width / Math.tan(angle) + 50)

    for (let xx = x; xx < globalWidth; xx += (xSpace + width)) {
      for (let yy = y; yy < globalHeight; yy += (ySpace + height)) {
        // 填充文字，x 间距, y 间距
        renderContext.save()
        renderContext.translate(xx, yy)
        renderContext.rotate(0 - (angle * Math.PI / 180))
        renderContext.fillText(waterMarkText, 0, 0)
        renderContext.restore()
      }
    }
  }
}

const generateWaterPrint = (text, settings) => {
  return new WaterMark(text, settings)
}

const getTime = () => {
  let date = new Date()
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
}

const generateDefaultWaterPrint = (code, opTime) => {
  generateWaterPrint(`${code}-${opTime || getTime()}`)
}

export {
  generateDefaultWaterPrint
}
