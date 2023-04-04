/*
 * @Author: 轻语
 * @Date: 2021-11-15 11:15:07
 * @LastEditors: 轻语
 * @LastEditTime: 2021-11-18 16:41:55
 * @Description: 展开配置
 */
export default {
  props: {
    expandConfig: { // table 展开行配置
      type: [Boolean, Object],
      default () {
        return false
      }
    }
  },
  watch: {
    expandConfig: { // table 展开行配置监听
      handler() {
        this.initExpandConfig()
      },
      deep: true
      // immediate: true
    }
  },
  data() {
    return {
      expandConfigIn: { // 展开配置
      }
    }
  },
  methods: {
    initExpandConfig() { // 编辑展开配置
      if (this.getBasicDataType(this.expandConfig) === 'Undefined' || this.getBasicDataType(this.expandConfig) === 'Boolean') {
        this.expandConfigIn = {
          expandAll: false
        }
      } else {
        this.expandConfigIn = Object.assign({}, this.expandConfig)
      }
    }
  },
  mounted() {
    this.initExpandConfig()
  }
}
