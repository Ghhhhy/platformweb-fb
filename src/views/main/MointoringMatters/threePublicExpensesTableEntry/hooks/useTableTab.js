import { ref } from '@vue/composition-api'
import { tableTabs as tableTabsOrigin } from '../model/data'
import { TableTabsEnum } from '../model/enum'

export default function useTableTab() {
  // tab列表
  const tableTabs = ref(tableTabsOrigin)

  // 当前选中的tab
  const currentTableTab = ref(TableTabsEnum.MONITOR_BASIC_INFORMATION)

  /**
   * tab切换
   * @param val
   */
  function changeTableTab(val) {
    currentTableTab.value = val
  }

  return {
    tableTabs,
    currentTableTab,
    changeTableTab
  }
}
