import { ref } from '@vue/composition-api'
import { Message } from 'element-ui'
import { TabEnum } from '../model/enum'

function useTabPlanel(
  filePreviewVisibleState, // 弹窗状态
  getTable, // 获取表格实例方法
  currentRow
) {
  // 搜索栏显隐
  const isShowSearchForm = ref(true)

  /**
   * 显示隐藏筛选表单
   * */
  const onQueryConditionsClick = (isOpen) => {
    isShowSearchForm.value = isOpen
  }

  /**
   * 附件查看
   */
  async function previewHandle() {
    Message.warning('此功能待开发~')
    // const tableInstance = await getTable()
    // const checkedRows = tableInstance.getCheckboxRecords?.(true)
    // if (checkedRows.length !== 1) {
    //   Message.warning('请选择一条数据查看')
    //   return
    // }
    // currentRow.value = checkedRows[0]
    // filePreviewVisibleState.value = true
  }

  const tabs = [
    {
      label: '未登记',
      code: TabEnum.UNREGISTERED
    },
    {
      label: '已登记',
      code: TabEnum.HAVEREGISTERED
    }
  ]
  tabs.forEach(tab => {
    tab.type = tab.type || 'button'
    tab.iconName = tab.iconName || 'ali_generated.png'
    tab.iconNameActive = tab.iconNameActive || 'ali_generated-active.png'
  })
  /**
   * 右上角tab对应的操作按钮
   * */
  const tabStatusBtnConfig = ref({
    changeBtns: false,
    buttons: tabs,
    curButton: tabs[0],
    buttonsInfo: [
      {
        label: '查看附件',
        status: 'primary',
        callback: previewHandle
      }
    ]
  })

  return {
    isShowSearchForm,
    tabStatusBtnConfig,
    onQueryConditionsClick
  }
}

export default useTabPlanel
