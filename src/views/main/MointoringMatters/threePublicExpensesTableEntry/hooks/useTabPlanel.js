import { ref, unref } from '@vue/composition-api'
import { Message } from 'element-ui'
import { tabs } from '../model/data'
import { TabEnum, TableTabsEnum } from '../model/enum'
import { generateRows } from '../utils'
import { Export } from '@/components/Table/export/export/export.js'
import {
  addThreePublicTable,
  updateThreePublicTable,
  revokeThreePublicTable
} from '@/api/frame/main/fundMonitoring/threePublicExpensesTableEntry.js'
import { checkRscode } from '@/utils/checkRscode'

const exportInstance = new Export()

function useTabPlanel(
  // 获取表格实例方法
  tableRef,
  currentColumns, // 表格列
  tableData, // 表格数据
  importModalVisible, // 导入弹窗显隐状态
  requestPayload, // 请求载荷
  fetchTableData
) {
  // 搜索栏显隐
  const isShowSearchForm = ref(false)
  // 弹窗状态
  const addRowsModalVisible = ref(false)

  /**
   * 显示隐藏筛选表单
   * */
  const onQueryConditionsClick = (isOpen) => {
    isShowSearchForm.value = isOpen
  }

  /**
   * 保存
   */
  async function saveHandle() {
    await unref(tableRef)?.fullValidate()
    checkRscode(
      await addThreePublicTable({
        ...unref(requestPayload),
        datas: unref(tableData),
        dataSummary: requestPayload.value.reportType === 4 ? unref(tableData) : undefined
      })
    )
    fetchTableData()
    Message.success('保存成功！')
  }

  /**
   * 提交
   */
  async function submitHandle() {
    await unref(tableRef)?.fullValidate()
    checkRscode(
      await updateThreePublicTable({
        ...unref(requestPayload),
        datas: unref(tableData),
        dataSummary: requestPayload.value.reportType === 4 ? unref(tableData) : undefined
      })
    )
    Message.success('提交成功！')
  }

  /**
   * 导入
   */
  async function importHandle() {
    importModalVisible.value = true
  }

  /**
   * 导出
   */
  function exportHandle(successMsg) {
    try {
      exportInstance.exportExcel({
        isExportTree: true,
        saveType: '.xlsx',
        fileName: 'export', // 文件名
        dataType: 'fullData',
        isExportHead: true, // 是否导出表头
        isExportFooter: false, // 是否导出表尾部
        isExportOnlySourceField: false, // 是否只导出数据源表头字段，
        isExportOnlyViewTitle: false, // 是否只导出数据表头名称，
        isExportOriginalData: false, // 是否导出源数据
        isExportData: true, // 是否导出数据
        columns: unref(currentColumns), // 表头配置
        fullData: unref(tableData),
        datas: unref(tableData), // 源数据,
        index: false // 是否添加序号,
      }, {})
      Message.success(successMsg || '导出成功！')
    } catch (e) {
      Message.error('导出失败！')
    }
  }

  /**
   * 撤回
   */
  async function revocationHandle() {
    checkRscode(
      await revokeThreePublicTable(unref(requestPayload))
    )
    fetchTableData()
    Message.success('撤回成功！')
  }

  /**
   * 打印
   */
  function printHandle() {
    unref(tableRef)?.print({
      isColgroup: true
    })
  }

  /**
   * 新增行 => 打开弹窗
   */
  function addModalHandle() {
    addRowsModalVisible.value = true
  }

  /**
   * 添加行回调
   * @param count
   */
  function addRows(count) {
    addRowsModalVisible.value = false
    tableData.value.push(...generateRows(count * 1, currentColumns.value))
  }

  /**
   * 批量删除
   */
  async function deleteHandle() {
    const records = unref(tableRef)?.getCheckboxRecords(true)
    if (!records.length) {
      Message.warning('请勾选需要删除的数据')
      return
    }
    tableData.value = tableData.value.filter(row => {
      return !records.find(checkedRow => checkedRow._XID === row._XID)
    })
    unref(tableRef).removeCheckboxRow()
    Message.success('删除成功!')
  }

  const uncommittedButtons = [
    {
      label: '保存',
      status: 'primary',
      callback: saveHandle
    },
    {
      label: '提交',
      status: 'primary',
      callback: submitHandle
    },
    {
      label: '导入',
      callback: importHandle
    },
    {
      label: '批量新增行',
      callback: addModalHandle,
      isNeedHide: true
    },
    {
      label: '批量删除行',
      callback: deleteHandle,
      isNeedHide: true
    }
  ]

  const submittedButtons = [
    {
      label: '撤回',
      status: 'primary',
      callback: revocationHandle
    },
    {
      label: '导出',
      callback: () => exportHandle()
    },
    {
      label: '打印',
      callback: printHandle
    }
  ]

  /**
   * 右上角tab对应的操作按钮
   * */
  const tabStatusBtnConfig = ref({
    buttons: tabs,
    curButton: tabs[0],
    buttonsInfo: {
      [TabEnum.UNSUBMIT]: uncommittedButtons.filter(item => !item.isNeedHide),
      [TabEnum.SUBMIT]: submittedButtons
    }
  })

  // 当前选中的tab
  const currentTab = ref(tabs[0].code)

  /**
   * 顶部tab点击
   * */
  function onTabClick(tab) {
    currentTab.value = tab.code
  }

  /**
   * 更新buttonInfo
   * @param curVal 当前currentTableTab（报表）
   */
  function updateButtons(curVal) {
    const currentButtons = curVal === TableTabsEnum.MONITOR_BASIC_INFORMATION
      ? uncommittedButtons.filter(item => !item.isNeedHide)
      : uncommittedButtons

    // 由于tabStatusBtnConfig没有深度监听 => 这里需要改变引用地址触发watcher
    tabStatusBtnConfig.value = {
      ...unref(tabStatusBtnConfig),
      curButton: tabs.find(item => item.code === unref(currentTab)),
      buttonsInfo: {
        ...unref(tabStatusBtnConfig).buttonsInfo,
        [TabEnum.UNSUBMIT]: currentButtons
      }
    }
  }

  return {
    tabStatusBtnConfig,
    onQueryConditionsClick,
    isShowSearchForm,
    addRows,
    addRowsModalVisible,
    exportHandle,
    onTabClick,
    currentTab,
    updateButtons
  }
}

export default useTabPlanel
