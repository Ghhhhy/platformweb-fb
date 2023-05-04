import { ref, unref } from '@vue/composition-api'
import { checkRscode } from '@/utils/checkRscode'
import useLoadingState from '@/hooks/useLoadingState'
import { getMulitDetail } from '@/api/frame/main/handlingOfViolations/index.js'

/**
 * 打印相关hook
 * @param checkedItemsKey
 * @param currentWarnDetail
 * @return {{openPrintCallback: openPrintCallback, printLoading: *, printHandle: ((function(): Promise<void>)|*), printData: Ref<UnwrapRef<*[]>>, printHtmlNodeRef: null}}
 */
export default function usePrint(checkedItemsKey, currentWarnDetail, cloneRecords) {
  // 需要打印的数据
  const printData = ref([])
  // 打印组件ref
  const printHtmlNodeRef = ref(null)
  const [printLoading, setPrintLoading] = useLoadingState()
  /**
   * 打印
   */
  async function printHandle() {
    setPrintLoading(true)
    try {
      if (!unref(checkedItemsKey).length) {
        printData.value = [unref(currentWarnDetail)]
      } else {
        const params = unref(cloneRecords)
          .filter(item => unref(checkedItemsKey)?.includes(item.warningCode))
          .map(item => {
            return { warningCode: item.warningCode, id: item.id }
          })
        const { data } = checkRscode(await getMulitDetail(params))
        printData.value = data
      }
      setTimeout(
        () => {
          printHtmlNodeRef.value?.printTrigger?.()
        },
        Math.min(unref(printData)?.length * 300, 2000)
      )
    } catch (e) {
      console.log(e)
      setPrintLoading(false)
    }
  }
  /**
   * 打印调用open回调
   * */
  function openPrintCallback() {
    setPrintLoading(false)
  }

  return {
    printLoading,
    printHtmlNodeRef,
    printData,
    printHandle,
    openPrintCallback
  }
}
