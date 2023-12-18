import { postDownloadXlsxInArrayBuffer } from '@/api/http'
import { onMounted, ref, unref, getCurrentInstance } from '@vue/composition-api'
export default function useExportAll (propParams) {
  const context = getCurrentInstance()?.proxy
  const defaultConfig = {
    ref: 'bsTableRef', // 请确保唯一
    fileName: '下载文件',
    beforeRequest: (params = defaultConfig, ctx = context) => {}, // 请求前置钩子
    params: { // 后端约定参数
      headConfig: [] // 表头列
    },
    ...propParams
  }
  const hasRegister = ref(false)

  const $instance = ref(defaultConfig.ref)

  const tableColumns = ref([])

  const requestLoading = ref(false)

  // 递归遍历 vxeTableColumnsInfo
  const cursionCollectColumn = (treeArray) => {
    if (!Array.isArray(treeArray)) return
    return treeArray.map(item => {
      if (Array.isArray(item.children)) {
        item.own.children = cursionCollectColumn(item.children)
      }
      return item.own
    })
  }

  // 递归遍历可视列 vxeTableColumnsInfo
  const cursionVisibleCollectColumn = (treeArray) => {
    if (!Array.isArray(treeArray)) return
    return treeArray.filter(item => {
      item.children = cursionVisibleCollectColumn(item.children)
      return item.visible !== false
    })
  }

  /* 手动注册实例 */
  function register(instance) {
    if (unref($instance) === instance || hasRegister.value) return
    $instance.value = instance
    hasRegister.value = true
  }

  const autoRegister = () => {
    tableColumns.value = $instance.value.getTableColumn().collectColumn
  }

  async function serverExport() {
    // 去掉函数参数
    let deepCopyData = JSON.parse(JSON.stringify($instance.value?.getTableColumn().collectColumn))

    // 初始化请求列参数
    tableColumns.value = cursionCollectColumn(cursionVisibleCollectColumn(deepCopyData))

    defaultConfig.params.headConfig = JSON.stringify(tableColumns.value)

    // 请求前置钩子调用
    let customerRequesetParams = await defaultConfig.beforeRequest?.(defaultConfig, context)

    // 如果有返回值 则重新赋值 但是返回值记得是新的引用 否则可能会有JSON的循环引用错误
    if (customerRequesetParams) defaultConfig.params = customerRequesetParams

    requestLoading.value = true
    // 文件流保存
    await postDownloadXlsxInArrayBuffer(BSURL.dfr_zdzjledgerExportData, defaultConfig.params, defaultConfig.fileName)
    // to do something
    requestLoading.value = false
  }

  onMounted(() => {
    if ($instance.value || hasRegister.value) return
    autoRegister()
  })
  return [
    serverExport,
    register,
    requestLoading
  ]
}
