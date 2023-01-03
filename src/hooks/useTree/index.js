import { getCurrentInstance, nextTick, ref, unref } from '@vue/composition-api'
import { checkRscode } from '@/utils/checkRscode'
function useTree(
  config = {
    refKey: 'treeRef',
    treeProps: {},
    fetch: null, // 请求方法
    beforeFetch: null, // 前置钩子
    afterFetch: null, // 后置钩子
    finallyFetch: null // 赋值完成的钩子
  },
  immediate = true // 是否立即请求数据
) {
  const { proxy } = getCurrentInstance()
  // 通过register注册组件方式获取底层组件ref实例
  const treeRef = ref(null)

  // 直接使用底层组件标识ref实例（通过proxy获取）
  const refKey = config?.refKey || 'treeRef'

  // tree配置
  const treeProps = ref({
    labelFormat: '{name}-{code}', // {code}-{name}
    nodeKey: 'id', // 树的主键
    label: 'text', // 树的显示lalel字段
    children: 'children', // 树的嵌套字段
    ...(config?.treeProps || {})
  })

  // tree数据源
  const treeData = ref([])

  // 加载状态
  const treeLoading = ref(false)

  // tree过滤文本
  const treeFilterText = ref('')

  /**
   * 注册
   * @param instance
   */
  function register(instance) {
    if (unref(treeRef) === instance) return
    treeRef.value = instance
  }

  /**
   * 获取表格ref实例（可利用实例调用table的方法）
   * @returns {Promise<unknown>}
   */
  async function getTree() {
    const tree = unref(treeRef) || proxy?.$refs?.[refKey]
    if (!tree) {
      throw new Error(
        'The form instance has not been obtained, please make sure that the table has been rendered when performing the table operation!'
      )
    }
    await nextTick()
    return tree
  }

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
      let { data } = checkRscode(await requestHandle(params))

      // 后置钩子（提供返回数据处理）
      if (config.afterFetch && typeof config.afterFetch === 'function') {
        data = config.afterFetch(data) || data
      }

      treeData.value = data
      // 后置钩子（提供返回数据处理）
      if (config.finallyFetch && typeof config.finallyFetch === 'function') {
        setTimeout(() => {
          config.finallyFetch(data)
        })
      }
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
    fetchTreeData,
    treeLoading,
    register,
    getTree
  }
}

export default useTree
