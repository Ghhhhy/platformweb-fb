<template>
  <div
    class="down-icon-wrapper html2canvas-ignore"
    title="下载为图片"
    @click="downTrigger"
  >
    <svg
      t="1675996435068"
      class="icon download-icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6832"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="32"
      height="32"
    >
      <path d="M372.8 0.256v366.144H189.76l305.088 366.144L800 366.4H616.96V0.256zM128.64 901.76h732.288v121.984H128.64z" fill="#2A8BFD" p-id="6833" />
    </svg>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
  name: 'DownHtml',
  props: {
    // 保存的文件名称
    fileName: {
      type: String,
      default: 'echarts'
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 点击下载按钮触发器
    async downTrigger() {
      if (!this.$el?.parentElement) return
      await this.$nextTick()
      try {
        this.htmlToCanvas()
      } catch (e) {
        console.log(e)
      }
    },
    htmlToCanvas () {
      // 获取需要转canvas元素的宽高
      const { width, height } = this.$el.parentElement?.getBoundingClientRect?.()
      // 开始转换
      html2canvas(this.$el.parentElement, {
        width,
        height,
        // 过滤掉不需要的元素
        ignoreElements: element => {
          // compareDocumentPosition比较节点与指定节点相对位置
          // 例如：P1.compareDocumentPosition(P2)
          // 0：自身
          // 1：没有关系，这两个节点不属于同一个文档。
          // 2：第一节点（P1）位于第二个节点后（P2）。
          // 4：第一节点（P1）定位在第二节点（P2）前。
          // 8：第一节点（P1）位于第二节点内（P2）。
          // 16：第二节点（P2）位于第一节点内（P1）。
          const positionIndex = this.$el?.parentElement?.compareDocumentPosition?.(element)

          // 重要！！！
          // 保留样式。因为样式在head标签内，所以要将html、head也要保留，否则下载的图片样式有丢失
          const whiteNodeNames = ['STYLE', 'HTML', 'HEAD']
          const nodeType = element.nodeName?.toUpperCase?.()

          // 过滤html2canvas-ignore类名的元素
          const hasClass = element.classList?.contains?.('html2canvas-ignore')

          return whiteNodeNames.includes(nodeType) ? false : (positionIndex !== 0 && positionIndex < 8) || hasClass
        }
      })
        .then(canvas => {
          this.downLoad(canvas)
        })
    },
    // 将canvas转dataUrl，并利用a标签下载
    downLoad(canvas) {
      const dataUrl = canvas.toDataURL('image/png', 1.0)
      const tempLink = document.createElement('a')
      tempLink.style.display = 'none'
      tempLink.href = dataUrl
      tempLink.setAttribute('download', `${this.fileName}.png`)
      // 不支持就另开页签开打
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank')
      }
      document.body.appendChild(tempLink)
      tempLink.click()
      document.body.removeChild(tempLink)
    }
  }
}
</script>

<style lang="scss" scoped>
.down-icon-wrapper {
  position: absolute;
  right: 2px;
  top: 4px;
  cursor: pointer;
  zIndex: 10;
}
.download-icon {
  width: 16px;
}
</style>
