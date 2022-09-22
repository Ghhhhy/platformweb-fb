/**
 * 表格金额行过滤
 * @description 受单位切换影响，vxe-table版本问题导致filterMethod方法接收不到cellValue，采用__viewSort后置字段
 * @param config
 * @returns {{filterMethod: (function({value: *, column: *, row: *})), filters: [{label: string, value: string}, {label: string, value: string}, {label: string, value: string}, {label: string, value: string}, {label: string, value: string}, null], filterMultiple: boolean}}
 */
export const getColumnMoneyFilterConfig = (column = {}) => {
  return {
    filters: [{ data: { min: '', max: '' } }],
    filterRender: {
      name: 'FilterNumberRange'
    },
    ...column
  }
}
