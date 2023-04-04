/*
 * @Author: 轻语
 * @Date: 2021-11-10 11:17:14
 * @LastEditors: 轻语
 * @LastEditTime: 2021-11-18 17:12:07
 * @Description:
 */
export default {
  props: {
    editRules: { // table 编辑配置
      type: [Object],
      default: () => {}
    }
  },
  watch: {
    editRules: { // 校验
      handler() {
        this.initEditRules()
      },
      deep: true
      // immediate: true
    }
  },
  data() {
    return {
      editRulesIn: {}
    }
  },
  methods: {
    initEditRules() { // 编辑校验规则
      const regTreePrefix = (item) => {
        const reg = /\w*_$/g
        return reg.test(item)
      }
      // 遍历正则对象，给树统一自动添加正则
      const addTreeReg = (formValidationConfig) => {
        const reg = /^(?!initId)/g
        Object.keys(formValidationConfig).forEach((item) => {
          if (regTreePrefix(item)) {
            formValidationConfig[item][0].pattern = reg
          }
        })
        return formValidationConfig
      }
      this.editRulesIn = Object.assign({}, this.editRulesIn, addTreeReg({ ...this.editRules }))
    }
  },
  mounted() {
    this.initEditRules()
  }
}
