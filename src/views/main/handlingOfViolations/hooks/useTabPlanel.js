import { ref, unref } from '@vue/composition-api'
import { Message, MessageBox } from 'element-ui'
import { ModalTypeEnum, RouterPathEnum, TabEnum } from '../model/enum'
import { allTab, returnTab, disabledTab, sendAuditTabs, doAuditTabs } from '../model/data'
import { billInvalid } from '@/api/frame/main/handlingOfViolations/index.js'
import { checkRscode } from '@/utils/checkRscode'
import store from '@/store'
import getMenuByPath from '../utils/getMenuByPath'

function useTabPlanel(
  auditVisible, // 弹窗状态
  getTable, // 获取表格实例方法
  pagePath, // 菜单来源
  checkedRecords, // 勾选的行
  currentTab, // 当前页面tab
  resetFetchTableData // 刷新表格
) {
  // 搜索栏显隐
  const isShowSearchForm = ref(true)

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
      Message.warning(`请勾选需要${type === ModalTypeEnum.AUDIT ? '处理' : '查看'}的数据`)
      return
    }
    modalType.value = type
    auditVisible.value = true
  }

  /**
   * 作废
   * @return {Promise<void>}
   */
  async function cancellationHandle() {
    const tableInstance = await getTable()
    checkedRecords.value = tableInstance.getCheckboxRecords(true)
    if (!unref(checkedRecords)?.length) {
      Message.warning('请勾选需要作废的处理单')
      return
    }
    MessageBox.confirm('确认作废所选数据吗？', '温馨提示', {
      type: 'warning',
      callback: async action => {
        if (action === 'confirm') {
          const menuId = getMenuByPath()?.guid || store.state.curNavModule?.guid || ''
          const params = {
            menuId,
            data: unref(checkedRecords)
          }
          checkRscode(await billInvalid(params))
          Message.success(`成功作废${unref(checkedRecords)?.length}条数据`)
          resetFetchTableData()
        }
      }
    })
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
  // 作废
  const cancellationButton = {
    label: '作废',
    callback: () => cancellationHandle()
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
   * 2023-3-6新增需求：
   * 单位反馈页面的“未送审”、“被退回”页卡新增作废按钮
   */
  function patchTabMapButton() {
    if (unref(pagePath) === RouterPathEnum.UNIT_FEEDBACK) {
      [TabEnum.NO_SEND, TabEnum.RETURN].forEach(item => {
        tabMapButton[item].splice(1, 0, cancellationButton)
      })
    }
  }
  patchTabMapButton()

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
