import { ref, unref } from '@vue/composition-api'
import { Message } from 'element-ui'
import { ModalTypeEnum, RouterPathEnum, TabEnum } from '../model/enum'
import { allTab, returnTab, disabledTab, sendAuditTabs, doAuditTabs } from '../model/data'

function useTabPlanel(
  auditVisible, // 弹窗状态
  getTable, // 获取表格实例方法
  pagePath, // 菜单来源
  checkedRecords, // 勾选的行
  currentTab
) {
  // 搜索栏显隐
  const isShowSearchForm = ref(false)

  // 当前弹窗打开类别（处理、查看）
  const modalType = ref('')

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
  async function buttonCommonHandle(type) {
    const tableInstance = await getTable()
    checkedRecords.value = tableInstance.getCheckboxRecords(true)
    if (!unref(checkedRecords)?.length) {
      Message.warning(`请勾选需要${type === ModalTypeEnum.AUDIT ? '处理' : '查看'}的违规单`)
      return
    }
    modalType.value = type
    auditVisible.value = true
  }

  // 违规处理按钮
  const auditButton = {
    label: '违规处理',
    status: 'primary',
    callback: () => buttonCommonHandle(ModalTypeEnum.AUDIT)
  }
  // 违规处理按钮
  const previewButton = {
    label: '处理单查看',
    callback: () => buttonCommonHandle(ModalTypeEnum.PREVIEW)
  }
  // 最终按钮配置
  const tabMapButton = Object.values(TabEnum).reduce((map, value) => {
    if ([TabEnum.NO_AUDIT, TabEnum.NO_SEND].includes(value)) {
      Reflect.set(map, value, [auditButton])
    } else if ([TabEnum.RETURN].includes(value)) {
      Reflect.set(map, value, [auditButton, previewButton])
    } else {
      Reflect.set(map, value, [previewButton])
    }
    return map
  }, {})

  /**
   * 右上角tab对应的操作按钮
   * */
  const tabStatusBtnConfig = ref({
    changeBtns: true,
    buttons: unref(pagePath) === RouterPathEnum.UNIT_FEEDBACK
      ? [...sendAuditTabs, returnTab, disabledTab, allTab]
      : unref(pagePath) === RouterPathEnum.DIVISION_REAUDIT
        ? [...doAuditTabs, allTab]
        : [...doAuditTabs, returnTab, allTab],
    curButton: unref(currentTab),
    buttonsInfo: tabMapButton
  })

  return {
    tabStatusBtnConfig,
    onQueryConditionsClick,
    isShowSearchForm,
    modalType
  }
}

export default useTabPlanel
