import { ref } from '@vue/composition-api'
import { Message, MessageBox } from 'element-ui'
import { multiDelete } from '@/api/frame/main/payReport/formulaManagement.js'
import { checkRscode } from '@/utils/checkRscode.js'

function useTabPlanel(
  modalVisiableState, // 弹窗状态
  getTable, // 获取表格实例方法
  currentRow, // 当前操作行
  resetFetchTableData // 重置页码刷新表格
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
   * 新增
   */
  function addModalHandle() {
    currentRow.value = null
    modalVisiableState.value = true
  }

  /**
   * 删除
   */
  async function deleteHandle() {
    const tableInstance = await getTable()
    const records = tableInstance.getCheckboxRecords(true)
    if (!records.length) {
      Message.warning('请勾选需要删除的数据')
      return
    }
    MessageBox.confirm('确认删除所勾选的数据吗？', '温馨提示', {
      type: 'warning',
      callback: async action => {
        if (action === 'confirm') {
          checkRscode(await multiDelete(records.map(item => item.id)))
          Message.success('删除成功!')
          resetFetchTableData()
        }
      }
    })
  }

  const tabs = [
    {
      label: '审核公式',
      code: '1'
    }
    // {
    //   label: '表间取数',
    //   code: '2'
    // },
    // {
    //   label: '审核通配公式',
    //   code: '3'
    // },
    // {
    //   label: '表间取数通配公式',
    //   code: '4'
    // },
    // {
    //   label: '预表间取数',
    //   code: '5'
    // },
    // {
    //   label: '对账单公式',
    //   code: '6'
    // },
    // {
    //   label: '上年数表间取数',
    //   code: '7'
    // }
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
    buttonsInfo: {
      [tabs[0]?.code]: [
        {
          label: '新增',
          status: 'primary',
          callback: addModalHandle
        },
        {
          label: '删除',
          callback: deleteHandle
        }
      ]
    }
  })

  return {
    isShowSearchForm,
    tabStatusBtnConfig,
    onQueryConditionsClick
  }
}

export default useTabPlanel
