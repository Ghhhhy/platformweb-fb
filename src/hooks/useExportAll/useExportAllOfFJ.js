import { postDownloadXlsxInArrayBufferOfFJ } from '@/api/http'

// 递归遍历 vxeTableColumnsInfo
function cursionCollectColumn (treeArray) {
  if (!Array.isArray(treeArray)) return
  return treeArray.map(item => {
    if (Array.isArray(item.children)) {
      item.own.children = cursionCollectColumn(item.children)
    }
    return item.own
  })
}

// 递归遍历可视列 vxeTableColumnsInfo
function cursionVisibleCollectColumn (treeArray) {
  if (!Array.isArray(treeArray)) return
  return treeArray.filter(item => {
    item.children = cursionVisibleCollectColumn(item.children)
    return item.visible !== false
  })
}

/**
 * 导出全部
 * desc: 将钻取的数据明细通过后台导出个文件流回来供前端下载
 * @param {VueComponent} $tableInstance 表格BsTable的组件实例
 * @param {Function} beforeRequest  请求前的回调操作
 * @return Promise<any>
 */
export default async function useExportAllOfFJ ({ $tableInstance, beforeRequest }) {
  let tableColumns = $tableInstance.$refs.xGrid.getTableColumn().collectColumn

  // 去掉函数参数
  const deepCopyData = JSON.parse(JSON.stringify(tableColumns))

  // 初始化请求列参数
  tableColumns = cursionCollectColumn(cursionVisibleCollectColumn(deepCopyData))

  const defaultConfig = {
    fileName: '下载文件',
    requestParam: {
      headConfig: JSON.stringify(tableColumns),
      pageSize: 999999
    }
  }

  beforeRequest(defaultConfig)

  // 文件流保存
  await postDownloadXlsxInArrayBufferOfFJ(BSURL.dfr_zdzjledgerExportData, defaultConfig.requestParam, defaultConfig.fileName)
}
