import store from '@/store/index'
import transJson from '@/utils/transformMenuQuery'
export default {
  install: (Vue) => {
    Vue.directive('param5Show', {
      inserted: function(el, binding, vnode) {
        const params5Obj = transJson(store.getters.getCurNavModule.param5 || '')
        let bindConfig = binding.value
        if (typeof bindConfig === 'string') {
          if (bindConfig in params5Obj && (!params5Obj[bindConfig] || params5Obj[bindConfig] === '0' || params5Obj[bindConfig] === 'false')) {
            el.parentNode.removeChild(el)
          }
        } else if (typeof bindConfig === 'function') {
          let isShow = binding.value()
          if (!isShow) {
            el.parentNode.removeChild(el)
          }
        } else if (typeof bindConfig === 'boolean') {
          if (!bindConfig) el.parentNode.removeChild(el)
        } else {
          this.$message.error('自定义指令未传值')
        }
      }
    })
    /* *
      @params binding.value  {Boolean,String,Function:())=>Boolean}
      <vxe-button v-param5Show="() => { showshowWay('kjbtnVisable') }" @click="dialogClose">取消</vxe-button>
      <vxe-button v-param5Show="'kjbtnVisable'" @click="dialogClose">取消</vxe-button>
      <vxe-button v-param5Show="false" @click="dialogClose">取消</vxe-button>
      //----
      vueInstatnce{
        ...
        methods:{
          showshowWay(str){
            return testList.inculdes('123')
          },
          dialogClose(){

          }
        }
        ...
      }
     */
    Vue.directive('deClick', {
      bind: (el, binding) => {
        el.addEventListener('click', () => {
          if (!el.disabled) {
            el.disabled = 'disabled'
            el.classList.add('is-disabled')
            el.classList.add('is--disabled')
            setTimeout(() => {
              el.removeAttribute('disabled')
              el.classList.remove('is--disabled')
            }, binding.value || 1000)
          }
        })
      }
    })
    // 水平拖动指令
    Vue.directive('xResize', {
      inserted: (el, binding) => {
        // 添加拖动dom
        el.style.position = 'relative'
        const dargNodeDom = document.createElement('div')
        dargNodeDom.style.position = 'absolute'
        dargNodeDom.style.right = '-7px'
        dargNodeDom.style.bottom = '0'
        dargNodeDom.style.width = '14px'
        dargNodeDom.style.height = '100%'
        dargNodeDom.style['text-align'] = 'center'
        dargNodeDom.style.cursor = 'ew-resize'
        el.appendChild(dargNodeDom)
        // 拿到传参的值 默认最大宽度为父元素盒子宽度 （这儿建议给父元素设置display：flex,其余子盒子使用剩余宽度）
        const { max = el.parentNode.offsetWidth, min = 100 } = binding.value || {}
        const curDomStyle = {
          min: min,
          max: max,
          _width: el.offsetWidth
        }
        // 设置边界条件
        Object.defineProperty(curDomStyle, 'width', {
          set(newValue) {
            if (newValue > curDomStyle.max) { // curDomStyle.max
              this._width = curDomStyle.max
            } else if (newValue < curDomStyle.min) { // curDomStyle.min
              this._width = curDomStyle.min
            } else {
              this._width = newValue
            }
          },
          get() {
            return this._width
          }
        })
        // 设置拖动
        let isResizing = false
        let startWidth = 0
        let startX = 0
        const move = (e) => {
          if (isResizing) {
            const newWidth = startWidth + (e.clientX - startX)
            curDomStyle.width = newWidth
            el.style.width = curDomStyle.width + 'px'
          }
        }
        dargNodeDom.addEventListener('mousedown', (e) => {
          startWidth = el.offsetWidth
          startX = e.clientX
          isResizing = true
          document.addEventListener('mousemove', move)
        })
        document.addEventListener('mouseup', () => {
          isResizing = false
          document.removeEventListener('mousemove', move)
        })
      }
    })
  }
}
