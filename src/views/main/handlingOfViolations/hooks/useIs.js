import { computed, unref } from '@vue/composition-api'
import { RouterPathEnum, WarnLevelEnum } from '../model/enum'
import store from '@/store'

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
    return unref(pagePath) === RouterPathEnum().DIVISION_REAUDIT
  })

  // 是否是单位反馈页面
  const isUnitFeedbackPage = computed(() => {
    return unref(pagePath).indexOf('nitFeedback') !== -1 || unref(pagePath) === RouterPathEnum().DIVISION_FEED_BACK
  })
  // 是否是单位页面（单位反馈、单位审核）
  const isUnitMenu = computed(() => {
    return !![RouterPathEnum().UNIT_FEEDBACK, RouterPathEnum().UNIT_AUDIT].includes(unref(pagePath))
  })

  // 是否蓝色预警
  const isBlueWarnLevel = computed(() => {
    return unref(currentNode)?.warnLevel === WarnLevelEnum.BLUE
  })

  // 是否允许禁止操作
  // 非单位送审、反馈 &&（如果是批量操作则判断当前勾选列表中是否存在橙色预警，否判断当前选中处理单是否是橙色预警）
  const isAllowDisabled = computed(() => {
    if (store.getters.isFuJian && isDivisionReAudit) { // 福建  处室复审界面 放开禁止按钮
      return true
    }
    if (unref(isUnitMenu)) {
      return false
    }
    // SH 需求 黄色预警、蓝色预警在处理时，去掉“禁止“按钮
    if (store.state.userInfo.province.startsWith('31')) {
      return unref(checkedItemsObj).length
        ? unref(checkedItemsObj).some(item => item.warnLevel !== WarnLevelEnum.YELLOW && item.warnLevel !== WarnLevelEnum.BLUE)
        : (unref(currentNode).warnLevel !== WarnLevelEnum.YELLOW && unref(currentNode).warnLevel !== WarnLevelEnum.BLUE)
    } else {
      // 根据监控处理方式来判断是否显示禁止按钮
      return unref(checkedItemsObj).length
        ? unref(checkedItemsObj).some(item => item.warnTips === '警示')
        : unref(currentNode).warnTips === '警示'
    }
  })

  // 是否是处室
  const isDivisionPage = computed(() => {
    return [RouterPathEnum.DIVISION_REAUDIT, RouterPathEnum.DIVISION_AUDIT].includes(unref(pagePath))
  })

  return {
    isDivisionReAudit,
    isUnitFeedbackPage,
    isBlueWarnLevel,
    isAllowDisabled,
    isDivisionPage
  }
}
