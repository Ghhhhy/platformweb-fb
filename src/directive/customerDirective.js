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
  }
}
