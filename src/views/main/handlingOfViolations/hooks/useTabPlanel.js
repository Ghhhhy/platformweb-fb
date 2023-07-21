import { ref, unref } from '@vue/composition-api'
import { Message, MessageBox } from 'element-ui'
import { ModalTypeEnum, RouterPathEnum, TabEnum } from '../model/enum'
import { allTab, returnTab, disabledTab, sendAuditTabs, doAuditTabs } from '../model/data'
import { billInvalid, workFlowRevoke } from '@/api/frame/main/handlingOfViolations/index.js'
import { checkRscode } from '@/utils/checkRscode'

import { transJson3 } from '@/utils/params.js'
import store from '@/store'

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
    console.log(checkedRecords.value)
    // SH 需求 若同时处理多种颜色的违规单，则提示不可操作多种颜色违规单
    if (type === ModalTypeEnum.AUDIT && store.state.userInfo.province.startsWith('31')) {
      const warnLevelArr = checkedRecords.value.map(item => item.warnLevel)
      console.log(warnLevelArr)
      if (Array.from(new Set(warnLevelArr)).length > 1) {
        Message.warning('不能同时处理多种颜色的违规单，请重新勾选')
        return
      }
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
          const menuId = store.state.curNavModule?.guid || ''
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
  async function revoke() {
    const tableInstance = await getTable()
    checkedRecords.value = tableInstance.getCheckboxRecords(true)
    if (!unref(checkedRecords)?.length) {
      Message.warning('请勾选需要撤回的数据')
      return
    }
    MessageBox.confirm('确认撤回所选数据吗？', '温馨提示', {
      type: 'warning',
      callback: async action => {
        if (action === 'confirm') {
          const menuId = store.state.curNavModule?.guid || ''
          const params = {
            menuId,
            updateStatus: TabEnum.NO_SEND, // 未送审状态
            status: '5', // 撤回
            data: unref(checkedRecords).map(item => { return { id: item.id, warnLevel: item.warnLevel } })
          }
          checkRscode(await workFlowRevoke(params))
          Message.success(`成功撤回${unref(checkedRecords)?.length}条数据`)
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
  // 撤回
  const revokeButton = {
    status: 'primary',
    label: '撤回',
    callback: () => revoke()
  }
  // 最终按钮配置
  const tabMapButton = Object.values(TabEnum).reduce((map, value) => {
    if ([TabEnum.NO_AUDIT, TabEnum.NO_SEND].includes(value)) {
      Reflect.set(map, value, [auditButton])
    } else if ([TabEnum.RETURN].includes(value)) {
      Reflect.set(map, value, [auditButton, previewButton])
    } else if ([TabEnum.SENDED].includes(value)) {
      Reflect.set(map, value, [revokeButton, previewButton])
    } else {
      Reflect.set(map, value, [previewButton])
    }
    return map
  }, {})
  const tabMapButtonSH = Object.values(TabEnum).reduce((map, value) => {
    if ([TabEnum.NO_AUDIT, TabEnum.NO_SEND].includes(value)) {
      Reflect.set(map, value, [auditButton])
    } else if ([TabEnum.RETURN].includes(value)) {
      Reflect.set(map, value, [auditButton, previewButton])
    } else if ([TabEnum.SENDED].includes(value)) {
      Reflect.set(map, value, [previewButton])
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
    if (unref(pagePath) === (RouterPathEnum().UNIT_FEEDBACK || RouterPathEnum().DIVISION_FEED_BACK)) {
      [TabEnum.NO_SEND, TabEnum.RETURN].forEach(item => {
        tabMapButton[item].splice(1, 0, cancellationButton)
      })
    }
  }
  patchTabMapButton()

  console.log(unref(pagePath), RouterPathEnum())
  /**
   * 右上角tab对应的操作按钮
   * */
  const tabStatusBtnConfig = ref({
    changeBtns: true,
    buttons: (unref(pagePath) === RouterPathEnum().UNIT_FEEDBACK || unref(pagePath) === RouterPathEnum().DIVISION_FEED_BACK)
      ? [...sendAuditTabs, returnTab, disabledTab, allTab]
      : (unref(pagePath) === RouterPathEnum().DIVISION_REAUDIT || unref(pagePath) === RouterPathEnum().DIVISION_FEED_AUDIT)
        ? [...doAuditTabs, allTab]
        : [...doAuditTabs, returnTab, allTab],
    curButton: unref(currentTab),
    buttonsInfo: transJson3(store.state.curNavModule.param5).projectCode === 'SH' ? tabMapButtonSH : tabMapButton
  })
  console.log(tabStatusBtnConfig, 'tabStatusBtnConfigtabStatusBtnConfigtabStatusBtnConfig')
  //
  return {
    tabStatusBtnConfig,
    onQueryConditionsClick,
    isShowSearchForm,
    modalType
  }
}

export default useTabPlanel
