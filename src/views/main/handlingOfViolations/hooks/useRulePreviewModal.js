import { ref, unref } from '@vue/composition-api'
import { checkRscode } from '@/utils/checkRscode'
import RuleHttpModule from '@/api/frame/main/Monitoring/levelRules.js'
import { useModal } from '@/hooks/useModal/index'

export default function useRulePreviewModal(currentNode) {
  // 规则详情信息（子组件内部调用了$parent获取数据）
  const DetailData = ref(null)

  /**
   * 请求规则详情
   * @param val
   * @return {Promise<void>}
   */
  async function getRuleDetail(val) {
    const { data } = checkRscode(await RuleHttpModule.getDetailData(val))
    DetailData.value = data
    dialogVisible.value = true
  }
  // 弹窗标题（子组件内部调用了$parent获取数据）
  const dialogTitle = ref('查看详情')
  // 规则查看弹窗显隐（子组件内部调用了$parent获取数据 => 关闭弹窗）
  const [dialogVisible] = useModal()
  /**
   * 规则查看弹窗切换状态
   * */
  async function changeDialogVisible(visible) {
    await getRuleDetail(unref(currentNode)?.ruleCode)
    dialogVisible.value = visible
  }

  return {
    dialogTitle,
    dialogVisible,
    changeDialogVisible,
    DetailData
  }
}
