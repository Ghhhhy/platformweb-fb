import { ref, unref } from '@vue/composition-api'
import { Message } from 'element-ui'
import { allTab } from '../model/data'

function useTabPlanel(
  ruleModalVisible,
  getTable,
  checkedRecords
) {
  // 搜索栏显隐
  const isShowSearchForm = ref(false)

  /**
   * 显示隐藏筛选表单
   * */
  const onQueryConditionsClick = (isOpen) => {
    isShowSearchForm.value = isOpen
  }

  /**
   * 按钮操作
   * @return {Promise<void>}
   */
  async function buttonCommonHandle() {
    const tableInstance = await getTable()
    checkedRecords.value = tableInstance.getCheckboxRecords(true)
    if (!unref(checkedRecords)?.length) {
      Message.warning('请勾选需要查看的规则')
      return
    }
    ruleModalVisible.value = true
  }

  /**
   * 右上角tab对应的操作按钮
   * */
  const tabStatusBtnConfig = ref({
    changeBtns: true,
    buttons: allTab,
    curButton: allTab,
    buttonsInfo: [
      {
        label: '查看',
        status: 'primary',
        callback: () => buttonCommonHandle()
      }
    ]
  })

  return {
    tabStatusBtnConfig,
    onQueryConditionsClick,
    isShowSearchForm
  }
}

export default useTabPlanel
