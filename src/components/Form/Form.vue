<!--  form表单   Author:Titans@2396757591@qq.com -->
<template>
  <div class="Titans-form" :class="editable ? 'editable' : 'not-editable'">
    <vxe-form
      v-if="ifRenderForm"
      ref="form"
      sync-resize
      :data="formDataListIn"
      :items="formItemsConfigIn"
      :rules="formValidationConfigIn"
      :span="formGloabalConfigIn.span"
      :align="formGloabalConfigIn.align"
      :size="formGloabalConfigIn.size"
      :title-align="formGloabalConfigIn.titleAlign"
      :title-width="formGloabalConfigIn.titleWidth"
      :title-colon="formGloabalConfigIn.titleColon"
      :prevent-submit="formGloabalConfigIn.preventSubmit"
      :loading="formGloabalConfigIn.loading"
      @submit-invalid="submitInvalid"
      @submit="onFormSubmit"
      @reset="reset"
      @toggle-collapse="toggleCollapse"
    >
      <slot></slot>
    </vxe-form>
  <!-- <vxe-form-item
      v-for="(item,index) in formDataConfigIn"
      :key="index"
      :span="item.span"
      :title="item.title"
      :field="item.field"
      :align="item.align"
      :item="item"
      :item-render="item.itemRender"
    /> -->
  </div>
</template>

<script>
import data from './util/data.js'
import methods from './util/methods.js'
import props from './util/props.js'
import watch from './util/watch.js'
import mixin from './config/mixin.js'
export default {
  name: '',
  components: {},
  mixin: [mixin],
  props: {
    ...props
  },
  data,
  methods: {
    ...methods
  },
  created() {
    this.initCreated()
  },
  mounted() {
    this.initMounted()
  },
  watch: {
    ...watch
  }
}
</script>
<style lang="scss">
 .Titans-form {
    .vxe-form--item{
      .vxe-input--inner[disabled]{
        color: #333;
        background: #f7fafd;
        cursor: not-allowed;
      }
      .vxe-form--item-content{
        .text{
          display:block;
          text-align:center;
        }
        .border-text{
          display:block;
          min-height: 30px;
          line-height: 30px;
          background: #f7fafd;
          border-radius: 4px;
          outline: 0;
          padding: 0 .6em;
          border: 1px solid #dcdfe6;
        }
      }
    }
  }
</style>
