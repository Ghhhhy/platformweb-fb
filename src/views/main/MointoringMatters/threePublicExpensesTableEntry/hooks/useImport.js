import { reactive, ref, unref } from '@vue/composition-api'
import { generateImportTableData } from '../utils'
import { Message } from 'element-ui'
import { Import } from '@/components/Table/import/import/import.js'

const importInstance = new Import()

export default function useImport(currentColumns, tableData) {
  // 导入文件弹窗
  const importModalVisible = ref(false)

  // 文件配置
  const fileConfig = reactive({
    fileName: ''
  })

  // 临时数据
  let tempFileData = []

  /**
   * 导入
   */
  async function onImportFileClick() {
    try {
      importInstance.importExcel({}, (result, filename) => {
        tempFileData = result
        fileConfig.fileName = filename
        Message.success('选择文件成功！')
      })
    } catch (e) {
      Message.error('选择文件失败！')
    }
  }

  /**
   * 确定导入
   */
  function onImportClick() {
    try {
      const rows = generateImportTableData(tempFileData, unref(currentColumns))
      if (!rows.length) {
        Message.warning('导入文件内容为空，请编辑后重新导入！')
        return
      }
      tableData.value = rows
      Message.success('导入成功！')
      importModalVisible.value = false
    } catch (e) {
      Message.error('导入失败！')
    }
  }

  return {
    fileConfig,
    importModalVisible,
    onImportClick,
    onImportFileClick
  }
}
