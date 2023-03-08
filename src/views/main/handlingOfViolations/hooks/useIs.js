import { computed, unref } from '@vue/composition-api'
import { RouterPathEnum, WarnLevelEnum } from '../model/enum'

/**
 * 判断相关hook
 * @param pagePath 页面路由
 * @param currentNode 当前选中节点
 * @param checkedItemsObj 当前勾选列表
 * @return {{isDivisionReAudit: ComputedRef<boolean>, isBlueWarnLevel: ComputedRef<boolean>, isUnitFeedbackPage: ComputedRef<boolean>}}
 */
export default function useIs(currentNode, pagePath, checkedItemsObj) {
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

  // 是否允许禁止操作
  // 终审 &&（如果是批量操作则判断当前勾选列表中是否存在橙色预警，否判断当前选中处理单是否是橙色预警）
  const isAllowDisabled = computed(() => {
    const hasOrangeLevel = unref(checkedItemsObj).length
      ? unref(checkedItemsObj).some(item => item.warnLevel === WarnLevelEnum.ORANGE)
      : unref(currentNode).warnLevel === WarnLevelEnum.ORANGE
    return unref(isDivisionReAudit) && hasOrangeLevel
  })

  return {
    isDivisionReAudit,
    isUnitFeedbackPage,
    isBlueWarnLevel,
    isAllowDisabled
  }
}
