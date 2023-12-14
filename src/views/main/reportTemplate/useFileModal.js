import store from '@/store/index'
import { get, httpGlobalGatewayAgent } from '@/api/http'
import { ref, unref } from '@vue/composition-api'
import { checkRscode } from '@/utils/checkRscode'
import { Message } from 'element-ui'
import useExportAll from '@/hooks/useExportAll/useExportAll.js'
import Vue from 'vue'

// 初始化全部导出
const [serverExport, registerTable, requestLoading] = useExportAll({
  beforeRequest: (config, ctx) => {
    config.fileName = propsConfig.value.title
    config.params.pageSize = 999999
  }
})
/**
 * 深层取值（例如res.data.a.b）
 * @param data
 * @param defaultKey
 * @return {T|*}
 */
export function transformFetchData(data, defaultKey = 'records') {
  const keys = defaultKey?.split('.')
  if (!keys.length) {
    return data
  }
  return keys.reduce((res, key) => {
    return res[key]
  }, data)
}

// 默认传参
const propsConfig = ref({
  visible: false, // 弹窗显隐
  title: '弹窗标题', // 弹窗标题
  id: '', // 弹窗动态表单配置id
  tableFetchConfig: {
    tableDataUrl: '', // 请求表单数据url
    fetchMethod: 'post',
    succuessCode: '000000',
    succuessField: 'code',
    dataKey: 'data',
    otherParams: {}
  },
  // 点击行数据
  row: {},
  // 点击列配置数据
  column: {},
  showExportAll: true, // 是否显示全部导出按钮
  showDownloadAll: true, // 是否批量下载
  showSure: false, // 显示确定
  showCancel: true, // 显示取消
  rowClickDownLoad: true, // 是否单击当前行下载附件
  // 弹窗确定
  ok: () => {
    closeModal()
  },
  // 请求tableData前置钩子
  before: (params) => {},
  // talbeData请求后置钩子
  after: (tableData) => {},
  // 关闭弹窗回调
  closeModal: () => {}
})

// 弹窗静态布局
const modalStaticlayout = {
  props: {
    width: '96%',
    height: '90%',
    showFooter: true
  }
}

// 默认分页数据
const mainPagerConfig = ref({
  currentPage: 1,
  pageSize: 20
})
// 表格实例
const fileInfoTable = ref()

// 请求参数
const queryParams = ref([])

