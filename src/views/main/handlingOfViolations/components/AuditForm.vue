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
import { defineComponent, inject, unref, computed, watch } from '@vue/composition-api'
import useForm from '@/hooks/useForm'
import { getAuditFormSchemas } from '../model/data'
import { CheckStatusEnum, RouterPathEnum, WarnLevelEnum } from '../model/enum'

export default defineComponent({
  setup() {
    // 页面路由
    const pagePath = inject('pagePath')

    // 是否是单位反馈页面
    const isUnitFeedbackPage = computed(() => {
      return unref(pagePath) === RouterPathEnum.UNIT_FEEDBACK
    })

    // 是否是处室复审页面（终审）
    const isDivisionReAudit = computed(() => {
      return unref(pagePath) === RouterPathEnum.DIVISION_REAUDIT
    })

    // 当前选中的处理单节点
    const currentNode = inject('currentNode')

    // 是否是橙色预警
    const isOrangeWarnLevel = computed(() => {
      return unref(currentNode).warnLevel === WarnLevelEnum.ORANGE
    })

    const [
      {
        formRef,
        formData,
        rules,
        formSchemas,
        validate,
        updateFormSchemas,
        getFormSchemas
      }
    ] = useForm(
      getAuditFormSchemas(unref(isUnitFeedbackPage)),
      'formRef'
    )

    /**
     * 监听当前节点预警级别类型
     */
    watch(
      isOrangeWarnLevel,
      (curVal, preVal) => {
        // 仅处室复审，且当前预警级别为橙色预警 => 认定状态才能有禁止
        if (
          unref(isUnitFeedbackPage) ||
          (unref(isDivisionReAudit) && unref(isOrangeWarnLevel))
        ) return

        // 认定状态formField
        const field = 'checkStatus'

        // (当前不是橙色预警 && 上次填写的认定状态是橙色预警 && 上次已经选择的认定状态为橙色预警) => 需要清除认定状态值
        // 因为此时下拉框没有[禁止]option
        if (!curVal && preVal && formData[field] === WarnLevelEnum.ORANGE) {
          formData[field] = ''
        }

        // 更新认定状态下拉框options
        const options = getFormSchemas()
          ?.find(item => item.field === field)?.itemRender?.options
          ?.filter(item => item.value !== CheckStatusEnum.DISABLED)
        options && updateFormSchemas({
          field: 'checkStatus',
          itemRender: {
            options
          }
        })
      },
      {
        immediate: true
      }
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
