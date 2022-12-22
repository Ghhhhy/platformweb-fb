import { computed, unref } from '@vue/composition-api'
import { RouterPathEnum, WarnLevelEnum } from '../model/enum'

/**
 * 判断相关hook
 * @param pagePath
 * @param currentNode
 * @return {{isDivisionReAudit: ComputedRef<boolean>, isBlueWarnLevel: ComputedRef<boolean>, isUnitFeedbackPage: ComputedRef<boolean>}}
 */
export default function useIs(currentNode, pagePath) {
  // 是否是处室复审页面（终审）
  const isDivisionReAudit = computed(() => {
    return unref(pagePath) === RouterPathEnum.DIVISION_REAUDIT
  })

  // 是否是单位反馈页面
  const isUnitFeedbackPage = computed(() => {
    return unref(pagePath) === RouterPathEnum.UNIT_FEEDBACK
  })

  // 是否蓝色预警
  const isBlueWarnLevel = computed(() => {
    return unref(currentNode)?.warnLevel === WarnLevelEnum.BLUE
  })

  return {
    isDivisionReAudit,
    isUnitFeedbackPage,
    isBlueWarnLevel
  }
}
