<template>
  <div style="margin-top: 16px">
    <bs-table-title
      :title="isUnitFeedbackPage ? '处理说明' : '处理意见'"
      style="margin-bottom: 3px"
    />
    <vxe-form
      ref="formRef"
      :items="formSchemas"
      :data="formData"
      :rules="rules"
      title-align="right"
      :title-width="100"
    />
  </div>
</template>

<script>
import { defineComponent, inject, unref, computed } from '@vue/composition-api'
import useForm from '@/hooks/useForm'
import { getAuditFormSchemas } from '../model/data'
import { RouterPathEnum } from '../model/enum'

export default defineComponent({
  setup() {
    // 页面路由
    const pagePath = inject('pagePath')

    // 是否是单位反馈页面
    const isUnitFeedbackPage = computed(() => {
      return unref(pagePath) === RouterPathEnum.UNIT_FEEDBACK
    })
    const [
      {
        formRef,
        formData,
        rules,
        formSchemas,
        validate
      }
    ] = useForm(
      getAuditFormSchemas(unref(isUnitFeedbackPage)),
      'formRef'
    )

    return {
      formRef,
      formData,
      rules,
      formSchemas,
      validate,
      isUnitFeedbackPage
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
