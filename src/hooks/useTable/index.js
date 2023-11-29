import { reactive, ref, unref, nextTick } from '@vue/composition-api'
import {
  getActionLabel,
  getClass,
  fliterActions,
  transformFetchData
} from './utils'
import { checkRscode } from '@/utils/checkRscode'

function useTable(
  config,
  immediate = true // 是否立即请求数据
) {
  // 配置信息
  const configIn = {
    columns: config?.columns || [], // 表格列配置
    columnActions: config?.columnActions || [], // 操作列
    fetch: config?.fetch, // 请求数据方法
    beforeFetch: config?.beforeFetch, // 前置钩子
    afterFetch: config?.afterFetch, // 后置钩子
    finallyFetch: config?.finallyFetch, // 赋值完成的钩子
    getSubmitFormData: config?.getSubmitFormData, // 获取搜索栏form表单值
    tableToolbarConfig: config?.tableToolbarConfig,
    openPager:
      typeof config?.openPager !== 'undefined' ? config?.openPager : true, // 是否开启分页
    dataKey:
      typeof config?.dataKey !== 'undefined' ? config?.dataKey : 'data.records', // 深层取值字段
    isUnitFeedbackMenu: config.routeConfig?.isUnitFeedbackMenu
  }
  // 表格所有列
  const columns = ref(configIn?.columns || [])

  // 表格操作列配置
  const columnActions = configIn?.columnActions

  // 操作列渲染器名称
  let columnActionRenderSymbol = ''
  // 工具栏配置
  const tableToolbarConfig = reactive({
    disabledMoneyConversion: true,
    moneyConversion: false, // 是否有金额转换
    search: false, // 是否有search
    import: false, // 导入
    export: true, // 导出
    print: false, // 打印
    zoom: true, // 缩放
    calculator: false, // 计算
    custom: true, // 选配展示列
    slots: {
      tools: 'toolbarTools',
      buttons: 'toolbarSlots'
    },
    exportCustom: false, // 自定义导出
    ...configIn.tableToolbarConfig
  })

  // 分页设置
  const pagerConfig = reactive({
    total: 0,
    pageSize: 20,
    currentPage: 1
  })

  // loading状态
  const tableLoadingState = ref(false)

  // 表格ref实例
  const tableRef = ref(null)

  // 表格数据源
  const tableData = ref([])

  /**
   * 渲染操作列按钮
   * @type {{renderDefault(*, *, *=, *): *[]}}
   */
  const columnActionRender = {
    renderDefault(h, cellRender, params, context) {
      const actions = fliterActions(columnActions, params)

      return actions?.map((item) => {
        const handle = item.handle
        const classList = getClass(item, params)
        const label = getActionLabel(item, params)
        const tips = item?.tips || label

        // const render = item.render || {}
        // const renderType = render?.tagType || 'text'

        return (
          <el-tooltip content={tips} placement="top" effect="light">
            <a
              class={classList.join(' ') + ' gloable-option-row fn-inline'}
              onClick={() => handle(params)}
            >
              {label}
            </a>
          </el-tooltip>
        )
      })
    }
  }

  /**
   * 更新操作列
   */
  function updateActions() {
    const actionItem = unref(columns)?.find((item) => {
      return (
        item.field === 'columnAction' &&
        item.title === '操作' &&
        !item.slots?.default
      )
    })
    if (actionItem) {
      const renderName = `$column-action}-${new Date().getTime()}`
      columnActionRenderSymbol = renderName
      actionItem.cellRender = {
        ...(actionItem.cellRender || {}),
        name: renderName
      }
    }
  }
  updateActions()

  /**
   * 表格配置
   * */
  const tableConfig = reactive({
    renderers: columnActionRenderSymbol
      ? { [columnActionRenderSymbol]: columnActionRender }
      : {}
  })

  // 动态fetch方法
  let customFetch = null
  /**
   * 获取请求方法
   */
  function getFetchMethod() {
    return customFetch || configIn?.fetch
  }
  /**
   * 设置请求方法
   * @description 救生舱：用于动态修改fetch方法
   */
  function setFetchMethod(func) {
    customFetch = func
  }
  /**
   * @type {(ctx:dfr.contexts):void}
   */
  /**
   * 表格数据请求
   * @returns {Promise<void>}
   */
  async function fetchTableData() {
    tableLoadingState.value = true
    try {
      const requestHandle = getFetchMethod()
      if (!requestHandle) return
      if (requestHandle && typeof requestHandle !== 'function') {
        throw new Error('fetch must a function')
      }

      let params = {
        ...(configIn?.getSubmitFormData?.() || {})
      }

      // 是否开启分页
      if (configIn.openPager) {
        params.page = pagerConfig.currentPage
        params.pageSize = pagerConfig.pageSize
      }

      // 前置钩子（提供请求前的参数处理）
      if (configIn.beforeFetch && typeof configIn.beforeFetch === 'function') {
        params = await configIn.beforeFetch(params)
      }

      // 真实请求
      let res = checkRscode(await requestHandle(params))
      let { data } = res
      // 后置钩子（提供返回数据处理）
      if (configIn.afterFetch && typeof configIn.afterFetch === 'function') {
        data = configIn.afterFetch(data)
      }

      pagerConfig.total = data?.totalCount || data?.total || 0
      tableData.value = transformFetchData(res, configIn.dataKey) || []

      // 后置钩子（提供返回数据处理）
      if (
        configIn.finallyFetch &&
        typeof configIn.finallyFetch === 'function'
      ) {
        setTimeout(() => {
          configIn.finallyFetch(data)
        })
      }
    } finally {
      tableLoadingState.value = false
    }
  }
  // 是否需要立即请求
  if (immediate !== false) {
    fetchTableData()
  }

  /**
   * 重置
   * @description 用于重置到第一页开始请求
   */
  function resetFetchTableData() {
    pagerConfig.currentPage = 1
    fetchTableData()
  }

  /**
   * table组件内部emit的事件（主要用于页码、每页条数改变）
   */
  function pagerChange({ currentPage, pageSize }) {
    pagerConfig.currentPage = currentPage
    pagerConfig.pageSize = pageSize
    fetchTableData()
  }

  /**
   * 注册
   * @param instance
   */
  function register(instance) {
    if (unref(tableRef) === instance) return
    tableRef.value = instance
  }

  /**
   * 获取表格ref实例（可利用实例调用table的方法）
   * @returns {Promise<unknown>}
   */
  async function getTable() {
    const table = unref(tableRef)
    if (!table) {
      throw new Error(
        'The form instance has not been obtained, please make sure that the table has been rendered when performing the table operation!'
      )
    }
    await nextTick()
    return table
  }

  function onToolbarBtnClick({ code, context, table }) {
    code === 'refresh' && fetchTableData()
  }

  async function refreshColumn() {
    const instance = await getTable()
    instance && instance.refreshColumn?.()
  }

  return [
    {
      columns,
      tableConfig,
      tableLoadingState,
      tableData,
      tableRef,
      getTable,
      fetchTableData,
      resetFetchTableData,
      refreshColumn,
      setFetchMethod,

      pagerConfig,
      tableToolbarConfig,
      onToolbarBtnClick,
      pagerChange
    },
    register
  ]
}

export default useTable
