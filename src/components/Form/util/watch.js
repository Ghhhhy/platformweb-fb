// watch   Author:Titans@2396757591@qq.com
export default {
  formGloabalConfig: {
    // 表单全局配置
    handler(newVal, oldVal) {
      this.initFormGloabalConfig(newVal)
    },
    deep: true,
    immediate: true
  },
  formItemsConfig: {
    // 表单每一条目配置
    handler(newVal, oldVal) {
      this.initFormItemsConfig(newVal)
    },
    deep: true,
    immediate: true
  },
  formDataList: {
    // 表单数据集
    handler(newVal, oldVal) {
      this.initFormDataList(newVal)
    },
    // deep: true,
    immediate: true
  },
  editable: {
    handler(newVal, oldVal) {
      // if (!newVal) {
      //   this.formValidationConfigIn = {}
      // }
    },
    immediate: true
  },
  uneditableBorder: {
    handler(newVal, oldVal) {
      // if (!newVal) {
      //   this.formValidationConfigIn = {}
      // }
    },
    immediate: true
  },
  formConfig: {
    // 表单用户配置
    handler(newVal, oldVal) {
      this.initFormConfig()
      // this.registFormItemRender(this.formConfigCp.renderers)
      // this.registRenderers(this.formItemsConfigIn)
    },
    deep: true,
    immediate: true
  },
  formValidationConfig: {
    handler(newVal, oldVal) {
      this.initFormValidationConfig()
    },
    deep: true,
    immediate: true
  },
  moneyInputSwich: {
    handler(newVal, oldVal) {
    },
    immediate: true
  },
  defaultMoneyUnit: {
    handler(newVal, oldVal) {
      this.initMoneyUnit(newVal)
    },
    immediate: true
  },
  formInitGloabalData: { // 废弃
    handler(newVal, oldVal) {
      this.initFormInitGloabalData()
    },
    deep: true,
    immediate: true
  }
}
