<!--  工作流配置信息   Author:Titans@2396757591@qq.com -->
<template>
  <div class="detailPanel">
    <BsForm
      v-if="isRenderForm"
      ref="addForm"
      :form-gloabal-config="formGloabalConfig"
      :editable="true"
      :form-items-config="formItemsConfig"
      :form-data-list="formData"
      :form-validation-config="formValidationConfig"
      @itemChange="itemChange"
    />
  </div>
</template>
<script>
import nodesConfig from '../config/config.js'
export default {
  inject: ['i18n'],
  components: {

  },
  props: {
    height: {
      type: Number,
      default: 800
    },
    model: {
      type: Object,
      default: () => ({})
    },
    onChange: {
      type: Function,
      default: () => {}
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isRenderForm: true,
      formGloabalConfig: {
        titleColon: true,
        titleAlign: 'left',
        titleWidth: '100%'
      },
      formItemsConfig: [],
      formData: []
    }
  },
  methods: {
    itemChange({ $form, property, itemValue, data, renderOpts }, bsform) {
      if (renderOpts && renderOpts.name === '$vxeTree') {
      } else {
        this.onChange(property, itemValue)
      }
    },
    renderForm() {
      this.isRenderForm = false
      this.$nextTick(() => {
        this.isRenderForm = true
      })
    },
    init(model) { // 初始化
      const { wfdConfig, nodeConfig, edgeConfig } = nodesConfig.nodesConfigMap
      console.log(wfdConfig, nodeConfig, edgeConfig)
      let curModel = null
      if (model.clazz === 'process') {
        curModel = wfdConfig
      } else if (model.clazz === 'flow') {
        curModel = edgeConfig
      } else {
        curModel = nodeConfig
      }
      let modalCp = Object.assign({}, model)
      this.formItemsConfig = curModel.itemConfig
      this.formData = Object.assign({}, curModel.data, modalCp)
      this.renderForm()
    }
  },
  watch: {
    model: {
      handler(newval) {
        this.init(newval)
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss">
    .detailPanel {
        height: 100%;
        background: #f0f2f5;
        flex: 0 0 auto;
        float: left;
        width: 20%;
        border-right: 1px solid #E9E9E9;
        border-bottom: 1px solid #E9E9E9;
        .Titans-form{
          padding: 10px;
          height: 100%;
          box-sizing: border-box;
          overflow: auto;
        }
       .vxe-form {
          background: transparent;
         .vxe-form--item-inner {
          min-height: 36px;
          display: grid;
        }
       }
    }
</style>