// table静态属性
const tableStaticProperty = {
  props: {
    ref: 'bsTableRef',
    class: 'Titans-table',
    border: true,
    resizable: true,
    showOverflow: true,
    align: 'left',
    toolbarConfig: {
      disabledMoneyConversion: false,
      moneyConversion: false, // 是否有金额转换
      search: false, // 是否有search
      import: false, // 导入
      export: true, // 导出
      print: false, // 打印
      zoom: false, // 缩放
      custom: true, // 选配展示列
      slots: {
        tools: 'toolbarTools',
        buttons: 'toolbarSlots'
      }
    },
    cellStyle: ({ row, rowIndex, column }) => {
      const validCellValue = (row[column.property] * 1)
      if (validCellValue && (propsConfig.value.rowClickDownLoad || column.own.clickDownload)) {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    }
  },
  on: {
    onToolbarBtnClick: ({ context, table, code }) => {
      switch (code) {
        case 'refresh':
          queryTableData()
          break
      }
    },
    register($instance) {
      fileInfoTable.value = $instance
      registerTable($instance)
    },
    ajaxData({ params, currentPage, pageSize }) {
      mainPagerConfig.value.currentPage = currentPage
      mainPagerConfig.value.pageSize = pageSize
      queryTableData()
    },
    cellClick({ row, rowIndex, column }, context, e) {
      const validCellValue = (row[column.property] * 1)
      if (validCellValue && (propsConfig.value.rowClickDownLoad || column.own.clickDownload)) {
        downloadAttachment([row])
      }
    }
  }
}

// loading效果
const tableLoading = ref(false)

// 挂载dom
let domNode = null

// 表格数据
const tableData = ref([])

// 表格列
const tableColumns = ref([])

// str转JSON
const strToJson = (str) => {
  let json = JSON.parse(str, function (k, v) {
    try {
      if (v.indexOf && (v.indexOf('function') > -1 || v.indexOf('=>') > -1)) {
        // eslint-disable-next-line
        let func = new Function('return ' + v)
        return func()
      }
      return v
    } catch (error) {
      return v
    }
  })
  return json
}

// 请求数据方法
const queryTableData = async () => {
  if (!propsConfig.value.tableFetchConfig?.tableDataUrl) {
    Message.error('未配置表格查询URL，请配置')
    return
  }
  let defaultParams = {
    page: mainPagerConfig.value.currentPage,
    pageSize: mainPagerConfig.value.pageSize,
    ...propsConfig.value.tableFetchConfig.otherParams
  }
  const beforeParams = propsConfig.value.before?.(defaultParams)
  const finallyParams = { ...defaultParams, ...beforeParams }
  tableLoading.value = true
  let unCheckResult = await Vue.prototype.$http[propsConfig.value.tableFetchConfig.fetchMethod](
    propsConfig.value.tableFetchConfig.tableDataUrl,
    finallyParams
  )
  tableLoading.value = false
  const code = unCheckResult[propsConfig.value.tableFetchConfig.succuessField]
  if (propsConfig.value.tableFetchConfig.succuessCode !== code) {
    Message.error('接口请求校验不通过')
    return
  }
  let beforeTableData = transformFetchData(unCheckResult, propsConfig.value.tableFetchConfig.dataKey)
  tableData.value = propsConfig.value.after?.(beforeTableData) ?? beforeTableData
}

// 获取附件列表的表格数据
/* eslint-disable-next-line */
const getFileInfoList = (mofDivCode) => {
  const idList = queryParams.value
  if (!Array.isArray(idList)) return
  // 组装每个promiseQueue
  let queueTask = idList.map(item => {
    let params = {
      year: store.state.userInfo.year,
      province: mofDivCode || store.state.userInfo.province,
      billguid: item
    }
    return get(BSURL.api_fileservice_v2_files, params)
  })

  // promise队列调用开始
  tableLoading.value = true
  Promise.all(queueTask).then(res => {
    tableLoading.value = false
    let queueFileList = []
    if (res && res.length) {
      res.forEach(result => {
        let fileObj = JSON.parse(result.data)
        Array.isArray(fileObj) && fileObj.length > 0 && (queueFileList = queueFileList.concat(fileObj))
      })
      queueFileList.forEach(element => {
        let size = element.filesize / 1024
        element.filesize = size.toFixed(2) + 'KB'
      })
    }
    const returnResult = propsConfig.value.after?.(queueFileList)
    console.log('queueFileList', queueFileList)
    returnResult ? tableData.value = returnResult : tableData.value = queueFileList
  }).catch(() => {
    tableLoading.value = false
  })
}

// 关闭弹窗
const closeModal = (config, app) => {
  config?.closeModal?.()
  propsConfig.value.visible = false
  app.$destroy()
  domNode = null
}

// 下载附件
const downloadAttachment = (selection) => {
  if (!Array.isArray(selection) || selection.length !== 1) {
    Message.error('请选择一条数据！')
    return
  }
  const params = {
    appid: store.state.curNavModule.appid,
    fileguid: selection[0].fileguid
  }
  get(BSURL.api_fileservice_v2_find_fileExists, params).then(res => {
    if (res.rscode === '100000') {
      const urlObj = httpGlobalGatewayAgent('fileservice/v2/stream/download')
      const downLoadUrl = `${urlObj.baseURL}/${urlObj.url}?appid=${params.appid}&fileguid=${params.fileguid}`
      let link = document.createElement('a')
      link.href = downLoadUrl
      link.click()
      link = null
    } else {
      Message({ showClose: true, message: '文件不存在!', type: 'error' })
    }
  }).catch(err => {
    console.log(err)
  })
}

// 动态表单请求参数
const dynamicConfigQuery = (id) => {
  return {
    id,
    menuguid: store.state.curNavModule.guid,
    mof_div_code: store.state.userInfo.province, // 区划
    fiscalyear: store.state.userInfo.year // 年份
  }
}

// 请求动态表单列数据
const queryTableColumnsConfig = async (config) => {
  const { data } = checkRscode(await get(BSURL.api_tableconf, dynamicConfigQuery(config.id)))
  const result = strToJson(data?.configure || '{}')
  propsConfig.value.visible = true
  return result
}

// 实例挂载
const mount = () => {
  domNode = document.createElement('div')
  domNode.style.width = 'auto'
  document.body.appendChild(domNode)
  const miniVue = new Vue({
    store,
    render(h) {
      return <vxeModal
        {...modalStaticlayout}
        title={propsConfig.value.title}
        value={propsConfig.value.visible}
        onClose={() => { closeModal(propsConfig.value, miniVue) }}
      >
        <BsTable
          {...tableStaticProperty}
          tableColumnsConfig={tableColumns.value}
          tableData={tableData.value}
        >
          <template slot="toolbarSlots">
            {propsConfig.value.showDownloadAll && <vxe-button type="primary" size="small" onClick={() => { downloadAttachment(fileInfoTable.value.getCheckboxRecords()) }}>批量下载</vxe-button>}
            {propsConfig.value.showExportAll && <vxe-button type="primary" size="small" v-loading={requestLoading.value} loading={requestLoading.value} onClick={() => { serverExport() }}>全部导出</vxe-button>}
          </template>
        </BsTable>
        <div slot='footer' style="margin:0 15px">
          {propsConfig.value.showSure && <el-button size="small" type="primary" onClick={() => { propsConfig.value.ok?.() }} v-deClick={false}>确定</el-button>}
          {propsConfig.value.showCancel && <el-button size="small" onClose={() => { closeModal(propsConfig.value, miniVue) }}>取消</el-button>}
        </div>
      </vxeModal>
    }
  })
  miniVue.$mount(domNode)
}
export default async function $showFileModal(config) {
  propsConfig.value = {
    ...propsConfig.value,
    ...config
  }
  let { itemsConfig } = await queryTableColumnsConfig(unref(propsConfig))
  queryParams.value = config?.row?.billguidList
  await queryTableData()
  tableColumns.value = itemsConfig
  mount()
}
