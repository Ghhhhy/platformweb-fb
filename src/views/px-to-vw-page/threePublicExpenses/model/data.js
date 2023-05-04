export const SelectEnum = {
  BY_MONTH: 1,
  BY_MOF_DIV: 2
}

export const getViewAllRuleSelectOption = () => {
  return [
    { label: '按月份', value: SelectEnum.BY_MONTH },
    { label: '按区划', value: SelectEnum.BY_MOF_DIV }
  ]
}
