/* eslint-disable */
import Vue from 'vue'
import DownHtml from './DownHtml.vue'

/**
 * v-html2canvas自定义指令
 * html转canvas，并保存为png图片到本地
 * @type {{}}
 */
const html2canvasDirective = {}
html2canvasDirective.install = App => {
  const options = {
    inserted: function(el, binding, vnode) {
      el.style.position = 'relative'

      const vm = new Vue({
        // h就是createElement,组件生成vdom
        render: h => h(DownHtml, {
          props: {
            fileName: binding.value || 'chart'
          }
        })
      }).$mount()

      // 追加真实dom
      el.appendChild(vm.$el)
    }
  }

  // 指令注册
  App.directive('html2canvas', options)
}

export default html2canvasDirective
