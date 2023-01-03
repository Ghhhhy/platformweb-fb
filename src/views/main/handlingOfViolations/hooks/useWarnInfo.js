import { computed, provide, ref, unref } from '@vue/composition-api'
import { clone } from 'xe-utils'
import { checkRscode } from '@/utils/checkRscode'
import { getDetail } from '@/api/frame/main/handlingOfViolations/index.js'

/**
 * 预警信息相关
 * @param props
 * @return {{cloneRecords: *, currentWarnDetail: Ref<UnwrapRef<{processResultList: *[], ruleResVO: {}}>>, nodeClick: nodeClick, checkedItemsObj: ComputedRef<*[]>, getDetailHandle: ((function(*=): Promise<void>)|*), currentNode: *, handleCheckedItemsKeyChange: handleCheckedItemsKeyChange, checkedItemsKey: Ref<UnwrapRef<*[]>>, checkedAll: Ref<UnwrapRef<boolean>>, isIndeterminate: Ref<UnwrapRef<boolean>>, handleCheckAllChange: handleCheckAllChange}}
 */
export default function useWarnInfo(props) {
  // 深拷贝一份数据方便自身组件改变数据
  const cloneRecords = ref(clone(props.checkedRecords, true))

  // 当前选中节点
  const currentNode = ref({ ...unref(cloneRecords)[0] })
  console.log(unref(currentNode))
  provide('currentNode', currentNode)

  // 当前左侧选择的单据列表
  const checkedItemsKey = ref([])

  // 当前左侧勾选的单据key列表所所对应的单据对象列表
  const checkedItemsObj = computed(() => {
    return checkedItemsKey.value.map(warningCode => {
      return cloneRecords.value.find(item => item.warningCode === warningCode)
    })
  })

  // 全选checkbox选中状态
  const checkedAll = ref(false)

  // 全选按钮-样式控制
  const isIndeterminate = ref(false)

  /**
   * 单据全选/反选
   * */
  function handleCheckAllChange(val) {
    checkedItemsKey.value = val ? unref(cloneRecords).map(item => item.warningCode) : []
    isIndeterminate.value = false
  }

  /**
   * 选择单个item
   * */
  function handleCheckedItemsKeyChange(checkList) {
    const checkedCount = checkList.length
    checkedAll.value = checkedCount === unref(cloneRecords)?.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < unref(cloneRecords)?.length
  }

  /**
   * 指标数节点点击
   */
  function nodeClick(item, event) {
    if (event.target?.dataset?.valid) {
      currentNode.value = item
      getDetailHandle(item.warningCode)
    }
  }

  // 当前接口请求的预警单信息
  const currentWarnDetail = ref({
    processResultList: [],
    ruleResVO: {}
  })
  /**
   * 查询处理单详情
   * */
  async function getDetailHandle(warningCode) {
    const { data } = checkRscode(await getDetail(warningCode))
    currentWarnDetail.value = data
  }

  return {
    cloneRecords,
    currentNode,
    checkedItemsKey,
    checkedItemsObj,
    checkedAll,
    isIndeterminate,
    handleCheckAllChange,
    handleCheckedItemsKeyChange,
    nodeClick,

    currentWarnDetail,
    getDetailHandle
  }
}
