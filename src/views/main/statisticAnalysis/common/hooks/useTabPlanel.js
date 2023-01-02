import { ref } from '@vue/composition-api'
import { Message } from 'element-ui'
import { allTab } from '@/views/main/handlingOfViolations/model/data'

function useTabPlanel(
  changeRuleModalVisibleVisible,
  getTable,
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
   * 按钮操作
   * @return {Promise<void>}
   */
  async function buttonCommonHandle() {
    const tableInstance = await getTable()
    const records = tableInstance.getCheckboxRecords(true)
    if (records?.length !== 1) {
      Message.warning('请勾选一条需要查看的信息')
      return
    }
    currentRow.value = records[0]
    changeRuleModalVisibleVisible(true)
  }

  const buttonsInfo = {
    [allTab.code]: [
      {
        label: '查看',
        status: 'primary',
        callback: () => buttonCommonHandle()
      }
    ]
  }

  /**
   * 右上角tab对应的操作按钮
   * */
  const tabStatusBtnConfig = ref({
    changeBtns: true,
    buttons: [allTab],
    curButton: allTab,
    buttonsInfo
  })

  return {
    tabStatusBtnConfig,
    onQueryConditionsClick,
    isShowSearchForm,
    buttonCommonHandle
  }
}

export default useTabPlanel
