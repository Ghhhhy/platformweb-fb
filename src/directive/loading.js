import Vue from 'vue'
import Loading from 'element-ui/packages/loading/src/loading.vue'
import { addClass, removeClass, getStyle } from 'element-ui/src/utils/dom'
import { PopupManager } from 'element-ui/src/utils/popup'
import afterLeave from 'element-ui/src/utils/after-leave'
import store from '@/store/index'
import transJson from '@/utils/transformMenuQuery'
const Mask = Vue.extend(Loading)

/* eslint-disable */
const loadingDirective = {}
loadingDirective.install = Vue => {
  if (Vue.prototype.$isServer) return
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      Vue.nextTick(() => {
        if (binding.modifiers.fullscreen) {
          el.originalPosition = getStyle(document.body, 'position')
          el.originalOverflow = getStyle(document.body, 'overflow')
          el.maskStyle.zIndex = PopupManager.nextZIndex()

          addClass(el.mask, 'is-fullscreen')
          insertDom(document.body, el, binding)
        } else {
          removeClass(el.mask, 'is-fullscreen')

          if (binding.modifiers.body) {
            el.originalPosition = getStyle(document.body, 'position')

            ['top', 'left'].forEach(property => {
              const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft'
              el.maskStyle[property] = el.getBoundingClientRect()[property] +
                document.body[scroll] +
                document.documentElement[scroll] -
                parseInt(getStyle(document.body, `margin-${ property }`), 10) +
                'px'
            })
            ['height', 'width'].forEach(property => {
              el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px'
            })

            insertDom(document.body, el, binding)
          } else {
            el.originalPosition = getStyle(el, 'position')
            insertDom(el, el, binding)
          }
        }
      })
    } else {
      afterLeave(el.instance, _ => {
        if (!el.instance.hiding) return
        el.domVisible = false
        const target = binding.modifiers.fullscreen || binding.modifiers.body
          ? document.body
          : el
        removeClass(target, 'el-loading-parent--relative')
        removeClass(target, 'el-loading-parent--hidden')
        el.instance.hiding = false
      }, 300, true)
      el.instance.visible = false
      el.instance.hiding = true
    }
  }
  const insertDom = (parent, el, binding) => {
    if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
      Object.keys(el.maskStyle).forEach(property => {
        el.mask.style[property] = el.maskStyle[property]
      })

      if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
        addClass(parent, 'el-loading-parent--relative')
      }
      if (binding.modifiers.fullscreen && binding.modifiers.lock) {
        addClass(parent, 'el-loading-parent--hidden')
      }
      el.domVisible = true

      parent.appendChild(el.mask)
      Vue.nextTick(() => {
        if (el.instance.hiding) {
          el.instance.$emit('after-leave')
        } else {
          el.instance.visible = true
        }
      })
      el.domInserted = true
    } else if (el.domVisible && el.instance.hiding === true) {
      el.instance.visible = true
      el.instance.hiding = false
    }
  }

  Vue.directive('loading', {
    bind: function(el, binding, vnode) {
      const textExr = el.getAttribute('element-loading-text')
      const spinnerExr = el.getAttribute('element-loading-spinner')
      const backgroundExr = el.getAttribute('element-loading-background')
      const customClassExr = el.getAttribute('element-loading-custom-class')
      const vm = vnode.context
      const mask = new Mask({
        el: document.createElement('div'),
        data: {
          text: vm && vm[textExr] || textExr || '数据加载中，请稍等...',
          spinner: vm && vm[spinnerExr] || spinnerExr,
          background: vm && vm[backgroundExr] || backgroundExr || 'rgba(0, 0, 0, 0.7)',
          customClass: vm && vm[customClassExr] || customClassExr,
          fullscreen: !!binding.modifiers.fullscreen
        }
      })
      el.instance = mask
      el.mask = mask.$el
      el.maskStyle = {}

      binding.value && toggleLoading(el, binding)
    },

    update: function(el, binding) {
      el.instance.setText(el.getAttribute('element-loading-text') || '数据加载中，请稍等...')
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding)
      }
    },

    unbind: function(el, binding) {
      if (el.domInserted) {
        el.mask &&
        el.mask.parentNode &&
        el.mask.parentNode.removeChild(el.mask)
        toggleLoading(el, { value: false, modifiers: binding.modifiers })
      }
      el.instance && el.instance.$destroy()
    }
  })
  Vue.directive('param5Show', {
    inserted:function(el, binding, vnode) {
      const params5Obj=transJson(store.getters.getCurNavModule.param5||"")
      let bindConfig=binding.value
      if(typeof bindConfig==='string'){
        if(bindConfig in params5Obj&&(!params5Obj[bindConfig]||params5Obj[bindConfig]==='0'||params5Obj[bindConfig]==='false')){
          el.parentNode.removeChild(el)
        }
      }else if(typeof bindConfig ==="function"){
        let isShow=binding.value()
        if(!isShow){
          el.parentNode.removeChild(el)
        }
      }else if(typeof bindConfig ==="boolean"){
        if(!bindConfig) el.parentNode.removeChild(el)
      }else{
        this.$message.error("自定义指令未传值");
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
      bind: (el, binding)=> {
        el.addEventListener('click', () => {
          if (!el.disabled) {
            el.disabled = 'disabled';
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
}

export default loadingDirective
