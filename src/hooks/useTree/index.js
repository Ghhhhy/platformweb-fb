import { ref } from '@vue/composition-api'
function useTree(
  config = {
    fetch: null, // 请求方法
    beforeFetch: null, // 前置钩子
    afterFetch: null // 后置钩子
  },
  immediate = true // 是否立即请求数据
) {
  // tree配置
  const treeProps = ref({
    labelFormat: '{code}{name}',
    nodeKey: 'id', // 树的主键
    label: 'text', // 树的显示lalel字段
    children: 'children' // 树的嵌套字段
  })

  // tree数据源
  const treeData = ref([])

  // 加载状态
  const treeLoading = ref(false)

  // tree过滤文本
  const treeFilterText = ref('')

  async function fetchTreeData() {
    treeLoading.value = true
    try {
      const requestHandle = config?.fetch
      if (!requestHandle) return
      if (requestHandle && typeof requestHandle !== 'function') {
        throw new Error('fetch must a function')
      }

      let params = {}

      // 前置钩子（提供请求前的参数处理）
      if (config.beforeFetch && typeof config.beforeFetch === 'function') {
        params = config.beforeFetch(params)
      }

      // 真实请求
      let { data } = await requestHandle(params)

      // 后置钩子（提供返回数据处理）
      if (config.afterFetch && typeof config.afterFetch === 'function') {
        data = config.afterFetch(data)
      }

      treeData.value = data
    } finally {
      treeLoading.value = false
    }
  }
  // 是否需要立即请求
  if (immediate !== false) {
    fetchTreeData()
  }

  return {
    treeProps,
    treeData,
    treeFilterText,
    fetchTreeData
  }
}

export default useTree
