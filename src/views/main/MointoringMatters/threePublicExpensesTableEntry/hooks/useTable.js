import { ref, unref } from '@vue/composition-api'
import { sum, filterTree, toTreeArray } from 'xe-utils'
import { generateEditorRules } from '../utils'

export default function useTable(currentColumns) {
  // 编辑配置
  const editConfig = ref({
    trigger: 'click',
    enabled: true,
    mode: 'row',
    showIcon: true,
    showAsterisk: true,
    activeMethod: () => true
  })

  /**
   * 动态设置表格是否能够编辑
   * @param isEditor
   */
  function setTableEditorState(isEditor = true) {
    editConfig.value.activeMethod = () => isEditor
    editConfig.value.showIcon = isEditor
    editConfig.value.showAsterisk = isEditor
  }

  // 校验配置项
  const validConfig = ref({
    autoPos: true,
    showMessage: true
  })

  // 编辑校验规则
  const editRules = ref(
    generateEditorRules(unref(currentColumns))
  )

  // 表尾合计行
  function footerMethod({ columns, data }) {
    return [
      columns?.map((column, columnIndex) => {
        if (columnIndex === 0) {
          return '合计'
        }
        const tree = filterTree(columns, item => {
          const types = ['float', 'integer', 'number']
          return item.editRender?.name === '$input' && types.includes(item.editRender?.props?.type)
        })
        const arr = toTreeArray(tree)?.map(item => item.property)
        if (arr.includes(column.property)) {
          return sum(data, column.property)
        }
        return null
      })
    ]
  }

  return {
    editConfig,
    validConfig,
    editRules,
    setTableEditorState,
    footerMethod
  }
}
